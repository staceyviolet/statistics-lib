import React, { useEffect, useState } from 'react'
import { Col, Row, Spin, Table } from 'antd'
import { SiteApi } from '../../api/siteApi'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../../api/statisticsApi'
import { makeOnceCallable } from '../../utils/makeOnceCallable'
import { usePickDates } from '../../utils/usePickDates'
import { useApplyFilters } from '../../utils/useApplyFilters'
import { useMapReportResponse } from '../../utils/useMapReportResponse'
import { useStatTabChange } from '../../utils/useStatTabChange'
import { Error } from '../globalError'
// eslint-disable-next-line no-unused-vars
import { BasicReportQuery, DashboardBean } from '../../api/api'
import { SiteAnalysisHelp } from '../help/SiteAnalysisHelp'
import { StatHeader } from '../statHeader/StatHeader'
import { FiltersComponent } from '../filters/FiltersComponent'

import './sitesComponent.scss'
import { SiteCharts } from './SiteCharts'

const TimeGroupingEnum = BasicReportQuery.TimeGroupingEnum
const MetricsEnum = BasicReportQuery.MetricsEnum

interface Props {
    token: string
    apiUrl: string
    onAccessError?: () => any
    profileCurrency: string
}

export const SitesComponent: React.FC<Props> = (props) => {
    const api = new StatisticsApi(
        props.token,
        props.apiUrl,
        makeOnceCallable(props.onAccessError)
    )

    const siteApi = new SiteApi(
        props.token,
        props.apiUrl,
        makeOnceCallable(props.onAccessError)
    )

    const [currency, setCurrency] = useState(props.profileCurrency)
    const [isLoading, setIsLoading] = useState(false)

    const [showError, setShowError] = useState(false)
    const errorMessage = `Site analysis error.
        Please refresh the page or try again later.
        If the problem persists, please contact Customer Support.`

    const [siteChartsBean, setSiteChartsBean] = useState<null | DashboardBean>(
        null
    )
    const [siteName, setSiteName] = useState('')
    const [chartIsLoading, setChartIsLoading] = useState(false)
    const [tableIsLoading, setTableIsLoading] = useState(false)

    const {
        dataSource,
        colNames,
        siteId,
        showStatScreen,
        setShowStatScreen,
        mapReportResponse
    } = useMapReportResponse('sites')
    const { startDate, endDate, setDates } = usePickDates()
    const {
        sites,
        sizes,
        bidders,
        adUnits,
        devices,
        countries,
        setFiltersSelected
    } = useApplyFilters()

    const { groupByDimensions, setStatTab } = useStatTabChange()

    const filters = (clearAll: boolean, isOneSiteStat: boolean) => {
        return {
            sites: isOneSiteStat
                ? [
                      {
                          label: siteName,
                          value: (+siteId).toString()
                      }
                  ]
                : sites,
            bidders: clearAll ? [] : bidders,
            adUnits: clearAll ? [] : adUnits,
            devices: clearAll ? [] : devices,
            countries: clearAll ? [] : countries,
            sizes: clearAll ? [] : sizes
        }
    }

    const groupBy = (isOneSiteStat: boolean) => {
        if (isOneSiteStat) {
            return groupByDimensions
        } else {
            return {
                groupBySite: { value: true },
                groupByAdUnit: { value: false },
                groupByBidder: { value: false },
                groupByDevice: { value: false },
                groupByCountry: { value: false }
            }
        }
    }

    const getSite = (siteId: number) => {
        siteApi.getSite(siteId).then((resp) => setSiteName(resp.name.value))
    }

    const loadReport = (clearAll: boolean, isOneSiteStat: boolean) => {
        isOneSiteStat ? setTableIsLoading(true) : setIsLoading(true)
        clearAll && setIsLoading(true)
        api.loadAuctionsJsonReport({
            startDate: startDate,
            endDate: endDate,
            ...filters(clearAll, isOneSiteStat),
            metrics: [
                currency === 'EUR'
                    ? MetricsEnum.EurRevenue
                    : MetricsEnum.UsdRevenue,
                MetricsEnum.Bids,
                MetricsEnum.Wins,
                MetricsEnum.Impressions,
                currency === 'EUR'
                    ? MetricsEnum.EurBidPrice
                    : MetricsEnum.UsdBidPrice,
                MetricsEnum.BidRate,
                MetricsEnum.WinRate
            ],
            ...groupBy(isOneSiteStat),
            groupByUtmSource: { value: false },
            groupByUtmMedium: { value: false },
            groupByUtmCampaign: { value: false },
            groupByUtmTerm: { value: false },
            groupByUtmContent: { value: false },
            groupByHbSource: { value: false },
            timeGrouping: TimeGroupingEnum.Total
        }).then(
            (response) => {
                mapReportResponse(response, isOneSiteStat)
                setIsLoading(false)
                setTableIsLoading(false)
                setShowError(false)
            },
            (err) => {
                console.log(err)
                setShowError(true)
                setTableIsLoading(false)
                setIsLoading(false)
            }
        )
    }

    const loadSiteStat = (clearAll: boolean) => {
        setChartIsLoading(true)
        api.loadDashboard({
            startDate: startDate,
            endDate: endDate,
            sites: clearAll ? [] : sites,
            bidders: clearAll ? [] : bidders,
            adUnits: clearAll ? [] : adUnits,
            devices: clearAll ? [] : devices,
            countries: clearAll ? [] : countries,
            sizes: clearAll ? [] : sizes
        }).then(
            (resp) => {
                setSiteChartsBean(resp)
                setChartIsLoading(false)
            },
            (err) => {
                console.log(err)
                setShowError(true)
                setChartIsLoading(false)
            }
        )
    }

    const loadData = (clearAll: boolean, isOneSiteStat: boolean) => {
        if (isOneSiteStat) {
            loadSiteStat(clearAll)
            loadReport(clearAll, isOneSiteStat)
        } else {
            loadReport(clearAll, isOneSiteStat)
        }
    }
    const handleClearAll = (isOneSiteStat: boolean) => {
        loadData(true, isOneSiteStat)
    }

    useEffect(() => {
        console.log(showStatScreen)
        if (siteId) {
            getSite(+siteId)
        }
        loadData(false, showStatScreen)
    }, [
        showStatScreen,
        startDate,
        endDate,
        sites,
        sizes,
        bidders,
        adUnits,
        devices,
        countries,
        currency
    ])

    useEffect(() => {
        if (showStatScreen) {
            loadReport(false, true)
        }
    }, [groupByDimensions])

    return (
        <div className='sites-page'>
            <Error
                showError={showError}
                message={errorMessage}
                closable
                isAuthorised
            />
            <Row className='sites-page__row'>
                <Col
                    className='sites-page__content'
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    lg={{ span: 18, order: 1 }}
                    xl={{ span: 19, order: 1 }}
                    xxl={{ span: 20, order: 1 }}
                >
                    <div className='sites-page__header'>
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
                            helpContent={SiteAnalysisHelp}
                        />
                    </div>
                    {!showStatScreen ? (
                        <div className='sites-page__body'>
                            <Spin spinning={isLoading && !showError}>
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
                    ) : (
                        <SiteCharts
                            siteName={siteName}
                            chartIsLoading={chartIsLoading}
                            siteChartsBean={siteChartsBean}
                            onChange={setStatTab}
                            onTabClick={() => setTableIsLoading(true)}
                            tableIsLoading={tableIsLoading}
                            dataSource={dataSource}
                            colNames={colNames}
                            currency={currency}
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
                        siteSelected={showStatScreen ? siteName : undefined}
                        onReload={() => loadData(false, showStatScreen)}
                        onClearAll={() => handleClearAll(showStatScreen)}
                        api={api}
                    />
                </Col>
            </Row>
        </div>
    )
}
