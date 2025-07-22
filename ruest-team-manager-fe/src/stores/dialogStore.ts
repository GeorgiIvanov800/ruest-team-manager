// src/stores/dialogStore.ts
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const isVisible = ref(false)
  const title = ref('')
  const message = ref('')
  const color = ref<'success' | 'error' | 'warning' | 'info'>('info')
  const confirmText = ref('OK')
  const cancelText = ref('')
  const onConfirm = ref<() => void>()
  const onCancel = ref<() => void>()

  function openAlert (opts: {
    title: string
    message: string
    color?: typeof color.value
    confirmText?: string
    onConfirm?: () => void
  }) {
    title.value = opts.title
    message.value = opts.message
    color.value = opts.color ?? 'success'
    confirmText.value = opts.confirmText ?? 'OK'
    cancelText.value = ''
    onConfirm.value = () => {
      opts.onConfirm?.()
      hide()
    }
    onCancel.value = undefined
    isVisible.value = true
  }

  function openConfirm (opts: {
    title: string
    message: string
    color?: typeof color.value
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel?: () => void
  }) {
    title.value = opts.title
    message.value = opts.message
    color.value = opts.color ?? 'warning'
    confirmText.value = opts.confirmText ?? 'Yes'
    cancelText.value = opts.cancelText
    onConfirm.value = () => {
      opts.onConfirm()
      hide()
    }
    onCancel.value = () => {
      opts.onCancel?.()
      hide()
    }
    isVisible.value = true
  }

  function confirm () {
    onConfirm.value?.()
  }
  function cancel () {
    onCancel.value?.()
  }
  function hide () {
    isVisible.value = false
  }

  return {

    isVisible, title, message, color,
    confirmText, cancelText,

    openAlert, openConfirm,
    confirm, cancel, hide,
  }
})
