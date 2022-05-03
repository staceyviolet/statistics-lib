import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpBidderAnalysisGeneralRevenue: React.FC = () => {
    return (
        <Descriptions title={"Revenue by Bidder"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
                <span>Revenue volume grouped by bidder represented in USD/EUR or in %</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
