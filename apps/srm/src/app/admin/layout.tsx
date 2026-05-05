'use client'
import { menuData } from "@/shared/consts/data/menuData";
import AcademicYearSelect from "@/shared/features/AcademicYear/AcademicYearSelect";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    const router = useRouter()
    const authenticateStore = useAuthenticateStore()
    useEffect(() => {
        if (authenticateStore.state.token == undefined || authenticateStore.state.token == "") {
            router.push("/auth/login")
        }
    }, [router])
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


