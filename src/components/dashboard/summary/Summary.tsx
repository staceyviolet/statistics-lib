import * as React from 'react'
import { Radio, Tooltip } from 'antd'
// eslint-disable-next-line no-unused-vars
import { DashboardBean } from '../../../api/api'
import { formatBigNumbers, moneyFormat } from '../../../utils/format'
import { SummaryRadioButton } from './SummaryRadioButton'

import './summary.scss'

interface Props {
    stat: DashboardBean | null
    refreshDashboard: () => void
    onClick: React.MouseEventHandler<HTMLElement>
    biddersFilterApplied: boolean
    partnerInstallation?: boolean
    metricSelected: string
    isLoading: boolean
    currency: string
}

export const Summary: React.FC<Props> = ({
    biddersFilterApplied,
    isLoading,
    metricSelected,
    onClick,
    partnerInstallation,
    refreshDashboard,
    stat,
    currency
}) => {
    const bidRequests = stat?.statistics.bidRequests.summary.value
    const requests = stat?.statistics.requests.summary.value
    const impressions = stat?.statistics.impressions.summary.value

    const usdRevenue = stat?.statistics.usdRevenue.summary.value
    const eurRevenue = stat?.statistics.eurRevenue.summary.value
    const usdBidPrice = stat?.statistics.usdBidPrice.summary.value
    const eurBidPrice = stat?.statistics.eurBidPrice.summary.value
    const usdECPM = stat?.statistics.usdECPM.summary.value
    const eurECPM = stat?.statistics.eurECPM.summary.value

    const bidRate = stat?.statistics.bidRate.summary.value
    const winRate = stat?.statistics.winRate.summary.value
    const timeoutRate = stat?.statistics.timeoutRate.summary.value

    return (
        <Radio.Group
            className='summary'
            onChange={refreshDashboard}
            value={
                biddersFilterApplied && metricSelected === 'requests'
                    ? 'bidRequests'
                    : metricSelected
            }
        >
            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={
                    currency === 'EUR'
                        ? moneyFormat(eurRevenue as number, 'EUR')
                        : moneyFormat(usdRevenue as number, 'USD')
                }
                value='revenue'
                classNameSuffix='revenue'
                title={partnerInstallation ? 'Gross Revenue' : 'Revenue'}
                tooltipOverlay='statistics-summary-value-revenue'
            />

            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={formatBigNumbers(bidRequests as number)}
                value='bidRequests'
                classNameSuffix='bid-requests'
                biddersFilterApplied
                title='Bid Requests'
                tooltipOverlay='statistics-summary-value-bidRequests'
            />

            {biddersFilterApplied ? (
                <Tooltip
                    placement='topRight'
                    title='Requests metric is not available when filtering by BiddersPage'
                >
                    <SummaryRadioButton
                        statistics='-'
                        value='requests'
                        classNameSuffix='requests'
                        title='Requests'
                        disabled
                    />
                </Tooltip>
            ) : (
                <SummaryRadioButton
                    onClick={onClick}
                    isLoading={isLoading}
                    statistics={formatBigNumbers(requests as number)}
                    value='requests'
                    classNameSuffix='requests'
                    title='Requests'
                    tooltipOverlay='statistics-summary-value-requests'
                />
            )}

            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={formatBigNumbers(impressions as number)}
                value='impressions'
                classNameSuffix='impressions'
                title='Impressions'
                tooltipOverlay='statistics-summary-value-impressions'
            />

            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={
                    currency === 'EUR'
                        ? moneyFormat(eurBidPrice as number, 'EUR')
                        : moneyFormat(usdBidPrice as number, 'USD')
                }
                value='bidPrice'
                classNameSuffix='bid_price'
                title='Bid Price'
                tooltipOverlay='statistics-summary-value-bidPrice'
            />

            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={
                    currency === 'EUR'
                        ? moneyFormat(eurECPM as number, 'EUR')
                        : moneyFormat(usdECPM as number, 'USD')
                }
                value='eCPM'
                classNameSuffix='eCPM'
                title='eCPM'
                tooltipOverlay='statistics-summary-value-eCPM'
            />

            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={
                    bidRate ? (bidRate * 100).toPrecision(3) + '%' : 0 + '%'
                }
                value='bidRate'
                classNameSuffix='bid_rate'
                title='Bid Rate'
                tooltipOverlay='statistics-summary-value-bidRate'
            />

            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={
                    winRate ? (winRate * 100).toPrecision(3) + '%' : 0 + '%'
                }
                value='winRate'
                classNameSuffix='win_rate'
                title='Win Rate'
                tooltipOverlay='statistics-summary-value-winRate'
            />

            <SummaryRadioButton
                onClick={onClick}
                isLoading={isLoading}
                statistics={
                    timeoutRate
                        ? (timeoutRate * 100).toPrecision(3) + '%'
                        : 0 + '%'
                }
                value='timeoutRate'
                classNameSuffix='timeout_rate'
                title='Timeout Rate'
                tooltipOverlay='statistics-summary-value-timeoutRate'
            />
        </Radio.Group>
    )
}
