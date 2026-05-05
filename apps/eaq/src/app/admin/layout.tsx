"use client"
import SystemFilter from "@/app/admin/systemConfig/SystemFilter";
import { menuDataVerifyInstitution } from "@/shared/constants/menuData/menuDataVerifyInstitution";
import { menuDataVerifyProgram } from "@/shared/constants/menuData/menuDataVerifyProgram";
import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useStore_Global } from "@/shared/stores/useStore_Global";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import { ReactNode, useEffect } from "react";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Layout({ children }: { children?: ReactNode }) {
    const store = useStore_Global();
    const filterStore = useS_Shared_Filter();

    const standardSetQuery = useCustomReactQuery({
        queryKey: ["standardSetQuery"],
        axiosFn: () => service_EAQStandardSet.GetStandardSets(),
        options: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            // staleTime: Infinity,

        }
    });

    // Load data and initialize defaults
    useEffect(() => {
        if (standardSetQuery.data) {
            filterStore.setStandardSets(standardSetQuery.data);
            filterStore.initializeDefaults();
        }
    }, [standardSetQuery.data, standardSetQuery.dataUpdatedAt]);

    return (
        <CustomBasicAppShell
            logoutRedirect="/auth/login"
            menu={store.state.accreditationType == "Institutional" ? menuDataVerifyInstitution : menuDataVerifyProgram}
            extraTopRight={
                <>
                    <SystemFilter />
                </>
            }
        >
            <CustomPageContent>
                {children}
            </CustomPageContent>
        </CustomBasicAppShell>
    );
}
