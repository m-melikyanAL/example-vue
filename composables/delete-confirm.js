import { useState } from 'nuxt/app'

export const useDeleteHeading = () => useState('deleteHeading', () => '')
export const useDeleteText = () => useState('deleteText', () => '')

export const confirmDelete = async (heading, text, callback) => {
  const deleteHeading = useDeleteHeading()
  deleteHeading.value = heading

  const deleteText = useDeleteText()
  deleteText.value = text


}