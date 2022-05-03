import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpBidderAnalysisResponseTime:React.FC = () => {
    return (
        <Descriptions title={"Bidder Response Time"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
               <span>Response time by bidder. Measured in bids per time to wait for bid response.</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
