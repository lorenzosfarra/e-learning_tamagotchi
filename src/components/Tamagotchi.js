import React, {Component} from 'react';
import config from '../config';
import {TamagotchiDiv} from "./StyledComponents";

export default class Tamagotchi extends Component {
    render() {
        const {position = config.Status.ANGRY} = this.props;
        return (
            <TamagotchiDiv position={position}/>
        )
    }
}