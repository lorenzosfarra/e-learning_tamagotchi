import React, {PureComponent} from 'react';
import {TimeLineCustom, TimeLineCustomEvent} from "./StyledComponents";

export default class History extends PureComponent {

    render() {
        const {list = []} = this.props;

        return (
            <TimeLineCustom>
                {
                    list.map((status, index) => (
                        <TimeLineCustomEvent
                            key={'history-status-' + index}
                            title={status.value}
                            createdAt={status.startedAt.toLocaleString()}
                            container="card"
                        />
                    ))
                }
            </TimeLineCustom>
        )
    }
}