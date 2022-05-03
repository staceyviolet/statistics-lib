import { Descriptions } from 'antd'
import * as React from 'react'

export const HelpBidderAnalysisChartBidderEfficiency: React.FC = () => {
    return (
        <Descriptions
            title='Bidder Efficiency'
            column={1}
            size='small'
            layout='horizontal'
        >
            <Descriptions.Item>
                <span>Bidder's Bid rate vs Win rate volume</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
