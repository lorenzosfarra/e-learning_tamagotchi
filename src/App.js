import React, {Component} from 'react';
import './App.css';
import {Col, Container, Row} from "reactstrap";
import Tamagotchi from "./components/Tamagotchi";
import config from "./config";
import Actions from "./components/Actions";

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
                <Row>
                    <Col xs='6'>
                        <Tamagotchi status={status}/>
                    </Col>
                    <Col xs='6'>
                        <Actions onTamagotchiStatusChange={(status) => this.setNewStatus(status)}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
