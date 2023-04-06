export const useModalOptions = () => useState('modalOptions', () => {
  return {
    showing: false,
    content: "",
    size: "md",
  }
})