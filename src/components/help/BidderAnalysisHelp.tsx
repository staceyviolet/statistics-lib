import { Descriptions, Divider } from 'antd'
import * as React from 'react'

export const BidderAnalysisHelp = () => {
    return (
        <Descriptions
            title='Bidder Analysis'
            column={1}
            size='small'
            layout='vertical'
        >
            <Descriptions.Item label='Bidders List'>
                Statistics by bidders on general metrics for a selected period
                of time ordered by revenue. Click on the column header to sort
                by any other metric. Click on bidder name to see the detailed
                statistics by bidder.
            </Descriptions.Item>
            <Divider />
            <Descriptions.Item label='General Charts'>
                <ul>
                    <li>Revenue by bidder chart in USD/EUR | in %</li>
                    <li>Bid Rate by Bidder chart</li>
                    <li>Timeout Rate by Bidder chart</li>
                </ul>
            </Descriptions.Item>
            <Divider />
            <Descriptions.Item label='Incremental Revenue Chart'>
                <p>
                    Additional revenue by bidder in comparison with other
                    bidders.
                </p>
                <p>Incremental value = Win CPM sum - Auction Second CPM sum</p>
            </Descriptions.Item>
            <Divider />
            <Descriptions.Item label='Bidder Response Time Chart'>
                <span>
                    Response time by bidder chart. Measured in bids per time to
                    wait for bid response.
                </span>
            </Descriptions.Item>
        </Descriptions>
    )
}
