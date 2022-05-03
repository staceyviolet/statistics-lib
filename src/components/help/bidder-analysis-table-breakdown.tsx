import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpBidderAnalysisTableBreakdown:React.FC = () => {
    return (
        <Descriptions title={"Bidder Breakdown"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
               <span> Bidder statistics grouped by Sites, Ad Units, Devices, Countries</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
