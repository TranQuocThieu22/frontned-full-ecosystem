"use client"
import { adminMenuData } from "@/shared/consts/menuData/adminMenu";
import { PageNameLanguageKey } from "@/shared/types/PageNameLanguageKey";
import { AppLayout } from "@aq-fe/core-ui/features/AppLayout/components/AppLayout";
import { assignIdsAndOrdersDFS, createMenuDataLookupMap } from "@aq-fe/core-ui/features/AppLayout/services/MenuItemService";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

assignIdsAndOrdersDFS(adminMenuData);
const menuLookupMap = createMenuDataLookupMap(adminMenuData);

export default function Layout({ children }: { children?: ReactNode }) {
  const { t } = useTranslation(['app']);

  return (
    <>
      <AppLayout<PageNameLanguageKey>
        appTitle={t('app:BASE_APP_TITLE')}
        appVersion={"v0.0.2-18.11.25"}
        navBarMenuData={adminMenuData}
        menuLookupMap={menuLookupMap}
      >
        {children}
      </AppLayout>
    </>
  )
}


