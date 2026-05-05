'use client'
import { menuData } from "@/shared/consts/data/menuData";
import AcademicYearSelect from "@/shared/features/AcademicYear/AcademicYearSelect";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <CustomBasicAppShell
            menu={menuData}
            extraTopRight={<AcademicYearSelect />}
        >
            <CustomPageContent>
                {children}
            </CustomPageContent>
        </CustomBasicAppShell>
    )
}


