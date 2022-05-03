import { Descriptions } from "antd";
import * as React       from 'react';

export const HelpSiteAnalysisTableBreakdown:React.FC = () => {
    return (
        <Descriptions title={"Site Breakdown"} column={1} size={"small"} layout={"horizontal"}>
            <Descriptions.Item>
               <span>
                Site statistics grouped by Bidders, Ad Units, Devices, Countries
               </span>
            </Descriptions.Item>
        </Descriptions>
    )
}
