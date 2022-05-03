import { Descriptions, Divider } from "antd";
import * as React                from 'react'

export const DashboardHelp = () => {
    return (
        <Descriptions title={"Dashboard"} column={1} size={"small"} layout={"vertical"}>
            <Descriptions.Item label="Revenue">Number of Prebid.js events for a selected period of time
            </Descriptions.Item>
            <Divider />
            <Descriptions.Item label="Expected Revenue">
                <div>Number of Prebid.js events for a selected period of time: </div>
                <ul>
                    <li>
                        a week ago when selected period of time is less then a month,
                    </li>
                    <li>
                        a month ago when selected period of time is more or equals one month
                    </li>
                </ul>
            </Descriptions.Item>
            <Descriptions.Item>Hover over metrics on the left to see the calculation formula used.
            </Descriptions.Item>
        </Descriptions>
    )
}
