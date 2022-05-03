import * as React from 'react'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime } from '../../../api/api'
import { StatValueColors } from '../../../utils/StatValueColors'
import { download } from '../../../utils/downloadIcon'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    statistics?: BiddersMetricByTime | null
    bidderName?: string
    currency: string
}

export const CpmBreakdownChart: React.FC<Props> = ({
    statistics,
    bidderName,
    currency
}) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Bid Rate',
            data: [0]
        }
    ])

    const chartOptions = {
        credits: false,

        chart: {
            type: 'area',
            style: {
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
            }
        },
        title: {
            useHTML: true,
            style: {
                fontSize: '16px',
                paddingBottom: '1em',
                color: '#777777',
                fontWeight: '500'
            },
            text: ''
        },
        xAxis: {
            categories: statistics?.axisX.map((interval) => interval.label),
            title: {
                text: 'UTC time'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                // eslint-disable-next-line no-template-curly-in-string
                format: currency === 'EUR' ? '€{value}' : '${value}',
                style: {
                    color: StatValueColors.bidPrice
                }
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            margin: 10,
            itemDistance: 200,
            symbolRadius: 2
        },
        tooltip: {
            valuePrefix: currency === 'EUR' ? '€' : '$',
            shared: true
        },
        plotOptions: {
            area: {
                stacking: '',
                dataLabels: {
                    enabled: false,
                    y: 0,
                    formatter: function (): string {
                        return this.y
                            ? currency === 'EUR'
                                ? '€' + this.y.toFixed(5)
                                : '$'
                            : ''
                    }
                }
            }
        },
        series: chartSeries,
        exporting: {
            buttons: {
                contextButton: {
                    symbol: 'download',
                    symbolStroke: '#777777',
                    symbolStrokeWidth: 2,
                    verticalAlign: 'top',
                    y: -10
                }
            }
        }
    }

    const mapBidderDataHistory = (history: any) => {
        return history.map((h: any) => ({
            y: h.roundedValue ? Math.round(100 * h.roundedValue) : 0,
            marker: {
                enabled: h.value !== 0
            }
        }))
    }

    const updateSeries = () => {
        setChartSeries(
            statistics
                ? statistics.biddersData
                      .filter((t) => t.bidderName === bidderName)
                      .map((bData: any) => ({
                          name: 'eCPM',
                          data:
                              currency === 'EUR'
                                  ? mapBidderDataHistory(bData.eurEcpmHistory)
                                  : mapBidderDataHistory(bData.usdEcpmHistory),
                          color: StatValueColors.eCPM
                      }))
                      .concat(
                          statistics.biddersData
                              .filter((t) => t.bidderName === bidderName)
                              .map((bData: any) => ({
                                  name: 'Bid CPM',
                                  data:
                                      currency === 'EUR'
                                          ? mapBidderDataHistory(
                                                bData.eurBidPriceHistory
                                            )
                                          : mapBidderDataHistory(
                                                bData.usdBidPriceHistory
                                            ),
                                  color: StatValueColors.bidPrice
                              }))
                      )
                : []
        )
    }

    useEffect(updateSeries, [statistics, bidderName, currency])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
