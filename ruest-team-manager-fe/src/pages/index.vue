<!-- eslint-disable @stylistic/semi -->
<script setup lang="ts">

  import type { Router } from 'vue-router';
  import type { ValidationRule } from 'vuetify';
  import type { VForm } from 'vuetify/components';

  const form = ref<InstanceType<typeof VForm> | null>(null);
  const printForm = ref<InstanceType<typeof VForm> | null>(null);
  const searchValue = ref('');
  const printValue = ref('');
  const router: Router = useRouter();

  const numericRules: ValidationRule[] = [
    (value: string): true | string => {
      if (/^[0-9]+$/.test(value)) return true;
      return 'Bitte geben Sie nur Nummern';
    },
  ];

  async function onSearch (): Promise<void> {
    const result = await form.value?.validate();
    if (result?.valid) {
      router.push({ path: '/sleeves', query: { sleeveSequence: searchValue.value } });
    } else {
      return;
    }
  }

  async function onPrint (): Promise<void> {
    const result = await printForm.value?.validate();
    if (result?.valid) {
      router.push({ path: 'sleeves/print', query: { sleeveNumber: printValue.value } });
    }
  }

</script>

<template>
  <v-container class="pa-4 fill-height d-flex align-center justify-center">
    <v-row align="center" class="flex-column" justify="center">
      <v-col cols="12" lg="6" md="8">
        <v-card class="mb-12" elevation="2">
          <v-card-title>
            <v-icon left>mdi-magnify</v-icon>
            Sleeve-Satznummer
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent>
              <v-text-field
                v-model="searchValue"
                clearable
                label="Bitte Sleeve Satznummer Eingeben"
                :rules="numericRules"
                @keyup.enter="onSearch"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              prepend-icon="mdi-magnify"
              rounded="xl"
              size="x-large"
              variant="outlined"
              @click="onSearch"
            >
              Suchen
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card elevation="2">
          <v-card-title>
            <v-icon left>mdi-printer</v-icon>
            Print Sleeve Zettel
          </v-card-title>
          <v-card-text>
            <v-form ref="printForm" @submit.prevent>
              <v-text-field
                v-model="printValue"
                clearable
                label="Bitte Sleeve Nummer Eingeben"
                :rules="numericRules"
                @keyup.enter="onPrint"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="secondary"
              prepend-icon="mdi-printer"
              rounded="xl"
              size="x-large"
              variant="outlined"
              @click="onPrint"
            > Print</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
