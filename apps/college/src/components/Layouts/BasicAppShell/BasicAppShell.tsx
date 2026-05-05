"use client";
import { MySwitchTheme } from "@/components/ActionIcons/SwitchTheme/MySwitchTheme";
import { MyAppSpotlight } from "@/components/AppSpotlight/MyAppSpotlight";
import F0Logout from "@/modules-features/auth/F0Logout/F0Logout";
import { useS0Sidebar } from "@/stores/S0Sidebar";
import {
    ActionIcon,
    AppShell,
    Badge,
    Divider,
    Group,
    Image,
    NavLink,
    ScrollArea,
    Text,
    TextInput,
    Tooltip
} from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconLibraryMinus, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export interface I0LinkItem {
    id?: number,
    englishLabel?: string;
    label: string;
    status?: "Default" | "Prototype" | "New" | "Menu"
    link?: string;
    links?: I0LinkItem[];
}

function getRightSection(status: string) {
    if (status === "Prototype") return <Badge styles={{ root: { cursor: "pointer" } }} radius="xs" color="pink" circle>P</Badge>;
    if (status === "New") return <Badge styles={{ root: { cursor: "pointer" } }} radius="xs" circle>N</Badge>
    if (status === "Menu") return <Badge styles={{ root: { cursor: "pointer" } }} radius="xs" color="gray" circle>M</Badge>;;
    return null; // Fallback for unknown types
}

function RenderNavLinks({ items }: { items: I0LinkItem[] }) {
    const SidebarStore = useS0Sidebar()
    const pathName = usePathname();
    return (
        <>
            {items.map((item, index) => (
                <NavLink
                    active={item.link === pathName.split("/")[2]}
                    component={Link}
                    key={index}
                    rightSection={
                        getRightSection(item.status!)

                    }
                    opened={SidebarStore.groupMenuOpenId.includes(item.label)}
                    href={`/admin/${item.link}` || "#"}
                    label={item.label}
                    childrenOffset={28}
                    // rightSection={item.link && "prototype"}
                    onClick={() => {
                        if (item.links) SidebarStore.toggleGroupMenuOpenId(item.label)
                        if (item.link) {
                            SidebarStore.setMenuCode(item.link)
                            SidebarStore.setTitle(item.label)
                        }
                    }}
                >
                    {item.links && <RenderNavLinks items={item.links} />}
                </NavLink>
            ))}
        </>
    )
}
function generateLinkEnum(prefix: string, data: I0LinkItem[]): { [key: string]: number } {
    const result: { [key: string]: number } = {};

    const processItem = (item: I0LinkItem) => {
        // Skip items that have nested links
        if (item.links) return;

        // Only process items that have both link and id
        if (item.link && item.id && item.englishLabel) {
            // Create key by combining link and englishLabel, remove spaces and special characters
            const key = `${prefix}_${item.link}_${item.englishLabel}`
                .toUpperCase()
                .replace(/[^A-Z0-9_]/g, '_')
                .replace(/_+/g, '_'); // Replace multiple underscores with single one

            result[key] = item.id;
        }
    };

    const traverseItems = (items: I0LinkItem[]) => {
        items.forEach(item => {
            if (item.label == "1. Quản lí hệ thống") return
            if (item.label == "2. Văn bản - Quy định") return

            if (item.label == "12.1 Danh mục loại văn bản") return
            processItem(item);

            // Recursively process nested items if they exist
            if (item.links) {
                traverseItems(item.links);
            }
        });
    };

    // Start processing from root level
    traverseItems(data);

    return result;
}

function checkUniqueIds(links: I0LinkItem[]): boolean {
    const seenIds = new Set<number>();
    for (const link of links) {
        if (link.id && seenIds.has(link.id)) {
            console.error(`Trùng lặp id: ${link.id}`);
            return false; // Trả về false nếu có id trùng
        }
        if (link.id) {
            seenIds.add(link.id);
        }
    }
    console.log("Tất cả id là duy nhất");

    return true; // Trả về true nếu tất cả id là duy nhất
}

function undefinedMenu(menu: I0LinkItem[]): any {
    const filteredItems = menu.filter(item => item.id === undefined && item.links === undefined);
    if (filteredItems.length > 0) {
        console.error("Có menu không có id hoặc links", filteredItems);
        return filteredItems;
    }
    console.log("Tất cả menu đều có id hoặc links");
    return filteredItems
}


export function BasicAppShell({ children, menu }: { children: ReactNode, menu: I0LinkItem[] }) {

    const SidebarStore = useS0Sidebar();
    useEffect(() => {
        undefinedMenu(menu);
        checkUniqueIds(menu);
        console.log(generateLinkEnum("STM", menu));
    }, [])
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 333,
                breakpoint: "sm",
                collapsed: { mobile: SidebarStore.opened, desktop: !SidebarStore.opened },
            }}
            padding="md">
            <AppShell.Header>
                <MyAppSpotlight menu={menu} />
                <Group h="100%" px="md" justify="space-between" align="center">
                    <Group h="100%" px="md">
                        <Tooltip label={SidebarStore.opened ? "Ẩn thanh menu" : "Hiện thanh menu"}>
                            <ActionIcon size="lg" radius="md" variant="default" onClick={SidebarStore.toggle} >
                                {SidebarStore.opened ? <IconLayoutSidebarLeftExpand /> : <IconLayoutSidebarLeftCollapse />}
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Đóng tất cả menu">
                            <ActionIcon size="lg" radius="md" variant="default" onClick={() => SidebarStore.clearGroupMenuOpenId()}>
                                <IconLibraryMinus />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    <Group>
                        <Text c={"green"} fw={"bold"}>
                            AQTech
                        </Text>
                    </Group>
                    <MySwitchTheme></MySwitchTheme>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <TextInput mt={'md'} placeholder="Tìm menu (Ctrl + K)" mx={10} component={"button"} onClick={spotlight.open} leftSection={<IconSearch />} >Tìm kiếm (Ctrl + K)</TextInput>
                <AppShell.Section grow component={ScrollArea} p={5}>
                    <RenderNavLinks items={menu} />
                    <Divider></Divider>
                    <F0Logout />
                </AppShell.Section>
                <AppShell.Section p={"md"}>
                    <Divider></Divider>
                    <Image src={"/imgs/0/IMG0LogoAQTech.png"} h={50} alt="" w="auto"></Image>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main bg={"light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"}>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
