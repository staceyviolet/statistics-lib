import { useState } from 'react'
import moment from 'moment'

export const usePickDates = () => {
    const [startDate, setStartDate] = useState(
        moment().utc(false).startOf('day').toDate()
    )

    const [endDate, setEndDate] = useState(
        moment().utc(false).endOf('day').toDate()
    )

    const setToday = () => {
        setStartDate(moment().utc(false).startOf('day').toDate())
        setEndDate(moment().utc(false).endOf('day').toDate())
    }

    const setYesterday = () => {
        setStartDate(
            moment().utc(false).subtract(1, 'days').startOf('day').toDate()
        )
        setEndDate(
            moment().utc(false).subtract(1, 'days').endOf('day').toDate()
        )
    }

    const setLast7Days = () => {
        setStartDate(
            moment().utc(false).subtract(6, 'days').startOf('day').toDate()
        )
        setEndDate(moment().utc(false).endOf('day').toDate())
    }

    const setLast30Days = () => {
        setStartDate(
            moment().utc(false).subtract(29, 'days').startOf('day').toDate()
        )
        setEndDate(moment().utc(false).endOf('day').toDate())
    }

    const setThisMonth = () => {
        setStartDate(
            moment().utc(false).startOf('month').startOf('day').toDate()
        )
        setEndDate(moment().utc(false).endOf('month').endOf('day').toDate())
    }

    const setLastMonth = () => {
        setStartDate(
            moment()
                .utc(false)
                .subtract(1, 'month')
                .startOf('month')
                .startOf('day')
                .toDate()
        )
        setEndDate(
            moment()
                .utc(false)
                .subtract(1, 'month')
                .endOf('month')
                .endOf('day')
                .toDate()
        )
    }

    const setDates = (date: string) => {
        switch (date) {
            case 'today':
                setToday()
                break
            case 'yesterday':
                setYesterday()
                break
            case 'last7days':
                setLast7Days()
                break
            case 'last30days':
                setLast30Days()
                break
            case 'thisMonth':
                setThisMonth()
                break
            case 'lastMonth':
                setLastMonth()
                break
        }
    }

    const setCustomDateRange = (a: any) => {
        setStartDate(moment(a[0]._d).utc(false).startOf('day').toDate())
        setEndDate(moment(a[1]._d).utc(false).endOf('day').toDate())
    }

    return { startDate, endDate, setDates, setCustomDateRange }
}
