import React, {Component} from 'react';
import config from '../config';
import {Button} from "reactstrap";

export default class Actions extends Component {

    render() {
        const {onTamagotchiStatusChange} = this.props;
        return (
            <>
                <Button onClick={() => {
                    onTamagotchiStatusChange(config.Status.FINISHED_EATING)
                }}>Feed him</Button>
            </>
        )
    }
}