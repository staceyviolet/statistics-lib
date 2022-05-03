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
import { StatValueColors } from '../../../utils/StatValueColors'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    biddersMetrics?: BiddersMetricByTime | null
}

export function whiteSpacer(howMany: any) {
    var spaceString = ''

    while (howMany) {
        spaceString += '&nbsp'
        howMany--
    }

    return spaceString
}

export const RevenueRateByBidderChart: React.FC<Props> = (biddersMetrics) => {
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
        },
        title: {
            text: ' ',
            style: { color: '#ffffff', lineHeight: 0 }
        },
        xAxis: {
            categories:
                biddersMetrics.biddersMetrics &&
                biddersMetrics.biddersMetrics.axisX.map(
                    (interval) => interval.label
                ),
            title: {
                text: 'UTC time'
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Revenue'
            },
            labels: {
                format: '{value}%',
                style: {
                    color: StatValueColors.revenue
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
            pointFormat:
                '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.0f}%<br/>',
            format: '${total}'
        },
        plotOptions: {
            column: {
                stacking: 'percent'
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
            biddersMetrics.biddersMetrics
                ? biddersMetrics.biddersMetrics.biddersData.map((bData) => ({
                      name: bData.bidderName,
                      data: bData.usdRevenueHistory.map((h) => h.value)
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
