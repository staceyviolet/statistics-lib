import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
// eslint-disable-next-line no-unused-vars
import React, { RefObject, useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import './dashboard.scss'
// eslint-disable-next-line no-unused-vars
import { Statistics } from '../../api/api'
import { StatValueColors } from '../../utils/StatValueColors'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)

interface DashboardSeriesNode {
    name: string
    type: string
    yAxis: number
    tooltip: {
        valueDecimals: number
        valuePrefix: string
        valueSuffix: string
    }
    color: string
    data: Array<any>
    dashStyle?: string
}

interface Props {
    chart: any
    highcharts: any
    statistics?: Statistics
    previousStatistics?: Statistics
    biddersFilterApplied: boolean
    partnerInstallation?: boolean
    visibleMetric: string
    currency: string
}

export const DashboardChart: React.FC<Props> = ({
    chart,
    highcharts,
    statistics,
    previousStatistics,
    biddersFilterApplied,
    partnerInstallation,
    visibleMetric,
    currency
}) => {
    const [chartSeries, setChartSeries] = useState<DashboardSeriesNode[]>([])

    const chartOptions = {
        chart: {
            zoomType: 'xy',
            height: '555',
            style: {
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
            }
        },
        title: {
            text: 'Dashboard',
            style: { color: '#ffffff', lineHeight: 0 }
        },
        credits: { enabled: false },
        xAxis: {
            categories: statistics?.axisX.map((interval) => interval.label),
            title: {
                text: 'UTC time'
            },
            crosshair: true
        },
        yAxis: [
            {
                allowDecimals: false,
                title: {
                    text: ''
                },
                tickPixelInterval: 45
            },
            {
                labels: {
                    format: currency === 'EUR' ? '€{value}' : '${value}'
                },
                title: {
                    text: ''
                },
                tickPixelInterval: 45
            },
            {
                max: 100,
                title: {
                    text: ''
                },
                labels: {
                    format: '{value}%'
                },
                tickPixelInterval: 45
            }
        ],
        tooltip: {
            shared: true
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            margin: 10,
            itemDistance: 200,
            symbolRadius: 2
        },
        plotOptions: {
            series: {
                borderRadius: 2,
                marker: {
                    enabled: false
                }
            }
        },
        series: chartSeries,
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 250
                    },
                    chartOptions: {
                        chart: {
                            height: 300
                        },
                        legend: {
                            enabled: false
                        }
                    }
                }
            ]
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        }
    }

    const updateSeries = () => {
        switch (visibleMetric) {
            case 'requests': {
                biddersFilterApplied
                    ? setChartSeries(
                          setSeriesByMetric('Bid Requests', false, false)
                      )
                    : setChartSeries(
                          setSeriesByMetric('Requests', false, false)
                      )
                break
            }
            case 'bidRequests': {
                setChartSeries(setSeriesByMetric('Bid Requests', false, false))
                break
            }
            case 'impressions': {
                setChartSeries(setSeriesByMetric('Impressions', false, false))
                break
            }
            case 'revenue': {
                partnerInstallation
                    ? setChartSeries(
                          setSeriesByMetric('Gross Revenue', true, false)
                      )
                    : setChartSeries(setSeriesByMetric('Revenue', true, false))
                break
            }
            case 'bidPrice': {
                setChartSeries(setSeriesByMetric('Bid Price', true, false))
                break
            }
            case 'eCPM': {
                setChartSeries(setSeriesByMetric('eCPM', true, false))
                break
            }
            case 'bidRate': {
                setChartSeries(setSeriesByMetric('Bid Rate', false, true))
                break
            }
            case 'winRate': {
                setChartSeries(setSeriesByMetric('Win Rate', false, true))
                break
            }
            case 'timeoutRate': {
                setChartSeries(setSeriesByMetric('Timeout Rate', false, true))
                break
            }
        }
    }

    const setSeriesByMetric = (
        metricName: string,
        isMoney: boolean,
        isPercent: boolean
    ) => {
        let metricValue = metricName.replace('Gross', '')

        if (metricValue === 'eCPM') {
            metricValue = metricValue.toUpperCase()
        } else {
            metricValue = isMoney
                ? metricValue.replace(/\s+/g, '')
                : lowercaseFirstLetter(metricValue).replace(/\s+/g, '')
        }

        return [
            {
                name: metricName,
                type: 'column',
                yAxis: isMoney ? 1 : isPercent ? 2 : 0,
                tooltip: {
                    valueDecimals: isMoney ? 4 : 0,
                    valuePrefix: isMoney
                        ? currency === 'EUR'
                            ? '€'
                            : '$'
                        : '',
                    valueSuffix: isPercent ? '%' : ''
                },
                color: StatValueColors[`${lowercaseFirstLetter(metricValue)}`],
                data: setStatisticsValue(
                    metricValue,
                    false,
                    isMoney,
                    isPercent
                ),
                dashStyle: ''
            },
            {
                name: 'Expected ' + metricName,
                type: 'spline',
                yAxis: isMoney ? 1 : isPercent ? 2 : 0,
                tooltip: {
                    valueDecimals: isMoney ? 4 : 0,
                    valuePrefix: isMoney
                        ? currency === 'EUR'
                            ? '€'
                            : '$'
                        : '',
                    valueSuffix: isPercent ? '%' : ''
                },
                color: StatValueColors[`${lowercaseFirstLetter(metricValue)}`],
                data: setStatisticsValue(metricValue, true, isMoney, isPercent),
                dashStyle: 'ShortDot'
            }
        ]
    }

    const setStatisticsValue = (
        metricValue: string,
        isPreviousStatistics: boolean,
        isMoney: boolean,
        isPercent: boolean
    ) => {
        return !isPreviousStatistics
            ? checkIfIsMoneyAndSelectMetric(
                  statistics,
                  metricValue,
                  isMoney,
                  isPercent
              )
            : checkIfIsMoneyAndSelectMetric(
                  previousStatistics,
                  metricValue,
                  isMoney,
                  isPercent
              )
    }

    const checkIfIsMoneyAndSelectMetric = (
        statistics: any,
        metricValue: string,
        isMoney: boolean,
        isPercent: boolean
    ) => {
        return isMoney
            ? checkCurrencyAndSelectMoneyMetric(statistics, metricValue)
            : statistics[`${metricValue}`].history.map((info: any) =>
                  isPercent ? info.value * 100 : info.value
              )
    }

    const checkCurrencyAndSelectMoneyMetric = (
        statistics: any,
        metricValue: string
    ) => {
        return currency === 'EUR'
            ? statistics[`eur${metricValue}`].history.map(
                  (info: any) => info.value
              )
            : statistics[`usd${metricValue}`].history.map(
                  (info: any) => info.value
              )
    }

    const lowercaseFirstLetter = (metricValue: string) => {
        return metricValue.charAt(0).toLowerCase() + metricValue.slice(1)
    }

    useEffect(updateSeries, [
        statistics,
        previousStatistics,
        visibleMetric,
        biddersFilterApplied,
        partnerInstallation,
        currency
    ])

    return (
        <HighchartsReact
            ref={chart as RefObject<any>}
            highcharts={highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
