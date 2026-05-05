import { CRUD_TYPES } from "@/data/constants/types";
import { MantineSize } from "@mantine/core";

export type T0MANTINE_SIZE = number | MantineSize | (string & {}) | undefined;
export type T0CRUD = "default" | "create" | "update" | "delete" | "save" | "createMultiple" | "check" | "import" | "print" | "cancel" | "export" | "select";
export type CRUDType = typeof CRUD_TYPES[keyof typeof CRUD_TYPES];
export type NotificationType = 'success' | 'error' | 'info' | 'warning';
