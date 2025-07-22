<template>
  <v-footer app class="white--text py-4" color="primary">
    <v-container>
      <v-row justify="end">
        <v-col class="text-md-end" cols="auto">
          <div>© {{ new Date().getFullYear() }} Georgi Ivanov</div>
          <div class="caption tech-stack mt-1">
            Built with Spring (Java) • Vue 3 • Vuetify • Keycloak
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
// няма нужда от скрипт за икони
</script>

<style scoped>
.tech-stack {
  opacity: 0.7;
}
.mt-1 {
  margin-top: 4px;
}
</style>
