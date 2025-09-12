<route lang="json">
{
  "meta": {
    "requiresAdmin": true
  }
}
</route>
<script setup lang="ts">
import {
  Pageable,
  PagedModelSleeveArchiveResponse,
  SleeveArchiveResponse,
  SleeveResponseTypeEnum,
} from "@/openapi";
import { getArchivedSleeves } from "@/services/sleeveService";
import { useLoadingStore } from "@/stores/loadingStore";
import { SleeveTypeDE } from "@/util/translate-types";
import { isAxiosError } from "axios";
import { format } from "date-fns";

const items = ref<SleeveArchiveResponse[]>([]);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const itemsPerPage = ref(10);
const sortBy = ref([{ key: "deletedAt", order: "desc" }]);

const isLoading = useLoadingStore();
const error = ref<string | null>(null);

async function fetchArchivedSleeves() {
  isLoading.startLoading();

  try {
    const sortParam = sortBy.value.length
      ? [`${sortBy.value[0].key},${sortBy.value[0].order}`]
      : ["deletedAt,desc"];

    const params: Pageable = {
      page: page.value - 1,
      size: itemsPerPage.value,
      sort: sortParam,
    };
    const data = await getArchivedSleeves(params);
    items.value = data.content ?? [];
    totalItems.value = data.page?.totalElements ?? items.value.length;
  } catch (error_: unknown) {
    if (isAxiosError(error_)) {
      error.value = error_.message;
    }
  } finally {
    isLoading.stopLoading();
  }
}

const headers = [
  { title: "Satz Nummer", key: "printingSetNumber", sortable: false },
  { title: "Sleeve Nummer", key: "sleeveNumber",sortable: false  },
  { title: "Motiv", key: "design", sortable: false  },
  { title: "Farbe", key: "color", sortable: false  },
  { title: "Hersteller", key: "manufacturer", sortable: false  },
  { title: "Zahnrad", key: "gear", sortable: false  },
  { title: "Umfang", key: "circumference", sortable: false  },
  { title: "Breite", key: "width", sortable: false  },
  { title: "Type", key: "type", sortable: false  },
  { title: "Entsorgt von", key: "deletedByName", sortable: false  },
  { title: "Entsorgt am", key: "deletedAt", sortable: true },
  { title: "Entsorgungsgrund", key: "deleteReason", sortable: false  },
];

const translateSleeveType = (
  type: SleeveResponseTypeEnum | undefined
): string => {
  if (type === undefined) {
    return "N/A";
  }
  return SleeveTypeDE[type] || type;
};

onMounted(fetchArchivedSleeves);
</script>

<template>
  <v-sheet class="mx-auto my-6" :max-width="1700" rounded elevation="2">
    <v-data-table-server
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      item-key="id"
      density="compact"
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

      <template #item.deletedAt="{ item }">
        {{ format(item.deletedAt, "dd/MM/yyyy") }}
      </template>

      <template #loading><v-skeleton-loader type="table-row@5" /></template>
      <template #no-data><div class="pa-4">Keine Entsorgte Sleeves gefunden</div></template>
    </v-data-table-server>
  </v-sheet>
</template>
