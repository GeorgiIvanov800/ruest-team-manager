<!-- eslint-disable @typescript-eslint/unified-signatures -->
<!-- eslint-disable @stylistic/semi -->
<script setup lang="ts">

  import type { DataTableHeader } from 'vuetify';
  import type { SleeveResponse, SleeveResponseConditionEnum, SleeveResponseTypeEnum } from '@/openapi';
  import { format } from 'date-fns';
  import { SleeveConditionDE, SleeveTypeDE } from '@/util/translate-types';

  const props = defineProps<{
    sleeves: SleeveResponse[] | []
    searchValue: number
    isAdmin: boolean
  }>();

  const EMPTY_MESSAGE = 'Keine Sleeves mit der angegebenen Satznummer gefunden. Bitte versuchen Sie es mit einer anderen Nummer.';

  const localSearchValue = ref<number>(props.searchValue);

  const emit = defineEmits<{
    (e: 'search', value: number): void
    (e: 'redirect'): void
    (e: 'edit', value: number): void
    (e: 'delete', value: number): void
  }>();

  const items = computed(() => props.sleeves);

  const translateSleeveType = (type: SleeveResponseTypeEnum | undefined): string => {
    if (type === undefined) {
      return 'N/A';
    }
    return SleeveTypeDE[type] || type;
  };

  const translateSleeveCondition = (type: SleeveResponseConditionEnum | undefined): string => {
    if (type === undefined) {
      return 'N/A';
    }
    return SleeveConditionDE[type] || type;
  };

  const headers = computed(() => {
    const baseHeaders: DataTableHeader[] = [
      { title: 'Satz Nummer', key: 'sequenceNumber', align: 'start', sortable: false },
      { title: 'Type', key: 'type', align: 'start', sortable: false },
      { title: 'Motiv', key: 'design', align: 'start', sortable: false },
      { title: 'Farbe', key: 'color', align: 'start', sortable: false },
      { title: 'Lager', key: 'warehouse', align: 'start', sortable: false },
      { title: 'Platz', key: 'slot', align: 'start', sortable: false },
      { title: 'Zahnrad', key: 'gear', sortable: false },
      { title: 'Breite', key: 'width', sortable: false },
      { title: 'Sleeve Number', key: 'sleeveNumber', sortable: false },
      { title: 'Datum', key: 'manufactureDate', align: 'end', sortable: true },
    ]
    if (props.isAdmin) {
      baseHeaders.push({ title: 'Actions', key: 'actions', align: 'end', sortable: false })
    }
    return baseHeaders;
  });
</script>

<template>
  <v-data-table-virtual
    :headers="headers"
    hide-default-footer
    item-value="id"
    :items="items"
    :no-data-text="EMPTY_MESSAGE"
    show-expand
  >
    <template #top>
      <v-toolbar color="#3085e2" rounded>
        <v-toolbar-title>
          <v-icon color="medium-emphasis" icon="mdi-cog" size="large" start />
          Sleeves
        </v-toolbar-title>
        <v-btn
          v-if="props.isAdmin"
          border
          class="me-2"
          prepend-icon="mdi-plus"
          rounded="lg"
          text="Neu Sleeve Erstelen"
          @click="emit('redirect')"
        />
      </v-toolbar>
    </template>
    <template #[`item.type`]="{ item }">
      {{ translateSleeveType(item.type) }}
    </template>
    <template #[`item.warehouse`]="{ item }">
      {{ item.warehouse?.name }}
    </template>
    <template #[`item.manufactureDate`]="{ item }">
      {{ format(item.manufactureDate, 'dd/MM/yyyy') }}
    </template>
    <template #[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
      <v-btn
        :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        border
        class="text-none"
        color="medium-emphasis"
        size="small"
        slim
        :text="isExpanded(internalItem) ? 'Einklappen' : 'Mehr Infos'"
        variant="text"
        @click="toggleExpand(internalItem)"
      />
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td class="py-2" :colspan="columns.length">
          <v-sheet border rounded="lg">
            <v-table density="compact">
              <tbody class="bg-surface-light">
                <tr>
                  <th>Anmerkungen</th>
                  <th>Hersteller</th>
                  <th>Zustand</th>
                  <th>Km Stand</th>
                  <th>Status</th>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td>{{ item.notes }}</td>
                  <td>{{ item.manufacturer }}</td>
                  <td>{{ translateSleeveCondition(item.condition) }}</td>
                  <td>{{ item.kmStand }} km</td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </td>
      </tr>
    </template>
    <template #[`item.actions`]="{ item }">
      <div class="d-flex ga-2 justify-end">
        <v-icon
          color="medium-emphasis"
          icon="mdi-pencil"
          size="small"
          @click="emit('edit', item.sleeveNumber!)"
        />

        <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="emit('delete', item.id!)" />
      </div>
    </template>
    <template #tfoot>
      <tr>
        <td>
          <v-number-input
            v-model="localSearchValue"
            class="ma-lg-1 pa-0"
            density="compact"
            hide-details
            placeholder="Satz Nummer"
            variant="outlined"
            @keyup.enter="emit('search', localSearchValue)"
          />
        </td>
        <td>
          <v-btn color="#3085e2" prepend-icon="mdi-magnify" variant="outlined" @click="emit('search', localSearchValue)"> Neu Suchen
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<style scoped>
:deep(.v-number-input__control) {
  display: none !important;
}
</style>
