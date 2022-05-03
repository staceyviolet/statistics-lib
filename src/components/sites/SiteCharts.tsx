import { useEffect, useState } from 'react'
import * as React from 'react'
import { Empty, Spin, Table, Tabs } from 'antd'
import Title from 'antd/es/typography/Title'
// eslint-disable-next-line no-unused-vars
import { DashboardBean } from '../../api/api'
import { statTabPanes } from '../../utils/statTabPanes'
import { HelpSiteAnalysisChartBidDensity } from '../help/site-analysis-chart-bidDensity'
import { HelpSiteAnalysisChartEcpm } from '../help/site-analysis-chart-ecpm'
import { HelpSiteAnalysisChartInventoryFilling } from '../help/site-analysis-chart-inventoryFilling'
import { HelpSiteAnalysisChartRevenue } from '../help/site-analysis-chart-revenue'
import { HelpSiteAnalysisTableBreakdown } from '../help/site-analysis-table-breakdown'
import { Help } from '../statHeader/Help'

import { SiteBasicChart } from './charts/SiteBasicChart'
import { InventoryFillingChart } from './charts/InventoryFillingChart'

import './siteCharts.scss'
import { SiteBidDensity } from './charts/SiteBidDensity'

const { TabPane } = Tabs

interface Props {
    siteName: string
    chartIsLoading: boolean
    siteChartsBean: null | DashboardBean
    onChange: (e: any) => void
    onTabClick: () => void
    tableIsLoading: boolean
    dataSource: Array<any>
    colNames: Array<any>
    currency: string
}

export const SiteCharts: React.FC<Props> = ({
    siteName,
    chartIsLoading,
    siteChartsBean,
    onChange,
    onTabClick,
    tableIsLoading,
    dataSource,
    colNames,
    currency
}) => {
    const chartIsNotEmpty =
        siteChartsBean?.statistics &&
        siteChartsBean.statistics.bidRequests.maxValue > 0

    const [currentTab, setCurrentTab] = useState('bidders')

    useEffect(() => onChange(currentTab), [currentTab, currency])

    return (
        <div className='site-charts'>
            <div className='site-charts__row-no-grid'>
                <div className='site-charts__col'>
                    <div className='site-charts__chart-header'>
                        <Title level={5} className='site-charts__chart-title'>
                            {siteName} | revenue
                        </Title>
                        <Help content={HelpSiteAnalysisChartRevenue} />
                    </div>

                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`site-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <SiteBasicChart
                                    name='revenue'
                                    statistics={
                                        currency === 'EUR'
                                            ? siteChartsBean?.statistics
                                                  .eurRevenue
                                            : siteChartsBean?.statistics
                                                  .usdRevenue
                                    }
                                    color='#fc8282'
                                    format={currency === 'EUR' ? '€' : '$'}
                                    axisX={siteChartsBean?.statistics.axisX}
                                    currency={currency}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
            </div>

            <div className='site-charts__row-no-grid'>
                <div className='site-charts__col'>
                    <div className='site-charts__chart-header'>
                        <Title level={5} className='site-charts__chart-title'>
                            {siteName} | inventory filling
                        </Title>
                        <Help content={HelpSiteAnalysisChartInventoryFilling} />
                    </div>

                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`site-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <InventoryFillingChart
                                    statistics={siteChartsBean as DashboardBean}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
            </div>

            <div className='site-charts__row'>
                <div className='site-charts__col'>
                    <div className='site-charts__chart-header'>
                        <Title level={5} className='site-charts__chart-title'>
                            {siteName} | eCPM
                        </Title>
                        <Help content={HelpSiteAnalysisChartEcpm} />
                    </div>

                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`site-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <SiteBasicChart
                                    name='eCPM'
                                    statistics={
                                        currency === 'EUR'
                                            ? siteChartsBean?.statistics.eurECPM
                                            : siteChartsBean?.statistics.usdECPM
                                    }
                                    color='#f7a35c'
                                    format={currency === 'EUR' ? '€' : '$'}
                                    axisX={siteChartsBean?.statistics.axisX}
                                    currency={currency}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>

                <div className='site-charts__col'>
                    <div className='site-charts__chart-header'>
                        <Title level={5} className='site-charts__chart-title'>
                            {siteName} | bid density
                        </Title>
                        <Help content={HelpSiteAnalysisChartBidDensity} />
                    </div>

                    <Spin spinning={chartIsLoading}>
                        <div
                            className={`site-charts__chart${
                                chartIsNotEmpty ? '' : '-empty'
                            }`}
                        >
                            {chartIsNotEmpty ? (
                                <SiteBidDensity
                                    name='bid density'
                                    statistics={
                                        (siteChartsBean as DashboardBean)
                                            .statistics
                                    }
                                    color='#8085e9'
                                    format=''
                                    axisX={siteChartsBean?.statistics.axisX}
                                />
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    </Spin>
                </div>
            </div>

            <div className='site-charts__row-no-grid_no-mb'>
                <div className='site-charts__col'>
                    <div className='site-charts__chart-header'>
                        <Title level={5} className='site-charts__chart-title'>
                            {siteName} | breakdown{' '}
                        </Title>
                        <Help content={HelpSiteAnalysisTableBreakdown} />
                    </div>

                    <Tabs onChange={setCurrentTab} onTabClick={onTabClick}>
                        {statTabPanes.map((tab) => (
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
