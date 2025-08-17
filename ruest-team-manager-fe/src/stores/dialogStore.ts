// src/stores/dialogStore.ts
import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", () => {
  const isVisible = ref(false);
  const title = ref("");
  const message = ref("");
  const color = ref<"success" | "error" | "warning" | "info">("info");
  const confirmText = ref("OK");
  const cancelText = ref("");
  const requiresReason = ref(false);
  const reason = ref("");
  const onConfirm = ref<() => void>();
  const onCancel = ref<() => void>();

  function openAlert(opts: {
    title: string;
    message: string;
    color?: typeof color.value;
    confirmText?: string;
    onConfirm?: () => void;
  }) {
    title.value = opts.title;
    message.value = opts.message;
    color.value = opts.color ?? "success";
    confirmText.value = opts.confirmText ?? "OK";
    cancelText.value = "";
    requiresReason.value = false
    onConfirm.value = () => {
      opts.onConfirm?.();
      hide();
    };
    onCancel.value = undefined;
    isVisible.value = true;
  }

  function openConfirm(opts: {
    title: string;
    message: string;
    color?: typeof color.value;
    confirmText?: string;
    cancelText?: string;
    requiresReason?: boolean;
    reason?: string;
    onConfirm: (reason: string) => void;
    onCancel?: () => void;
  }) {
    title.value = opts.title;
    message.value = opts.message;
    color.value = opts.color ?? "warning";
    confirmText.value = opts.confirmText ?? "Yes";
    cancelText.value = opts.cancelText;
    requiresReason.value = opts.requiresReason;
    reason.value = opts.reason;
    onConfirm.value = () => {
      opts.onConfirm(reason.value);
      hide();
    };
    onCancel.value = () => {
      opts.onCancel?.();
      hide();
    };
    isVisible.value = true;
  }

  function confirm() {
    onConfirm.value?.();
  }
  function cancel() {
    onCancel.value?.();
  }
  function hide() {
    isVisible.value = false;
    requiresReason.value = false;
    reason.value = "";
  }

  return {
    isVisible,
    title,
    message,
    color,
    confirmText,
    cancelText,
    reason,
    requiresReason,

    openAlert,
    openConfirm,
    confirm,
    cancel,
    hide,
  };
});
