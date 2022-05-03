import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpBidderAnalysisGeneralTimeoutRate:React.FC = () => {
    return (
        <Descriptions title={"Timeout Rate by Bidder"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
                <span>Timeout Rate volume grouped by bidder</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
