<!-- eslint-disable @stylistic/semi -->
<script setup lang="ts">
  import { useKeycloak } from '@dsb-norge/vue-keycloak-js'

  const keycloak = useKeycloak();
  const fullName: string = keycloak.fullName!;

  function getInitials (fullName: string): string {
    return fullName.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
  }

  const nameInitials: string = getInitials(fullName);

  function onLogout (): void {
    keycloak.keycloak?.logout({
      redirectUri: window.location.origin + '/'
    });
  }
</script>

<template>
  <v-menu min-width="200px">
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="white" size="large">
          <span class="text-h5">{{ nameInitials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <h3>{{ keycloak.fullName }}</h3>
          <v-divider class="my-3" />
          <v-btn rounded variant="text" @click="onLogout">
            Ausloggen
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
