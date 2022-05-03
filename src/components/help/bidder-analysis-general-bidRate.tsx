import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpBidderAnalysisGeneralBidRate:React.FC = () => {
    return (
        <Descriptions title={"Bid Rate by Bidder"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
               <span>Bid Rate volume grouped by bidder</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
