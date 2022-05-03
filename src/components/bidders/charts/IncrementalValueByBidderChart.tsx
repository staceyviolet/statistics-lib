import * as React from 'react'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
// eslint-disable-next-line no-unused-vars
import { IncrementalRevenueChartData } from '../../../api/api'
import { createPoint } from '../../../utils/chartOptions'
import { download } from '../../../utils/downloadIcon'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    statistics?: IncrementalRevenueChartData
    currency: string
}

export const IncrementalValueByBidderChart: React.FC<Props> = ({
    statistics,
    currency
}) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: '',
            data: [0]
        }
    ])

    const categoryNames = statistics?.labels || []
    const categories = categoryNames.map(function (catName: any, i: number) {
        return {
            name: catName,
            visible: true,
            index: i
        }
    })

    const chartOptions = {
        credits: false,
        chart: {
            type: 'column',
            style: {
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
            }
        },
        title: {
            text: ' ',
            style: { color: '#ffffff', lineHeight: 0 }
        },
        xAxis: {
            categories: categories.map((cat: any) => cat.name)
        },
        yAxis: {
            min: 0,
            allowDecimals: true,
            title: {
                text: ''
            },
            reversedStacks: false,
            labels: {
                // eslint-disable-next-line no-template-curly-in-string
                format: currency === 'EUR' ? '€{value}' : '${value}',
                style: {
                    color: '#808080'
                }
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            symbolRadius: 2,
            layout: 'vertical'
        },
        tooltip: {
            valueDecimals: 5,
            headerFormat: '<b>{point.x}</b><br/>',
            valuePrefix: currency === 'EUR' ? '€' : '$'
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                borderRadius: 2
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
        },
        colors: ['#808080', '#1ee8b5']
    }

    const updateSeries = () => {
        currency === 'EUR'
            ? setChartSeries(
                  statistics?.eurValues
                      ? statistics.eurValues.map((data: any) => ({
                            data: data.valuesByX.map((y: any, i: any) =>
                                createPoint(categories[i], y)
                            ),
                            name: data.ylabel ? data.ylabel + '' : ''
                        }))
                      : []
              )
            : setChartSeries(
                  statistics?.usdValues
                      ? statistics.usdValues.map((data: any) => ({
                            data: data.valuesByX.map((y: any, i: any) =>
                                createPoint(categories[i], y)
                            ),
                            name: data.ylabel ? data.ylabel + '' : ''
                        }))
                      : []
              )
    }

    useEffect(updateSeries, [statistics, currency])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
