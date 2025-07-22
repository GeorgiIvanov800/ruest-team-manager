<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import AppAvatar from '@/components/AppAvatar.vue'
  import { IsAdminKey } from '@/plugins'

  const isAdmin = inject(IsAdminKey, false)
  const router = useRouter()

  function goHome () {
    router.push('/')
  }

  function goToCreateSleeve () {
    router.push('/sleeves/create')
  }
</script>

<template>
  <v-app-bar
    class="px-4"
    color="primary"
    elevation="4"
    height="60"
  >

    <v-btn icon @click="goHome">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-tooltip v-if="isAdmin" bottom>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          @click="goToCreateSleeve"
        >
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </template>
      <span>Neu Sleeve</span>
    </v-tooltip>
    <v-app-bar-title class="text-h6 text-white">
      Rüst Team Manager
    </v-app-bar-title>

    <AppAvatar />
  </v-app-bar>
</template>

<style scoped>
.v-icon {
  font-size: 34px;

}
</style>
