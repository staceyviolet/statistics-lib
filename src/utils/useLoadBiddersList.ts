import { useState } from 'react'
import { BasicReportQuery } from '../api/api'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../api/statisticsApi'
import { useMapReportResponse } from './useMapReportResponse'

const TimeGroupingEnum = BasicReportQuery.TimeGroupingEnum
const MetricsEnum = BasicReportQuery.MetricsEnum

export const useLoadBiddersList = (
    api: StatisticsApi,
    currency: string,
    sites: any[],
    bidders: any[],
    adUnits: any[],
    sizes: any[],
    devices: any[],
    countries: any[],
    startDate: any,
    endDate: any
) => {
    const [biddersListIsLoading, setBiddersListIsLoading] = useState(false)

    const [showBiddersListError, setShowBiddersListError] = useState(false)
    const bidderListErrorMessage = `Bidder analysis error.
        Please refresh the page or try again later.
        If the problem persists, please contact Customer Support.`

    const {
        dataSource,
        colNames,
        mapReportResponse,
        bidderStringId,
        showStatScreen,
        setShowStatScreen
    } = useMapReportResponse('bidders')

    const getMetrics = (currency: string) => {
        if (currency === 'EUR') {
            return [
                MetricsEnum.EurRevenue,
                MetricsEnum.BidRequests,
                MetricsEnum.EurBidPrice,
                MetricsEnum.BidRate,
                MetricsEnum.WinRate,
                MetricsEnum.TimeoutRate
            ]
        } else {
            return [
                MetricsEnum.UsdRevenue,
                MetricsEnum.BidRequests,
                MetricsEnum.UsdBidPrice,
                MetricsEnum.BidRate,
                MetricsEnum.WinRate,
                MetricsEnum.TimeoutRate
            ]
        }
    }

    const loadBiddersList = () => {
        setBiddersListIsLoading(true)
        api.loadAuctionsJsonReport({
            metrics: getMetrics(currency),
            startDate: startDate,
            endDate: endDate,
            sites: sites,
            sizes: sizes,
            bidders: bidders,
            adUnits: adUnits,
            devices: devices,
            countries: countries,
            groupByAdUnit: { value: false },
            groupBySite: { value: false },
            groupByBidder: { value: true },
            groupByDevice: { value: false },
            groupByCountry: { value: false },
            groupByUtmSource: { value: false },
            groupByUtmMedium: { value: false },
            groupByUtmCampaign: { value: false },
            groupByUtmTerm: { value: false },
            groupByUtmContent: { value: false },
            groupByHbSource: { value: false },
            timeGrouping: TimeGroupingEnum.Total
        }).then(
            (response) => {
                mapReportResponse(response)
                setBiddersListIsLoading(false)
                setShowBiddersListError(false)
            },
            (err) => {
                console.log(err)
                setShowBiddersListError(true)
                setBiddersListIsLoading(false)
            }
        )
    }

    const clearAllBiddersListFilters = () => {
        setBiddersListIsLoading(true)
        api.loadAuctionsJsonReport({
            metrics: getMetrics(currency),
            startDate: startDate,
            endDate: endDate,
            sites: [],
            sizes: [],
            bidders: [],
            adUnits: [],
            devices: [],
            countries: [],
            groupByAdUnit: { value: false },
            groupBySite: { value: false },
            groupByBidder: { value: true },
            groupByDevice: { value: false },
            groupByCountry: { value: false },
            groupByUtmSource: { value: false },
            groupByUtmMedium: { value: false },
            groupByUtmCampaign: { value: false },
            groupByUtmTerm: { value: false },
            groupByUtmContent: { value: false },
            groupByHbSource: { value: false },
            timeGrouping: TimeGroupingEnum.Total
        }).then(
            (response) => {
                mapReportResponse(response)
                setBiddersListIsLoading(false)
            },
            (err) => {
                console.log(err)
                setShowBiddersListError(true)
            }
        )
    }

    return {
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
    }
}
