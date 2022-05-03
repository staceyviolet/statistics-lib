import React, { useCallback, useState } from 'react'
import { formatBigNumbers } from './format'
// eslint-disable-next-line no-unused-vars
import { JsonReport } from '../api/api'

import '../components/commonstyles.scss'

export const useMapReportResponse = (
    componentName: string,
    isStatPage?: boolean
) => {
    const [dataSource, setDatasource] = useState<any[]>([])
    const [colNames, setColNames] = useState<any[]>([])

    const [showStatScreen, setShowStatScreen] = useState(false)
    const [bidderStringId, setBidderStringId] = useState('')
    const [siteId, setSiteId] = useState('')

    const mapReportResponse = useCallback(
        (response: JsonReport, isStatPage?: boolean) => {
            if (!response.colNames || !response.lines) {
                return
            }

            const columns = response.colNames.map((colName) => {
                return {
                    key: colName,
                    dataIndex: colName,
                    title: colName,
                    sorter: (a: string | number, b: string | number) => {
                        if (typeof a[colName] === 'number') {
                            return a[colName] - b[colName]
                        } else {
                            return a[colName]
                                ? a[colName].localeCompare(b[colName])
                                : -1
                        }
                    },
                    render: (value: any, bean: any) =>
                        renderColValues(value, colName, bean, isStatPage)
                }
            })
            const data = response.lines
                .sort((a, b) => b['Revenue in USD'] - a['Revenue in USD'])
                .map((item, index) => {
                    return { key: index, ...item }
                })

            setColNames(columns)
            setDatasource(data)
        },
        []
    )

    const renderColValues = (
        value: any,
        colName: string,
        bean: any,
        isStatPage?: boolean
    ) => {
        if (typeof value === 'string' && componentName.match('bidders')) {
            return (
                <span
                    className={`${!isStatPage ? 'link-common' : ''}`}
                    onClick={() => {
                        setBidderStringId(value)
                        setShowStatScreen(true)
                    }}
                >
                    {value}
                </span>
            )
        } else if (typeof value === 'string' && componentName.match('sites')) {
            return (
                <span
                    className={`${!isStatPage ? 'link-common' : ''}`}
                    onClick={() => {
                        setShowStatScreen(true)
                        setSiteId(bean['Site ID'])
                    }}
                >
                    {value}
                </span>
            )
        } else if (typeof value === 'string') {
            return value
        } else {
            if (colName.includes('Rate')) {
                return changeValueColor(value)
            }
            if (colName.includes('(USD)')) {
                return <span>${value}</span>
            }
            if (colName.includes('(EUR)')) {
                return <span>€{value}</span>
            }
            return formatBigNumbers(value)
        }
    }

    const changeValueColor = (value: any) => {
        if (value < 5) {
            return <span style={{ color: '#f45b5b' }}>{value}%</span>
        }
        if (value >= 5 && value < 20) {
            return <span style={{ color: '#ffc300' }}>{value}%</span>
        }
        if (value > 90) {
            return <span style={{ color: '#39C97D' }}>{value}%</span>
        } else {
            return <span>{value}%</span>
        }
    }
    return {
        dataSource,
        colNames,
        showStatScreen,
        setShowStatScreen,
        bidderStringId,
        siteId,
        mapReportResponse
    }
}
