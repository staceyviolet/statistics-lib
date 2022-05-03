import * as React from 'react'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'
// eslint-disable-next-line no-unused-vars
import { XYChartData } from '../../../api/api'
import { createPoint } from '../../../utils/chartOptions'
import { download } from '../../../utils/downloadIcon'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    xyChartData: XYChartData
}

export const ResponseTimeChart: React.FC<Props> = (xyChartData) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: '',
            data: []
        }
    ])

    const categoryNames = xyChartData.xyChartData.xlabels || []
    const categories = categoryNames.map(function (catName: any, i: any) {
        return {
            name: catName,
            visible: true,
            index: i
        }
    })

    const chartOptions = {
        credits: false,
        chart: {
            type: 'bar',
            style: {
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
            },
            zoomType: 'xy',
            height: '500'
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
            allowDecimals: false,
            title: {
                text: 'Bids'
            }
        },
        legend: {
            reversed: true,
            align: 'center',
            verticalAlign: 'bottom',
            symbolRadius: 2,
            layout: 'horizontal'
        },
        plotOptions: {
            series: {
                stacking: 'normal'
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
            xyChartData.xyChartData.yvalues
                ? xyChartData.xyChartData.yvalues
                      .map((s: any) => ({
                          data: s.valuesByX.map((y: any, i: any) =>
                              createPoint(categories[i], y)
                          ),
                          name: s.ylabel ? s.ylabel + ' ms' : ''
                      }))
                      .reverse()
                : []
        )
    }

    useEffect(updateSeries, [xyChartData])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
