<!-- ConfigurableDialog.vue -->
<template>
  <v-dialog v-model="dialog.isVisible" width="auto">
    <v-card
      max-width="400"
      :prepend-icon="dialog.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'"
      :text="dialog.message"
      :title="dialog.title"
    >
      <template #actions>
        <v-spacer />

        <!-- Cancel button, shown only if cancelText is set -->
        <v-btn
          v-if="dialog.cancelText"
          :color="dialog.color"
          variant="tonal"
          @click="dialog.cancel"
        >
          {{ dialog.cancelText }}
        </v-btn>

        <!-- Confirm button -->
        <v-btn
          :color="dialog.color"
          variant="tonal"
          @click="dialog.confirm"
        >
          {{ dialog.confirmText }}
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { useDialogStore } from '@/stores/dialogStore'

  const dialog = useDialogStore()
</script>
