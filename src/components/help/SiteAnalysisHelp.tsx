import { Descriptions } from 'antd'
import * as React from 'react'

export const SiteAnalysisHelp = () => {
    return (
        <Descriptions
            title='Site Analysis'
            column={1}
            size='small'
            layout='vertical'
        >
            <Descriptions.Item>
                Statistics by sites on general metrics for a selected period of
                time ordered by revenue. Click on the column header to sort by
                any other metric. Click on site name to see the detailed
                statistics by site.
            </Descriptions.Item>
        </Descriptions>
    )
}
