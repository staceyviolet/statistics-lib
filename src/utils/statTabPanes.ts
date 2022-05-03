import {
    AreaChartOutlined,
    DollarCircleOutlined,
    EnvironmentOutlined,
    GroupOutlined,
    MobileOutlined,
} from '@ant-design/icons'

type TableTabPane = {
    name: string
    key: string
    icon: typeof AreaChartOutlined
}

export const statTabPanes: TableTabPane[] = [
    {
        name: 'Bidders',
        key: 'bidders',
        icon: DollarCircleOutlined,
    },
    {
        name: 'Ad Units',
        key: 'adUnits',
        icon: GroupOutlined,
    },
    // {
    //     name: 'Sizes',
    //     key: 'sizes',
    //     icon: CompressOutlined,
    // },
    {
        name: 'Devices',
        key: 'devices',
        icon: MobileOutlined,
    },
    {
        name: 'Countries',
        key: 'countries',
        icon: EnvironmentOutlined,
    },
]

export const bidderTabPanes: TableTabPane[] = [
    {
        name: 'Sites',
        key: 'sites',
        icon: DollarCircleOutlined,
    },
    {
        name: 'Ad Units',
        key: 'adUnits',
        icon: GroupOutlined,
    },
    // {
    //     name: 'Sizes',
    //     key: 'sizes',
    //     icon: CompressOutlined,
    // },
    {
        name: 'Devices',
        key: 'devices',
        icon: MobileOutlined,
    },
    {
        name: 'Countries',
        key: 'countries',
        icon: EnvironmentOutlined,
    },
]
