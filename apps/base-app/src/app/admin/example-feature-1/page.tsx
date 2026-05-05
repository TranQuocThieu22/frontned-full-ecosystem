'use client'
import { Box, Button, Group, Paper, Text } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

export default function Page() {
    const { t } = useTranslation(['feature']);
    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
        HTMLDivElement,
        HTMLDivElement
    >();
    return (
        <>
            <Text c={'dimmed'}>{t('feature:EXAMPLE_FEATURE.TITLE')}</Text >
            <Group justify="center">
                <Paper ref={scrollableRef} h={300} style={{ overflowY: 'scroll', flex: 1 }}>
                    <Box pt={260} pb={450}>
                        <Paper
                            ref={targetRef}
                            p="xl"
                            style={{
                                backgroundColor: 'var(--mantine-color-blue-light)',
                                width: '100%',
                            }}
                        >
                            <Text>Scroll me into view</Text>
                        </Paper>
                    </Box>
                </Paper>
                <Button onClick={() => scrollIntoView()}>Scroll to target</Button>
            </Group>
        </>
    )
}