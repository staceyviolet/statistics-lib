import { Descriptions, Divider } from "antd";
import * as React                from 'react';

export const RevenueReportMetricsHelp = () => {
    return (
        <Descriptions title={"Revenue Report"} column={1} size={"small"}>
            <b>Metrics</b>
            <Descriptions.Item label="Bids">Number of bid responses received for a selected period of time
            </Descriptions.Item>
            <Descriptions.Item label="Impressions">Number of Impressions for a selected period of time
            </Descriptions.Item>
            <Descriptions.Item label="Wins">Number of wins in auctions.
            </Descriptions.Item>
            <Descriptions.Item label="Revenue">Revenue = Sum of Impression CPMs /1000
                automatically grouped by currency
            </Descriptions.Item>
            <Descriptions.Item label="Revenue in USD">Revenue = Sum of Impression CPMs /1000 converted to USD
            </Descriptions.Item>
            <Descriptions.Item label="eCPM">Average CPM by Impressions.
                automatically grouped by currency
            </Descriptions.Item>
            <Descriptions.Item label="eCPM in USD">Average CPM by Impressions converted to USD
            </Descriptions.Item>
            <Descriptions.Item label="Bid Price">Average CPM by all Bids
                automatically grouped by currency
            </Descriptions.Item>
            <Descriptions.Item label="Bid Price in USD">Average CPM by all Bids converted to USD
            </Descriptions.Item>
            <Descriptions.Item label="Win Rate">Number of Wins/Number of Bids in %
            </Descriptions.Item>
            <Divider/>
            <b>Group by</b>
            <Descriptions.Item label="HB Source">Header bidding source: client or s2s
            </Descriptions.Item>
        </Descriptions>
    )
}
