'use client'
import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Page() {
    const { t } = useTranslation(['app']);
    return (
        <>
            <Text c={'dimmed'}>{t('app:MENU.FEATURE_5')}</Text >
        </>
    )
}