import { Descriptions, Divider } from 'antd'
import * as React from 'react'

export const GeneralReportMetricsHelp = () => {
    return (
        <Descriptions title='General Report' column={1} size='small'>
            <b>Metrics</b>
            <Descriptions.Item label='Site Requests'>
                Number of Site Requests for a selected period of time (not
                available when Bidders, Ad Units, Sizes or HB Source filter or
                group by is selected)
            </Descriptions.Item>
            <Descriptions.Item label='Requests'>
                Number of Ad Unit Requests for a selected period of time (not
                available when Bidders or HB Source filter or group by is
                selected)
            </Descriptions.Item>
            <Descriptions.Item label='Bid Requests'>
                Number of Bid Requests for a selected period of time (not
                available when HB Source filter or group by is selected)
            </Descriptions.Item>
            <Descriptions.Item label='Bids'>
                Number of bid responses received for a selected period of time
            </Descriptions.Item>
            <Descriptions.Item label='Impressions'>
                Number of Impressions for a selected period of time
            </Descriptions.Item>
            <Descriptions.Item label='Wins'>
                Number of wins in auctions.
            </Descriptions.Item>
            <Descriptions.Item label='Timeouts'>
                Number of prebid.js "Timeout" events, e.i. when bidder didn't
                provide a bid within the time specified in your prebid.js
                timeout settings
            </Descriptions.Item>
            <Descriptions.Item label='Average Revenue in USD'>
                Revenue = Sum of Impression CPMs /1000 converted to USD
            </Descriptions.Item>
            <Descriptions.Item label='Average eCPM in USD'>
                Average CPM by Impressions converted to USD
            </Descriptions.Item>
            <Descriptions.Item label='Average Bid Price in USD'>
                Average CPM by all Bids converted to USD
            </Descriptions.Item>
            <Descriptions.Item label='Bid Rate'>
                Bid Rate = Number of Bids/Number of Requests in %
            </Descriptions.Item>
            <Descriptions.Item label='Win Rate'>
                Win Rate = Number of Wins/Number of Bids in %
            </Descriptions.Item>
            <Descriptions.Item label='Timeout Rate'>
                Timeout Rate = Number of Bids with Timeouts/Number of All
                Requests in %
            </Descriptions.Item>
            <Divider />
            <b>Group By</b>
            <Descriptions.Item label='HB Source'>
                Header bidding source: client or s2s
            </Descriptions.Item>
        </Descriptions>
    )
}
