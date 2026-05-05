import { MantineSize } from "@mantine/core";

export type mantineSizeType = number | MantineSize | (string & {}) | undefined;
export type tempStatusType = "default" | "created" | "updated" | "deleted"
export type languageType = "vi" | 'en'
export type formValuesType<T> = Partial<Record<keyof T, any>>;


export interface ModalStackReturnType<T extends string> {
    state: Record<T, boolean>;
    open: (id: T) => void;
    close: (id: T) => void;
    toggle: (id: T) => void;
    closeAll: () => void;
    register: (id: T) => {
        opened: boolean;
        onClose: () => void;
        stackId: T;
    };
}