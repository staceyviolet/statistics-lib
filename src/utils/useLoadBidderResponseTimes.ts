import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { XYChartData } from '../api/api'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../api/statisticsApi'

export const useLoadBidderResponseTimes = (
    api: StatisticsApi,
    sites: any[],
    bidders: any[],
    adUnits: any[],
    sizes: any[],
    devices: any[],
    countries: any[],
    startDate: any,
    endDate: any
) => {
    const [responseTimeChartData, setResponseTimeChartData] = useState<
        XYChartData
    >({})
    const [responseTimesAreLoading, setResponseTimesAreLoading] = useState(
        false
    )
    const [showResponseTimesError, setShowBidderMetricsError] = useState(false)

    const responseTimesErrorMessage = `Bidder charts error.
        Please refresh the page or try again later.
        If the problem persists, please contact Customer Support.`

    const loadBidderResponseTimes = () => {
        setResponseTimesAreLoading(true)
        const bidderMetricsQuery = {
            startDate: startDate,
            endDate: endDate,
            sites: sites,
            sizes: sizes,
            bidders: bidders,
            adUnits: adUnits,
            devices: devices,
            countries: countries
        }
        api.loadResponseTimesData(bidderMetricsQuery).then(
            (r) => {
                setResponseTimeChartData(r)
                setResponseTimesAreLoading(false)
                setShowBidderMetricsError(false)
            },
            (err) => {
                console.log(err)
                setShowBidderMetricsError(true)
            }
        )
    }

    const responseTimesClearAllFilters = (startDate: any, endDate: any) => {
        setResponseTimesAreLoading(true)
        const bidderMetricsQuery = {
            startDate: startDate,
            endDate: endDate,
            sites: [],
            sizes: [],
            bidders: [],
            adUnits: [],
            devices: [],
            countries: []
        }
        api.loadResponseTimesData(bidderMetricsQuery).then(
            (r) => {
                setResponseTimeChartData(r)
                setResponseTimesAreLoading(false)
                setShowBidderMetricsError(false)
            },
            (err) => {
                console.log(err)
                setShowBidderMetricsError(true)
            }
        )
    }
    return {
        responseTimeChartData,
        responseTimesAreLoading,
        responseTimesErrorMessage,
        showResponseTimesError,
        responseTimesClearAllFilters,
        loadBidderResponseTimes
    }
}
