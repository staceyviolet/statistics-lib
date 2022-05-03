import * as React from 'react'
import { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// eslint-disable-next-line no-unused-vars
import { FunnelChartData } from '../../../api/api'

import { download } from '../../../utils/downloadIcon'
import { StatValueColors } from '../../../utils/StatValueColors'

Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    statistics: FunnelChartData | null
    bidderName?: string
}

export const BidderFunnelChart: React.FC<Props> = (props) => {
    const [chartSeries, setChartSeries] = useState([
        {
            name: '',
            data: [0],
            color: {}
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
            categories: ['Bid Requests', 'Bids', 'Wins', 'Impressions'],
            title: {
                enabled: false
            }
        },
        yAxis: {
            allowDecimals: false,
            className: 'highcharts-color-0',
            title: {
                text: ''
            },
            labels: {
                format: '{value}',
                style: {
                    color: StatValueColors.bidRequests
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: StatValueColors.bidRequests
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: ''
        },
        plotOptions: {
            series: {
                pointPadding: 0.001,
                groupPadding: 0.001,
                borderRadius: 5,
                color: StatValueColors.bidRequests
            },
            column: {
                stacking: 'normal',
                maxPointWidth: 100
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

    const mapBidRequests = (stat: any) => {
        return stat.parameterStats
            .filter((f: any) => f.parameterName === 'bidRequests')
            .map((g: any) => g.parameterValue)
    }

    const mapBids = (stat: any) => {
        return stat.parameterStats
            .filter((f: any) => f.parameterName === 'bids')
            .map((g: any) => g.parameterValue)
    }

    const mapWins = (stat: any) => {
        return stat.parameterStats
            .filter((f: any) => f.parameterName === 'wins')
            .map((g: any) => g.parameterValue)
    }

    const mapImprs = (stat: any) => {
        return stat.parameterStats
            .filter((f: any) => f.parameterName === 'impressions')
            .map((g: any) => g.parameterValue)
    }

    const updateSeries = () => {
        props.statistics &&
            setChartSeries([
                {
                    name: 'Bid Requests',
                    data: props.statistics.dataBeans
                        .filter(
                            (bean) => bean.parameterName === props.bidderName
                        )
                        .map((stat) => mapBidRequests(stat))
                        .concat(
                            props.statistics.dataBeans
                                .filter(
                                    (bean) =>
                                        bean.parameterName === props.bidderName
                                )
                                .map((stat) => mapBids(stat))
                        )
                        .concat(
                            props.statistics.dataBeans
                                .filter(
                                    (bean) =>
                                        bean.parameterName === props.bidderName
                                )
                                .map((stat) => mapWins(stat))
                        )
                        .concat(
                            props.statistics.dataBeans
                                .filter(
                                    (bean) =>
                                        bean.parameterName === props.bidderName
                                )
                                .map((stat) => mapImprs(stat))
                        ),
                    color: {
                        linearGradient: {
                            x1: 0,
                            x2: 0,
                            y1: 0,
                            y2: 1
                        },
                        stops: [
                            [
                                0,
                                Highcharts.color(StatValueColors.bidRequests)
                                    .setOpacity(0.9)
                                    .get('rgba')
                            ],
                            [
                                1,
                                Highcharts.color('#8445b2')
                                    .setOpacity(0.95)
                                    .get('rgba')
                            ]
                        ]
                    }
                }
            ])
    }

    useEffect(updateSeries, [props.statistics, props.bidderName])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '100%', width: '100%' } }}
            className='chart'
        />
    )
}
