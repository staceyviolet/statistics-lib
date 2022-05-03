import { Dropdown, Menu } from 'antd'
import * as React from 'react'
import './chartDownloadButton.scss'

interface Props {
    handleDownload: any
}

export const ChartDownloadButton: React.FC<Props> = ({ handleDownload }) => {
    const menu = (
        <Menu
            className='chart-download-dropdown'
            onClick={(item) => handleDownload(item.key)}
        >
            <Menu.Item key='fullScreen'>View in full screen</Menu.Item>
            <Menu.Item key='print'>Print chart</Menu.Item>
            <hr />
            <Menu.Item key='downloadPng'>Download PNG image</Menu.Item>
            <Menu.Item key='downloadJpeg'>Download JPEG image</Menu.Item>
            <Menu.Item key='downloadPdf'>Download PDF document</Menu.Item>
            <Menu.Item key='downloadSvg'>Download SVG vector image</Menu.Item>
            <hr />
            <Menu.Item key='downloadCsv'>Download CSV</Menu.Item>
            <Menu.Item key='downloadXls'>Download XLS</Menu.Item>
            <Menu.Item key='viewDataTable'>View data table</Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <svg width='24' height='24' style={{ cursor: 'pointer' }}>
                <rect
                    fill='#ffffff'
                    className='highcharts-button-box'
                    x='0.5'
                    y='0.5'
                    rx='2'
                    ry='2'
                    stroke='none'
                    strokeWidth='1'
                />
                <path
                    fill='#666666'
                    d='M 13 4 L 13 13.799999999999999 M 10.2 11 L 13 13.799999999999999 L 15.799999999999999 11 M 6 16.6 L 6 18 L 20 18 L 20 16.6'
                    className='highcharts-button-symbol'
                    data-z-index='1'
                    style={{
                        color: '#333333',
                        fontWeight: 'normal',
                        fill: '#333333',
                        stroke: `#777777`
                    }}
                    strokeWidth='2'
                />
                <text x='0' data-z-index='1' y='15.5' />
            </svg>
        </Dropdown>
    )
}
