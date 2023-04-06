export const phoneCountries = ["US", "IN", "RS", "PK"]

export const countryCodesMap = {
  US: "1",
  IN: "91",
  RS: "381",
  PK: "92",
}

export const getCountryLetterCode = (countryNumericCode) => {
  return Object.keys(countryCodesMap).find(
    (key) => countryCodesMap[key] === countryNumericCode
  )
}

export const getCountryNumericCode = (countryLetterCode) => {
  return Object.values(countryCodesMap).find(
    (value) => countryCodesMap[countryLetterCode] === value
  )
}

export const getFormattedPhoneNumber = (countryNumericCode, phoneNumber) => {
  if (!phoneNumber) {
    return ''
  }

  if (!countryNumericCode) {
    countryNumericCode = ""
  }

  return countryNumericCode?.includes('+') || phoneNumber.includes('+') ? `${countryNumericCode}${phoneNumber}` : `+${countryNumericCode}${phoneNumber}`
}
