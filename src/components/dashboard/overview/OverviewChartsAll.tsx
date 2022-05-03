import * as React from 'react'
import { Col, Row, Spin } from 'antd'
import { OverviewChartsData } from '../../../api/api'
import { OverviewChart } from './OverviewChart'

import './overview.scss'

interface Props {
    isLoading: boolean
    showError: boolean
    biddersFilterApplied: boolean
    chartBean: null | OverviewChartsData
    currency: string
}

export const OverviewChartsAll: React.FC<Props> = ({
    isLoading,
    showError,
    chartBean,
    biddersFilterApplied,
    currency
}) => {
    return (
        <Row className='overview' gutter={[14, 16]}>
            <Col className='overview__col' xs={24} sm={24} md={12} xl={8}>
                <div className='overview__chart'>
                    <Spin tip='Loading...' spinning={isLoading && !showError}>
                        <OverviewChart
                            isEmpty={
                                !(
                                    chartBean &&
                                    chartBean.revenueByBidders.length > 0
                                )
                            }
                            groupBy='Bidders'
                            statistics={chartBean?.revenueByBidders}
                            biddersFilterApplied={biddersFilterApplied}
                            currency={currency}
                        />
                    </Spin>
                </div>
            </Col>
            <Col className='overview__col' xs={24} sm={24} md={12} xl={8}>
                <div className='overview__chart'>
                    <Spin tip='Loading...' spinning={isLoading && !showError}>
                        <OverviewChart
                            isEmpty={
                                !(
                                    chartBean &&
                                    chartBean.revenueByBidders.length > 0
                                )
                            }
                            groupBy='Sites'
                            statistics={chartBean?.revenueBySites}
                            biddersFilterApplied={biddersFilterApplied}
                            currency={currency}
                        />
                    </Spin>
                </div>
            </Col>
            <Col className='overview__col' xs={24} sm={24} md={12} xl={8}>
                <div className='overview__chart'>
                    <Spin tip='Loading...' spinning={isLoading && !showError}>
                        <OverviewChart
                            isEmpty={
                                !(
                                    chartBean &&
                                    chartBean.revenueByBidders.length > 0
                                )
                            }
                            groupBy='Ad Units'
                            statistics={chartBean?.revenueByAdUnits}
                            biddersFilterApplied={biddersFilterApplied}
                            currency={currency}
                        />
                    </Spin>
                </div>
            </Col>
            <Col className='overview__col' xs={24} sm={24} md={12} xl={8}>
                <div className='overview__chart'>
                    <Spin tip='Loading...' spinning={isLoading && !showError}>
                        <OverviewChart
                            isEmpty={
                                !(
                                    chartBean &&
                                    chartBean.revenueByBidders.length > 0
                                )
                            }
                            groupBy='Ad Sizes'
                            statistics={chartBean?.revenueByAdSizes}
                            biddersFilterApplied={biddersFilterApplied}
                            currency={currency}
                        />
                    </Spin>
                </div>
            </Col>
            <Col className='overview__col' xs={24} sm={24} md={12} xl={8}>
                <div className='overview__chart'>
                    <Spin tip='Loading...' spinning={isLoading && !showError}>
                        <OverviewChart
                            isEmpty={
                                !(
                                    chartBean &&
                                    chartBean.revenueByBidders.length > 0
                                )
                            }
                            groupBy='Devices'
                            statistics={chartBean?.revenueByDevices}
                            biddersFilterApplied={biddersFilterApplied}
                            currency={currency}
                        />
                    </Spin>
                </div>
            </Col>
            <Col className='overview__col' xs={24} sm={24} md={12} xl={8}>
                <div className='overview__chart'>
                    <Spin tip='Loading...' spinning={isLoading && !showError}>
                        <OverviewChart
                            isEmpty={
                                !(
                                    chartBean &&
                                    chartBean.revenueByBidders.length > 0
                                )
                            }
                            groupBy='Countries'
                            statistics={chartBean?.revenueByCountries}
                            biddersFilterApplied={biddersFilterApplied}
                            currency={currency}
                        />
                    </Spin>
                </div>
            </Col>
        </Row>
    )
}
