import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { Col, Empty, Row, Spin, Table, Tabs } from 'antd'
import { makeOnceCallable } from '../../utils/makeOnceCallable'
import { useLoadBidderCharts } from '../../utils/useLoadBidderCharts'
import { useLoadBiddersFunnel }                 from '../../utils/useLoadBidderFunnel'
import { useLoadBidderMetrics }                 from '../../utils/useLoadBidderMetrics'
import { useLoadBidderResponseTimes }           from '../../utils/useLoadBidderResponseTimes'
import { useLoadBiddersList }                   from '../../utils/useLoadBiddersList'
import { useLoadBidderTable }                   from '../../utils/useLoadBidderTable'
import { useLoadIncrementalValueByBidder }      from '../../utils/useLoadIncrementalValueByBidder'
import { usePickDates }                         from '../../utils/usePickDates'
import { useApplyFilters }                      from '../../utils/useApplyFilters'
import { Error }                                from '../globalError'
import { HelpBidderAnalysisIncrementalRevenue } from '../help/bidder-analysis-incrementalRevenue'
import { HelpBidderAnalysisResponseTime }       from '../help/bidder-analysis-response-time'
import { BidderAnalysisHelp }                   from "../help/BidderAnalysisHelp";
import { Help }                                 from '../statHeader/Help'
import { StatHeader }                           from '../statHeader/StatHeader'
import { FiltersComponent }                     from '../filters/FiltersComponent'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi }                        from '../../api/statisticsApi'

import './biddersComponent.scss'
import { BidderCharts }                         from './BidderCharts'
import { BiddersGeneral }                       from './BiddersGeneral'
import { IncrementalValueByBidderChart }        from './charts/IncrementalValueByBidderChart'
import { ResponseTimeChart } from './charts/ResponseTimeChart'

const { TabPane } = Tabs

interface Props {
    token: string
    apiUrl: string
    onAccessError?: () => any
    profileCurrency: string
}

