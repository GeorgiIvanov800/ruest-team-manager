export declare const useDialogStore: import("pinia").StoreDefinition<"dialog", Pick<{
    isVisible: globalThis.Ref<boolean, boolean>;
    title: globalThis.Ref<string, string>;
    message: globalThis.Ref<string, string>;
    color: globalThis.Ref<"success" | "error" | "warning" | "info", "success" | "error" | "warning" | "info">;
    confirmText: globalThis.Ref<string, string>;
    cancelText: globalThis.Ref<string, string>;
    openAlert: (opts: {
        title: string;
        message: string;
        color?: "success" | "error" | "warning" | "info";
        confirmText?: string;
        onConfirm?: () => void;
    }) => void;
    openConfirm: (opts: {
        title: string;
        message: string;
        color?: "success" | "error" | "warning" | "info";
        confirmText?: string;
        cancelText?: string;
        onConfirm: () => void;
        onCancel?: () => void;
    }) => void;
    confirm: () => void;
    cancel: () => void;
    hide: () => void;
}, "color" | "title" | "isVisible" | "message" | "confirmText" | "cancelText">, Pick<{
    isVisible: globalThis.Ref<boolean, boolean>;
    title: globalThis.Ref<string, string>;
    message: globalThis.Ref<string, string>;
    color: globalThis.Ref<"success" | "error" | "warning" | "info", "success" | "error" | "warning" | "info">;
    confirmText: globalThis.Ref<string, string>;
    cancelText: globalThis.Ref<string, string>;
    openAlert: (opts: {
        title: string;
        message: string;
        color?: "success" | "error" | "warning" | "info";
        confirmText?: string;
        onConfirm?: () => void;
    }) => void;
    openConfirm: (opts: {
        title: string;
        message: string;
        color?: "success" | "error" | "warning" | "info";
        confirmText?: string;
        cancelText?: string;
        onConfirm: () => void;
        onCancel?: () => void;
    }) => void;
    confirm: () => void;
    cancel: () => void;
    hide: () => void;
}, never>, Pick<{
    isVisible: globalThis.Ref<boolean, boolean>;
    title: globalThis.Ref<string, string>;
    message: globalThis.Ref<string, string>;
    color: globalThis.Ref<"success" | "error" | "warning" | "info", "success" | "error" | "warning" | "info">;
    confirmText: globalThis.Ref<string, string>;
    cancelText: globalThis.Ref<string, string>;
    openAlert: (opts: {
        title: string;
        message: string;
        color?: "success" | "error" | "warning" | "info";
        confirmText?: string;
        onConfirm?: () => void;
    }) => void;
    openConfirm: (opts: {
        title: string;
        message: string;
        color?: "success" | "error" | "warning" | "info";
        confirmText?: string;
        cancelText?: string;
        onConfirm: () => void;
        onCancel?: () => void;
    }) => void;
    confirm: () => void;
    cancel: () => void;
    hide: () => void;
}, "openAlert" | "openConfirm" | "confirm" | "cancel" | "hide">>;
