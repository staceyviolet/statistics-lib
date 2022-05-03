import * as React from 'react'
import { useEffect, useState } from 'react'
import { Button, Form, Space } from 'antd'
import './filters.scss'

import {
    ClearOutlined,
    CompressOutlined,
    DesktopOutlined,
    DollarCircleOutlined,
    EnvironmentOutlined,
    GroupOutlined,
    MobileOutlined,
    ReloadOutlined,
    GlobalOutlined
} from '@ant-design/icons'
import Title from 'antd/es/typography/Title'
// eslint-disable-next-line no-unused-vars
import { StatFilters } from '../../api/api'
// eslint-disable-next-line no-unused-vars
import { StatisticsApi } from '../../api/statisticsApi'
import { FilterFormItem } from './FilterFormItem'

interface Props {
    onFiltersSelect: (filter: any, val: any) => void
    onReload: any
    onClearAll: () => void
    bidderSelected?: string | false
    siteSelected?: string
    showBrowsers?: boolean
    api: StatisticsApi
}

export const FiltersComponent: React.FC<Props> = ({
    onFiltersSelect,
    onReload,
    onClearAll,
    bidderSelected,
    siteSelected,
    showBrowsers,
    api
}) => {
    const [form] = Form.useForm()

    const [statFilters, setStatFilters] = useState<null | StatFilters>(null)

    const [filtersAreLoading, setFiltersAreLoading] = useState(false)
    const [sitesSelectOpen, setSitesSelectOpen] = useState(false)
    const [biddersSelectOpen, setBiddersSelectOpen] = useState(false)
    const [adUnitsSelectOpen, setAdUnitsSelectOpen] = useState(false)
    const [sizesSelectOpen, setSizesSelectOpen] = useState(false)
    const [devicesSelectOpen, setDevicesSelectOpen] = useState(false)
    const [countriesSelectOpen, setCountriesSelectOpen] = useState(false)
    const [browsersSelectOpen, setBrowsersSelectOpen] = useState(false)

    const toggleSitesSelect = () => {
        setSitesSelectOpen(!sitesSelectOpen)
    }
    const toggleBiddersSelect = () => {
        setBiddersSelectOpen(!biddersSelectOpen)
    }
    const toggleAdUnitsSelect = () => {
        setAdUnitsSelectOpen(!adUnitsSelectOpen)
    }
    const toggleAdSizesSelect = () => {
        setSizesSelectOpen(!sizesSelectOpen)
    }
    const toggleDevicesSelect = () => {
        setDevicesSelectOpen(!devicesSelectOpen)
    }
    const toggleCountriesSelect = () => {
        setCountriesSelectOpen(!countriesSelectOpen)
    }
    const toggleBrowsersSelect = () => {
        setBrowsersSelectOpen(!browsersSelectOpen)
    }

    const loadFilters = () => {
        setFiltersAreLoading(true)
        api.getFilters().then(
            (r) => {
                setStatFilters(r)
                setFiltersAreLoading(false)
            },
            // eslint-disable-next-line handle-callback-err
            (err) => setFiltersAreLoading(false)
        )
    }

    const handleClearAll = () => {
        form.resetFields([
            'sites',
            'bidders',
            'adUnits',
            'sizes',
            'devices',
            'countries'
        ])
        onFiltersSelect('clear', [])
        onClearAll()
    }

    const handleReload = () => {
        onReload()
    }

    const handleSelectAll = (filter: any, value: any) => {
        if (value === 'all') {
            switch (filter) {
                case 'sites':
                    form.setFieldsValue({
                        sites: statFilters?.sites.map(
                            (value: any) => value.value
                        )
                    })
                    setSitesSelectOpen(false)
                    break
                case 'bidders':
                    form.setFieldsValue({
                        bidders: statFilters?.bidders.map((value: any) => value)
                    })
                    setBiddersSelectOpen(false)
                    break
                case 'adUnits':
                    form.setFieldsValue({
                        adUnits: statFilters?.adUnits.map((value: any) => value)
                    })
                    setAdUnitsSelectOpen(false)
                    break
                case 'sizes':
                    form.setFieldsValue({
                        sizes: statFilters?.sizes.map((value: any) => value)
                    })
                    setSizesSelectOpen(false)
                    break
                case 'devices':
                    form.setFieldsValue({
                        devices: statFilters?.devices.map(
                            (value: any) => value.value
                        )
                    })
                    setDevicesSelectOpen(false)
                    break

                case 'countries':
                    form.setFieldsValue({
                        countries: statFilters?.countries.map(
                            (value: any) => value.value
                        )
                    })
                    setCountriesSelectOpen(false)
                    break
            }
        }
    }

    const handleChange = (filter: any, values: any) => {
        if (values.some((val: any) => val.value === 'all')) {
            switch (filter) {
                case 'sites':
                    onFiltersSelect(
                        filter,
                        statFilters ? statFilters.sites : []
                    )
                    break
                case 'bidders':
                    onFiltersSelect(
                        filter,
                        statFilters ? statFilters.bidders : []
                    )
                    break
                case 'adUnits':
                    onFiltersSelect(
                        filter,
                        statFilters ? statFilters.adUnits : []
                    )
                    break
                case 'sizes':
                    onFiltersSelect(
                        filter,
                        statFilters ? statFilters.sizes : []
                    )
                    break
                case 'devices':
                    onFiltersSelect(
                        filter,
                        statFilters ? statFilters.devices : []
                    )
                    break
                case 'countries':
                    onFiltersSelect(
                        filter,
                        statFilters ? statFilters.countries : []
                    )
                    break
                case 'all':
                    onFiltersSelect('all', [])
                    break
            }
        } else {
            onFiltersSelect(filter, values || [])
        }
    }
    const [reloadInProgress, setReloadInProgress] = useState(false)
    const [clearAllInProgress, setClearAllInProgress] = useState(false)

    useEffect(loadFilters, [])

    return (
        <div className='filters'>
            <Title className='filters__title' level={5}>
                Filters
            </Title>

            <Form
                form={form}
                initialValues={[
                    {
                        name: 'sites',
                        value: siteSelected && [siteSelected]
                    },
                    {
                        name: 'bidders',
                        value: bidderSelected && [bidderSelected]
                    }
                ]}
                colon={false}
                labelCol={{ span: 2, offset: 0 }}
                wrapperCol={{ span: 22, offset: 0 }}
            >
                <div className='filters__form'>
                    <FilterFormItem
                        filterName='sites'
                        formItemTitle='Sites'
                        filterValues={statFilters ? statFilters.sites : []}
                        onClick={toggleSitesSelect}
                        isSelectOpen={sitesSelectOpen}
                        onChange={handleChange}
                        onSelect={handleSelectAll}
                        onBlur={() => setSitesSelectOpen(false)}
                        isDisabled={!!siteSelected}
                        placeholder={siteSelected || 'All Sites'}
                        icon={<DesktopOutlined />}
                        filterIsLoading={filtersAreLoading}
                    />

                    <FilterFormItem
                        filterName='bidders'
                        formItemTitle='Bidders'
                        filterValues={statFilters ? statFilters.bidders : []}
                        onClick={toggleBiddersSelect}
                        isSelectOpen={biddersSelectOpen}
                        onChange={handleChange}
                        onSelect={handleSelectAll}
                        onBlur={() => setBiddersSelectOpen(false)}
                        isDisabled={!!bidderSelected}
                        placeholder={bidderSelected || 'All Bidders'}
                        icon={<DollarCircleOutlined />}
                        filterIsLoading={filtersAreLoading}
                    />

                    <FilterFormItem
                        filterName='adUnits'
                        formItemTitle='Ad Units'
                        filterValues={statFilters ? statFilters.adUnits : []}
                        onClick={toggleAdUnitsSelect}
                        isSelectOpen={adUnitsSelectOpen}
                        onChange={handleChange}
                        onSelect={handleSelectAll}
                        onBlur={() => setAdUnitsSelectOpen(false)}
                        icon={<GroupOutlined />}
                        filterIsLoading={filtersAreLoading}
                    />

                    <FilterFormItem
                        filterName='sizes'
                        formItemTitle='Ad Sizes'
                        filterValues={statFilters ? statFilters.sizes : []}
                        onClick={toggleAdSizesSelect}
                        isSelectOpen={sizesSelectOpen}
                        onChange={handleChange}
                        onSelect={handleSelectAll}
                        onBlur={() => setSizesSelectOpen(false)}
                        icon={<CompressOutlined />}
                        filterIsLoading={filtersAreLoading}
                    />

                    <FilterFormItem
                        filterName='devices'
                        formItemTitle='Devices'
                        filterValues={statFilters ? statFilters.devices : []}
                        onClick={toggleDevicesSelect}
                        isSelectOpen={devicesSelectOpen}
                        onChange={handleChange}
                        onSelect={handleSelectAll}
                        onBlur={() => setDevicesSelectOpen(false)}
                        icon={<MobileOutlined />}
                        filterIsLoading={filtersAreLoading}
                    />

                    <FilterFormItem
                        filterName='countries'
                        formItemTitle='Countries'
                        filterValues={statFilters ? statFilters.countries : []}
                        onClick={toggleCountriesSelect}
                        isSelectOpen={countriesSelectOpen}
                        onChange={handleChange}
                        onSelect={handleSelectAll}
                        onBlur={() => setCountriesSelectOpen(false)}
                        icon={<EnvironmentOutlined />}
                        filterIsLoading={filtersAreLoading}
                    />

                    {showBrowsers && (
                        <FilterFormItem
                            filterName='browsers'
                            formItemTitle='Browsers'
                            filterValues={
                                statFilters ? statFilters.browsers : []
                            }
                            onClick={toggleBrowsersSelect}
                            isSelectOpen={browsersSelectOpen}
                            onChange={handleChange}
                            onSelect={handleSelectAll}
                            onBlur={() => setBrowsersSelectOpen(false)}
                            icon={<GlobalOutlined />}
                            filterIsLoading={filtersAreLoading}
                        />
                    )}
                </div>

                <div className='filters__footer'>
                    <Space>
                        <Button
                            className='filters__reload-button'
                            onClick={handleReload}
                            icon={<ReloadOutlined />}
                            onAnimationStart={() => setReloadInProgress(true)}
                            onAnimationEnd={() => setReloadInProgress(false)}
                            loading={reloadInProgress}
                        >
                            Reload
                        </Button>

                        <Button
                            className='filters__clear-button'
                            onClick={handleClearAll}
                            icon={<ClearOutlined />}
                            onAnimationStart={() => setClearAllInProgress(true)}
                            onAnimationEnd={() => setClearAllInProgress(false)}
                            loading={clearAllInProgress}
                        >
                            Clear All
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    )
}
