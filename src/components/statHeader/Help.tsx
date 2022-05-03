import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { useState } from 'react'
import * as React from 'react'
import './help.scss'

interface Props {
    content: React.ReactNode
}

export const Help: React.FC<Props> = ({ content }) => {
    const [visible, setVisible] = useState(false)

    const handleVisibleChange = (visible: boolean) => {
        setVisible(!visible)
    }
    const withCloseButton = (content: any) => {
        const cont = content()
        return (
            <div className='help-body'>
                <CloseOutlined
                    className='help-body__close'
                    onClick={() => setVisible(false)}
                />
                {cont}
            </div>
        )
    }

    return (
        <div className='help'>
            <Popover
                content={withCloseButton(content)}
                trigger='click'
                visible={visible}
                onVisibleChange={() => handleVisibleChange(visible)}
            >
                <QuestionCircleOutlined />
            </Popover>
        </div>
    )
}
