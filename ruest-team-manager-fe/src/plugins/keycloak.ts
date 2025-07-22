import type { VueKeycloakOptions } from '@dsb-norge/vue-keycloak-js'

export const keycloakOptions: VueKeycloakOptions = {
  init: {
    onLoad: 'login-required',
    checkLoginIframe: false,
  },
  config: {
    url: 'http://localhost:9090/auth',
    realm: 'ruest-team-manager',
    clientId: 'rtm',
  },
}
