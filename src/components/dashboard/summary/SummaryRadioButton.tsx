import * as React from 'react'
import { Radio, Tooltip } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { HelpTooltip } from '../../help/HelpTooltip'

interface Props {
    biddersFilterApplied?: boolean
    onClick?: React.MouseEventHandler<HTMLElement>
    isLoading?: boolean
    statistics: string
    value: string
    classNameSuffix: string
    title: string
    disabled?: boolean
    tooltipOverlay?: any
}

export const SummaryRadioButton: React.FC<Props> = ({
    value,
    biddersFilterApplied,
    onClick,
    isLoading,
    statistics,
    classNameSuffix,
    title,
    disabled,
    tooltipOverlay
}) => {
    return (
        <Tooltip title={title} overlay={HelpTooltip(tooltipOverlay)}>
            <Radio.Button
                value={value}
                onClick={onClick}
                checked={biddersFilterApplied}
                disabled={disabled}
                className={`summary__radio summary__radio_${classNameSuffix}`}
            >
                <div className='summary__radio_title'>{title}</div>

                <div className='summary__radio_stat'>
                    {isLoading ? <LoadingOutlined /> : statistics}
                </div>
            </Radio.Button>
        </Tooltip>
    )
}
