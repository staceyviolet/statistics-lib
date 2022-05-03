import { Descriptions } from "antd";
import * as React                from 'react';

export const HelpBidderAnalysisChartRevenue: React.FC = () => {
    return (
        <Descriptions title={"Bidder Revenue"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
               <span> Bidder's revenue dynamics over the selected period of time </span>
            </Descriptions.Item>
        </Descriptions>
    )
}
