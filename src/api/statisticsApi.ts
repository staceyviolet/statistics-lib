import moment from 'moment'
import { BaseApi } from './BaseApi'
import { customFetch } from './customFetch'
import { Configuration } from './configuration'
import {
    // eslint-disable-next-line no-unused-vars
    BasicReportQuery,
    // eslint-disable-next-line no-unused-vars
    BidderMetricsQuery,
    // eslint-disable-next-line no-unused-vars
    DashboardQuery,
    PartnerStatControllerApi,
    RevenueReportQuery
} from './api'

export class StatisticsApi extends BaseApi {
    api: PartnerStatControllerApi

    constructor(
        accessToken: string,
        basePath: string,
        errorCallback: () => void
    ) {
        super()
        this.api = new PartnerStatControllerApi(
            new Configuration({ accessToken, basePath }),
            undefined,
            customFetch(accessToken, errorCallback)
        )
    }

    public getFilters() {
        return this.wrap(this.api.filtersUsingGET())
    }

    public loadDashboard(query: DashboardQuery) {
        return this.wrap(this.api.dashboardUsingPOST(query))
    }

    public loadOverviewCharts(query: DashboardQuery) {
        return this.wrap(this.api.loadOverviewChartUsingPOST(query))
    }

    public loadBidderFunnelData(query: BidderMetricsQuery) {
        return this.wrap(this.api.loadBidderFunnelChartUsingPOST(query))
    }

    public loadIncrementalRevenueChart(query: BidderMetricsQuery) {
        return this.wrap(this.api.loadIncrementalRevenueChartUsingPOST(query))
    }

    public loadResponseTimesData(query: BidderMetricsQuery) {
        return this.wrap(this.api.loadBiddersResponseTimeChartUsingPOST(query))
    }

    public loadBiddersData(query: BidderMetricsQuery) {
        return this.wrap(this.api.loadBiddersMetricsByTimeUsingPOST(query))
    }

    public loadAuctionsJsonReport(query: BasicReportQuery) {
        return this.wrap(this.api.generateAuctionsJsonReportUsingPOST(query))
    }

    public generateRevenueReport(query: RevenueReportQuery) {
        return this.wrap(this.api.generateRevenueJsonReportUsingPOST(query))
    }

    public downloadBasicReport(query: BasicReportQuery) {
        const time = moment().utc(true).format('MMM-Do-YY-h-mm-ss')

        return this.wrap(
            this.api
                .downloadAuctionsReportUsingPOST(query)
                .then((response: Response) => {
                    return Promise.resolve(
                        response
                            .blob()
                            .then((blob) => {
                                return Promise.resolve(
                                    StatisticsApi.downloadCSVData(
                                        `pm-auctions-report_${time}.csv`,
                                        blob
                                    )
                                )
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
        )
    }

    public downloadRevenueReport(query: RevenueReportQuery) {
        const time = moment().utc(true).format('MMM-Do-YY-h-mm-ss')
        return this.wrap(
            this.api
                .downloadRevenueReportUsingPOST(query)
                .then((response: Response) => {
                    return Promise.resolve(
                        response
                            .blob()
                            .then((blob) => {
                                return Promise.resolve(
                                    StatisticsApi.downloadCSVData(
                                        `pm-auctions-report_${time}.csv`,
                                        blob
                                    )
                                )
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
        )
    }

    static downloadCSVData(fileName: string, csvData: Blob) {
        if (!(window.navigator as any).msSaveOrOpenBlob) {
            const a = window.document.createElement('a')
            a.href = URL.createObjectURL(csvData)
            a.download = fileName
            document.body.appendChild(a)
            a.click() // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            document.body.removeChild(a)
        } else {
            // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
            ;(window.navigator as any).msSaveBlob(csvData, 'filename.csv')
        }
    }
}
