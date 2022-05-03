import { useState } from 'react'
import { IncrementalRevenueChartData } from '../api/api'
import { StatisticsApi } from '../api/statisticsApi'

export const useLoadIncrementalValueByBidder = (
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
    const [incrementalRevenueData, setIncrementalRevenueData] = useState<
        IncrementalRevenueChartData
    >()
    const [
        incrementalRevenueIsLoading,
        setIncrementalRevenueIsLoading
    ] = useState(false)

    const [
        showIncrementalRevenueError,
        setShowIncrementalRevenueError
    ] = useState(false)
    const incrementalRevenueErrorMessage = `Bidder charts error.
        Please refresh the page or try again later.
        If the problem persists, please contact Customer Support.`

    const loadIncrementalRevenue = () => {
        setIncrementalRevenueIsLoading(true)
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
        api.loadIncrementalRevenueChart(bidderMetricsQuery).then(
            (r) => {
                setIncrementalRevenueData(r)
                setIncrementalRevenueIsLoading(false)
                setShowIncrementalRevenueError(false)
            },
            (err) => {
                console.log(err)
                setShowIncrementalRevenueError(true)
            }
        )
    }

    const incrementalRevenueClearAllFilters = () => {
        setIncrementalRevenueIsLoading(true)
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
        api.loadIncrementalRevenueChart(bidderMetricsQuery).then(
            (r) => {
                setIncrementalRevenueData(r)
                setIncrementalRevenueIsLoading(false)
                setShowIncrementalRevenueError(false)
            },
            (err) => {
                console.log(err)
                setShowIncrementalRevenueError(true)
            }
        )
    }
    return {
        incrementalRevenueData,
        incrementalRevenueIsLoading,
        incrementalRevenueErrorMessage,
        showIncrementalRevenueError,
        incrementalRevenueClearAllFilters,
        loadIncrementalRevenue
    }
}
