import React, {PureComponent} from 'react';
import config from '../config';
import {LoadingComponent, TamagotchiDiv} from "./StyledComponents";

export default class Loading extends PureComponent {

    render() {
        return (
            <LoadingComponent className='d-flex align-items-center justify-content-center'>
                <TamagotchiDiv position={config.Status.SPRITE.LOADING}/>
            </LoadingComponent>
        )
    }
}