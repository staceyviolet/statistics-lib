import { Descriptions } from "antd";
import * as React                from 'react'

export const UtManalysisHelp = () => {
    return (
        <Descriptions title={"UTM Analysis"}  column={1} size={"small"} layout={"vertical"}>
            <Descriptions.Item> A group of parameters (utm_source, utm_medium, utm_campaign,
                utm_term &
                utm_content) to keep track of where your traffic is coming from when being used in links to your site.
            </Descriptions.Item>

        </Descriptions>
    )
}
