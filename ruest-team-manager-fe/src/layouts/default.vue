<!-- eslint-disable @stylistic/semi -->
<script lang="ts" setup>
  import { useLoadingStore } from '@/stores/loadingStore';

  const store = useLoadingStore();
  const { isLoading } = storeToRefs(store);
</script>

<template>
  <AppHeader />
  <v-main>
    <AppLoader :is-loading="isLoading" />
    <AppDialog />
    <router-view />
  </v-main>
  <AppFooter />
</template>
