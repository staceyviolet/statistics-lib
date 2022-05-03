import { Descriptions } from 'antd'
import * as React from 'react'

export const HelpBidderAnalysisIncrementalRevenue: React.FC = () => {
    return (
        <Descriptions
            title='Incremental Revenue by Bidder'
            column={1}
            size='small'
            layout='horizontal'
        >
            <Descriptions.Item>
                <div>
                    Additional revenue by bidder in comparison with other
                    bidders.
                </div>
                <div>
                    Incremental value = Win CPM sum - Auction Second CPM sum
                </div>
            </Descriptions.Item>
        </Descriptions>
    )
}
