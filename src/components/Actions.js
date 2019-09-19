import React, {PureComponent} from 'react';
import config from '../config';
import {ActionButton} from "./StyledComponents";

export default class Actions extends PureComponent {

    render() {
        const {onTamagotchiStatusChange} = this.props;
        const Statuses = config.Status.IDS;
        const Action = config.Status.ACTION;

        return (
            <>
                {Object.keys(Action).map((action, index) => (
                    <ActionButton
                        key={"action-button-" + index}
                        onClick={() => {
                            onTamagotchiStatusChange(Statuses[action])
                        }}>{Action[action]}</ActionButton>
                ))}

                {/*<ActionButtons onClick={() => {
                    onTamagotchiStatusChange(Statuses.FINISHED_EATING)
                }}>Feed him</ActionButtons>
                <ActionButtons onClick={() => {
                    onTamagotchiStatusChange(Statuses.SLEEPING)
                }}>Sleep</ActionButtons>*/}
            </>
        )
    }
}