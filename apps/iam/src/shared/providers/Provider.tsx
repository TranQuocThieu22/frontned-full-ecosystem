"use client"

import { useLoadAxiosConfig } from "@aq-fe/core-ui/shared/hooks/useLoadAxiosConfig";
import CustomProvider from "@aq-fe/core-ui/shared/providers/CustomProvider";
import { DotWave } from "ldrs/react";
import { ReactNode } from "react";
import { appConfig } from "../configs/appConfig";
import { useTokenAutoRefresh } from "../hooks/useTokenAutoRefresh";


export default function Provider({ children }: { children?: ReactNode }) {
    const { flag: isReady } = useLoadAxiosConfig({ aqModule: appConfig.aqModule, prefix: appConfig.alias });
    // Proactive token refresh — only runs after baseURL is configured
    useTokenAutoRefresh();

    if (!isReady) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <DotWave size="70" speed="1" color="gray" />
            </div>
        );
    }

    return <CustomProvider>{children}</CustomProvider>;
}
