import format from 'format-number'

export function rate(part?: number, whole?: number) {
    return whole && part ? (part / whole) * 100.0 : 0
}

export function formatBigNumbers(num: number) {
    if (!num) {
        return '0'
    }

    const negative = num < 0

    num = Math.abs(num)

    if (num > 999999.99) {
        if (num > 999999999.99) {
            return (
                (negative ? '-' : '') + (format2Decimal(num / 1000000000) + 'G')
            )
        } else {
            return (negative ? '-' : '') + (format2Decimal(num / 1000000) + 'M')
        }
    } else {
        return (
            (negative ? '-' : '') +
            (num > 999.99
                ? format2Decimal(num / 1000) + 'K'
                : format2Decimal(num))
        )
    }
}

export function moneyFormat(num: number, currency: string) {
    switch (currency) {
        case 'USD':
            return '$' + formatBigNumbers(Math.abs(num))
        case 'EUR':
            return '€' + formatBigNumbers(Math.abs(num))
        default:
            return '$' + formatBigNumbers(Math.abs(num))
    }
}

export function percentFormat(numerator?: number, denominator?: number) {
    const result = format2Decimal(rate(numerator, denominator))
    return (
        (result.endsWith('.00')
            ? result.substr(0, result.length - 3)
            : result) + '%'
    )
}

export function format2Decimal(num: number) {
    return format({ truncate: 2 })(num)
}

export function format2DecimalOrNull(num?: number) {
    return num ? format({ truncate: 2 })(num).toString() : undefined
}

export function formatWithComa(num?: number) {
    if (!num) {
        return '0'
    }

    return formatWithComaStr(num.toString())
}

export function formatWithComaStr(strValue?: string) {
    if (!strValue) {
        return ''
    }

    var postfixIndex = strValue.indexOf('.')
    let postfix = ''

    if (postfixIndex > 0) {
        postfix = strValue.substring(postfixIndex, strValue.length)
        strValue = strValue.substring(0, postfixIndex)
    }

    const parts = Math.floor(strValue.length / 3)
    const start = strValue.length - parts * 3

    let result = start > 0 ? strValue.substr(0, start) : ''
    for (let i = 0; i < parts; i++) {
        const part = strValue.substr(start + i * 3, 3)
        result = result.length > 0 ? result + ',' + part : part
    }
    return result + postfix
}

export function cutToCount(value: string, count: number, end?: string) {
    return value.length > count
        ? value.substring(0, count) + (end || '...')
        : value
}
