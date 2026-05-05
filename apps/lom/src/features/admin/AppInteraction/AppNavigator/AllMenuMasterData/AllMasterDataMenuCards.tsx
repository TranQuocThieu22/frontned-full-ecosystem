'use client'

import { AppPage } from "@/data/enum/app-page.enum";
import { canViewLOMSystemDataMenuList, canViewLOMSystemDataMenuListItem } from "@/features/auth/PageAuthorization/LOM-system-data-menu-list.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Button, Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconArrowRight, IconCalendar, IconCalendarDue, IconClipboardList, IconMail, IconMilitaryRank, IconSitemap, IconTable, IconUserSquareRounded } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const menuList_col1 = [
    {
        pageId: 100001, link: "admin/document-categories",
        name: "Document categories", label: "Danh mục loại văn bản",
        description: "Danh mục phân loại văn bản sử dụng cho Văn bản",
        icon: <IconClipboardList style={{ width: '70%', height: '70%' }} />,
        iconColor: "#4263eb", // Blue for documents
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 100008, link: "admin/mail-config",
        name: "System Email config", label: "Danh mục cấu hình mail server",
        description: "Danh mục cấu hình mail server thực hiện tiến trình gửi mail từ hệ thống ra ngoài",
        icon: <IconMail style={{ width: '70%', height: '70%' }} />,
        iconColor: "#e03131", // Red for mail
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 100007, link: "admin/academic-year",
        name: "Academic year list", label: "Danh mục năm học",
        description: "Danh mục năm học làm việc trong hệ thống",
        icon: <IconCalendarDue style={{ width: '70%', height: '70%' }} />,
        iconColor: "#2b8a3e", // Green for academic year
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 100012, link: "admin/semester",
        name: "Academic year semester list", label: "Danh mục năm học học kỳ",
        description: "Danh mục năm học - học kỳ làm việc trong hệ thống",
        icon: <IconCalendar style={{ width: '70%', height: '70%' }} />,
        iconColor: "#5f3dc4", // Purple for semester calendar
        UIType: "Danh mục dữ liệu"
    }
]

const menuList_col2 = [
    {
        pageId: 100006, link: "admin/department",
        name: "Unit list", label: "Danh mục đơn vị",
        description: "Danh mục đơn vị hành chính trong hệ thống",
        icon: <IconSitemap style={{ width: '70%', height: '70%' }} />,
        iconColor: "#1864ab", // Dark blue for organization
        UIType: "Danh mục dữ liệu"
    },
    // {
    //     pageId: 641, link: "admin/umg0mq7o3x",
    //     name: "MIT scale", label: "Danh mục thang đo MIT",
    //     description: "Danh mục mức độ đo chi tiết của thang đo MIT",
    //     icon: <IconCheckupList style={{ width: '70%', height: '70%' }} />,
    //     iconColor: "rgb(0, 0, 0)",
    //     UIType: "Danh mục dữ liệu"
    // },
    {
        pageId: AppPage.RubricsData, link: "admin/rubrics",
        name: "Rubric scale", label: "Danh mục thang đo Rubrics",
        description: "Danh mục mức độ đo chi tiết của thang đo Rubrics",
        icon: <IconTable style={{ width: '70%', height: '70%' }} />,
        iconColor: "#e67700", // Orange for rubrics
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.PLORankingSystemData, link: "admin/PLO-ranking-system",
        name: "PLO ranking table", label: "Danh mục bảng xếp loại PLO",
        description: "Danh mục chi tiết mức độ đo ngưỡng xếp loại PLO",
        icon: <IconMilitaryRank style={{ width: '70%', height: '70%' }} />,
        iconColor: "#c2255c", // Pink for ranking
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.StaffData, link: "admin/staff",
        name: "Human Resources", label: "Danh mục nhân sự",
        description: "Danh mục nhân sự hoạt động trong hệ thống",
        icon: <IconUserSquareRounded style={{ width: '70%', height: '70%' }} />,
        iconColor: "#087f5b", // Teal for human resources
        UIType: "Danh mục dữ liệu"
    },
]


export default function AllMasterDataMenuCards() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const router = useRouter();

    const canViewLOMSystemDataMenuListCol1 = menuList_col1.filter((menu) => canViewLOMSystemDataMenuListItem(userStore, userPermissionStore, menu.pageId));
    const canViewLOMSystemDataMenuListCol2 = menuList_col2.filter((menu) => canViewLOMSystemDataMenuListItem(userStore, userPermissionStore, menu.pageId));
    const isCol1HasData = canViewLOMSystemDataMenuListCol1.length > 0;
    const isCol2HasData = canViewLOMSystemDataMenuListCol2.length > 0;
    const isOnlyOneColHasData = !isCol1HasData || !isCol2HasData;

    if (canViewLOMSystemDataMenuList(userStore, userPermissionStore)) {
        return (
            <>
                <SimpleGrid cols={isOnlyOneColHasData ? 1 : { base: 1, lg: 2 }} spacing="md" mt="md">
                    {isCol1HasData && <Stack>  {
                        canViewLOMSystemDataMenuListCol1.map((menu, index) => {
                            return <Paper
                                key={menu.pageId || index}
                                withBorder
                                radius="md"
                                bg={"#F8F9FA"}
                                p={20}
                                h={200}
                            >
                                <Flex direction={"column"}>
                                    <Group w={"100%"} mb={5} h={20}>
                                        <ThemeIcon variant="light" radius="md" size="xl" color={menu.iconColor || "rgb(0, 0, 0)"}>
                                            {menu.icon}
                                        </ThemeIcon>
                                        <Title fs="14" order={4} pb={12}>{menu.label}</Title>
                                    </Group>
                                    <Group w={"100%"} mt={12} mb={5} h={64}>
                                        <Text size="md" fw={600} c="dimmed"> {menu.description}</Text>
                                    </Group>
                                    <Group w={"100%"} justify="space-between" mt={18} h={20}>
                                        <Text size="xs" c="dimmed">{menu.UIType}</Text>
                                        <Button component={"a"} onClick={() => router.push(`/${menu.link}`)} color="blue" variant="light" rightSection={<IconArrowRight />}>Mở chức năng</Button>
                                    </Group>
                                </Flex>
                            </Paper>
                        }
                        )
                    }
                    </Stack>}

                    {isCol2HasData && <Stack>  {
                        canViewLOMSystemDataMenuListCol2.map((menu, index) => (
                            <Paper
                                key={menu.pageId || index}
                                withBorder
                                radius="md"
                                bg={"#F8F9FA"}
                                p={20}
                                h={200}
                            >
                                <Flex direction={"column"}>
                                    <Group w={"100%"} mb={10} h={20}>
                                        <ThemeIcon variant="light" radius="md" size="xl" color={menu.iconColor || "rgb(0, 0, 0)"}>
                                            {menu.icon}
                                        </ThemeIcon>
                                        <Title fs="14" order={4} pb={12}>{menu.label}</Title>
                                    </Group>
                                    <Group w={"100%"} mt={12} mb={5} h={64}>
                                        <Text size="md" fw={600} c="dimmed"> {menu.description}</Text>
                                    </Group>
                                    <Group w={"100%"} justify="space-between" mt={18} h={20}>
                                        <Text size="xs" c="dimmed">{menu.UIType}</Text>
                                        <Button component={"a"} onClick={() => router.push(`/${menu.link}`)} color="blue" variant="light" rightSection={<IconArrowRight />}>Mở chức năng</Button>
                                    </Group>
                                </Flex>
                            </Paper>
                        ))
                    }
                    </Stack>}
                </SimpleGrid>
            </>
        );
    }
    else {
        return <></>;
    }
}