'use client'

import { Button, Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconArrowRight, IconCalendar, IconCalendarDue, IconClipboardList, IconMail, IconMilitaryRank, IconSitemap, IconTable, IconUserSquareRounded } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const menuList_col1 = [
    {
        pageId: 520, link: "admin/core18256",
        name: "Document categories", label: "Danh mục loại văn bản",
        description: "Danh mục phân loại văn bản sử dụng cho Văn bản",
        icon: <IconClipboardList style={{ width: '70%', height: '70%' }} />,
        iconColor: "#4263eb", // Blue for documents
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 508, link: "admin/core64229",
        name: "System Email config", label: "Danh mục cấu hình mail server",
        description: "Danh mục cấu hình mail server thực hiện tiến trình gửi mail từ hệ thống ra ngoài",
        icon: <IconMail style={{ width: '70%', height: '70%' }} />,
        iconColor: "#e03131", // Red for mail
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 644, link: "admin/omhcfkliwa",
        name: "Academic year list", label: "Danh mục năm học",
        description: "Danh mục năm học làm việc trong hệ thống",
        icon: <IconCalendarDue style={{ width: '70%', height: '70%' }} />,
        iconColor: "#2b8a3e", // Green for academic year
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 645, link: "admin/cw38zkpvg4",
        name: "Academic year semester list", label: "Danh mục năm học học kỳ",
        description: "Danh mục năm học - học kỳ làm việc trong hệ thống",
        icon: <IconCalendar style={{ width: '70%', height: '70%' }} />,
        iconColor: "#5f3dc4", // Purple for semester calendar
        UIType: "Danh mục dữ liệu"
    }
]

const menuList_col2 = [
    {
        pageId: 640, link: "admin/14w3vwnnfy",
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
        pageId: 642, link: "admin/fmc2n1ftq1",
        name: "Rubric scale", label: "Danh mục thang đo Rubrics",
        description: "Danh mục mức độ đo chi tiết của thang đo Rubrics",
        icon: <IconTable style={{ width: '70%', height: '70%' }} />,
        iconColor: "#e67700", // Orange for rubrics
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 643, link: "admin/f0oia066vb",
        name: "PLO ranking table", label: "Danh mục bảng xếp loại PLO",
        description: "Danh mục chi tiết mức độ đo ngưỡng xếp loại PLO",
        icon: <IconMilitaryRank style={{ width: '70%', height: '70%' }} />,
        iconColor: "#c2255c", // Pink for ranking
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 645, link: "admin/StaffCategory",
        name: "Human Resources", label: "Danh mục nhân sự",
        description: "Danh mục nhân sự hoạt động trong hệ thống",
        icon: <IconUserSquareRounded style={{ width: '70%', height: '70%' }} />,
        iconColor: "#087f5b", // Teal for human resources
        UIType: "Danh mục dữ liệu"
    },
]


export default function AllMasterDataMenuCards() {

    const router = useRouter();
    return (
        <>
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md" mt="md">
                <Stack>  {
                    menuList_col1.map((menu, index) => (
                        <Paper
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
                    ))
                }
                </Stack>

                <Stack>  {
                    menuList_col2.map((menu, index) => (
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
                </Stack>
            </SimpleGrid>
        </>
    );
}