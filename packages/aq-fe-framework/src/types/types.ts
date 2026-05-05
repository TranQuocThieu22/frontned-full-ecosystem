import { MantineSize } from "@mantine/core";

export type type_mantineSize = number | MantineSize | (string & {}) | undefined;
export type type_tempStatus = "default" | "created" | "updated" | "deleted"
export type type_language = "vi" | 'en'
export type type_formValues<T> = Partial<Record<keyof T, any>>;


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