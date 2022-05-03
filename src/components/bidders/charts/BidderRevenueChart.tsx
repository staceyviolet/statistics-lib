import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime } from '../../../api/api'
import { download } from '../../../utils/downloadIcon'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    statistics?: BiddersMetricByTime | null
    bidderName?: string
    currency: string
}

export const BidderRevenueChart: React.FC<Props> = ({
    statistics,
    bidderName,
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
            showEmpty: false,
            title: {
                text: ''
            },
            labels: {
                // eslint-disable-next-line no-template-curly-in-string
                format: currency === 'EUR' ? '€{value}' : '${value}',
                style: {
                    color: '#fc8282'
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '',
            valueDecimals: 5,
            valuePrefix: currency === 'EUR' ? '€' : '$'
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#fc8282'],
                        [
                            1,
                            Highcharts.color('#fad4d4')
                                .setOpacity(0)
                                .get('rgba')
                        ]
                    ]
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
            statistics
                ? statistics.biddersData
                      .filter((t) => t.bidderName === bidderName)
                      .map((bData: any) => ({
                          name: bData.bidderName,
                          data:
                              currency === 'EUR'
                                  ? bData.eurRevenueHistory.map(
                                        (info: any) => ({
                                            y: info.value,
                                            marker: {
                                                enabled: info.value !== 0
                                            }
                                        })
                                    )
                                  : bData.usdRevenueHistory.map(
                                        (info: any) => ({
                                            y: info.value,
                                            marker: {
                                                enabled: info.value !== 0
                                            }
                                        })
                                    ),
                          color: '#FF9999'
                      }))
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
