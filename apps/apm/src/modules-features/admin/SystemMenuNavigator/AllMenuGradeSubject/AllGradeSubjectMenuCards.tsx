'use client'

import { Button, Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconArrowRight, IconBook, IconChartCohort, IconRubberStamp, IconSchool, IconSquareLetterB, IconSquareLetterH, IconUsersGroup, IconVocabulary } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const menuList_col1 = [
    {
        pageId: 609, link: "admin/vf2cwmibmh",
        name: "Training Level Catalog", label: "Danh mục Bậc đào tạo",
        description: "Danh mục Bậc học/ đào tạo có quản lý tại đơn vị",
        icon: <IconSquareLetterB style={{ width: '70%', height: '70%' }} />,
        iconColor: "#1971c2",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 610, link: "admin/4hi65qkj5n",
        name: "Training systems Catalog", label: "Danh mục Hệ đào tạo",
        description: "Danh mục hệ đào tạo có quản lý tại đơn vị",
        icon: <IconSquareLetterH style={{ width: '70%', height: '70%' }} />,
        iconColor: "#2b8a3e",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 611, link: "admin/j9ul1u9c2n",
        name: "Regulation Catalog", label: "Danh mục Quy chế/ Thông tư",
        description: "Danh mục quy chế/ thông tư dành cho đối tượng đào tạo",
        icon: <IconRubberStamp style={{ width: '70%', height: '70%' }} />,
        iconColor: "#c92a2a",
        UIType: "Danh mục dữ liệu"
    },


]

const menuList_col2 = [
    {
        pageId: 612, link: "admin/zvib1md6z9",
        name: "Degree levels Catalog", label: "Danh mục bậc hệ đào tạo",
        description: "Danh mục bậc hệ đào tạo có quản lý tại đơn vị",
        icon: <IconSchool style={{ width: '70%', height: '70%' }} />,
        iconColor: "#5f3dc4",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 613, link: "admin/h7op7f4nav",
        name: "Program Catalog", label: "Danh mục Chương trình (Ngành) ",
        description: "Danh mục chương trình đào tạo (Ngành) mà đơn vị có đào tạo",
        icon: <IconBook style={{ width: '70%', height: '70%' }} />,
        iconColor: "#4c6ef5",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 614, link: "admin/ukagvjhxgy",
        name: "Grade Catalog", label: "Danh mục Khóa/ Khối đào tạo",
        description: "Danh mục Khóa/ Khối lớp mà đơn vị có quản lý",
        icon: <IconUsersGroup style={{ width: '70%', height: '70%' }} />,
        iconColor: "#e8590c",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 615, link: "admin/zudcgcvda8",
        name: "Subject group Catalog", label: "Danh mục Nhóm môn học",
        description: "Danh mục nhóm môn học phân chia kiến thức theo từng chương trình đào tạo",
        icon: <IconChartCohort style={{ width: '70%', height: '70%' }} />,
        iconColor: "#15aabf",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: 616, link: "admin/rdrmqcfvux",
        name: "Subject Catalog", label: "Danh mục Môn học",
        description: "Danh mục môn học có đào tạo tại đơn vị",
        icon: <IconVocabulary style={{ width: '70%', height: '70%' }} />,
        iconColor: "#099268",
        UIType: "Danh mục dữ liệu"
    },
    // {
    //     pageId: 617, link: "admin/subjectGroup/subjectGroupMIT",
    //     name: "Subject group MIT", label: "Quan hệ Nhóm môn học và Thang MIT",
    //     description: "Mối quan hệ liên kết giữa nhóm môn học và mức độ đo theo thang MIT",
    //     icon: <IconHierarchy style={{ width: '70%', height: '70%' }} />,
    //     iconColor: "rgb(0, 0, 0)",
    //     UIType: "Cấu hình liên kết"
    // },

]


export default function AllGradeSubjectMenuCards() {

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