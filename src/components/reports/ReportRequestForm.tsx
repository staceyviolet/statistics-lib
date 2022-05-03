import * as React from 'react'
import { Button, Col, Form, Row, Select, Space, Spin } from 'antd'
import { CheckOutlined, DownloadOutlined } from '@ant-design/icons'
// eslint-disable-next-line no-unused-vars
import { StatFilters } from '../../api/api'

import './reportRequestForm.scss'

const { Option } = Select

interface Props {
    selectGroupBy: (values: string[]) => void
    selectUtmGroupings: (values: string[]) => void
    metrics: Array<any>
    handleSetMetrics: (value: any, option: any) => void
    statFilters: StatFilters | null
    reportIsLoading: boolean
    setReportIsLoading: any
    reportIsDownloading: boolean
    showError: boolean
    onLoadReportClick: () => void
    onDownloadReportClick: () => void
    isRevenueReport?: boolean
    profileCurrency: string
}

export const ReportRequestForm: React.FC<Props> = ({
    selectGroupBy,
    selectUtmGroupings,
    metrics,
    handleSetMetrics,
    statFilters,
    reportIsLoading,
    reportIsDownloading,
    showError,
    onLoadReportClick,
    onDownloadReportClick,
    setReportIsLoading,
    isRevenueReport,
    profileCurrency
}) => {
    const [form] = Form.useForm()

    const handleReportLoad = () => {
        setReportIsLoading(true)
        onLoadReportClick()
    }

    const utmTooltip = (
        <div>
            <div>A group of URL parameters used in links to your site</div>
            <div>
                (utm_source, utm_medium, utm_campaign, utm_term & utm_content)
            </div>
            <div>to keep track of where your traffic is coming from.</div>
        </div>
    )

    return (
        <Form form={form} className='report-request-form'>
            <Row className='report-request-form__body'>
                <Col xs={{ span: 24 }} xxl={{ span: 8 }}>
                    <Form.Item
                        name='groupings'
                        className='report-request-form__form-item'
                        label='Group by'
                        colon={false}
                        initialValue={
                            isRevenueReport ? ['currency'] : undefined
                        }
                    >
                        <Select
                            mode='multiple'
                            allowClear
                            placeholder='Select Group by Options'
                            onChange={selectGroupBy}
                        >
                            <Option key='site' value='site'>
                                Site
                            </Option>
                            <Option key='bidder' value='bidder'>
                                Bidder
                            </Option>
                            <Option key='adUnit' value='adUnit'>
                                Ad Unit
                            </Option>
                            <Option key='day' value='day'>
                                Day
                            </Option>
                            <Option key='hour' value='hour'>
                                Hour
                            </Option>
                            <Option key='device' value='device'>
                                Device
                            </Option>
                            <Option key='country' value='country'>
                                Country
                            </Option>
                            <Option key='hbSource' value='hbSource'>
                                HB Source
                            </Option>
                            {isRevenueReport && (
                                <Option key='currency' value='currency'>
                                    Currency
                                </Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24 }} xxl={{ span: 8 }}>
                    <Form.Item
                        name='utm'
                        className='report-request-form__form-item'
                        tooltip={utmTooltip}
                        colon={false}
                        label='UTM Tags Group by '
                    >
                        <Select
                            mode='multiple'
                            allowClear
                            placeholder='Select UTM Tags'
                            onChange={selectUtmGroupings}
                        >
                            <Option key='source' value='source'>
                                Source
                            </Option>
                            <Option key='medium' value='medium'>
                                Medium
                            </Option>
                            <Option key='campaign' value='campaign'>
                                Campaign
                            </Option>
                            <Option key='term' value='term'>
                                Term
                            </Option>
                            <Option key='content' value='content'>
                                Content
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24 }} xxl={{ span: 8 }}>
                    <Form.Item
                        name='metrics'
                        className='report-request-form__form-item'
                        label='Metrics'
                        initialValue={metrics}
                    >
                        <Select
                            mode='multiple'
                            allowClear
                            placeholder='All Metrics'
                            onChange={handleSetMetrics}
                        >
                            {(isRevenueReport
                                ? statFilters?.revenueMetrics
                                : statFilters?.auctionMetrics
                            )
                                ?.filter(
                                    profileCurrency === 'EUR'
                                        ? (metrics) =>
                                              !metrics.label.includes('USD')
                                        : (metrics) =>
                                              !metrics.label.includes('EUR')
                                )
                                .map((metric) => (
                                    <Option
                                        key={metric.label}
                                        value={metric.value}
                                    >
                                        {metric.label}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Space>
                    <Spin spinning={reportIsLoading && !showError}>
                        <Button
                            type='primary'
                            onClick={handleReportLoad}
                            icon={<CheckOutlined />}
                        >
                            Apply
                        </Button>
                    </Spin>

                    <Spin spinning={reportIsDownloading && !showError}>
                        <Button
                            type='primary'
                            icon={<DownloadOutlined />}
                            onClick={onDownloadReportClick}
                        >
                            {' '}
                            Export .csv
                        </Button>
                    </Spin>
                </Space>
            </Form.Item>
        </Form>
    )
}
