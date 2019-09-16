import React, {Component} from 'react';
import './App.css';
import {Col, Container} from "reactstrap";
import Tamagotchi from "./components/Tamagotchi";
import config from "./config";
import Actions from "./components/Actions";
import {FullWidthRow} from "./components/StyledComponents";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: config.Status.HUNGRY
        }
    }

    setNewStatus(status) {
        this.setState({status});
    }

    render() {
        const {status} = this.state;
        return (
            <Container className='gradient-container'>
                <FullWidthRow>
                    <Col xs='6' md={{size: 3, offset: 3}}>
                        <Tamagotchi status={status}/>
                    </Col>
                    <Col xs='6' md={{size: 3, offset: 0}} className='mt-3'>
                        <Actions onTamagotchiStatusChange={(status) => this.setNewStatus(status)}/>
                    </Col>
                </FullWidthRow>
            </Container>
        );
    }
}

export default App;
