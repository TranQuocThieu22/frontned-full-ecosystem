"use client"
import { aqModuleIdEnum } from '@aq-fe/core-ui/shared/consts/enum/aqModuleIdEnum';
import { useLoadAxiosConfig } from '@aq-fe/core-ui/shared/hooks/useLoadAxiosConfig';
import { useProjectInfoStore } from '@aq-fe/core-ui/shared/stores/useProjectInfoStore';
import { DotWave } from 'ldrs/react';
import 'ldrs/react/DotWave.css';
import { ReactNode, useEffect } from 'react';
import { APP_CONFIG } from '../configs/appConfig';
import { AuthProvider } from './AuthProvider';
import MyMantineProvider from './MyMantineProvider';
import MyReactQueryProvider from './MyReactQueryProvider';

export default function Provider({ children }: { children?: ReactNode }) {
    const projectInfoStore = useProjectInfoStore()
    const { flag: isReady } = useLoadAxiosConfig({ prefix: APP_CONFIG.alias, aqModule: APP_CONFIG.aqModule });

    useEffect(() => {
        // Set giá trị AQ module hiện tại đang 
        // hỗ trợ cho phần tạo tài khoản update 08/09/2025
        projectInfoStore.setProperty("aqModuleId", aqModuleIdEnum.SRM)
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
            <MyMantineProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </MyMantineProvider>
        </MyReactQueryProvider>
    )
}
