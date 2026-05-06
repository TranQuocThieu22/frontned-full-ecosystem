"use client";

import {
    ActionIcon, AppShell,
    Box,
    Group, Image, ScrollArea,
    Space,
    Text, Tooltip,
    useComputedColorScheme
} from "@mantine/core";
import { useFavicon, useMediaQuery } from "@mantine/hooks";
import {
    IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconLibraryMinus
} from "@tabler/icons-react";
import { usePathname } from "next/navigation.js";
import { useEffect, useMemo, useState } from "react";

import { CustomAppSpotlight } from "@aq-fe/aq-legacy-framework/shared/components/extension/CustomAppSpotlight";
import RenderNavLinks from "./RenderNavLinks";

import { usePermissionStore } from "@aq-fe/aq-legacy-framework/shared/stores/usePermissionStore";
import { useBasicAppShellStore } from "./useBasicAppShellStore";

import { AuthenticateLogout } from "@aq-fe/aq-legacy-framework/features/authenticate/AuthenticateLogout";
import SessionUserInfo from "@aq-fe/aq-legacy-framework/features/basicAppShell/SessionUserInfo";
import { UserAvatarMenu } from "@aq-fe/aq-legacy-framework/features/basicAppShell/UserAvatarMenu";
import { pageService } from "@aq-fe/aq-legacy-framework/shared/APIs/pageService";
import { CustomSwitchTheme } from "@aq-fe/core-ui/shared/components/button/CustomSwitchTheme";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { useGetAQModuleQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/useGetAQModuleQuery";
import { CustomBasicAppShellProps, I_BasicAppShell_LinkItem } from "./types";
import {
    filterMenuByPermission,
    findBreadcrumbPath,
    getReadablePageIdSet
} from "./utils";

// ===== Helper function =====
function base64ToFaviconUrl(base64: string, ext: string): string {
    const byteCharacters = atob(base64.trim());
    const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));
    const blob = new Blob([byteArray], { type: `image/${ext}` });
    return URL.createObjectURL(blob);
}
function cleanPath(path: string): string {
    // Bỏ "/" ở đầu để dễ xử lý
    const cleaned = path.startsWith("/") ? path.slice(1) : path;
    const parts = cleaned.split("/");

    // Xoá segment đầu tiên
    parts.shift();

    // Ghép lại
    let result = parts.join("/");

    // Xoá "/" cuối nếu có
    if (result.endsWith("/")) {
        result = result.slice(0, -1);
    }

    return result;
}

