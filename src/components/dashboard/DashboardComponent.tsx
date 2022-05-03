import { Empty, Spin } from 'antd'
import Highcharts from 'highcharts'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsFullScreen from 'highcharts/modules/full-screen'
import HighchartsOffsplineExporting from 'highcharts/modules/offline-exporting'
import * as React from 'react'
import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { DashboardBean } from '../../api/api'
import { download } from '../../utils/downloadIcon'
import { DashboardHelp } from '../help/DashboardHelp'
import { StatHeader } from '../statHeader/StatHeader'
import './dashboard.scss'
import { DashboardChart } from './DashboardChart'
import { Summary } from './summary/Summary'

HighchartsExporting(Highcharts)
HighchartsOffsplineExporting(Highcharts)
HighchartsExportData(Highcharts)
HighchartsFullScreen(Highcharts)
Highcharts.SVGRenderer.prototype.symbols.download = download

interface Props {
    dashboardBean: DashboardBean | null
    refreshDashboard: () => void
    onClick: (e: any) => void
    biddersFilterApplied: boolean
    isLoading: boolean
    showError: boolean
    visibleMetric: string
    startDate: any
    endDate: any
    setDates: (e: any) => void
    currency: string
    setCurrency: (currency: string) => void
}

export const DashboardComponent: React.FC<Props> = ({
    dashboardBean,
    refreshDashboard,
    onClick,
    biddersFilterApplied,
    isLoading,
    showError,
    visibleMetric,
    startDate,
    endDate,
    setDates,
    currency,
    setCurrency
}) => {
    const chart = useRef<any>()

    const handleDownloadButtonClick = (buttonClicked: string) => {
        if (chart && chart.current) {
            switch (buttonClicked) {
                case 'fullScreen':
                    chart.current.chart.fullscreen.toggle()
                    break
                case 'print':
                    chart.current.chart.print()
                    break
                case 'downloadPng':
                    chart.current.chart.exportChart(
                        {
                            type: 'image/png',
                            filename: 'dashboard'
                        },
                        {
                            subtitle: {
                                text: ''
                            }
                        }
                    )
                    break
                case 'downloadJpg':
                    chart.current.chart.exportChart(
                        {
                            type: 'image/jpeg',
                            filename: 'dashboard'
                        },
                        {
                            subtitle: {
                                text: ''
                            }
                        }
                    )
                    break
                case 'downloadPdf':
                    chart.current.chart.exportChart(
                        {
                            type: 'application/pdf',
                            filename: 'dashboard'
                        },
                        {
                            subtitle: {
                                text: ''
                            }
                        }
                    )
                    break
                case 'downloadSvg':
                    chart.current.chart.exportChart(
                        {
                            type: 'image/svg+xml',
                            filename: 'dashboard'
                        },
                        {
                            subtitle: {
                                text: ''
                            }
                        }
                    )
                    break
                case 'downloadCsv':
                    chart.current.chart.downloadCSV()
                    break
                case 'downloadXls':
                    chart.current.chart.downloadXLS()
                    break
                case 'viewDataTable':
                    chart.current.chart.viewData()
                    break
            }
        }
    }

    const dashboardIsNotEmpty =
        dashboardBean && dashboardBean.statistics.bidRequests.maxValue > 0

    return (
        <div className='dashboard'>
            <StatHeader
                startDate={startDate}
                endDate={endDate}
                setDates={setDates}
                currency={currency}
                setCurrency={setCurrency}
                isDashboard
                handleDownload={handleDownloadButtonClick}
                helpContent={DashboardHelp}
            />
            <Spin tip='Loading...' spinning={isLoading && !showError}>
                <div
                    className={`dashboard__body${
                        !dashboardIsNotEmpty ? '_empty' : ''
                    }`}
                >
                    <div
                        className={`dashboard__body_summary${
                            !dashboardIsNotEmpty ? '_empty' : ''
                        }`}
                    >
                        <Summary
                            stat={dashboardBean}
                            refreshDashboard={refreshDashboard}
                            onClick={onClick}
                            biddersFilterApplied={biddersFilterApplied}
                            partnerInstallation={
                                dashboardBean?.partnerInstallation
                            }
                            metricSelected={visibleMetric}
                            isLoading={
                                !dashboardBean?.statistics.requests.history
                                    .length && !showError
                            }
                            currency={currency}
                        />
                    </div>
                    <div className='dashboard__body_chart'>
                        {dashboardIsNotEmpty ? (
                            <DashboardChart
                                chart={chart}
                                highcharts={Highcharts}
                                visibleMetric={visibleMetric}
                                statistics={dashboardBean?.statistics}
                                previousStatistics={
                                    dashboardBean?.previousPeriodStatistics
                                }
                                partnerInstallation={
                                    dashboardBean?.partnerInstallation
                                }
                                biddersFilterApplied={biddersFilterApplied}
                                currency={currency}
                            />
                        ) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )}
                    </div>
                </div>
            </Spin>
        </div>
    )
}
