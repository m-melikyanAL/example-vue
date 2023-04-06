export const formatDateTime = (dateString) => new Date(dateString).toLocaleString(
  "en-US",
  {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  },
)
