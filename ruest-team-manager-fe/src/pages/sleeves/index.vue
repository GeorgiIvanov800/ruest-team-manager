<!-- eslint-disable @stylistic/semi -->
<script setup lang="ts">

  import type { SleeveResponse } from '@/openapi'
  import { isAxiosError } from 'axios'
  import { IsAdminKey } from '@/plugins'
  import { deleteSleeve, getAllSleevesBySequenceNumber } from '@/services/sleeveService'
  import { useDialogStore } from '@/stores/dialogStore'
  import { useLoadingStore } from '@/stores/loadingStore'
  import SleeveTable from '../Sleeve/components/SleeveTable.vue';

  const route = useRoute();
  const router = useRouter();
  const searchValue = ref<number>(Number(route.query.sleeveSequence) || 0);
  const isLoading = useLoadingStore();
  const sleeveData = ref<SleeveResponse[]>([]);
  const error = ref<string | null>(null);
  const dialogStore = useDialogStore();
  const isAdmin = inject(IsAdminKey, false);

  async function fetchSleeves () {
    isLoading.startLoading();
    error.value = null;
    try {
      sleeveData.value = await getAllSleevesBySequenceNumber(searchValue.value)
      if (sleeveData.value.length === 0) {
        return sleeveData.value = [];
      }
    } catch (error_: unknown) {
      if (isAxiosError(error_)) {
        error.value = error_.message;
      }
    } finally {
      isLoading.stopLoading();
    }
  }

  function onSearch (newValue: number) {
    searchValue.value = newValue;
    router.push({ query: { ...route.query, sleeveSequence: newValue } });
  }

  function onRedirect (): void {
    router.push('/sleeves/create');
  }

  function onEdit (sleeveNumber: number) {
    router.push(`/sleeves/edit/${sleeveNumber}`);
  }

  async function onDelete (sleeveId: number) {
    error.value = null;

    dialogStore.openConfirm({
      title: 'Wirklich den Sleeve entfernen?',
      message: 'Sag kurz, warum der Sleeve entfernt wird.',
      color: 'warning',
      confirmText: 'Weg damit!',
      cancelText: 'Noch mal überlegen',
      requiresReason: true,
      reason: '',
      onConfirm: async () => {
        try {
          isLoading.startLoading();
          console.log("DELETE TRIGIRED!!!!!");
          await deleteSleeve(sleeveId, {reason: dialogStore.reason.trim()});
          dialogStore.openAlert({ title: 'Geschafft!', message: 'Der Sleeve ist jetzt weg. Platz für Neues!', color: 'success', confirmText: 'OK',onConfirm: () => {
            router.back();
          } })
        } catch (error_: unknown) {
          if (isAxiosError(error_)) {
            const message = error.value = error_.response?.data.message;
            dialogStore.openAlert({ title: 'Error', message: message, color: 'warning'})
          }
        } finally {
          isLoading.stopLoading();
        }
      },
      onCancel: () => {},
    });
  }

  onMounted(fetchSleeves);

  watch(() => route.query.sleeveSequence,

        (newSeq, _oldSeq) => {
          const seqNumber = Number(newSeq)
          if (Number.isNaN(seqNumber)) {
            return;
          }
          searchValue.value = seqNumber
          fetchSleeves();
        },
  )
</script>

<template>
   <v-sheet class="mx-auto my-6" :max-width="1700" rounded elevation="2">
    <v-container max-width="1700">
      <SleeveTable
        :is-admin="isAdmin"
        :search-value="searchValue"
        :sleeves="sleeveData"
        @delete="onDelete"
        @edit="onEdit"
        @redirect="onRedirect"
        @search="onSearch"
      />
    </v-container>
  </v-sheet>
</template>
