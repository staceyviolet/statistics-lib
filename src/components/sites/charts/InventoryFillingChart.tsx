import * as React from 'react'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
// eslint-disable-next-line no-unused-vars
import { DashboardBean } from '../../../api/api'
import { download } from '../../../utils/downloadIcon'
import { StatValueColors } from '../../../utils/StatValueColors'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    statistics?: DashboardBean
}

export const InventoryFillingChart: React.FC<Props> = ({ statistics }) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Requests',
            data: [{}],
            color: StatValueColors.requests
        },
        {
            name: 'Impressions',
            data: [{}],
            color: StatValueColors.impressions
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
            categories: statistics?.statistics.axisX.map(
                (interval) => interval.label
            ),
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
                format: '{value}',
                style: {
                    color: StatValueColors.winRate
                }
            }
        },
        legend: {},
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            shared: true
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 1
            },
            area: {
                dataLabels: {
                    enabled: false,
                    y: 0,
                    formatter: function (): string {
                        return this.y ? '$' + this.y.toFixed(5) : ''
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
        // @ts-ignore
        setChartSeries([
            {
                name: 'Requests',
                data: statistics
                    ? statistics.statistics.requests.history.map(
                          (info: any) => ({
                              y: info.value,
                              marker: {
                                  enabled: info.value !== 0
                              }
                          })
                      )
                    : [0],
                color: StatValueColors.requests
            },
            {
                name: 'Impressions',
                data: statistics
                    ? statistics.statistics.impressions.history.map(
                          (info: any) => ({
                              y: info.value,
                              marker: {
                                  enabled: info.value !== 0
                              }
                          })
                      )
                    : [0],
                color: StatValueColors.impressions
            }
        ])
    }

    useEffect(updateSeries, [statistics])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
