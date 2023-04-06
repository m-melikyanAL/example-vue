export const valueTypes = {
  'percentage': {
    label: '%',
    value: 'percentage',
  },
  'amount' : {
    label: '$',
    value: 'amount',
  }
}

export const voucherPercentageOptions = [
  {
    label: '%',
    value: 'percentage',
  },
  {
    label: '$',
    value: 'amount',
  }
]

export const getDisplayValue = (type = null, value) => {
    if (!value) {
        return ''
    }

    if (type === 'percentage') {
        return `${value} %`
    }

    return getCurrencySymbol() + value
}

export const getCurrencySymbol = () => {
    return '$'
}