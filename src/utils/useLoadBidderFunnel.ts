import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { FunnelChartData } from '../api/api'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../api/statisticsApi'

export const useLoadBiddersFunnel = (
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
        bidderFunnelBean,
        setBidderFunnelBean
    ] = useState<null | FunnelChartData>(null)
    const [bidderFunnelIsLoading, setBidderFunnelIsLoading] = useState(false)

    const [showBidderFunnelError, setShowBidderFunnelError] = useState(false)
    const bidderFunnelErrorMessage = `Bidder funnel chart error.
        Please refresh the page or try again later.
        If the problem persists, please contact Customer Support.`

    const bidderFunnelQuery = {
        startDate: startDate,
        endDate: endDate,
        sites: sites,
        sizes: sizes,
        bidders: [bidderStringId],
        adUnits: adUnits,
        devices: devices,
        countries: countries
    }

    const bidderFunnelEmptyQuery = {
        startDate: startDate,
        endDate: endDate,
        sites: [],
        sizes: [],
        bidders: [],
        adUnits: [],
        devices: [],
        countries: []
    }

    const loadBidderFunnelData = () => {
        setBidderFunnelIsLoading(true)
        api.loadBidderFunnelData(bidderFunnelQuery).then(
            (r: any) => {
                setBidderFunnelBean(r)
                setBidderFunnelIsLoading(false)
                setShowBidderFunnelError(false)
            },
            (err: any) => {
                console.log(err)
                setShowBidderFunnelError(true)
            }
        )
    }

    const clearAllBidderFunnelData = () => {
        setBidderFunnelIsLoading(true)
        api.loadBidderFunnelData(bidderFunnelEmptyQuery).then(
            (r: any) => {
                setBidderFunnelBean(r)
                setBidderFunnelIsLoading(false)
                setShowBidderFunnelError(false)
            },
            (err: any) => {
                console.log(err)
                setShowBidderFunnelError(true)
            }
        )
    }

    return {
        bidderFunnelBean,
        bidderFunnelIsLoading,
        showBidderFunnelError,
        bidderFunnelErrorMessage,
        loadBidderFunnelData,
        clearAllBidderFunnelData
    }
}
