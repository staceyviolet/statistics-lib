import moment from 'moment'
import {
    // eslint-disable-next-line no-unused-vars
    StatFilters,
    // eslint-disable-next-line no-unused-vars
    DashboardQuery,
    // eslint-disable-next-line no-unused-vars
    DashboardBean,
    // eslint-disable-next-line no-unused-vars
    Statistics,
    StatValue,
    // eslint-disable-next-line no-unused-vars
    StatBlock,
    // eslint-disable-next-line no-unused-vars
    JsonReport,
    BasicReportQuery,
    // eslint-disable-next-line no-unused-vars
    UIXValueBoolean
} from '../api/api'

interface LoadableArea<T> {
    data: T
    error?: any
    progress: boolean
}

// filters
// =============================================================================
export interface AvailableStatFilters extends LoadableArea<StatFilters> {}

export function initialFiltersState(): AvailableStatFilters {
    return {
        data: {
            timeGrouping: [],
            bidders: [],
            browsers: [],
            sites: [],
            adUnits: [],
            sizes: [],
            currencies: [],
            devices: [],
            countries: [],
            auctionMetrics: [],
            revenueMetrics: [],
            utmSources: [],
            utmMediums: [],
            utmCampaigns: [],
            usdOnly: true
        },
        progress: false
    }
}

// dashboard
// =============================================================================
export interface DashboardState {
    query: LoadableDashboardQuery
    dashboardBean: DashboardBean
}

interface LoadableDashboardQuery extends LoadableArea<DashboardQuery> {}

export function initialDashboardState(): DashboardState {
    return {
        query: initialDashboardQuery(),
        dashboardBean: {
            statistics: initialStatistics(),
            previousPeriodStatistics: initialStatistics()
        }
    }
}

function initialDashboardQuery(): LoadableDashboardQuery {
    return {
        data: {
            startDate: moment().utc(false).startOf('day').toDate(),
            endDate: moment().utc(false).endOf('day').toDate()
        },
        progress: false
    }
}

function initialStatistics(): Statistics {
    return {
        bidPrice: initialStatBlock(StatValue.TypeEnum.BidPrice),
        bidRate: initialStatBlock(StatValue.TypeEnum.BidRate),
        bids: initialStatBlock(StatValue.TypeEnum.BidRate),
        eCPM: initialStatBlock(StatValue.TypeEnum.ECPM),
        impressions: initialStatBlock(StatValue.TypeEnum.Impressions),
        requests: initialStatBlock(StatValue.TypeEnum.Requests),
        bidRequests: initialStatBlock(StatValue.TypeEnum.BidRequests),
        revenue: initialStatBlock(StatValue.TypeEnum.Revenue),
        timeoutRate: initialStatBlock(StatValue.TypeEnum.TimeoutRate),
        winRate: initialStatBlock(StatValue.TypeEnum.WinRate),
        maxCounterValue: 0,
        maxMoneyValue: 0,
        axisX: [],
        axisYLeft: [],
        axisYRight: [],
        realData: false
    }
}

function initialStatBlock(type: StatValue.TypeEnum): StatBlock {
    return {
        summary: initialStatValue(type),
        history: [],
        maxValue: 0,
        realData: false
    }
}

function initialStatValue(type: StatValue.TypeEnum): StatValue {
    return {
        value: 0,
        trendValue: 0,
        trend: StatValue.TrendEnum.Same,
        type: type,
        position: 0,
        realData: false,
        formattedTrendValue: '',
        formattedValue: '',
        trendPercent: 0
    }
}

// report
// =============================================================================
export interface BasicReportState {
    query: LoadableBasicReportQuery
    reportBean: JsonReport
}

interface LoadableBasicReportQuery extends LoadableArea<BasicReportQuery> {}

export function initialBasicReportState(): BasicReportState {
    return {
        query: initialBasicReportQuery(),
        reportBean: {}
    }
}

function initialBasicReportQuery(): LoadableBasicReportQuery {
    return {
        data: {
            groupByAdUnit: initialUIXValueBoolean(),
            groupBySite: initialUIXValueBoolean(),
            groupByBidder: initialUIXValueBoolean(),
            groupByDevice: initialUIXValueBoolean(),
            groupByCountry: initialUIXValueBoolean(),
            groupByUtmSource: initialUIXValueBoolean(),
            groupByUtmMedium: initialUIXValueBoolean(),
            groupByUtmCampaign: initialUIXValueBoolean(),
            groupByUtmTerm: initialUIXValueBoolean(),
            groupByUtmContent: initialUIXValueBoolean(),
            groupByHbSource: initialUIXValueBoolean(),
            timeGrouping: BasicReportQuery.TimeGroupingEnum.Total,
            startDate: moment().utc(false).startOf('day').toDate(),
            endDate: moment().utc(false).endOf('day').toDate()
        },
        progress: false
    }
}

export function initialUIXValueBoolean(value?: boolean): UIXValueBoolean {
    return {
        value: value || false
    }
}
