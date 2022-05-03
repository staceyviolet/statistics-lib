import * as React from 'react'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
import { BiddersMetricByTime } from '../../../api/api'
import { download } from '../../../utils/downloadIcon'
import { StatValueColors } from '../../../utils/StatValueColors'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    biddersMetrics: BiddersMetricByTime | null
    currency: string
}

// function whiteSpacer(howMany: any) {
//     var spaceString = '';
//
//     while (howMany) {
//         spaceString += '&nbsp';
//         howMany--;
//     }
//
//     return spaceString;
// }

export const RevenueByBidderChart: React.FC<Props> = ({
    biddersMetrics,
    currency
}) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Revenue',
            data: [0]
        }
    ])

    const chartOptions = {
        credits: false,
        chart: {
            type: 'column',
            style: {
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
            }
            // marginRight: 120
        },
        title: {
            text: ' ',
            style: { color: '#ffffff', lineHeight: 0 }
        },
        xAxis: {
            categories:
                biddersMetrics &&
                biddersMetrics.axisX.map((interval) => interval.label),
            title: {
                text: 'UTC time'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Revenue'
            },
            labels: {
                format: currency === 'EUR' ? '€{value}' : '${value}',
                style: {
                    color: StatValueColors.revenue
                }
            },
            stackLabels: {
                enabled: true,
                total: 0,
                allowOverlap: false,
                style: {
                    fontWeight: 'bold',
                    color: Highcharts.theme || 'gray'
                },
                formatter: function (): string {
                    return this.total
                        ? (currency === 'EUR' ? '€' : '$') +
                              this.total.toFixed(5)
                        : ''
                }
            }
        },
        legend: {
            align: 'right',
            maxHeight: 270,
            verticalAlign: 'middle',
            layout: 'vertical',
            symbolRadius: 2
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            valueDecimals: 5,
            valuePrefix: currency === 'EUR' ? '€' : '$'
        },
        plotOptions: {
            column: {
                stacking: 'normal',

                dataLabels: {
                    enabled: false,
                    y: 0,
                    formatter: function (): string {
                        return this.y
                            ? (currency === 'EUR' ? '€' : '$') +
                                  this.y.toFixed(5)
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

    const updateSeries = () => {
        setChartSeries(
            biddersMetrics
                ? biddersMetrics.biddersData.map((bData) => ({
                      name: bData.bidderName,
                      data:
                          currency === 'EUR'
                              ? bData.eurRevenueHistory.map((h) => h.value)
                              : bData.usdRevenueHistory.map((h) => h.value)
                  }))
                : []
        )
    }

    useEffect(updateSeries, [biddersMetrics, currency])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
