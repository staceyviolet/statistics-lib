import { LeftOutlined } from '@ant-design/icons'
import { Button, Radio, Select, DatePicker } from 'antd'
import { useEffect, useState } from 'react'
import * as React from 'react'
import './statHeader.scss'
import { ChartDownloadButton } from './ChartDownloadButton'
import { Help } from './Help'

const { RangePicker } = DatePicker
const { Option } = Select

interface Props {
    startDate: any
    endDate: any
    setDates: (period: string | Array<any>) => void
    doNotShowCurrencySwitch?: boolean
    currency?: string
    setCurrency?: (e: any) => void
    isDashboard?: boolean
    handleDownload?: any
    displayBackBtn?: boolean
    onBackBtnClick?: () => void
    helpContent: any
}

export const StatHeader: React.FC<Props> = ({
    startDate,
    endDate,
    setDates,
    currency,
    setCurrency,
    doNotShowCurrencySwitch,
    isDashboard,
    handleDownload,
    displayBackBtn,
    onBackBtnClick,
    helpContent
}) => {
    const [pickerDates, setPickerDates] = useState<Array<string>>([])

    const toggleDatePicker = () => {
        const picker = (document.querySelector(
            '.ant-picker-input'
        ) as unknown) as HTMLDivElement | null
        picker?.click()
    }

    const onChangeDateRange = (dates: any, datesString: Array<string>) => {
        if (datesString) {
            setPickerDates([datesString[0], datesString[1]])
        } else {
            setPickerDates([])
        }
    }

    useEffect(() => {
        setDates(pickerDates)
    }, [pickerDates])

    return (
        <div className='stat-header'>
            {displayBackBtn && (
                <Button
                    type='default'
                    className='stat-header_back-btn'
                    onClick={onBackBtnClick}
                >
                    <LeftOutlined />
                </Button>
            )}

            <div className='stat-header__date-range'>
                <span style={{ whiteSpace: 'nowrap' }}>
                    {startDate.toDateString()}
                </span>
                {' - '}
                <span style={{ whiteSpace: 'nowrap' }}>
                    {endDate.toDateString()}
                </span>
            </div>

            <div className='stat-header__date-picker'>
                <Radio.Group
                    defaultValue='today'
                    onChange={(e) => setDates(e.target.value)}
                >
                    <Radio.Button value='today'>Today</Radio.Button>
                    <Radio.Button value='yesterday'>Yesterday</Radio.Button>
                    <Radio.Button value='last7days'>Last 7 Days</Radio.Button>
                    <Radio.Button value='last30days'>Last 30 Days</Radio.Button>
                    <Radio.Button value='thisMonth'>This Month</Radio.Button>
                    <Radio.Button value='lastMonth'>Last Month</Radio.Button>
                    <Radio.Button value='custom' onClick={toggleDatePicker}>
                        Custom Range
                    </Radio.Button>
                </Radio.Group>

                <RangePicker
                    suffixIcon={null}
                    format='ddd MMM DD YYYY'
                    allowClear={false}
                    bordered={false}
                    allowEmpty={[false, false]}
                    onChange={onChangeDateRange}
                />
            </div>

            {!doNotShowCurrencySwitch && (
                <div className='stat-header__currency-select'>
                    <Select
                        defaultValue={currency === 'EUR' ? 'EUR' : 'USD'}
                        bordered={false}
                        onChange={setCurrency}
                    >
                        <Option value='USD'>USD</Option>
                        <Option value='EUR'>EUR</Option>
                    </Select>
                </div>
            )}

            {isDashboard && (
                <div className='stat-header__download-button'>
                    <ChartDownloadButton handleDownload={handleDownload} />
                </div>
            )}
            <div className='stat-header__help'>
                <Help content={helpContent} />
            </div>
        </div>
    )
}
