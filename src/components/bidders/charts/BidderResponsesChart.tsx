import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
// eslint-disable-next-line no-unused-vars
import { BiddersMetricByTime } from '../../../api/api'
import { download } from '../../../utils/downloadIcon'
import { StatValueColors } from '../../../utils/StatValueColors'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    statistics?: BiddersMetricByTime | null
    bidderName?: string
}

export const BidderResponsesChart: React.FC<Props> = ({
    statistics,
    bidderName
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
            max: 100,
            title: {
                text: ''
            },
            labels: {
                format: '{value}%',
                style: {
                    color: StatValueColors.timeoutRate
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
            shared: true
        },
        plotOptions: {
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
                          name: 'Bid Rate',
                          data: mapBidderDataHistory(bData.bidRateHistory),
                          color: StatValueColors.bidRate
                      }))
                      .concat(
                          statistics.biddersData
                              .filter((t) => t.bidderName === bidderName)
                              .map((bData: any) => ({
                                  name: 'Timeout Rate',
                                  data: mapBidderDataHistory(
                                      bData.timeoutRateHistory
                                  ),
                                  color: StatValueColors.timeoutRate
                              }))
                      )
                : []
        )
    }

    useEffect(updateSeries, [statistics, bidderName])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
