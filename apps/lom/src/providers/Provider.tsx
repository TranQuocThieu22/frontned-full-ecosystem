"use client"
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { aqModuleIdEnum } from "@aq-fe/core-ui/shared/consts/enum/aqModuleIdEnum";
import { useLoadAxiosConfig } from "@aq-fe/core-ui/shared/hooks/useLoadAxiosConfig";
import { useProjectInfoStore } from "@aq-fe/core-ui/shared/stores/useProjectInfoStore";
import { DotWave } from "ldrs/react";
import { ReactNode, useEffect } from 'react';
import MyMantineProvider from './MyMantineProvider';
import MyReactQueryProvider from './MyReactQueryProvider';
export default function Provider({ children }: { children?: ReactNode }) {
    const projectInfoStore = useProjectInfoStore()
    const { flag: isReady } = useLoadAxiosConfig({ aqModule: APP_CONFIG.aqModule, prefix: APP_CONFIG.alias });
    useEffect(() => {
        // Set giá trị AQ module hiện tại đang
        //  hỗ trợ cho phần tạo tài khoản update 09/09/2025
        projectInfoStore.setProperty("aqModuleId", aqModuleIdEnum.LOM)
    }, [])
    if (!isReady) return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <DotWave
                size="70"
                speed="1"
                color="gray"
            />
        </div>
    )


    return (
        <MyReactQueryProvider>
            {/* <MyDateProvider> */}
            <MyMantineProvider>
                {children}
            </MyMantineProvider>
            {/* </MyDateProvider> */}
        </MyReactQueryProvider>
    )
}
