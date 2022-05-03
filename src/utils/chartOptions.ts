import * as Highcharts from 'highcharts'

Highcharts.setOptions({
    colors: [
        '#4768fd',
        '#1FE8B5',
        '#90ed7d',
        '#f7a35c',
        '#8085e9',
        '#fe00fd',
        '#edf67d',
        '#2b908f',
        '#f45b5b',
        '#91e8e1',
        '#FFF400',
        '#00a2e8',
        '#ff0000',
        '#b44ede',
        '#adff2f',
        '#540d6e',
    ],
})

export const ChartMenuItems = [
    'printChart',
    'separator',
    'downloadPNG',
    'downloadJPEG',
    'downloadPDF',
    'separator',
    'downloadCSV',
    'downloadXLS',
]
export const ChartButtons = {
    contextButton: {
        enabled: true,
        text: 'Export data',
        menuItems: ChartMenuItems,
    },
}
export const ChartExporting = {
    allowHtml: true,
    csv: {
        dateFormat: '%Y-%m-%d',
    },
    buttons: ChartButtons
}

export interface Category {
    name: string
    visible: boolean
    index: number
}

export interface Point {
    catInfo: Category
    category: string
    y: number
}

export interface Series {
    data: Array<any>
    name: string
}

export function createCategory(name: string, index: number): Category {
    return {
        name: name,
        visible: true,
        index: index,
    }
}

export function createPoint(category: Category, y: number): Point {
    return {
        catInfo: category,
        category: category.name,
        y: y,
    }
}
