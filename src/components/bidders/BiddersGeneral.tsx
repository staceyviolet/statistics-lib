import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { Empty, Select, Spin } from 'antd'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime } from '../../api/api'
import { HelpBidderAnalysisGeneralBidRate } from '../help/bidder-analysis-general-bidRate'
import { HelpBidderAnalysisGeneralRevenue } from '../help/bidder-analysis-general-revenue'
import { HelpBidderAnalysisGeneralTimeoutRate } from '../help/bidder-analysis-general-timeoutRate'
import { Help } from '../statHeader/Help'
import { BidRateByBidder } from './charts/BidRateByBidderChart'
import { RevenueByBidderChart } from './charts/RevenueByBidderChart'
import { RevenueRateByBidderChart } from './charts/RevenueRateByBidderChart'
import { TimeoutRateByBidder } from './charts/TimeoutRateByBidder'

import './biddersGeneral.scss'
import './bidderCharts.scss'

const { Option } = Select

interface Props {
    biddersMetrics: BiddersMetricByTime | null
    isLoading: boolean
    showError: boolean
    currency: string
}

export const BiddersGeneral: React.FC<Props> = ({
    biddersMetrics,
    isLoading,
    showError,
    currency
}) => {
    const chartIsNotEmpty =
        biddersMetrics?.biddersData && !!biddersMetrics.biddersData.length

    const [usdChartSelected, setUsdChartSelected] = useState(true)

    useEffect(() => {}, [currency, usdChartSelected])

    return (
        <div>
            <div className='bidders-general'>
                <div className='bidders-general__chart-header'>
                    <Select
                        className='bidders-general__select'
                        defaultValue='1'
                        onChange={() => setUsdChartSelected(!usdChartSelected)}
                        bordered={false}
                        showArrow
                    >
                        <Option value='1'>
                            Revenue by Bidder in{' '}
                            {currency === 'EUR' ? 'EUR' : 'USD'}{' '}
                        </Option>
                        <Option value='2'>Revenue by Bidder in %</Option>
                    </Select>
                    <Help content={HelpBidderAnalysisGeneralRevenue} />
                </div>

                <Spin tip='Loading...' spinning={isLoading && !showError}>
                    <div
                        className={`bidder-charts__chart${
                            chartIsNotEmpty ? '' : '-empty'
                        }`}
                    >
                        {!chartIsNotEmpty ? (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : usdChartSelected ? (
                            <RevenueByBidderChart
                                biddersMetrics={biddersMetrics}
                                currency={currency}
                            />
                        ) : (
                            <RevenueRateByBidderChart
                                biddersMetrics={biddersMetrics}
                            />
                        )}
                    </div>
                </Spin>
            </div>

            <div className='bidders-general'>
                <div className='bidders-general__chart-header'>
                    <Title level={5} className='bidders-general__title'>
                        Bid Rate by Bidder
                    </Title>
                    <Help content={HelpBidderAnalysisGeneralBidRate} />
                </div>
                <Spin tip='Loading...' spinning={isLoading && !showError}>
                    <div
                        className={`bidder-charts__chart${
                            chartIsNotEmpty ? '' : '-empty'
                        }`}
                    >
                        {!chartIsNotEmpty ? (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : (
                            <BidRateByBidder biddersMetrics={biddersMetrics} />
                        )}
                    </div>
                </Spin>
            </div>

            <div className='bidders-general'>
                <div className='bidders-general__chart-header'>
                    <Title level={5} className='bidders-general__title'>
                        Timeout Rate by Bidder
                    </Title>
                    <Help content={HelpBidderAnalysisGeneralTimeoutRate} />
                </div>
                <Spin tip='Loading...' spinning={isLoading && !showError}>
                    <div
                        className={`bidder-charts__chart${
                            chartIsNotEmpty ? '' : '-empty'
                        }`}
                    >
                        {!chartIsNotEmpty ? (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : (
                            <TimeoutRateByBidder
                                biddersMetrics={biddersMetrics}
                            />
                        )}
                    </div>
                </Spin>
            </div>
        </div>
    )
}
