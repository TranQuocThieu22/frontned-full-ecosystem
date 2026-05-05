import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import { menuDataObject } from "@aq-fe/core-ui/shared/consts/object/menuDataObject";

export const menuData: I_BasicAppShell_LinkItem[] = [
  menuDataObject.managementSystem(),
  menuDataObject.documentManagement(),
  menuDataObject.systemCatalog()
];
