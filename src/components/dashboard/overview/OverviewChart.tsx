import { useEffect, useState } from 'react'
import * as React from 'react'

import { Empty } from 'antd'
import Title from 'antd/es/typography/Title'

// eslint-disable-next-line no-unused-vars
import { OverviewStatisticsBean } from '../../../api/api'
import { download } from '../../../utils/downloadIcon'
import { StatValueColors } from '../../../utils/StatValueColors'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsExportData from 'highcharts/modules/export-data'

import './overview.scss'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    isEmpty?: boolean
    statistics?: OverviewStatisticsBean[]
    biddersFilterApplied: boolean
    partnerInstallation?: boolean
    groupBy: string
    currency: string
}

export const OverviewChart: React.FC<Props> = ({
    isEmpty,
    statistics,
    groupBy,
    biddersFilterApplied,
    partnerInstallation,
    currency
}) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Revenue',
            color: StatValueColors.revenue,
            data: [0]
        }
    ])

    const [categories, setCategories] = useState([''])

    const chartOptions = {
        chart: {
            type: 'bar',
            zoomType: 'xy',
            height: '230',
            style: {
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
            }
        },
        title: {
            text: 'Performance by ' + groupBy,
            style: { fontSize: 16, color: '#606060', fontWeight: '500' }
        },
        credits: { enabled: false },
        xAxis: {
            categories: categories,
            labels: {
                align: 'left',
                reserveSpace: true,
                useHTML: true,
                allowOverlap: true,
                value: '',
                style: { fontWeight: 500 },
                formatter: function (): string {
                    let ret = this.value
                    const len = ret.length
                    if (len > 17) {
                        ret = ret.slice(0, 17) + '...'
                    }
                    return ret
                }
            },
            min: 0,
            max: categories.length > 8 ? 8 : categories.length - 1,
            tickLength: 0,
            lineWidth: 1.5,
            lineColor: '#888888'
        },
        yAxis: {
            labels: {
                value: '',
                y: 15,
                isFirst: true,
                formatter: function (): string {
                    if (this.isFirst) {
                        return ' '
                    }
                    return (currency === 'EUR' ? '€' : '$') + this.value
                }
            },
            min: 0,
            allowDecimals: true,
            title: {
                text: ' '
            },
            opposite: false,
            stackLabels: {
                enabled: true,
                align: 'right',
                allowOverlap: false,
                total: 0,
                style: {
                    fontWeight: 'bold',
                    color: StatValueColors.revenue
                },
                formatter: function (): string {
                    return this.total
                        ? (currency === 'EUR' ? '€' : '$') +
                              (this.total > 0.0099
                                  ? this.total.toFixed(2)
                                  : this.total.toFixed(4))
                        : ''
                }
            }
        },
        legend: {
            enabled: false
        },
        scrollbar: {
            showFull: false,
            barBackgroundColor: '#acacac',
            barBorderRadius: 5,
            buttonBackgroundColor: 'white',
            buttonBorderColor: 'white',
            buttonArrowColor: 'white',
            buttonBorderWidth: 0,
            buttonBorderRadius: 0,
            rifleColor: '#acacac',
            trackBackgroundColor: '#efefef',
            trackBorderRadius: 5,
            trackBorderWidth: 0,
            liveRedraw: true,
            size: 7
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                maxPointWidth: 70,
                marginRight: 150,
                borderRadius: 2
            }
        },
        tooltip: {
            valuePrefix: currency === 'EUR' ? '€' : '$',
            valueDecimals: 4
        },
        series: chartSeries,
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: false
        },
        exporting: {
            buttons: {
                contextButton: {
                    symbol: 'download',
                    symbolStroke: '#777777',
                    symbolStrokeWidth: 2,
                    y: -5,
                    x: -5
                }
            }
        }
    }

    const updateSeries = () => {
        statistics &&
            setChartSeries([
                {
                    name: 'Revenue',
                    color: StatValueColors.revenue,
                    data:
                        currency === 'EUR'
                            ? statistics
                                  .filter((t) => t.eurParameterValue > 0)
                                  .sort(
                                      (a, b) =>
                                          b.eurParameterValue -
                                          a.eurParameterValue
                                  )
                                  .map((stat) => stat.eurParameterValue)
                            : statistics
                                  .filter((t) => t.usdParameterValue > 0)
                                  .sort(
                                      (a, b) =>
                                          b.usdParameterValue -
                                          a.usdParameterValue
                                  )
                                  .map((stat) => stat.usdParameterValue)
                }
            ])

        const cats = statistics
            ? currency === 'EUR'
                ? statistics
                      .filter((t) => t.eurParameterValue > 0)
                      .sort((a, b) => b.eurParameterValue - a.eurParameterValue)
                      .map((stat) => stat.parameterName)
                : statistics
                      .filter((t) => t.usdParameterValue > 0)
                      .sort((a, b) => b.usdParameterValue - a.usdParameterValue)
                      .map((stat) => stat.parameterName)
            : []
        setCategories(cats)
    }

    useEffect(updateSeries, [
        statistics,
        groupBy,
        biddersFilterApplied,
        partnerInstallation,
        currency
    ])

    return !isEmpty ? (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType='stockChart'
            options={chartOptions}
            className='chart'
        />
    ) : (
        <div>
            <Title level={5} className='overview__chart_title'>
                Performance by {groupBy}
            </Title>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className='overview__chart_empty'
            />
        </div>
    )
}
