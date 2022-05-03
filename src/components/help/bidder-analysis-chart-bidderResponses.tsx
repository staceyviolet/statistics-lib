import { Descriptions } from "antd";
import * as React                from 'react';

export const HelpBidderAnalysisChartBidderResponses:React.FC = () => {
    return (
        <Descriptions title={"Bidder Responses"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
                <span>Bidder's Bid Rate vs Timeout Rate volume</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
