import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime } from '../api/api'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../api/statisticsApi'

export const useLoadBidderMetrics = (
    api: StatisticsApi,
    sites: any[],
    bidders: any[],
    adUnits: any[],
    sizes: any[],
    devices: any[],
    countries: any[],
    browsers: any[],
    startDate: any,
    endDate: any
) => {
    const [
        biddersMetrics,
        setBiddersMetrics
    ] = useState<BiddersMetricByTime | null>(null)
    const [bidderMetricsAreLoading, setBidderMetricsAreLoading] = useState(
        false
    )

    const [showBidderMetricsError, setShowBidderMetricsError] = useState(false)
    const bidderMetricsErrorMessage = `Bidder charts error.
        Please refresh the page or try again later.
        If the problem persists, please contact Customer Support.`

    const loadBidderMetricsByTime = () => {
        setBidderMetricsAreLoading(true)
        const bidderMetricsQuery = {
            startDate: startDate,
            endDate: endDate,
            sites: sites,
            sizes: sizes,
            bidders: bidders,
            adUnits: adUnits,
            devices: devices,
            countries: countries,
            browsers: browsers
        }
        api.loadBiddersData(bidderMetricsQuery).then(
            (r) => {
                setBiddersMetrics(r)
                setBidderMetricsAreLoading(false)
                setShowBidderMetricsError(false)
            },
            (err) => {
                console.log(err)
                setShowBidderMetricsError(true)
            }
        )
    }

    const bidderMetricsClearAllFilters = () => {
        setBidderMetricsAreLoading(true)
        const bidderMetricsQuery = {
            startDate: startDate,
            endDate: endDate,
            sites: [],
            sizes: [],
            bidders: [],
            adUnits: [],
            devices: [],
            countries: [],
            browsers: []
        }
        api.loadBiddersData(bidderMetricsQuery).then(
            (r) => {
                setBiddersMetrics(r)
                setBidderMetricsAreLoading(false)
                setShowBidderMetricsError(false)
            },
            (err) => {
                console.log(err)
                setShowBidderMetricsError(true)
            }
        )
    }
    return {
        biddersMetrics,
        bidderMetricsAreLoading,
        bidderMetricsErrorMessage,
        showBidderMetricsError,
        bidderMetricsClearAllFilters,
        loadBidderMetricsByTime
    }
}
