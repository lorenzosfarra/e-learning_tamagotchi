import React, {Component} from 'react';
import './App.css';
import {Alert, Col, Form, FormGroup, Input} from "reactstrap";
import config from "./config";
import Actions from "./components/Actions";
import {FormButton, FullWidthRow, MainContainer, TamagotchiDiv} from "./components/StyledComponents";
import FirebaseLib from "./libs/FirebaseLib";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: config.Status.IDS.HUNGRY,
            name: {
                editStatus: 'normal',
                value: ''
            }
        };
    }

    /**
     * Change the state in order to have a new status
     * @param status
     */
    setNewStatus(status) {
        this.setState({status});
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
            await db.collection('info').doc('name')
                .set({value: name});
            this.setState({
                name: {...nameObject, editStatus: 'saved'}
            });
            setTimeout(() => {
                _this.setState({
                    name: {...nameObject, editStatus: 'normal'}
                });
            }, 3000);
        } catch (err) {
            console.error("Unable to save the name in the DB", err);
            // TODO: editStatus --> Error
        }

    }

    /**
     * Change the state in order to edit the name
     */
    editName() {
        const {name: nameObject} = this.state;
        this.setState({
            name: {...nameObject, editStatus: 'editing'}
        });
    }

    render() {
        const {status, name} = this.state;
        return (
            <MainContainer status={status} className='gradient-container'>
                <FullWidthRow>
                    <Col xs='12' className='d-flex justify-content-center'>
                        {
                            (name.editStatus === 'saved') ?
                                <Alert color='success'>
                                    Name saved successfully!
                                </Alert> :

                                (name.editStatus === 'editing') ?
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
                                    <p>{name.value ? name.value : 'N.A.'}<FormButton
                                        onClick={() => this.editName()}>Change</FormButton></p>
                        }
                    </Col>
                </FullWidthRow>
                <FullWidthRow>
                    <Col xs='4' md={{size: 3, offset: 3}} className='d-flex align-items-center'>
                        <TamagotchiDiv position={config.Status.SPRITE[status]}/>
                    </Col>
                    <Col xs='8' md={{size: 3, offset: 0}}>
                        <Actions onTamagotchiStatusChange={(status) => this.setNewStatus(status)}/>
                    </Col>
                </FullWidthRow>
            </MainContainer>
        );
    }
}

export default App;
