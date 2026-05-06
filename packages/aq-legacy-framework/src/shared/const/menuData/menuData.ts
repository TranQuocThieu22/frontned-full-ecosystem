import { I_BasicAppShell_LinkItem } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomBasicAppShell/types";
import { menuDataObject } from "@aq-fe/aq-legacy-framework/shared/const/object/menuDataObject";

export const menuData: I_BasicAppShell_LinkItem[] = [
  menuDataObject.managementSystem(),
  menuDataObject.documentManagement(),
  menuDataObject.systemCatalog()
];
