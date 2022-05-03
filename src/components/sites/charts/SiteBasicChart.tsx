import * as React from 'react'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
// eslint-disable-next-line no-unused-vars
import { AxisLabel } from '../../../api/api'
import { download } from '../../../utils/downloadIcon'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    name: string
    statistics?: any
    color: string
    format: string
    axisX?: Array<AxisLabel>
    currency?: string
}

export const SiteBasicChart: React.FC<Props> = ({
    name,
    statistics,
    color,
    format,
    axisX,
    currency
}) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Revenue',
            data: [0],
            color: '#FF9999'
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
            categories: axisX?.map((interval) => interval.label),
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
                format: format + '{value}',
                colon: false,
                style: {
                    color: color
                }
            }
            // stackLabels: {
            //     enabled: true,
            //     total: 0,
            //     style: {
            //         fontWeight: 'bold',
            //         color: Highcharts.theme || 'gray',
            //     },
            //     formatter: function (): string {
            //         return this.total ? '$' + this.total.toFixed(5) : ''
            //     },
            // },
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            valueDecimals: format !== '' ? 5 : 0,
            valuePrefix: format,
            value: format
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
                        [0, color],
                        [1, Highcharts.color('#fff').setOpacity(0).get('rgba')]
                    ]
                }
            },
            series: {
                marker: {
                    enabled: false
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
        setChartSeries([
            {
                name: name,
                data: statistics
                    ? statistics.history.map((info: any) => ({
                          y: info.value,
                          marker: {
                              enabled: info.value !== 0
                          }
                      }))
                    : [0],
                color: color
            }
        ])
    }

    useEffect(updateSeries, [statistics, color, currency, name])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
