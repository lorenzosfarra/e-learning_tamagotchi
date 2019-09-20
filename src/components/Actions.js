import React, {PureComponent} from 'react';
import config from '../config';
import {ActionButton} from "./StyledComponents";

export default class Actions extends PureComponent {

    render() {
        const {onTamagotchiStatusChange, currentStatus} = this.props;
        const Statuses = config.Status.IDS;
        const Action = config.Status.ACTION;

        return (
            <>
                {Object.keys(Action).map((action, index) => (
                    (currentStatus === Statuses[action]) ?
                        <ActionButton
                            key={"action-button-" + index}
                            disabled
                            onClick={() => {
                                onTamagotchiStatusChange(Statuses[action])
                            }}>{Action[action]}</ActionButton>
                        :
                        <ActionButton
                            key={"action-button-" + index}
                            onClick={() => {
                                onTamagotchiStatusChange(Statuses[action])
                            }}>{Action[action]}</ActionButton>
                ))}

            </>
        )
    }
}