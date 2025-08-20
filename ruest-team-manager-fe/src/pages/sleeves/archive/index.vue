<route lang="json">
{
  "meta": {
    "requiresAdmin": true
  }
}
</route>
<script setup lang="ts">

import { Pageable, PagedModelSleeveArchiveResponse, SleeveArchiveResponse, SleeveResponseTypeEnum } from "@/openapi";
import { getArchivedSleeves } from "@/services/sleeveService";
import { useLoadingStore } from "@/stores/loadingStore";
import { SleeveTypeDE } from "@/util/translate-types";
import { isAxiosError } from "axios";
import { format } from "date-fns";

const items = ref<SleeveArchiveResponse[]>([]);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const itemsPerPage= ref(10);
const sortBy = ref([{key: 'deletedAt', order: 'desc'}]);

const isLoading = useLoadingStore();
const error = ref<string | null>(null);


async function fetchArchivedSleeves() {
  isLoading.startLoading();

  try {

    const sortParam = sortBy.value.length
    ? [`${sortBy.value[0].key},${sortBy.value[0].order}`]
    : ['deletedAt,desc'];

    const params: Pageable = {
      page: page.value - 1,
      size: itemsPerPage.value,
      sort: sortParam
    }
    const data = await getArchivedSleeves(params);
    items.value = data.content ?? [];
    totalItems.value = data.page?.totalElements ?? items.value.length;


  } catch (error_: unknown) {
    if(isAxiosError(error_)) {
      error.value = error_.message;
    }
  } finally {
    isLoading.stopLoading();
  }
}

const headers = [
  { title: 'Satz Nummer',        key: 'sequenceNumber' },
  { title: 'Sleeve Nummer',     key: 'sleeveNumber' },
  { title: 'Motiv',       key: 'design' },
  { title: 'Farbe',        key: 'color' },
  { title: 'Hersteller', key: 'manufacturer' },
  { title: 'Zahnrad',         key: 'gear' },
  { title: 'Umfang',key: 'circumference' },
  { title: 'Breite',        key: 'width' },
  { title: 'Type',         key: 'type' },
  { title: 'Entsorgt von',   key: 'deletedByName' },
  { title: 'Entsorgt am',   key: 'deletedAt', sortable: true },
  { title: 'Entsorgungsgrund',       key: 'deleteReason' },
];


const translateSleeveType = (type: SleeveResponseTypeEnum | undefined): string => {
    if (type === undefined) {
      return 'N/A';
    }
    return SleeveTypeDE[type] || type;
  };
</script>

<template>
  <v-btn @click="fetchArchivedSleeves">Get Archived Sleeves</v-btn>
  <v-data-table-server
  :headers="headers"
  :items="items"
  :items-length="totalItems"
  :loading="loading"
  v-model:page="page"
  v-model:items-per-page="itemsPerPage"
  item-key="id"
  class="elevation-1"
  >
  <template #top>
      <v-toolbar color="#3085e2" rounded>
        <v-toolbar-title>
          <v-icon color="medium-emphasis" icon="mdi-cog" size="large" start />
          Entsorgte Sleeves
        </v-toolbar-title>
      </v-toolbar>
    </template>
  <template #[`item.type`]="{ item }">
      {{ translateSleeveType(item.type) }}
    </template>
  <!-- Optional: nicer date rendering -->
    <template #item.deletedAt="{ item }">
      {{ format(item.deletedAt, 'dd/MM/yyyy') }}
    </template>


    <template #loading>
      <v-skeleton-loader type="table-row@5" />
    </template>

    <template #no-data>
      <div class="pa-4">No archived sleeves</div>
    </template>
  </v-data-table-server>
</template>
