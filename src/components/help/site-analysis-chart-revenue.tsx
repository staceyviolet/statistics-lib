import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpSiteAnalysisChartRevenue:React.FC = () => {
    return (
        <Descriptions title={"Site Revenue"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
                <span> Site's revenue dynamics over the selected period of time </span>
            </Descriptions.Item>
        </Descriptions>
    )
}
