import { MantineSize } from "@mantine/core";

export type T0MANTINE_SIZE = number | MantineSize | (string & {}) | undefined;
export type T0CRUD =
    "default"
    | "create"
    | "update"
    | "delete"
    | "deleteMultiple"
    | "save"
    | "createMultiple"
    | "check"
    | "import"
    | "print"
    | "export"
    | "select"
    | "cancel"
