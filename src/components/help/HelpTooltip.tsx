import * as React from 'react'
import { HelpStatisticsSummaryValueBidPrice } from './statistics-summary-value-bidprice'
import { HelpStatisticsSummaryValueBidRate } from './statistics-summary-value-bidrate'
import { HelpStatisticsSummaryValueBidRequests } from './statistics-summary-value-bidRequests'
import { HelpStatisticsSummaryValueECPM } from './statistics-summary-value-ecpm'
import { HelpStatisticsSummaryValueImpressions } from './statistics-summary-value-impressions'
import { HelpStatisticsSummaryValueRequests } from './statistics-summary-value-requests'
import { HelpStatisticsSummaryValueRevenue } from './statistics-summary-value-revenue'
import { HelpStatisticsSummaryValueTimeout } from './statistics-summary-value-timeout'
import { HelpStatisticsSummaryValueWinRate } from './statistics-summary-value-windrate'

export const HelpTooltip = (helpId: string) => {
    switch (helpId) {
        case 'statistics-summary-value-revenue':
            return <HelpStatisticsSummaryValueRevenue />
        case 'statistics-summary-value-bidRequests':
            return <HelpStatisticsSummaryValueBidRequests />
        case 'statistics-summary-value-requests':
            return <HelpStatisticsSummaryValueRequests />
        case 'statistics-summary-value-impressions':
            return <HelpStatisticsSummaryValueImpressions />
        case 'statistics-summary-value-bidPrice':
            return <HelpStatisticsSummaryValueBidPrice />
        case 'statistics-summary-value-eCPM':
            return <HelpStatisticsSummaryValueECPM />
        case 'statistics-summary-value-bidRate':
            return <HelpStatisticsSummaryValueBidRate />
        case 'statistics-summary-value-winRate':
            return <HelpStatisticsSummaryValueWinRate />
        case 'statistics-summary-value-timeoutRate':
            return <HelpStatisticsSummaryValueTimeout />
        default:
            return ''
    }
}
