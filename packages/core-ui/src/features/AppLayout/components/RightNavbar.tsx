'use client';
import { NavbarMenuData } from "@aq-fe/core-ui/shared/interfaces/NavbarMenuData";
import { useRightSideNavbarStore } from "@aq-fe/core-ui/shared/stores/useRightSideNavbarStore";
import { ActionIcon, AppShell, Box, Button, Divider, Group, Popover, SegmentedControl, Stack, Text } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { IconAdjustments, IconArrowBarLeft, IconFold, IconHomeFilled, IconSearch } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRightSideNavbarSetting } from "../hooks/useRightNavbarSetting";
import { closeDropdownsWithoutActiveChildren, openParentDropdownForDimension, restoreDimensionsForActiveItem } from "../services/FoldButtonService";
import { findMenuItemByURL } from "../services/MenuItemService";
import { RenderMenuItem } from "./RenderMenuItem";
import { RightSideNavbarSettingUI } from "./RightNavbarSetting";

interface RightSideNavbarProps<TPageNameLanguageKey> {
    menuData: NavbarMenuData<TPageNameLanguageKey>[];
    menuLookupMap: Map<string, NavbarMenuData<TPageNameLanguageKey>[]>;
}

export function RightSideNavbar<TPageNameLanguageKey>({
    menuData,
    menuLookupMap
}: RightSideNavbarProps<TPageNameLanguageKey>) {
    const rightNavbarSettings = useRightSideNavbarSetting();
    const [navbarDataDimensions, setNavbarDataDimensions] = useState<NavbarMenuData<TPageNameLanguageKey>[][]>([menuData]);

    const currrentPath = usePathname();
    const { t } = useTranslation(['coreFeature']);
    const rightSideNavbarStore = useRightSideNavbarStore();
    const { scrollIntoView: scrollToCurrentMenuItem, targetRef: targetMenuItem, scrollableRef: rightSideNavbarScrollArea } = useScrollIntoView({
        offset: 160,
    });
    const [foldButtonStateChange, setFoldButtonStateChange] = useState<boolean | undefined>(undefined);
    const [backToPreviousDimensionId, setBackToPreviousDimensionId] = useState<number | undefined>(undefined);

    useEffect(() => {
        let firstActiveItem = findMenuItemByURL(currrentPath, menuLookupMap);
        rightSideNavbarStore.setCurrentItemId(firstActiveItem?.id ?? null);
        rightSideNavbarStore.setCurrentItem(firstActiveItem ?? null);
        setTimeout(() => {
            scrollToCurrentMenuItem();
        }, 0);
    }, []);

    useEffect(() => {
        if (rightSideNavbarStore.getCurrentItemId() === null || rightNavbarSettings.enableScrollEffect === false) return;
        scrollToCurrentMenuItem();
    }, [rightSideNavbarStore.getCurrentItemId()]);

    const scrollToCurrentItem = () => {
        scrollToCurrentMenuItem();
    }

    const onClickSearchButton = () => { }

    const onClickFoldButton = () => {
        const newDimension = restoreDimensionsForActiveItem({ menuData, rightSideNavbarStore });
        if (newDimension) {
            setNavbarDataDimensions(newDimension);
        }
        setFoldButtonStateChange(prev => !prev);
        setBackToPreviousDimensionId(undefined);
    }

    const onClickConfigRightNavbarButton = () => { }

    const handleOnClickNewDimensionItem = (item: NavbarMenuData<TPageNameLanguageKey>) => {
        if (!item.items) return;
        setNavbarDataDimensions([...navbarDataDimensions, item.items]);
        setBackToPreviousDimensionId(undefined);
        setFoldButtonStateChange(undefined);
    }

    const backToPreviousDimension = () => {
        if (navbarDataDimensions.length <= 1) return;
        const menuDimensions = [...navbarDataDimensions];
        menuDimensions.pop();
        setNavbarDataDimensions(menuDimensions);
        const parentDemensionId = rightSideNavbarStore.getLastItemFromStack()?.id;
        setBackToPreviousDimensionId(parentDemensionId ?? 0);
        rightSideNavbarStore.removeLastItemFromStack();
    }

    useEffect(() => {
        if (!navbarDataDimensions) return;
        closeDropdownsWithoutActiveChildren();
        scrollToCurrentItem();
    }, [foldButtonStateChange]);

    useEffect(() => {
        if (!backToPreviousDimensionId || foldButtonStateChange === undefined) return;
        openParentDropdownForDimension(backToPreviousDimensionId);
    }, [backToPreviousDimensionId]);


    return (
        <>
            <AppShell.Section>
                <Group mb={'md'} justify="space-between">
                    <Group
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <Box ml={5}><IconHomeFilled size={24} /></Box>
                        <Text tt="uppercase">{t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.HOME_BUTTON')}</Text>
                    </Group>
                    <Group gap={5}>
                        <ActionIcon variant="light" color="gray" aria-label="Settings" onClick={onClickSearchButton}>
                            <IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon variant="light" color="gray" aria-label="Settings" onClick={onClickFoldButton} >
                            <IconFold style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <Popover width={200} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <ActionIcon variant="light" color="gray" aria-label="Settings" onClick={onClickConfigRightNavbarButton}>
                                    <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown w={280} pb={20} pr={10}>
                                <RightSideNavbarSettingUI {...rightNavbarSettings} />
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                </Group>
                <SegmentedControl
                    mb={4}
                    fullWidth withItemsBorders={false}
                    data={[
                        t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.MENU_TYPE_CONTROL.ALL_FEATURES'),
                        t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.MENU_TYPE_CONTROL.BUSINESS'),
                        t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.MENU_TYPE_CONTROL.PERSONAL')
                    ]}
                />
            </AppShell.Section>
            <AppShell.Section
                grow
                my="xs"
                ref={rightSideNavbarScrollArea}
                style={{ overflowY: 'scroll', wordWrap: 'break-word', flex: 1 }}
            >
                {navbarDataDimensions.length > 1 && (
                    <Stack gap={8} mb={4}>
                        <Button
                            w={'fit-content'}
                            variant="subtle" size="compact-md" color={'indigo'}
                            leftSection={<IconArrowBarLeft size={16} />}
                            onClick={backToPreviousDimension}>
                            {t('coreFeature:APP_LAYOUT.RIGHT_SIDENAVBAR.DIMENSION_BACK_BUTTON')}
                        </Button>
                        <Text ml={8} c={'violet'}>
                            {navbarDataDimensions.length > 1 && (
                                rightSideNavbarStore.getLastItemFromStack()?.customItemName ??
                                t(`${rightSideNavbarStore.getLastItemFromStack()?.itemNameLanguageKey}` as any))
                            }
                        </Text>
                        <Divider my="0" />
                    </Stack>
                )}
                <Box mr={8} >
                    {navbarDataDimensions.at(-1)?.map((level0Item: NavbarMenuData<TPageNameLanguageKey>, index) => (
                        <React.Fragment key={index}>
                            <RenderMenuItem<TPageNameLanguageKey>
                                item={level0Item}
                                isLast={index === (navbarDataDimensions.at(-1)?.length ?? 0) - 1}
                                scrollTargetRef={targetMenuItem}
                                enableConnectorLines={rightNavbarSettings.enableConnectorLines}
                                roundedCorner={rightNavbarSettings.enableRoundedCorner}
                                showGroupDivider={rightNavbarSettings.showGroupDivider}
                                highlightFeature={rightNavbarSettings.highlightFeature}
                                showIndex={rightNavbarSettings.showIndex}
                                onClickNewDimensionItem={(item) => handleOnClickNewDimensionItem(item)}
                            />
                        </React.Fragment>
                    ))}
                </Box>
            </AppShell.Section >
            <AppShell.Section p="md">Navbar footer always at the bottom</AppShell.Section>
        </>
    )
}
