import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpSiteAnalysisChartEcpm:React.FC = () => {
    return (
        <Descriptions title={"Site eCPM"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
                <span> Site's eCPM dynamics over the selected period of time </span>
            </Descriptions.Item>
        </Descriptions>
    )
}