export const BiddersComponent: React.FC<Props> = (props) => {
    const api = new StatisticsApi(
        props.token,
        props.apiUrl,
        makeOnceCallable(props.onAccessError)
    )

    const [currency, setCurrency] = useState(props.profileCurrency)
    const { startDate, endDate, setDates } = usePickDates()
    const {
        sites,
        bidders,
        adUnits,
        devices,
        sizes,
        countries,
        browsers,
        setFiltersSelected
    } = useApplyFilters()

    const {
        bidderStringId,
        showStatScreen,
        setShowStatScreen,
        dataSource,
        colNames,
        biddersListIsLoading,
        bidderListErrorMessage,
        showBiddersListError,
        loadBiddersList,
        clearAllBiddersListFilters
    } = useLoadBiddersList(
        api,
        currency,
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        startDate,
        endDate
    )

    const {
        biddersMetrics,
        bidderMetricsAreLoading,
        bidderMetricsErrorMessage,
        showBidderMetricsError,
        bidderMetricsClearAllFilters,
        loadBidderMetricsByTime
    } = useLoadBidderMetrics(
        api,
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        browsers,
        startDate,
        endDate
    )

    const {
        incrementalRevenueData,
        incrementalRevenueIsLoading,
        incrementalRevenueErrorMessage,
        showIncrementalRevenueError,
        incrementalRevenueClearAllFilters,
        loadIncrementalRevenue
    } = useLoadIncrementalValueByBidder(
        api,
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        startDate,
        endDate
    )

    const {
        responseTimeChartData,
        responseTimesAreLoading,
        responseTimesErrorMessage,
        showResponseTimesError,
        responseTimesClearAllFilters,
        loadBidderResponseTimes
    } = useLoadBidderResponseTimes(
        api,
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        startDate,
        endDate
    )

    const {
        bidderChartsBean,
        bidderChartsAreLoading,
        clearAllBidderChartsData,
        loadBidderChartsData
    } = useLoadBidderCharts(
        api,
        bidderStringId as string,
        currency,
        sites,
        adUnits,
        sizes,
        devices,
        countries,
        startDate,
        endDate
    )

    const {
        bidderFunnelBean,
        bidderFunnelIsLoading,
        showBidderFunnelError,
        bidderFunnelErrorMessage,
        clearAllBidderFunnelData,
        loadBidderFunnelData
    } = useLoadBiddersFunnel(
        api,
        bidderStringId as string,
        currency,
        sites,
        adUnits,
        sizes,
        devices,
        countries,
        startDate,
        endDate
    )

    const {
        bidderTableIsLoading,
        setBidderTableIsLoading,
        groupByDimensions,
        setStatTab,
        loadBidderTableData,
        clearAllBidderTableData,
        showBidderTableError,
        oneBidderColNames,
        oneBidderDataSource
    } = useLoadBidderTable(
        api,
        bidderStringId as string,
        currency,
        sites,
        adUnits,
        sizes,
        devices,
        countries,
        startDate,
        endDate
    )

    const loadStatistics = () => {
        if (showStatScreen) {
            loadBidderChartsData()
            loadBidderFunnelData()
            loadBidderTableData()
        } else {
            switch (activeKey) {
                case 'biddersList':
                    loadBiddersList()
                    break
                case 'generalCharts':
                    loadBidderMetricsByTime()
                    break
                case 'incrementalRevenue':
                    loadIncrementalRevenue()
                    break
                case 'responseTimes':
                    loadBidderResponseTimes()
                    break
            }
        }
    }

    const [activeKey, setActiveKey] = useState('biddersList')

    const handleClearAll = () => {
        if (showStatScreen) {
            clearAllBidderChartsData()
            clearAllBidderFunnelData()
            clearAllBidderTableData()
        } else {
            switch (activeKey) {
                case 'biddersList':
                    clearAllBiddersListFilters()
                    break
                case 'generalCharts':
                    bidderMetricsClearAllFilters()
                    break
                case 'incrementalRevenue':
                    incrementalRevenueClearAllFilters()
                    break
                case 'responseTimes':
                    responseTimesClearAllFilters(startDate, endDate)
                    break
                default:
                    break
            }
        }
    }

    const incrRevIsNotEmpty =
        incrementalRevenueData && !!incrementalRevenueData.usdValues.length

    const bidderResponseTimesIsNotEmpty =
        responseTimeChartData && !!responseTimeChartData.yvalues?.length

    useEffect(() => {
        loadStatistics()
    }, [
        showStatScreen,
        activeKey,
        startDate,
        endDate,
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        browsers,
        currency
    ])

    useEffect(() => {
        if (bidderStringId) {
            loadBidderTableData()
        }
    }, [groupByDimensions])

    return (
        <div className='bidders-page'>
            <Error
                showError={
                    showBiddersListError ||
                    showBidderMetricsError ||
                    showIncrementalRevenueError ||
                    showBidderTableError ||
                    showBidderFunnelError
                }
                message={
                    bidderMetricsErrorMessage ||
                    bidderListErrorMessage ||
                    incrementalRevenueErrorMessage ||
                    responseTimesErrorMessage ||
                    bidderFunnelErrorMessage
                }
                closable
                isAuthorised
            />
            <Row className='bidders-page__row'>
                <Col
                    className='bidders-page__content'
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    lg={{ span: 18, order: 1 }}
                    xl={{ span: 19, order: 1 }}
                    xxl={{ span: 20, order: 1 }}
                >
                    <div className='bidders-page__header'>
                        <StatHeader
                            startDate={startDate}
                            endDate={endDate}
                            setDates={setDates}
                            currency={currency}
                            setCurrency={setCurrency}
                            displayBackBtn={showStatScreen}
                            onBackBtnClick={() => {
                                setShowStatScreen(false)
                            }}
                            helpContent={BidderAnalysisHelp}
                        />
                    </div>
                    {!showStatScreen ? (
                        <Tabs
                            className='bidders-page-tabs'
                            activeKey={activeKey}
                            onChange={setActiveKey}
                        >
                            <TabPane tab='Bidders List' key='biddersList'>
                                <div className='bidders-page__body'>
                                    <Spin
                                        spinning={
                                            biddersListIsLoading &&
                                            !showBiddersListError
                                        }
                                    >
                                        <Table
                                            dataSource={dataSource}
                                            columns={colNames}
                                            pagination={{
                                                showSizeChanger: false,
                                                pageSize: 12,
                                                position: ['bottomRight']
                                            }}
                                            size='middle'
                                            scroll={{ x: 'max-content' }}
                                        />
                                    </Spin>
                                </div>
                            </TabPane>

                            <TabPane tab='General Charts' key='generalCharts'>
                                <BiddersGeneral
                                    biddersMetrics={biddersMetrics}
                                    isLoading={bidderMetricsAreLoading}
                                    showError={showBidderMetricsError}
                                    currency={currency}
                                />
                            </TabPane>

                            <TabPane
                                tab='Incremental Revenue Chart'
                                key='incrementalRevenue'
                            >
                                <div className='bidders-page__body'>
                                    <div className='bidders-page__body'>
                                        <Title
                                            level={5}
                                            className='bidders-page__title'
                                        >
                                            Incremental Revenue by Bidder
                                        </Title>
                                        <Help
                                            content={
                                                HelpBidderAnalysisIncrementalRevenue
                                            }
                                        />
                                    </div>
                                    <Spin
                                        spinning={
                                            incrementalRevenueIsLoading &&
                                            !showIncrementalRevenueError
                                        }
                                    >
                                        <div
                                            className={`bidders-page__chart${
                                                incrRevIsNotEmpty
                                                    ? ''
                                                    : '-empty'
                                            }`}
                                        >
                                            {!incrRevIsNotEmpty ? (
                                                <Empty
                                                    image={
                                                        Empty.PRESENTED_IMAGE_SIMPLE
                                                    }
                                                />
                                            ) : (
                                                <IncrementalValueByBidderChart
                                                    currency={currency}
                                                    statistics={
                                                        incrementalRevenueData
                                                    }
                                                />
                                            )}
                                        </div>
                                    </Spin>
                                </div>
                            </TabPane>

                            <TabPane
                                tab='Bidder Response Time'
                                key='responseTimes'
                            >
                                <div className='bidders-page__body'>
                                    <div className='bidders-general__chart-header'>
                                        <Title
                                            level={5}
                                            className='bidders-page__title'
                                        >
                                            Bidder Response Time
                                        </Title>
                                        <Help
                                            content={
                                                HelpBidderAnalysisResponseTime
                                            }
                                        />
                                    </div>
                                    <Spin
                                        spinning={
                                            responseTimesAreLoading &&
                                            !showResponseTimesError
                                        }
                                    >
                                        <div
                                            className={`bidders-page__chart${
                                                bidderResponseTimesIsNotEmpty
                                                    ? ''
                                                    : '-empty'
                                            }`}
                                        >
                                            {!bidderResponseTimesIsNotEmpty ? (
                                                <Empty
                                                    image={
                                                        Empty.PRESENTED_IMAGE_SIMPLE
                                                    }
                                                />
                                            ) : (
                                                <ResponseTimeChart
                                                    xyChartData={
                                                        responseTimeChartData
                                                    }
                                                />
                                            )}
                                        </div>
                                    </Spin>
                                </div>
                            </TabPane>
                        </Tabs>
                    ) : (
                        <BidderCharts
                            bidderStringId={bidderStringId as string}
                            currency={currency}
                            bidderFunnelIsLoading={bidderFunnelIsLoading}
                            chartIsLoading={bidderChartsAreLoading}
                            bidderChartsBean={bidderChartsBean}
                            bidderFunnelBean={bidderFunnelBean}
                            onChange={setStatTab}
                            onTabClick={() => setBidderTableIsLoading(true)}
                            tableIsLoading={bidderTableIsLoading}
                            dataSource={oneBidderDataSource}
                            colNames={oneBidderColNames}
                        />
                    )}
                </Col>

                <Col
                    xs={{ span: 24, order: 1 }}
                    sm={{ span: 24, order: 1 }}
                    lg={{ span: 6, order: 2 }}
                    xl={{ span: 5, order: 2 }}
                    xxl={{ span: 4, order: 2 }}
                >
                    <FiltersComponent
                        onFiltersSelect={setFiltersSelected}
                        onReload={loadStatistics}
                        onClearAll={handleClearAll}
                        bidderSelected={showStatScreen && bidderStringId}
                        showBrowsers={location.pathname.includes('general')}
                        api={api}
                    />
                </Col>
            </Row>
        </div>
    )
}
