'use client';

import { Box, Divider, Group, Switch, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useRightSideNavbarSetting } from "@aq-fe/aq-legacy-framework/shared/hooks/useRightNavbarSetting";

export function RightSideNavbarSettingUI(props: ReturnType<typeof useRightSideNavbarSetting>) {
    const { t } = useTranslation(['coreFeature']);

    return (
        <>
            <Box>
                <Group wrap="nowrap" gap={8} mb={-8}>
                    <IconSettings size={16} stroke={2} color="gray" />
                    <Text size="xs" fw={500}>{t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.CONFIG_RIGHT_NAVBAR.TITLE')}</Text>
                </Group>
                <Divider mb={16} />

                <Switch
                    size="xs"
                    checked={props.enableScrollEffect}
                    onChange={(e) => props.setEnableScrollEffect(e.currentTarget.checked)}
                    label={t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.CONFIG_RIGHT_NAVBAR.ENABLE_SCROLL_EFFECT')}
                />

                <Switch
                    mt={12}
                    size="xs"
                    checked={props.enableConnectorLines}
                    onChange={(e) => props.setEnableConnectorLines(e.currentTarget.checked)}
                    label={t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.CONFIG_RIGHT_NAVBAR.ENABLE_CONNECTOR_LINES')}
                />

                <Switch
                    mt={12}
                    size="xs"
                    checked={props.enableRoundedCorner}
                    onChange={(e) => props.setEnableRoundedCorner(e.currentTarget.checked)}
                    label={t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.CONFIG_RIGHT_NAVBAR.ENABLE_ROUNDED_CORNER')}
                />

                <Switch
                    mt={12}
                    size="xs"
                    checked={props.showGroupDivider}
                    onChange={(e) => props.setShowGroupDivider(e.currentTarget.checked)}
                    label={t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.CONFIG_RIGHT_NAVBAR.SHOW_GROUP_DIVIDER')}
                />

                <Switch
                    mt={12}
                    size="xs"
                    checked={props.highlightFeature}
                    onChange={(e) => props.setHighlightFeature(e.currentTarget.checked)}
                    label={t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.CONFIG_RIGHT_NAVBAR.HIGHLIGHT_FEATURE')}
                />

                <Switch
                    mt={12}
                    size="xs"
                    checked={props.showIndex}
                    onChange={(e) => props.setShowIndex(e.currentTarget.checked)}
                    label={t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.CONFIG_RIGHT_NAVBAR.SHOW_INDEX')}
                />
            </Box>
        </>
    );
}