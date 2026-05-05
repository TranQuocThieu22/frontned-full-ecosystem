"use client";
import { ReactNode } from "react";
import { adminMenuData } from "../../data/adminMenuData";
import { BasicAppShell, MyPageContent } from "aq-fe-framework/components";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <BasicAppShell isDev={true} menu={adminMenuData}>
      <MyPageContent>
        {children}
      </MyPageContent>
    </BasicAppShell>
  );
}
