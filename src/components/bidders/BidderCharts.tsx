import * as React from 'react'
import { useEffect, useState } from 'react'
import { Empty, Spin, Table, Tabs } from 'antd'
import Title from 'antd/es/typography/Title'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime, FunnelChartData } from '../../api/api'
import { bidderTabPanes } from '../../utils/statTabPanes'
import { HelpBidderAnalysisChartBidderEfficiency } from '../help/bidder-analysis-chart-bidderEfficiency'
import { HelpBidderAnalysisChartBidderFunnel } from '../help/bidder-analysis-chart-bidderFunnel'
import { HelpBidderAnalysisChartBidderResponses } from '../help/bidder-analysis-chart-bidderResponses'
import { HelpBidderAnalysisChartCpmBreakdown } from '../help/bidder-analysis-chart-cpmBreakdown'
import { HelpBidderAnalysisChartRevenue } from '../help/bidder-analysis-chart-revenue'
import { HelpBidderAnalysisTableBreakdown } from '../help/bidder-analysis-table-breakdown'
import { Help } from '../statHeader/Help'
import { BidderResponsesChart } from './charts/BidderResponsesChart'
import { CpmBreakdownChart } from './charts/CPMBreakdownChart'
import { BidderEfficiencyChart } from './charts/BidderEfficiencyChart'
import { BidderFunnelChart } from './charts/BidderFunnelChart'
import { BidderRevenueChart } from './charts/BidderRevenueChart'

import './bidderCharts.scss'

const { TabPane } = Tabs

interface Props {
    bidderStringId: string
    bidderFunnelIsLoading: boolean
    chartIsLoading: boolean
    bidderChartsBean: null | BiddersMetricByTime
    bidderFunnelBean: null | FunnelChartData
    onChange: (e: any) => void
    onTabClick: () => void
    tableIsLoading: boolean
    dataSource: any[]
    colNames: any[]
    currency: string
}

export const BidderCharts: React.FC<Props> = ({
    bidderStringId,
    bidderFunnelIsLoading,
    chartIsLoading,
    bidderChartsBean,
    bidderFunnelBean,
    onChange,
    onTabClick,
    tableIsLoading,
    dataSource,
    colNames,
    currency
}) => {
    const chartIsNotEmpty =
        bidderChartsBean?.biddersData && !!bidderChartsBean.biddersData.length
    const funnelChartIsNotEmpty =
        bidderFunnelBean?.dataBeans && !!bidderFunnelBean.dataBeans.length

    const [currentTab, setCurrentTab] = useState('sites')

    useEffect(() => onChange(currentTab), [currentTab])

    return (
        <div className='bidder-charts'>
            <div className='bidder-charts__row-no-grid'>
                <div className='bidder-charts__col'>
                    <div className='bidder-charts__chart-header'>
                        <Title level={5} className='bidder-charts__chart-title'>
                            {bidderStringId} | revenue
                        </Title>
                        <Help content={HelpBidderAnalysisChartRevenue} />
                    </div>

                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`bidder-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <BidderRevenueChart
                                    statistics={bidderChartsBean}
                                    bidderName={bidderStringId}
                                    currency={currency}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
            </div>

            <div className='bidder-charts__row'>
                <div className='bidder-charts__col'>
                    <div className='bidder-charts__chart-header'>
                        <Title level={5} className='bidder-charts__chart-title'>
                            {bidderStringId} | bidder efficiency
                        </Title>
                        <Help
                            content={HelpBidderAnalysisChartBidderEfficiency}
                        />
                    </div>
                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`bidder-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <BidderEfficiencyChart
                                    statistics={bidderChartsBean}
                                    bidderName={bidderStringId}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
                <div className='bidder-charts__col'>
                    <div className='bidder-charts__chart-header'>
                        <Title level={5} className='bidder-charts__chart-title'>
                            {bidderStringId} | bidder responses
                        </Title>
                        <Help
                            content={HelpBidderAnalysisChartBidderResponses}
                        />
                    </div>
                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`bidder-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <BidderResponsesChart
                                    statistics={bidderChartsBean}
                                    bidderName={bidderStringId}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
            </div>

            <div className='bidder-charts__row'>
                <div className='bidder-charts__col'>
                    <div className='bidder-charts__chart-header'>
                        <Title level={5} className='bidder-charts__chart-title'>
                            {bidderStringId} | cpm breakdown
                        </Title>
                        <Help content={HelpBidderAnalysisChartCpmBreakdown} />
                    </div>
                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`bidder-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <CpmBreakdownChart
                                    statistics={bidderChartsBean}
                                    bidderName={bidderStringId}
                                    currency={currency}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
                <div className='bidder-charts__col'>
                    <div className='bidder-charts__chart-header'>
                        <Title level={5} className='bidder-charts__chart-title'>
                            {bidderStringId} | bidder funnel
                        </Title>
                        <Help content={HelpBidderAnalysisChartBidderFunnel} />
                    </div>
                    <Spin spinning={bidderFunnelIsLoading}>
                        <div
                            className={`bidder-charts__chart${
                                funnelChartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {funnelChartIsNotEmpty ? (
                                <BidderFunnelChart
                                    statistics={bidderFunnelBean}
                                    bidderName={bidderStringId}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
            </div>

            <div className='bidder-charts__row-no-grid_no-mb'>
                <div className='bidder-charts__col'>
                    <div className='bidder-charts__chart-header'>
                        <Title level={5} className='bidder-charts__chart-title'>
                            {bidderStringId} | breakdown{' '}
                        </Title>
                        <Help content={HelpBidderAnalysisTableBreakdown} />
                    </div>

                    <Tabs onChange={setCurrentTab} onTabClick={onTabClick}>
                        {bidderTabPanes.map((tab) => (
                            <TabPane
                                tab={
                                    <span>
                                        <tab.icon />
                                        {tab.name}
                                    </span>
                                }
                                key={tab.key}
                            >
                                <Table
                                    className='site-charts__table'
                                    dataSource={dataSource}
                                    columns={colNames}
                                    pagination={{
                                        showSizeChanger: false,
                                        pageSize: 12,
                                        position: ['bottomRight']
                                    }}
                                    size='middle'
                                    scroll={{ x: 'max-content' }}
                                    loading={tableIsLoading}
                                />
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
