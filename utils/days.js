export const daysOfWeek = () => {
  return [
    {
      label: translate("globals.week_days.monday"),
      value: "1"
    },
    {
      label: translate("globals.week_days.tuesday"),
      value: "2"
    },
    {
      label: translate("globals.week_days.wednesday"),
      value: "3"
    },
    {
      label: translate("globals.week_days.thursday"),
      value: "4"
    },
    {
      label: translate("globals.week_days.friday"),
      value: "5"
    },
    {
      label: translate("globals.week_days.saturday"),
      value: "6"
    },
    {
      label: translate("globals.week_days.sunday"),
      value: "7"
    }
  ]
}

export const getDaysOfMonth = () => {
  let days = []

  for(let i = 1; i <= 31; i++ ){
    days.push({
      label: i.toString(),
      value: i.toString(),
    })
  }

  return days
}

export const daysOfMonth = getDaysOfMonth()