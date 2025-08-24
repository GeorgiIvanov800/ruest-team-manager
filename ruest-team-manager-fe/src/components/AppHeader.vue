<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import AppAvatar from '@/components/AppAvatar.vue'
  import { IsAdminKey } from '@/plugins'

  const isAdmin = inject(IsAdminKey, false)
  const router = useRouter()
  const navMenu = ref(false)

  function goHome () {
    router.push('/');
  }

  function goToCreateSleeve () {
    router.push('/sleeves/create');
  }

  function goToArchiveSleeve() {
    router.push('/sleeves/archive');
  }
</script>

<template>
  <v-app-bar
    class="px-4"
    color="primary"
    elevation="4"
    height="60"
  >

    <v-menu
      v-if="isAdmin"
      v-model="navMenu"
      location="bottom start"
      :close-on-content-click="true"
    >
      <template #activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list density="compact">
        <v-list-item @click="goToCreateSleeve">
          <template #prepend><v-icon>mdi-plus-circle-outline</v-icon></template>
          <v-list-item-title>Sleeve hinzufügen</v-list-item-title>
        </v-list-item>

        <v-list-item @click="goToArchiveSleeve">
          <template #prepend><v-icon>mdi-archive-outline</v-icon></template>
          <v-list-item-title>Entsorgte Sleeves</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


    <v-btn icon @click="goHome">
      <v-icon>mdi-home</v-icon>
    </v-btn>


    <v-app-bar-title class="text-h6 text-white">
      Rüst Team Manager
    </v-app-bar-title>

    <v-spacer />


    <AppAvatar />
  </v-app-bar>
</template>


<style scoped>
.v-icon {
  font-size: 34px;

}
</style>
