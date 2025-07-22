/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          'primary': '#4CAF50',
          'secondary': '#388E3C',
          'accent': '#8BC34A',
          'background': '#F5F5F5',
          'surface': '#FFFFFF',
          'text-primary': '#212121',
          'text-secondary': '#757575',
          'info': '#2196F3',
          'success': '#4CAF50',
          'warning': '#FB8C00',
          'error': '#E53935',
        },
      },
    },
  },
})
