"use client"
import { APP_CONFIG } from '@/shared/configs/appConfig';
import { aqModuleIdEnum } from '@aq-fe/core-ui/shared/consts/enum/aqModuleIdEnum';
import { useLoadAxiosConfig } from '@aq-fe/core-ui/shared/hooks/useLoadAxiosConfig';
import CustomProvider from '@aq-fe/core-ui/shared/providers/CustomProvider';
import { useProjectInfoStore } from '@aq-fe/core-ui/shared/stores/useProjectInfoStore';
import { DotWave } from 'ldrs/react';
import 'ldrs/react/DotWave.css';
import { ReactNode, useEffect } from 'react';

export default function Provider({ children }: { children?: ReactNode }) {
    const projectInfoStore = useProjectInfoStore()
    const { flag: isReady } = useLoadAxiosConfig({ prefix: APP_CONFIG.alias, aqModule: APP_CONFIG.aqModule });

    useEffect(() => {
        // NOTE: Set giá trị AQ module hiện tại đang
        // NOTE: hỗ trợ cho phần tạo tài khoản update 09/09/2025
        projectInfoStore.setProperty("aqModuleId", aqModuleIdEnum.SAE)
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
        <CustomProvider>
            {children}
        </CustomProvider>
    )
}

