import * as React from 'react'
import { Alert } from 'antd'

interface Props {
    showError: boolean
    message: any
    closable: boolean
    isAuthorised?: boolean
}

export const Error: React.FC<Props> = ({
    message,
    showError,
    closable,
    isAuthorised
}) => {
    return !showError ? null : (
        <Alert
            type='error'
            style={{ margin: '0 0 1em' }}
            message={message}
            closable={closable}
        />
    )
}
