import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpSiteAnalysisChartInventoryFilling:React.FC = () => {
    return (
        <Descriptions title={"Site Revenue"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
                <span>Site's Requests number vs Impressions number</span>
            </Descriptions.Item>
        </Descriptions>
    )
}
