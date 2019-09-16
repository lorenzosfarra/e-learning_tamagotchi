import React, {Component} from 'react';
import config from '../config';
import {TamagotchiDiv} from "./StyledComponents";

export default class Tamagotchi extends Component {
    render() {
        const {status = config.Status.ANGRY} = this.props;
        return (
            <TamagotchiDiv position={status}/>
        )
    }
}