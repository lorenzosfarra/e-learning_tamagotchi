import React from 'react';
import './App.css';
import {Col, Container, Row} from "reactstrap";
import Tamagotchi from "./components/Tamagotchi";
import config from "./config";

function App() {
    return (
        <Container>
            <Row>
                <Col lg={{offset: 3, size: 6}} xs={{offset: 1, size: 10}}>
                    <Tamagotchi position={config.Status.HAPPY}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
