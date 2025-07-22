<!-- eslint-disable @stylistic/semi -->
<script setup lang="ts">
  import type { SaveSleeveRequest, SleeveResponse } from '@/openapi'
  import { isAxiosError } from 'axios';
  import SleeveForm from '@/pages/Sleeve/components/SleeveForm.vue';
  import { getSleeveBySleeveNumber, updateSleeve } from '@/services/sleeveService';
  import { useDialogStore } from '@/stores/dialogStore'
  import { useLoadingStore } from '@/stores/loadingStore'

  const route = useRoute() as { params: { id?: string } };
  const router = useRouter();
  const loadingStore = useLoadingStore();
  const error = ref<string | null>(null);
  const isEdit = computed(() => Boolean((route.params as { id?: string }).id));
  const sleeveToEdit = ref<SleeveResponse | null>(null);
  const dialogStore = useDialogStore();

  onMounted(() => {
    if (isEdit.value) {
      const sleeveNumber = Number(route.params.id);
      getSleeve(sleeveNumber);
    }
  })

  async function getSleeve (sleeveNumber: number) {
    loadingStore.startLoading();
    error.value = null;
    try {
      sleeveToEdit.value = await getSleeveBySleeveNumber(sleeveNumber);
    } catch (error_: unknown) {
      if (isAxiosError(error_)) {
        error.value = error_.message;
      }
    } finally {
      loadingStore.stopLoading();
    }
  }

  async function onUpdate (payload: Partial<SaveSleeveRequest>): Promise<void> {
    loadingStore.startLoading();
    const sleeveId = sleeveToEdit.value?.id;
    error.value = null;

    if (sleeveId === undefined) {
      error.value = 'Cannot update sleeve: Sleeve ID is missing.';
      dialogStore.openAlert({ title: 'Critical Error', message: error.value, color: 'error' })
      loadingStore.stopLoading();
      return;
    }
    try {
      await updateSleeve(sleeveId, payload);
      dialogStore.openAlert({ title: 'Erfolgreich!', message: 'Update erledigt - dein Sleeve ist frisch!', color: 'success', onConfirm: async () => {
        router.back()
      } });
    } catch (error_: unknown) {
      if (isAxiosError(error_)) {
        const message = error_.response?.data?.message;
        error.value = message;
        dialogStore.openAlert({ title: 'Error', message: message, color: 'error', confirmText: 'OK', onConfirm: () => {} })
      } else if (error_ instanceof Error) {
        error.value = error_.message;
        dialogStore.openAlert({ title: 'Error', message: 'Unexpected Error Please contact IT', color: 'error' })
      }
    } finally {
      loadingStore.stopLoading();
    }
  }
</script>

<template>
  <div v-if="loadingStore.isLoading" />
  <SleeveForm v-else :initial-data="sleeveToEdit" @submit="onUpdate" />
</template>
