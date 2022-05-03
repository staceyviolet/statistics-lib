import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { FilterBean } from '../api/api'

export const useApplyFilters = () => {
    const [bidders, setBidders] = useState<Array<string>>([])
    const [adUnits, setAdUnits] = useState<Array<string>>([])
    const [sizes, setSizes] = useState<Array<string>>([])

    const [sites, setSites] = useState<Array<FilterBean>>([])
    const [devices, setDevices] = useState<Array<FilterBean>>([])
    const [countries, setCountries] = useState<Array<FilterBean>>([])

    const [browsers, setBrowsers] = useState<Array<string>>([])

    const setFiltersSelected = (filter: string, val: any[]) => {
        switch (filter) {
            case 'sites': {
                setSites(
                    val.map((val: any) => ({
                        label: val.children ? val.children : val.label,
                        value: val.value
                    }))
                )
                break
            }
            case 'bidders': {
                setBidders(val.map((val: any) => (val.value ? val.value : val)))
                break
            }
            case 'adUnits': {
                setAdUnits(val.map((val: any) => (val.value ? val.value : val)))
                break
            }
            case 'sizes': {
                setSizes(val.map((val: any) => (val.value ? val.value : val)))
                break
            }
            case 'devices': {
                setDevices(
                    val.map((val: any) => ({
                        label: val.children ? val.children : val.label,
                        value: val.value
                    }))
                )
                break
            }
            case 'countries': {
                setCountries(
                    val.map((val: any) => ({
                        label: val.children ? val.children : val.label,
                        value: val.value
                    }))
                )
                break
            }
            case 'browsers': {
                setBrowsers(
                    val.map((val: any) => (val.value ? val.value : val))
                )
                break
            }
        }
    }
    return {
        sites,
        bidders,
        adUnits,
        sizes,
        devices,
        countries,
        browsers,
        setFiltersSelected
    }
}
