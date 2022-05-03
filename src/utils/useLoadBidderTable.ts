import { useState } from 'react'
import { BasicReportQuery } from '../api/api'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../api/statisticsApi'
import { useMapReportResponse } from './useMapReportResponse'
import { useStatTabChange } from './useStatTabChange'

const TimeGroupingEnum = BasicReportQuery.TimeGroupingEnum
const MetricsEnum = BasicReportQuery.MetricsEnum

export const useLoadBidderTable = (
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
    const [bidderTableIsLoading, setBidderTableIsLoading] = useState(false)
    const [showBidderTableError, setShowBidderTableError] = useState(false)

    const { groupByDimensions, setStatTab } = useStatTabChange()
    const { dataSource, colNames, mapReportResponse } = useMapReportResponse(
        'bidders'
    )

    const bidderStatMetrics = [
        currency === 'EUR' ? MetricsEnum.EurRevenue : MetricsEnum.UsdRevenue,
        MetricsEnum.BidRequests,
        currency === 'EUR' ? MetricsEnum.EurRevenue : MetricsEnum.UsdRevenue,
        MetricsEnum.BidRate,
        MetricsEnum.WinRate,
        MetricsEnum.TimeoutRate
    ]

    const loadBidderTableData = () => {
        setBidderTableIsLoading(true)
        api.loadAuctionsJsonReport({
            metrics: bidderStatMetrics,
            startDate: startDate,
            endDate: endDate,
            sites: sites,
            sizes: sizes,
            bidders: [bidderStringId],
            adUnits: adUnits,
            devices: devices,
            countries: countries,
            ...groupByDimensions,
            groupByBidder: { value: false },
            groupByUtmSource: { value: false },
            groupByUtmMedium: { value: false },
            groupByUtmCampaign: { value: false },
            groupByUtmTerm: { value: false },
            groupByUtmContent: { value: false },
            groupByHbSource: { value: false },
            timeGrouping: TimeGroupingEnum.Total
        }).then(
            (response: any) => {
                mapReportResponse(response, true)
                setBidderTableIsLoading(false)
                setShowBidderTableError(false)
            },
            (err: any) => {
                console.log(err)
                setShowBidderTableError(true)
            }
        )
    }

    const clearAllBidderTableData = () => {
        setBidderTableIsLoading(true)
        api.loadAuctionsJsonReport({
            metrics: bidderStatMetrics,
            startDate: startDate,
            endDate: endDate,
            sites: [],
            sizes: [],
            bidders: [],
            adUnits: [],
            devices: [],
            countries: [],
            ...groupByDimensions,
            groupByBidder: { value: false },
            groupByUtmSource: { value: false },
            groupByUtmMedium: { value: false },
            groupByUtmCampaign: { value: false },
            groupByUtmTerm: { value: false },
            groupByUtmContent: { value: false },
            groupByHbSource: { value: false },
            timeGrouping: TimeGroupingEnum.Total
        }).then((response: any) => {
            mapReportResponse(response)
            setBidderTableIsLoading(false)
        })
    }
    const oneBidderColNames = colNames
    const oneBidderDataSource = dataSource

    return {
        bidderTableIsLoading,
        showBidderTableError,
        oneBidderColNames,
        oneBidderDataSource,
        setBidderTableIsLoading,
        groupByDimensions,
        setStatTab,
        loadBidderTableData,
        clearAllBidderTableData
    }
}
