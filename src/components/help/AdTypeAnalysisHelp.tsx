import { Descriptions } from "antd";
import * as React       from 'react'

export const AdTypeAnalysisHelp = ( ) => {
  return (
      <Descriptions title={"Ad Type Analysis"}  column={1} size={"small"} layout={"vertical"}>
          <Descriptions.Item>
              Ad type statistics
          </Descriptions.Item>
      </Descriptions>
  )
}
