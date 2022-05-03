import * as React from 'react'
import { Form, Select, Tooltip } from 'antd'
// eslint-disable-next-line no-unused-vars
import { FilterBean } from '../../api/api'
import { useMinWidthBreakpoint } from '../../utils/useMinWidthBreakpoint'

const { Option } = Select

interface Props {
    filterName: string
    formItemTitle: string
    placeholder?: string
    filterValues: Array<any>
    onClick: () => void
    isSelectOpen: boolean
    onChange: (name: string, option: any) => void
    onSelect: (name: string, optionKey: string | number) => void
    onBlur: () => void
    isDisabled?: boolean
    icon: React.ReactNode
    filterIsLoading: boolean
}

export const FilterFormItem: React.FC<Props> = ({
    filterName,
    formItemTitle,
    placeholder,
    filterValues,
    onClick,
    isSelectOpen,
    onChange,
    onSelect,
    onBlur,
    isDisabled,
    icon,
    filterIsLoading
}) => {
    const is992px = useMinWidthBreakpoint('992')
    const is1200px = useMinWidthBreakpoint('1200px')

    return (
        <Form.Item
            className='filters__form-item'
            name={filterName}
            label={<Tooltip title={formItemTitle}>{icon}</Tooltip>}
            style={{ maxWidth: 'initial' }}
        >
            <Select
                loading={filterIsLoading}
                mode='multiple'
                allowClear
                maxTagCount={10}
                maxTagTextLength={!is992px ? (!is1200px ? 12 : 16) : 10}
                onClick={onClick}
                open={isSelectOpen}
                placeholder={placeholder || 'All ' + formItemTitle}
                onChange={(val, option) => onChange(filterName, option)}
                disabled={isDisabled}
                onSelect={(val: any, option: any) =>
                    onSelect(filterName, option.value)
                }
                onBlur={onBlur}
            >
                <Option key='all' value='all'>
                    Select All
                </Option>
                {filterValues.map((filter: FilterBean | string) => (
                    <Option
                        key={typeof filter === 'string' ? filter : filter.value}
                        value={
                            typeof filter === 'string' ? filter : filter.value
                        }
                    >
                        {typeof filter === 'string' ? filter : filter.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}
