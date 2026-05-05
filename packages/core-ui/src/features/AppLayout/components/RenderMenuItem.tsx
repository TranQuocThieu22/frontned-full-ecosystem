'use client';
import { NavbarMenuData } from "@aq-fe/core-ui/shared/interfaces/NavbarMenuData";
import { useRightSideNavbarStore } from "@aq-fe/core-ui/shared/stores/useRightSideNavbarStore";
import { Box, Divider, Group, NavLink, Text, useComputedColorScheme } from "@mantine/core";
import { IconCaretRightFilled, IconChevronRight, IconChevronRightPipe, IconPoint, IconPointFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { ItemConnector } from "./ItemConnector";
import styles from '../styles/RenderMenuItem.module.css'

interface RenderMenuItemProps<TPageNameLanguageKey> {
    item: NavbarMenuData<TPageNameLanguageKey>;
    isLast: boolean;
    scrollTargetRef?: React.Ref<any>;
    enableConnectorLines?: boolean;
    roundedCorner?: boolean;
    showGroupDivider?: boolean;
    highlightFeature?: boolean;
    showIndex?: boolean;
    childrenLevel?: number;
    onClickNewDimensionItem?: (item: NavbarMenuData<TPageNameLanguageKey>) => void;
}

export function RenderMenuItem<TPageNameLanguageKey>({
    item, scrollTargetRef, isLast,
    enableConnectorLines = false,
    roundedCorner = false,
    showGroupDivider = true,
    highlightFeature = false,
    showIndex = true,
    childrenLevel = 0,
    onClickNewDimensionItem
}: RenderMenuItemProps<TPageNameLanguageKey>) {
    const mantineDefaultChildOffsetOverwrite = 0;
    const offsetCoefficient = 0;

    const router = useRouter();
    const rightSideNavbarStore = useRightSideNavbarStore();
    const { t } = useTranslation()
    const theme = useComputedColorScheme();

    const getItemLabel = (menuItem: NavbarMenuData<TPageNameLanguageKey>) => {
        const name = menuItem.customItemName ?? (menuItem.itemNameLanguageKey ? t(`${menuItem.itemNameLanguageKey}`) : '');

        if (showIndex) {
            return [menuItem.displayOrder, name].filter(Boolean).join(' ');
        }
        return name
    }

    const handleOnClickLinkItem = (item: NavbarMenuData<TPageNameLanguageKey>) => {
        rightSideNavbarStore.setCurrentItemId(item.id ?? null);
        router.push(item.route ?? '/');
    }

    const handleonClickNewDimensionItem = (item: NavbarMenuData<TPageNameLanguageKey>) => {
        rightSideNavbarStore.setCurrentItem(item);
        rightSideNavbarStore.pushItemToStack(item);
        item && onClickNewDimensionItem && onClickNewDimensionItem(item)
    }

    switch (item.itemType) {
        case 'title-with-dropdown':
            return (
                <>
                    <NavLink
                        ref={item.id === rightSideNavbarStore.getCurrentItemId() ? scrollTargetRef : undefined}
                        childrenOffset={mantineDefaultChildOffsetOverwrite}
                        label={(
                            <Group gap={4} wrap="nowrap">
                                <Text
                                    fz={16} fw={400}
                                    className={styles.titleWithDropdown}>
                                    {getItemLabel(item)}
                                </Text>
                            </Group>
                        )}
                        rightSection={<IconCaretRightFilled size={16} stroke={1} />}
                        defaultOpened={false}
                        data-menu-have-dropdown
                        data-children-menu-level={childrenLevel}
                    >
                        {item.items?.map((children, index) => (
                            <ItemConnector
                                itemId={children.id}
                                isLast={index === item.items!.length - 1}
                                itemType={children.itemType}
                                enableConnectorLines={enableConnectorLines}
                                roundedCorner={roundedCorner}
                                offSetCoefficient={offsetCoefficient}
                                extendHorizontalLine={!(rightSideNavbarStore.getCurrentItemId() === children.id)}
                            >
                                <React.Fragment key={index}>
                                    <RenderMenuItem
                                        item={children} scrollTargetRef={scrollTargetRef}
                                        isLast={index === (item.items?.length ?? 0) - 1}
                                        enableConnectorLines={enableConnectorLines}
                                        roundedCorner={roundedCorner}
                                        showGroupDivider={showGroupDivider}
                                        highlightFeature={highlightFeature}
                                        showIndex={showIndex}
                                        childrenLevel={childrenLevel + 1}
                                        onClickNewDimensionItem={onClickNewDimensionItem}
                                    />
                                </React.Fragment>
                            </ItemConnector>
                        ))}
                    </NavLink>
                    {(showGroupDivider && !isLast) && <Divider my="2" mx="8" size="xs" />}
                </>
            );

        case 'section':
            return (
                <>
                    <NavLink
                        ref={item.id === rightSideNavbarStore.getCurrentItemId() ? scrollTargetRef : undefined}
                        childrenOffset={mantineDefaultChildOffsetOverwrite}
                        label={(
                            <Group gap={4} wrap="nowrap">
                                <Text
                                    fz={16} fw={400} className={styles.section}>
                                    {getItemLabel(item)}
                                </Text>
                            </Group >
                        )}
                        rightSection={<></>}
                        opened={true}
                        data-children-menu-level={childrenLevel}
                    >
                        {item.items?.map((children, index) => (
                            <>
                                <ItemConnector
                                    itemId={children.id}
                                    isLast={index === item.items!.length - 1}
                                    itemType={children.itemType}
                                    enableConnectorLines={enableConnectorLines}
                                    roundedCorner={roundedCorner}
                                    offSetCoefficient={offsetCoefficient}
                                    extendHorizontalLine={!(rightSideNavbarStore.getCurrentItemId() === children.id)}
                                >
                                    <React.Fragment key={index}>
                                        <RenderMenuItem
                                            item={children} scrollTargetRef={scrollTargetRef}
                                            isLast={index === (item.items?.length ?? 0) - 1}
                                            enableConnectorLines={enableConnectorLines}
                                            roundedCorner={roundedCorner}
                                            showGroupDivider={showGroupDivider}
                                            highlightFeature={highlightFeature}
                                            showIndex={showIndex}
                                            childrenLevel={childrenLevel + 1}
                                            onClickNewDimensionItem={onClickNewDimensionItem}
                                        />
                                    </React.Fragment>
                                </ItemConnector>
                            </>
                        ))}
                        {(showGroupDivider && !isLast) && <Divider my="2" mx={12} mb={12} size="xs" variant="dashed" />}
                    </NavLink>
                </>
            );

        case 'section-with-dropdown':
            return (
                <>
                    <NavLink
                        ref={item.id === rightSideNavbarStore.getCurrentItemId() ? scrollTargetRef : undefined}
                        childrenOffset={mantineDefaultChildOffsetOverwrite}
                        label={(
                            <Group gap={4} wrap="nowrap">
                                <Text
                                    fz={16} fw={400} className={styles.sectionWithDropdown}>
                                    {getItemLabel(item)}
                                </Text>
                            </Group>
                        )}
                        rightSection={<IconChevronRight size={16} stroke={1.5} />}
                        defaultOpened={true}
                        data-menu-have-dropdown
                        data-children-menu-level={childrenLevel}
                    >
                        {item.items?.map((children, index) => (
                            <>
                                <ItemConnector
                                    itemId={children.id}
                                    isLast={index === item.items!.length - 1}
                                    itemType={children.itemType}
                                    enableConnectorLines={enableConnectorLines}
                                    roundedCorner={roundedCorner}
                                    offSetCoefficient={offsetCoefficient}
                                    extendHorizontalLine={!(rightSideNavbarStore.getCurrentItemId() === children.id)}
                                >
                                    <React.Fragment key={index}>
                                        <RenderMenuItem
                                            item={children} scrollTargetRef={scrollTargetRef}
                                            isLast={index === (item.items?.length ?? 0) - 1}
                                            enableConnectorLines={enableConnectorLines}
                                            roundedCorner={roundedCorner}
                                            showGroupDivider={showGroupDivider}
                                            highlightFeature={highlightFeature}
                                            showIndex={showIndex}
                                            childrenLevel={childrenLevel + 1}
                                            onClickNewDimensionItem={onClickNewDimensionItem}
                                        />
                                    </React.Fragment>
                                </ItemConnector>
                            </>
                        ))}
                        {(showGroupDivider && !isLast) && <Divider my="2" mx={12} mb={12} size="xs" variant="dashed" />}
                    </NavLink>
                </>
            );

        case 'link':
            return (
                <>
                    <NavLink
                        ref={item.id === rightSideNavbarStore.getCurrentItemId() ? scrollTargetRef : undefined}
                        active={rightSideNavbarStore.getCurrentItemId() === item.id}
                        onClick={() => handleOnClickLinkItem(item)}
                        label={(
                            <Group gap={4} wrap="nowrap" pos={'relative'}>
                                {highlightFeature &&
                                    <Box
                                        pos="absolute"
                                        top="0px"
                                        left="-4px"
                                        c={'blue.9'}
                                    >
                                        <IconPoint size={24} stroke={1} />
                                    </Box>
                                }
                                <Text
                                    ml={highlightFeature ? 20 : 0}
                                    fz={14} fw={item.id === rightSideNavbarStore.getCurrentItemId() ? 700 : 400}
                                    c={item.id === rightSideNavbarStore.getCurrentItemId() ? 'blue.8' : 'gray'}
                                    className={styles.link}
                                >
                                    {getItemLabel(item)}
                                </Text>
                            </Group >
                        )}
                        variant="subtle"
                        data-children-menu-level={childrenLevel}
                    />
                </>
            );

        case 'new-dimension':
            return (
                <>
                    <NavLink
                        ref={item.id === rightSideNavbarStore.getCurrentItemId() ? scrollTargetRef : undefined}
                        onClick={() => handleonClickNewDimensionItem(item)}
                        label={(
                            <Group gap={4} wrap="nowrap">
                                <Text fz={16} fw={400} className={styles.newDimension}>
                                    {getItemLabel(item)}
                                </Text>
                            </Group >
                        )}
                        rightSection={<IconChevronRightPipe size={16} stroke={1.5} />}
                        data-children-menu-level={childrenLevel}
                        data-new-dimension-id={item.id}
                    />
                </>
            );
    }
}