export function CustomBasicAppShell({
    children,
    menu,
    extraTopRight,
    title,
    logoutRedirect,
    isDev,
    disablePageContentQuery,
    disableGetAQModuleQuery,
}: CustomBasicAppShellProps) {
    isDev = process.env.NEXT_PUBLIC_IS_DEV == "1"
    const colorScheme = useComputedColorScheme("light")
    const pathname = usePathname();
    const media = useMediaQuery("(min-width: 72em)");
    const enablePageContentQuery = !disablePageContentQuery && process.env.NEXT_PUBLIC_AQMODULE !== "iam"
    const pageContentQuery = useLegacyReactQuery({
        queryKey: ['pageContents'],
        axiosFn: () => pageService.getAll(),
        options: {
            enabled: enablePageContentQuery
        }
    })

    const permissionStore = usePermissionStore();
    const appShellStore = useBasicAppShellStore();
    const { data: moduleData } = useGetAQModuleQuery({
        enabled: !disableGetAQModuleQuery,
    });

    const [faviconUrl, setFaviconUrl] = useState<string>("");
    const [isLoadingPermission, setIsLoadingPermission] = useState(true);
    const [isAccessible, setIsAccessible] = useState(false);

    const readablePageIds = useMemo(
        () => getReadablePageIdSet(permissionStore.state.permission || []),
        [permissionStore.state.permission]
    );

    const filteredMenu = useMemo(
        () => {
            if (permissionStore.state.isSuperAdmin) return menu
            if (isDev) return menu
            return filterMenuByPermission(menu, readablePageIds)
        },
        [menu, readablePageIds]
    );

    const allChildItems = useMemo(() => {
        const result: I_BasicAppShell_LinkItem[] = [];

        const extract = (items: I_BasicAppShell_LinkItem[]) => {
            items.forEach(item => {
                if (item.link) result.push(item);
                if (item.links) extract(item.links);
            });
        };
        extract(filteredMenu);
        return result;
    }, [filteredMenu]);

    useFavicon(faviconUrl);

    // ===== Effects =====

    // Set thông tin module
    useEffect(() => {
        if (!moduleData) return;

        const { code, name, faviconFileDetail, logoFileDetail } = moduleData;

        appShellStore.setProperty("moduleCode", code);
        appShellStore.setProperty("moduleName", name);
        appShellStore.setProperty("faviconFileDetail", faviconFileDetail);
        appShellStore.setProperty("logoFileDetail", logoFileDetail);

        if (faviconFileDetail?.fileBase64String) {
            const url = base64ToFaviconUrl(faviconFileDetail.fileBase64String, faviconFileDetail.fileExtension!);
            setFaviconUrl(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [moduleData]);

    // Set title
    useEffect(() => {
        if (moduleData?.name) {
            document.title = moduleData.name;
        }
    }, [moduleData?.name]);

    // Xác định page hiện tại
    useEffect(() => {
        const currentItem = allChildItems.find(item => cleanPath(pathname) == item.link);
        const currentPermission = permissionStore.state.permission?.find(item => item.pageId == currentItem?.pageId)
        setIsLoadingPermission(false);
        if (!currentItem) return;
        axiosInstance.defaults.headers.common['X-Pageid'] = currentItem.pageId

        const breadcrumb = findBreadcrumbPath(filteredMenu, currentItem.link!);

        appShellStore.setProperty("description", pageContentQuery.data?.find(item => item.id == currentItem.pageId)?.description)
        appShellStore.setProperty("currentPageId", currentItem.pageId);
        appShellStore.setProperty("fileGuildePath", pageContentQuery.data?.find(item => item.id == currentItem.pageId)?.documentFilePath);
        appShellStore.setProperty("videoLink", pageContentQuery.data?.find(item => item.id == currentItem.pageId)?.link);
        appShellStore.setProperty("breadcrumb", breadcrumb!);
        appShellStore.setProperty("title", currentItem.label!);
        appShellStore.setProperty("menuCode", currentItem.link);
        appShellStore.setProperty("note", currentItem.note);
        appShellStore.setProperty("status", currentItem.status);
        setIsAccessible(currentItem.pageId ? readablePageIds.has(currentItem.pageId) : false);
        permissionStore.setProperty("currentPermissionPage", currentPermission)
        if (isDev || permissionStore.state.isSuperAdmin) {
            permissionStore.setProperty("currentPermissionPage", {
                isCreate: true,
                isRead: true,
                isDelete: true,
                isExport: true,
                isPrint: true,
                isUpdate: true,
                pageId: currentItem?.pageId
            })
        }
    }, [pathname, allChildItems, filteredMenu, readablePageIds, pageContentQuery.data]);

    // ===== Render =====
    const canAccess =
        isDev || isAccessible || permissionStore.state.isSuperAdmin;

    const renderHeader = () => (
        <AppShell.Header>
            {media ? (
                <Group h="100%" px="md" justify="space-between">
                    {/* Left */}
                    <Group h="100%">
                        <Tooltip label={appShellStore.state.opened ? "Ẩn thanh menu" : "Hiện thanh menu"}>
                            <ActionIcon variant="default" size="lg" radius="md" onClick={appShellStore.toggle}>
                                {appShellStore.state.opened ? <IconLayoutSidebarLeftExpand /> : <IconLayoutSidebarLeftCollapse />}
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Đóng tất cả menu">
                            <ActionIcon variant="default" size="lg" radius="md" onClick={appShellStore.clearGroupMenuOpenId}>
                                <IconLibraryMinus />
                            </ActionIcon>
                        </Tooltip>
                    </Group>

                    {/* Center */}
                    <Tooltip label={title || `${appShellStore.state.moduleCode} - ${appShellStore.state.moduleName}`}>
                        <Group style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                            <Text c="green" fw="bold" size="sm">
                                {title || `${appShellStore.state.moduleCode} - ${appShellStore.state.moduleName}`}
                            </Text>
                        </Group>
                    </Tooltip>

                    {/* Right */}
                    <Group>
                        {extraTopRight}
                        <CustomSwitchTheme />
                        <UserAvatarMenu />
                    </Group>
                </Group>
            ) : (
                <Group h="100%" px="md" justify="space-between">
                    <ActionIcon variant="default" size="lg" radius="md" onClick={appShellStore.toggle}>
                        {appShellStore.state.opened ? <IconLayoutSidebarLeftExpand /> : <IconLayoutSidebarLeftCollapse />}
                    </ActionIcon>
                    <Tooltip
                        label={
                            title || `${appShellStore.state.moduleCode} - ${appShellStore.state.moduleName}`
                        }
                        withArrow
                    >
                        <Text
                            c="green"
                            fw="bold"
                            size="sm"
                            style={{
                                maxWidth: 200,        // set a max width (px, rem, or %)
                                whiteSpace: 'nowrap', // keep text on one line
                                overflow: 'hidden',   // hide overflow
                                textOverflow: 'ellipsis' // show ...
                            }}
                        >
                            {title || `${appShellStore.state.moduleCode}`}
                        </Text>
                    </Tooltip>

                    <Group>
                        {extraTopRight}
                        <CustomSwitchTheme />
                        <UserAvatarMenu />
                    </Group>
                </Group>
            )}
        </AppShell.Header>
    );

    const renderNavbar = () => (
        <AppShell.Navbar
        >
            <CustomAppSpotlight menu={filteredMenu} />
            <AppShell.Section grow component={ScrollArea} p={5} pr={20} type="auto" >
                <RenderNavLinks items={filteredMenu.filter(item => !item.isHidden)} />
            </AppShell.Section>
            <AppShell.Section className="rounded-tr-2xl shadow-[0_-4px_6px_rgba(0,0,0,0.1)]" style={{
                border: `1px solid ${colorScheme === "dark" ? "var(--mantine-color-dark-4)" : "var(--mantine-color-gray-3)"
                    }`,
            }}>
                <SessionUserInfo />
                <Space m={4} />
                <AuthenticateLogout redirectURL={logoutRedirect} />
                <Box px={'md'}>
                    <Image
                        fit="contain"
                        h="80px"
                        alt="Main logo"
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        src={
                            process.env.NEXT_PUBLIC_APP_PROTOTYPE === "1"
                                ? `/imgs/mainLogo.png`
                                : `data:image/${appShellStore.state.logoFileDetail?.fileExtension};base64,${appShellStore.state.logoFileDetail?.fileBase64String}`
                        }
                    />
                </Box>
            </AppShell.Section>
        </AppShell.Navbar>
    );

    const renderMain = () => (
        <AppShell.Main bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))">
            {isLoadingPermission ? (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <Text fw={600} size="md">Đang tải quyền truy cập...</Text>
                </div>
            ) : canAccess ? (
                children
            ) : (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <h1>404 - Không tìm thấy trang</h1>
                    <p>Bạn không có quyền truy cập hoặc đường dẫn không tồn tại.</p>
                </div>
            )}
        </AppShell.Main>
    );


    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 333,
                breakpoint: "sm",
                collapsed: {
                    mobile: !appShellStore.state.opened,
                    desktop: !appShellStore.state.opened,
                },
            }}
            padding="md"
        >
            {renderHeader()}
            {renderNavbar()}
            {renderMain()}
        </AppShell>
    );
}
