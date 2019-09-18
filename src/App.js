import React, {Component} from 'react';
import './App.css';
import {Col} from "reactstrap";
import config from "./config";
import Actions from "./components/Actions";
import {FullWidthRow, MainContainer, TamagotchiDiv} from "./components/StyledComponents";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: config.Status.IDS.HUNGRY
        };
    }

    setNewStatus(status) {
        this.setState({status});
    }

    render() {
        const {status} = this.state;
        return (
            <MainContainer status={status} className='gradient-container'>
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
