/* eslint-disable @stylistic/semi */
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'
import VueKeycloak from '@dsb-norge/vue-keycloak-js'
import router from '../router'
import pinia from '../stores'

import { keycloakOptions } from './keycloak'
// Plugins
import vuetify from './vuetify'

export const IsAdminKey = Symbol('isAdmin');
const isAdmin = ref(false);
const isKeycloakReady = ref(false);

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia);

  router.beforeEach((to, from, next) => {
    if (to.meta.public) {
      return next();
    }

    if (!isKeycloakReady.value) {
      return;
    }

    if (to.meta.requiresAdmin && !isAdmin.value) {
      return next('/');
    }

    next();
  });

  app.use(VueKeycloak, {
    ...keycloakOptions,
    onReady: keycloak => {
      isAdmin.value = keycloak?.hasResourceRole?.('admin') ?? false;
      app.provide(IsAdminKey, readonly(isAdmin));

      isKeycloakReady.value = true;

      const intendedPath = window.location.pathname + window.location.search;
      router.push(intendedPath);
    },
  });
}
