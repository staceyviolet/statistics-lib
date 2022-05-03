import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime } from '../api/api'
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../api/statisticsApi'

export const useLoadBidderCharts = (
    api: StatisticsApi,
    bidderStringId: string,
    currency: string,
    sites: any[],
    adUnits: any[],
    sizes: any[],
    devices: any[],
    countries: any[],
    startDate: any,
    endDate: any
) => {
    const [
        bidderChartsBean,
        setBidderChartsBean
    ] = useState<null | BiddersMetricByTime>(null)
    const [bidderChartsAreLoading, setBidderChartsAreLoading] = useState(false)

    const [showBidderChartsError, setShowBidderChartsError] = useState(false)
    const bidderChartsErrorMessage = `Bidder charts error.
        Please refresh the page or try again later.
        If the problem persists, please contact Customer Support.`

    const bidderChartsQuery = {
        startDate: startDate,
        endDate: endDate,
        sites: sites,
        sizes: sizes,
        bidders: [bidderStringId],
        adUnits: adUnits,
        devices: devices,
        countries: countries
    }

    const bidderChartsEmptyQuery = {
        startDate: startDate,
        endDate: endDate,
        sites: [],
        sizes: [],
        bidders: [],
        adUnits: [],
        devices: [],
        countries: []
    }

    const loadBidderChartsData = () => {
        setBidderChartsAreLoading(true)
        api.loadBiddersData(bidderChartsQuery).then(
            (r) => {
                setBidderChartsBean(r)
                setBidderChartsAreLoading(false)
                setShowBidderChartsError(false)
            },
            (err) => {
                setShowBidderChartsError(true)
            }
        )
    }

    const clearAllBidderChartsData = () => {
        setBidderChartsAreLoading(true)
        api.loadBiddersData(bidderChartsEmptyQuery).then((r: any) => {
            setBidderChartsBean(r)
            setBidderChartsAreLoading(false)
        })
    }

    return {
        bidderChartsBean,
        bidderChartsAreLoading,
        showBidderChartsError,
        bidderChartsErrorMessage,
        loadBidderChartsData,
        clearAllBidderChartsData
    }
}
