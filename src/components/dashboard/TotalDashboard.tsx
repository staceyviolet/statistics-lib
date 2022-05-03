import * as React from 'react'
import { useEffect, useState } from 'react'
import { useApplyFilters } from '../../utils/useApplyFilters'
import { usePickDates } from '../../utils/usePickDates'
import { Col, Row } from 'antd'
import { Error } from '../globalError'
import { OverviewChartsAll } from './overview/OverviewChartsAll'
import { DashboardComponent } from './DashboardComponent'
import { makeOnceCallable } from '../../utils/makeOnceCallable'
import { StatisticsApi } from '../../api/statisticsApi'
import { FiltersComponent } from '../filters/FiltersComponent'
// eslint-disable-next-line no-unused-vars
import { DashboardBean, OverviewChartsData } from '../../api/api'

import './totalDashboard.scss'

interface Props {
    token: string
    apiUrl: string
    onAccessError?: () => any
    profileCurrency: string
}

export const TotalDashboard: React.FC<Props> = (props) => {
    const api = new StatisticsApi(
        props.token,
        props.apiUrl,
        makeOnceCallable(props.onAccessError)
    )

    const [dashboardBean, setDashboardBean] = useState<null | DashboardBean>(
        null
    )
    const [
        overviewChartsBean,
        setOverviewChartsBean
    ] = useState<null | OverviewChartsData>(null)
    const [currency, setCurrency] = useState(props.profileCurrency)
    const [visibleMetric, setVisibleMetric] = useState('revenue')

    const [isLoading, setIsLoading] = useState(false)
    const [overviewIsLoading, setOverviewIsLoading] = useState(false)
    const [showError, setShowError] = useState(false)

    const [errorMessage, setErrorMessage] = useState(`Dashboard build error.
    Please refresh the page or try again later.
    If the problem persists, please contact Customer Support.`)

    const { startDate, endDate, setDates } = usePickDates()
    const {
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        setFiltersSelected
    } = useApplyFilters()

    const handleClick = (e: any) => {
        setIsLoading(true)
        setVisibleMetric(e.target.value)
    }

    const handleReload = () => {
        refreshDashboard()
        refreshOverviewCharts()
    }

    const query = {
        startDate: startDate,
        endDate: endDate,
        sites: sites,
        bidders: bidders,
        adUnits: adUnits,
        sizes: sizes,
        devices: devices,
        countries: countries
    }

    const queryNoFilters = {
        startDate: startDate,
        endDate: endDate,
        sites: [],
        bidders: [],
        adUnits: [],
        sizes: [],
        devices: [],
        countries: []
    }

    const refreshDashboard = () => {
        setIsLoading(true)

        api.loadDashboard(query).then(
            (resp) => {
                setDashboardBean(resp)
                setIsLoading(false)
                setShowError(false)
            },
            (err) => {
                err && setShowError(true)
                setIsLoading(false)
            }
        )
    }

    const refreshOverviewCharts = () => {
        setOverviewIsLoading(true)

        api.loadOverviewCharts(query).then(
            (resp) => {
                setOverviewChartsBean(resp)
                setOverviewIsLoading(false)
                setShowError(false)
            },
            (err) => {
                err && setShowError(true)
                setErrorMessage(`Charts build error.
                    Please refresh the page or try again later.
                    If the problem persists, please contact Customer Support.`)
            }
        )
    }

    const clearAll = () => {
        setIsLoading(true)

        api.loadDashboard(queryNoFilters).then(
            (resp) => {
                setDashboardBean(resp)
                setIsLoading(false)
            },
            (err) => {
                err && setShowError(true)
                setIsLoading(false)
            }
        )

        api.loadOverviewCharts(queryNoFilters).then((resp) => {
            setOverviewChartsBean(resp)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        refreshDashboard()
        refreshOverviewCharts()
    }, [startDate, endDate, sites, bidders, adUnits, sizes, devices, countries])

    return (
        <div className='dashboard-page'>
            <Error
                showError={showError}
                message={errorMessage}
                closable
                isAuthorised
            />

            <Row>
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    lg={{ span: 18, order: 1 }}
                    xl={{ span: 19, order: 1 }}
                    xxl={{ span: 20, order: 1 }}
                >
                    <div className='dashboard-page__chart-row'>
                        <DashboardComponent
                            dashboardBean={dashboardBean}
                            refreshDashboard={refreshDashboard}
                            onClick={handleClick}
                            biddersFilterApplied={bidders.length > 0}
                            isLoading={isLoading}
                            showError={showError}
                            visibleMetric={visibleMetric}
                            startDate={startDate}
                            endDate={endDate}
                            setDates={setDates}
                            currency={currency}
                            setCurrency={setCurrency}
                        />
                    </div>

                    <div className='dashboard-page__chart-row_no-mb'>
                        <OverviewChartsAll
                            biddersFilterApplied={bidders.length > 0}
                            chartBean={overviewChartsBean}
                            isLoading={overviewIsLoading}
                            showError={showError}
                            currency={currency}
                        />
                    </div>
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
                        onReload={handleReload}
                        onClearAll={clearAll}
                        api={api}
                    />
                </Col>
            </Row>
        </div>
    )
}
