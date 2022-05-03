import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpSiteAnalysisChartBidDensity: React.FC = () => {
    return (
        <Descriptions title={"Site Bid Density"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
               <span> Site's bids/auctions dynamics over the selected period of time </span>
            </Descriptions.Item>
        </Descriptions>
    )
}
