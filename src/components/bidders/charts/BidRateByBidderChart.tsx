import * as React from 'react'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime } from '../../../api/api'
import { download } from '../../../utils/downloadIcon'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    biddersMetrics?: BiddersMetricByTime | null
}

export const BidRateByBidder: React.FC<Props> = ({ biddersMetrics }) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Revenue',
            data: [{}]
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
        xAxis: {
            categories:
                biddersMetrics &&
                biddersMetrics.axisX.map((interval) => interval.label),
            title: {
                text: 'UTC time'
            }
        },
        title: {
            text: ' ',
            style: { color: '#ffffff', lineHeight: 0 }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Bid Rate'
            },
            labels: {
                format: '{value}%',
                style: {
                    color: '#1de8b5'
                }
            }
        },
        series: chartSeries,
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            valueSuffix: '%'
        },
        legend: {
            align: 'right',
            maxHeight: 270,
            verticalAlign: 'middle',
            layout: 'vertical',
            symbolRadius: 2
        },
        plotOptions: {
            // column: {
            //     stacking: 'normal',
            //
            //     dataLabels: {
            //         enabled: false,
            //
            //     }
            // },
            area: {
                stacking: 'percent'
            }
        },
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
                      data: bData.bidRateHistory.map((h: any) => ({
                          y: h.roundedValue
                              ? Math.round(100 * h.roundedValue)
                              : 0,
                          marker: {
                              enabled: h.value !== 0
                          }
                      }))
                  }))
                : []
        )
    }

    useEffect(updateSeries, [biddersMetrics])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
