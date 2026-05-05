import { I_BasicAppShell_LinkItem } from "@/components/Layouts/BasicAppShell/types";
import { menuDataObject } from "@/shared/consts/menuDataObject";

export const menuData: I_BasicAppShell_LinkItem[] = [
  menuDataObject.managementSystem(),
  menuDataObject.documentManagement(),
  menuDataObject.systemCatalog()
];
