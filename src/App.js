import React, {Component} from 'react';
import './App.css';
import {Alert, Col, Form, FormGroup, Input} from "reactstrap";
import config from "./config";
import Actions from "./components/Actions";
import {FormButton, FullWidthRow, MainContainer, Name, TamagotchiDiv} from "./components/StyledComponents";
import FirebaseLib from "./libs/FirebaseLib";
import Loading from "./components/Loading";
import * as firebase from "firebase";

class App extends Component {

    constructor(props) {
        super(props);

        this.Listeners = {
            nameChangeUnsubcriber: null,
            statusChangedUnsubscriber: null
        };

        this.state = {
            status: {
                value: config.Status.IDS.HUNGRY,
                startedAt: null
            },
            name: {
                editStatus: config.UI.EDIT_STATUS.NORMAL,
                value: ''
            },

            // Has data from Firestore loaded yet?
            dbLoaded: {
                name: false,
                status: false
            }
        };

        this.statusTimeout = null;
    }

    componentDidMount() {
        const db = FirebaseLib.FIRESTORE_DB;
        const _this = this;
        this.Listeners.nameChangeUnsubcriber = db.collection(config.DBPaths.INFO).doc(config.DBPaths.INFO_NAME)
            .onSnapshot((snap) => {
                if (snap.exists) {
                    const {name: nameObject, dbLoaded} = this.state;
                    const name = snap.data().value;
                    this.setState({dbLoaded: {...dbLoaded, name: true}, name: {...nameObject, value: name}});
                }
            });
        this.Listeners.statusChangedUnsubscriber = db.collection(config.DBPaths.HISTORY)
            .orderBy('startedAt', 'desc')
            .limit(config.UI.STATUSES_LIMIT)
            .onSnapshot(function (querySnapshot) {
                const history = [];
                querySnapshot.forEach(function (doc) {
                    const status = doc.data();
                    history.push({value: status.value, startedAt: status.startedAt.toDate()});
                });
                const {dbLoaded} = _this.state;
                if (history.length > 0) {
                    _this.setState({
                        dbLoaded: {...dbLoaded, status: true},
                        status: history[0]
                    });
                } else {
                    _this.setState({dbLoaded: {...dbLoaded, status: true}});
                }
            });
    }

    componentWillUnmount() {
        this.Listeners.nameChangeUnsubcriber();
        this.Listeners.statusChangedUnsubscriber();
    }

    _clearStatusTimeout() {
        clearTimeout(this.statusTimeout);
        this.statusTimeout = null;
    }

    /**
     * Set the value name in the state
     * @param name
     */
    setName(name) {
        const {name: nameObject} = this.state;
        this.setState({name: {...nameObject, value: name}});
    }

    /**
     * Save the name into our Firestore DB
     */
    async saveName() {
        const _this = this;

        const {name: nameObject} = this.state;
        const {value: name} = nameObject; // const name = nameObject.name;
        const db = FirebaseLib.FIRESTORE_DB;

        try {
            await db.collection(config.DBPaths.INFO).doc(config.DBPaths.INFO_NAME)
                .set({value: name});
            this.setState({
                name: {...nameObject, editStatus: config.UI.EDIT_STATUS.SAVED}
            });
            setTimeout(() => {
                _this.setState({
                    name: {...nameObject, editStatus: config.UI.EDIT_STATUS.NORMAL}
                });
            }, 3000);
        } catch (err) {
            console.error("Unable to save the name in the DB", err);
            // TODO: saveName --> Error
        }
    }

    /**
     * Save the status into our Firestore DB
     */
    async saveStatus(status) {
        const db = FirebaseLib.FIRESTORE_DB;
        try {
            const ref = db.collection(config.DBPaths.HISTORY).doc();
            const now = firebase.firestore.Timestamp.now();
            await ref.set({value: status, startedAt: now});
            this._checkNext(status);
        } catch (err) {
            console.error("Unable to save the status in the DB", err);
            // TODO: saveStatus --> Error
        }
    }

    /**
     * Check the next status and how much time the current one will last
     * @param status
     * @private
     */
    async _checkNext(status) {
        const timeoutAndNextKeys = Object.keys(config.Status.TIMEOUTS_AND_NEXT_STATUSES);
        const item = timeoutAndNextKeys.find((key) => (key === status));
        if (item) {
            const _this = this;
            const next = config.Status.TIMEOUTS_AND_NEXT_STATUSES[item];
            this._clearStatusTimeout();
            this.statusTimeout = setTimeout(() => {
                _this.saveStatus(next.status);
            }, next.timeout);
        }
    }

    /**
     * Change the state in order to edit the name
     */
    editName() {
        const {name: nameObject} = this.state;
        this.setState({
            name: {...nameObject, editStatus: config.UI.EDIT_STATUS.EDITING}
        });
    }

    render() {
        const {status, name, dbLoaded} = this.state;
        if (!dbLoaded.name || !dbLoaded.status) {
            return <Loading/>;
        }
        return (
            <MainContainer status={status.value} className='gradient-container'>
                <FullWidthRow>
                    <Col xs='12' className='d-flex justify-content-center'>
                        {
                            (name.editStatus === config.UI.EDIT_STATUS.SAVED) ?
                                <Alert color='success'>
                                    Name saved successfully!
                                </Alert> :

                                (name.editStatus === config.UI.EDIT_STATUS.EDITING) ?
                                    <Form inline>
                                        <FormGroup>
                                            <Input type='text'
                                                   name='name'
                                                   id='name'
                                                   placeholder='Fuffy'
                                                   value={name.value}
                                                   onChange={({target: {value: newName}}) => this.setName(newName)}/>
                                            <FormButton onClick={() => this.saveName()}>Save</FormButton>
                                        </FormGroup>
                                    </Form> :
                                    <Name>{name.value ? name.value : 'N.A.'}<FormButton
                                        onClick={() => this.editName()}>Change</FormButton></Name>
                        }
                    </Col>
                </FullWidthRow>
                <FullWidthRow>
                    <Col xs='4' md={{size: 3, offset: 3}} className='d-flex align-items-center'>
                        <TamagotchiDiv position={config.Status.SPRITE[status.value]}/>
                    </Col>
                    <Col xs='8' md={{size: 3, offset: 0}}>
                        <Actions currentStatus={status.value}
                                 onTamagotchiStatusChange={(status) => this.saveStatus(status)}/>
                    </Col>
                </FullWidthRow>
            </MainContainer>
        );
    }
}

export default App;
