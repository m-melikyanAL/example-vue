export const positiveNumbersPattern = /^\d+(?:\.+\d+)*$/

export const rewardRules = () => {
  return {
    amount_from: [
      {
        message: translate("errors.required_message", {field: "amount from"}),
        required: true,
      },
      {
        pattern: positiveNumbersPattern,
        message: translate("errors.numeric_message", {field: "amount from"})
      }
    ],
    amount_to: [
      {
        message: translate("errors.required_message", {field: "amount to"}),
        required: true,
      },
      {
        pattern: positiveNumbersPattern,
        message: translate("errors.numeric_message", {field: "amount from"})
      }
    ],
    value: [
    {
      required: true,
      message: translate("errors.required_message", {field: "reward value"})
    },
    {
      pattern: positiveNumbersPattern,
      message: translate("errors.numeric_message", {field: "reward value"})
    }
  ]
  }
}

export const voucherRules = () =>  {
  return {
    title: [
      {
        message: translate("errors.required_message", {field: "voucher title"}),
        required: true,
      },
      {
        message: translate("errors.no_longer_message", {field: "voucher title", max: 255}),
        max: 255
      },
    ],
    value: [
      {
        message: translate("errors.required_message", {field: "voucher value"}),
        required: true,
      },
      {
        pattern: positiveNumbersPattern,
        message: translate("errors.numeric_message", {field: "voucher value"})
      }
    ],
  }
}

export const discountRules = () => {
  return {
    name: [
      {
        message: translate("errors.required_message", { field: "name" }),
        required: true,
        type: "string",
      },
      {
        message: translate("errors.no_longer_message", { field: "name", max: 100 }),
        type: "string",
        max: 100
      }
    ],
    code: [
      {
        message: translate("errors.required_message", { field: "code" }),
        required: true,
        type: "string",
      },
      {
        message: translate("errors.no_longer_message", { field: "code", max: 50 }),
        type: "string",
        max: 100
      }
    ],
    value: [
      {
        message: translate("errors.required_message", { field: "discount" }),
        required: true,
      },
      {
        message: translate("errors.numeric_message", { field: "discount" }),
        pattern: positiveNumbersPattern
      }
    ]
  }
}