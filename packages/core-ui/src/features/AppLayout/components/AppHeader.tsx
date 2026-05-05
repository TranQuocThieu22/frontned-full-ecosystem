'use client';
import { CustomSwitchTheme } from "@aq-fe/core-ui/shared/components/button/CustomSwitchTheme";
import { LanguageSwitcher } from "@aq-fe/core-ui/shared/components/language/LanguageSwitcher";
import { Burger, Group, Stack, Text } from "@mantine/core";

interface HeadperProps {
    mobileOpened: boolean;
    toggleMobile: () => void;
    desktopOpened: boolean;
    toggleDesktop: () => void;
    appTitle: string;
    appVersion: string;
}

export function AppHeader({
    mobileOpened, toggleMobile,
    desktopOpened, toggleDesktop,
    appTitle, appVersion
}: HeadperProps
) {
    return (
        <>
            <Group h={'100%'} px="md" justify='space-between'>
                <Group>
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" lineSize={2} />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" lineSize={2} />
                    <Stack ml={'12'} gap={'0.005rem'}>
                        {/* todo: set color for appTile to "#525762" and test with dark theme */}
                        <Text size="lg" fw={500}>{appTitle}</Text>
                        <Text size="sm" c={'dimmed'}>{appVersion}</Text>
                    </Stack>
                </Group>
                <Group>
                    <CustomSwitchTheme />
                    <LanguageSwitcher />
                </Group>
            </Group>
        </>
    )
}