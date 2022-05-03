import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { BasicReportQuery, StatFilters } from '../../../api/api'
import { StatisticsApi } from '../../../api/statisticsApi'
import { makeOnceCallable } from '../../../utils/makeOnceCallable'

import { useApplyFilters } from '../../../utils/useApplyFilters'
import { Col, Row, Spin, Table } from 'antd'
import { usePickDates } from '../../../utils/usePickDates'

import { useMapReportResponse } from '../../../utils/useMapReportResponse'
import { GeneralReportMetricsHelp } from '../../help/GeneralReportMetrics'
import { StatHeader } from '../../statHeader/StatHeader'
import { FiltersComponent } from '../../filters/FiltersComponent'

import { Error } from '../../globalError'
import { ReportRequestForm } from '../ReportRequestForm'

import '../reports.scss'

const TimeGroupingEnum = BasicReportQuery.TimeGroupingEnum
const MetricsEnum = BasicReportQuery.MetricsEnum

interface Props {
    token: string
    apiUrl: string
    onAccessError?: () => any
    profileCurrency: string
}

export const AuctionsReportScreen: React.FC<Props> = (props) => {
    const api = new StatisticsApi(
        props.token,
        props.apiUrl,
        makeOnceCallable(props.onAccessError)
    )
    const [currency, setCurrency] = useState(props.profileCurrency)

    const [statFilters, setStatFilters] = useState<null | StatFilters>(null)
    const [reportIsLoading, setReportIsLoading] = useState(false)
    const [reportIsDownloading, setReportIsDownloading] = useState(false)

    const [groupBySite, setGroupBySite] = useState(false)
    const [groupByBidder, setGroupByBidder] = useState(false)
    const [groupByAdUnit, setGroupByAdUnit] = useState(false)
    const [groupByDevice, setGroupByDevice] = useState(false)
    const [groupByCountry, setGroupByCountry] = useState(false)
    const [groupByHBSource, setGroupByHBSource] = useState(false)
    const [timeGrouping, setTimeGrouping] = useState(TimeGroupingEnum.Total)

    const [groupByUTMSource, setGroupByUTMSource] = useState(false)
    const [groupByUTMMedium, setGroupByUTMMedium] = useState(false)
    const [groupByUTMCampaign, setGroupByUTMCampaign] = useState(false)
    const [groupByUTMTerm, setGroupByUTMTerm] = useState(false)
    const [groupByUTMContent, setGroupByUTMContent] = useState(false)

    const { startDate, endDate, setDates } = usePickDates()
    const { dataSource, colNames, mapReportResponse } = useMapReportResponse('')

    const [showError, setShowError] = useState(false)
    const errorMessage = `Report build error.
    Please refresh the page or try again later.
    If the problem persists, please contact Customer Support.`

    const loadFilters = () => {
        api.getFilters().then(setStatFilters)
    }

    const [metrics, setMetrics] = useState([
        MetricsEnum.AdUnitRequests,
        MetricsEnum.Impressions,
        currency === 'EUR' ? MetricsEnum.EurRevenue : MetricsEnum.UsdRevenue,
        MetricsEnum.BidRate,
        MetricsEnum.WinRate
    ])

    const handleSetMetrics = (value: any, option: any) => {
        setMetrics(option.map((option: any) => option.value))
    }
    const {
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        setFiltersSelected
    } = useApplyFilters()

    const selectGroupBy = (values: string[]) => {
        setGroupBySite(values.includes('site'))
        setGroupByBidder(values.includes('bidder'))
        setGroupByAdUnit(values.includes('adUnit'))
        setGroupByDevice(values.includes('device'))
        setGroupByCountry(values.includes('country'))
        setGroupByHBSource(values.includes('hbSource'))
        setTimeGrouping(
            values.includes('hour')
                ? TimeGroupingEnum.Hourly
                : values.includes('day')
                ? TimeGroupingEnum.Daily
                : TimeGroupingEnum.Total
        )
    }

    const selectUtmGroupings = (values: string[]) => {
        setGroupByUTMSource(values.includes('source'))
        setGroupByUTMMedium(values.includes('medium'))
        setGroupByUTMCampaign(values.includes('campaign'))
        setGroupByUTMTerm(values.includes('term'))
        setGroupByUTMContent(values.includes('content'))
    }

    const query = useMemo(
        () => ({
            metrics: metrics,
            startDate: startDate,
            endDate: endDate,
            sites: sites,
            bidders: bidders,
            sizes: sizes,
            adUnits: adUnits,
            devices: devices,
            countries: countries,
            groupByAdUnit: { value: groupByAdUnit },
            groupBySite: { value: groupBySite },
            groupByBidder: { value: groupByBidder },
            groupByDevice: { value: groupByDevice },
            groupByCountry: { value: groupByCountry },
            groupByUtmSource: { value: groupByUTMSource },
            groupByUtmMedium: { value: groupByUTMMedium },
            groupByUtmCampaign: { value: groupByUTMCampaign },
            groupByUtmTerm: { value: groupByUTMTerm },
            groupByUtmContent: { value: groupByUTMContent },
            groupByHbSource: { value: groupByHBSource },
            timeGrouping: timeGrouping
        }),
        [
            metrics,
            startDate,
            endDate,
            sites,
            bidders,
            adUnits,
            sizes,
            devices,
            countries,
            groupByAdUnit,
            groupBySite,
            groupByBidder,
            groupByDevice,
            groupByCountry,
            groupByUTMSource,
            groupByUTMMedium,
            groupByUTMCampaign,
            groupByUTMTerm,
            groupByUTMContent,
            groupByHBSource,
            timeGrouping
        ]
    )

    const loadData = () => {
        setReportIsLoading(true)
        api.loadAuctionsJsonReport(query).then(
            (resp) => {
                setReportIsLoading(false)
                mapReportResponse(resp)
                setReportIsLoading(false)
                setShowError(false)
            },
            (err) => {
                console.log(err)
                setShowError(true)
            }
        )
    }

    const downloadData = () => {
        setReportIsDownloading(true)
        api.downloadBasicReport(query).then((r) =>
            setReportIsDownloading(false)
        )
    }

    const handleReload = () => {
        setReportIsLoading(true)
        loadData()
    }

    const handleClearAll = () => {
        setReportIsLoading(true)
        const queryNoFilters = {
            metrics: metrics,
            startDate: startDate,
            endDate: endDate,
            sites: [],
            bidders: [],
            adUnits: [],
            devices: [],
            countries: [],
            sizes: [],
            groupByAdUnit: { value: groupByAdUnit },
            groupBySite: { value: groupBySite },
            groupByBidder: { value: groupByBidder },
            groupByDevice: { value: groupByDevice },
            groupByCountry: { value: groupByCountry },
            groupByUtmSource: { value: groupByUTMSource },
            groupByUtmMedium: { value: groupByUTMMedium },
            groupByUtmCampaign: { value: groupByUTMCampaign },
            groupByUtmTerm: { value: groupByUTMTerm },
            groupByUtmContent: { value: groupByUTMContent },
            groupByHbSource: { value: groupByHBSource },
            timeGrouping: timeGrouping
        }
        api.loadAuctionsJsonReport(queryNoFilters).then(
            (response) => {
                mapReportResponse(response)
                setReportIsLoading(false)
                setShowError(false)
            },
            (err) => {
                console.log(err)
                setShowError(true)
            }
        )
    }

    useEffect(loadFilters, [])
    useEffect(loadData, [
        startDate,
        endDate,
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries
    ])

    return (
        <div className='reports'>
            <Error showError={showError} message={errorMessage} closable />
            <Row style={{ height: '100%' }}>
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    lg={{ span: 18, order: 1 }}
                    xl={{ span: 19, order: 1 }}
                    xxl={{ span: 20, order: 1 }}
                    style={{ height: '100%' }}
                >
                    <div className='reports__content'>
                        <StatHeader
                            startDate={startDate}
                            endDate={endDate}
                            setDates={setDates}
                            helpContent={GeneralReportMetricsHelp}
                            currency={currency}
                            setCurrency={setCurrency}
                        />

                        <ReportRequestForm
                            selectGroupBy={selectGroupBy}
                            selectUtmGroupings={selectUtmGroupings}
                            metrics={metrics}
                            handleSetMetrics={handleSetMetrics}
                            statFilters={statFilters}
                            reportIsLoading={reportIsLoading}
                            reportIsDownloading={reportIsDownloading}
                            showError={showError}
                            onLoadReportClick={loadData}
                            onDownloadReportClick={downloadData}
                            setReportIsLoading={setReportIsLoading}
                            profileCurrency={currency}
                        />

                        <Spin spinning={reportIsLoading && !showError}>
                            <Table
                                dataSource={dataSource}
                                columns={colNames}
                                pagination={{
                                    showSizeChanger: false,
                                    pageSize: 50,
                                    position: ['bottomRight']
                                }}
                                size='middle'
                                scroll={{ x: 'max-hasContent' }}
                            />
                        </Spin>
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
                        api={api}
                        onFiltersSelect={setFiltersSelected}
                        onReload={handleReload}
                        onClearAll={handleClearAll}
                    />
                </Col>
            </Row>
        </div>
    )
}
