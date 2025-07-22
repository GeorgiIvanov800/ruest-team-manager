<!-- eslint-disable @stylistic/semi -->
<route lang="json">
{
  "meta": {
    "requiresAdmin": true
  }
}
</route>
<script setup lang="ts">
  import type { SaveSleeveRequest } from '@/openapi'
  import { isAxiosError } from 'axios'
  import router from '@/router'
  import { saveSleeve } from '@/services/sleeveService'
  import { useDialogStore } from '@/stores/dialogStore'
  import { useLoadingStore } from '@/stores/loadingStore'
  import SleeveForm from '../Sleeve/components/SleeveForm.vue'

  const loadingStore = useLoadingStore()
  const error = ref<string | null>(null)
  const dialogStore = useDialogStore()

  async function onSave (payload: SaveSleeveRequest): Promise<void> {
    try {
      await saveSleeve(payload)
      dialogStore.openAlert({ title: 'Erfolgreich!', message: 'Sleeve erfolgreich angelegt - weiter geht’s!', color: 'success', onConfirm: () => {
        router.back()
      } })
    } catch (error_: unknown) {
      if (isAxiosError(error_)) {
        const message = error_.response?.data?.message
        error.value = message
        dialogStore.openAlert({ title: 'Error', message: message, color: 'error' })
      } else if (error_ instanceof Error) {
        error.value = error_.message
        dialogStore.openAlert({ title: 'Error', message: 'Unexpected Error Please', color: 'error' })
      }
    } finally {
      loadingStore.stopLoading()
    }
  }
</script>

<template>
  <div v-if="loadingStore.isLoading" />
  <SleeveForm v-else @submit="onSave" />
</template>
