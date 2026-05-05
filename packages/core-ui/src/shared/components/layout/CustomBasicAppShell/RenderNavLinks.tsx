import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { useAppStore } from "@aq-fe/core-ui/shared/stores/useAppStore";
import { Badge, Box, Flex, NavLink, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation.js";
import { CustomFlexRow } from "../CustomFlexRow";
import { I_BasicAppShell_LinkItem } from "./types";
import { useBasicAppShellStore } from "./useBasicAppShellStore";

// 🔸 UI helper dùng nội bộ file này
function getRightSection(status?: string) {
    switch (status) {
        case "Prototype":
            return <Badge radius="xs" color="pink" circle>P</Badge>;
        case "New":
            return <Badge radius="xs" circle>N</Badge>;
        case "Menu":
            return <Badge radius="xs" color="gray" circle>M</Badge>;
        case "Change":
            return <Badge radius="xs" color="green" circle>C</Badge>;
        default:
            return null;
    }
}

function getLeftSection(item: I_BasicAppShell_LinkItem, isActive: boolean) {
    if (item.links) {
        return (
            <Flex align={'center'} direction={"row"} gap={'md'}>
                <Box variant="outline" c={'white'}>{item.icon}</Box>
                <Text fw={'bold'} >{item.label}</Text>
            </Flex>
        )
    }
    return (
        <Flex direction={'row'}>

            <Text>
                {item.label}
            </Text>
        </Flex>
    );
}
function normalizePath(path?: string) {
    if (!path) return "";
    return path.replace(/\/+$/, ""); // bỏ hết dấu / ở cuối
}
// 🔹 Component chính render menu đệ quy
export default function RenderNavLinks({ items }: { items: I_BasicAppShell_LinkItem[] }) {
    const pathName = usePathname();
    const router = useRouter()
    const appStore = useAppStore();
    const basicAppShellStore = useBasicAppShellStore();
    const extractPathName = pathName.split("/").slice(2).join("/");
    const isDesktop = useMediaQuery("(min-width: 72em)");
    return (
        <>
            {items.map((item, index) => (
                <NavLink
                    c={item.links ? "white" : undefined}
                    bg={item.links ? "blue.9" : normalizePath(extractPathName) === normalizePath(item.link) ? colorsObject.mantineBackgroundBlueLight : undefined}
                    style={{
                        marginBottom: 4,
                        border: normalizePath(extractPathName) === normalizePath(item.link) ? "1px solid" : undefined,
                        borderRadius: 8,
                        background: item.links ? "blue" : "var(--mantine-color-body)",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.2s ease-in-out",
                    }}
                    key={index}
                    active={normalizePath(extractPathName) === normalizePath(item.link)}
                    opened={basicAppShellStore.state.groupMenuOpenId.includes(item.label)}
                    label={
                        <CustomFlexRow justify="space-between">
                            {getLeftSection(item, normalizePath(extractPathName) === normalizePath(item.link))}
                            <Box>{getRightSection(item.status)}</Box>
                        </CustomFlexRow>
                    }
                    childrenOffset={28}
                    onClick={(e) => {
                        if (item.links) {

                            e.preventDefault(); // chặn điều hướng
                            basicAppShellStore.toggleGroupMenuOpenId(item.label);
                            return
                        }
                        if (!isDesktop) {
                            basicAppShellStore.setProperty("opened", false);
                        }
                        appStore.setCurrentPage(item.pageId)
                        axiosInstance.defaults.headers.common['X-Pageid'] = item.pageId
                        if (item.status === "Menu") {
                            router.push(`/${pathName.split("/")[1]}/pageNotFound`)
                            return;
                        }
                        router.push(`/${pathName.split("/")[1]}/${normalizePath(item.link)}`)
                        // ✅ AUTO CLOSE MENU ON MOBILE

                    }}
                >
                    {item.links && <RenderNavLinks items={item.links} />}
                </NavLink>
            ))}
        </>
    );
}
