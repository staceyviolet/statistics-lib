import { Descriptions, Divider } from "antd";
import * as React                from 'react';

export const HelpBidderAnalysisChartBidderFunnel:React.FC = () => {
    return (
        <Descriptions title={"Bidder Funnel"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
                  Volume of bid requests resulted to bids resulted to wins resulted to impression
            </Descriptions.Item>
            <Divider/>
        </Descriptions>
    )
}
