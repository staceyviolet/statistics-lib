import { Descriptions } from 'antd'
import * as React from 'react'

export const HelpBidderAnalysisChartCpmBreakdown: React.FC = () => {
    return (
        <Descriptions
            title='CPM breakdown'
            column={1}
            size='small'
            layout='horizontal'
        >
            <Descriptions.Item>
                <span>Bidder's eCPM vs bid CPM </span>
            </Descriptions.Item>
        </Descriptions>
    )
}
