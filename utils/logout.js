export const logoutUser = async () => {
  await $fetch('/api/logout', { method: 'POST' })

  useRouter().go('/login')
}