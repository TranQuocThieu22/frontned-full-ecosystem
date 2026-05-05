'use client'

import { AppPage } from "@/data/enum/app-page.enum";
import { canViewAssignCurriculumpPredefinedDataMenuList, canViewAssignCurriculumpPredefinedDataMenuListItem } from "@/features/auth/PageAuthorization/curriculum-predefined-data-menu-list.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Button, Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconArrowRight, IconBook, IconChartCohort, IconChartDots, IconRubberStamp, IconSchool, IconSquareLetterB, IconSquareLetterH, IconUsersGroup, IconVocabulary } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const menuList_col1 = [
    {
        pageId: AppPage.EducationLevelData, link: "admin/education-level",
        name: "Education Level", label: "Danh mục Bậc đào tạo",
        description: "Danh mục Bậc học/ đào tạo có quản lý tại đơn vị",
        icon: <IconSquareLetterB style={{ width: '70%', height: '70%' }} />,
        iconColor: "#1971c2",
        UIType: "Danh mục dữ liệu",
    },
    {
        pageId: AppPage.EducationFormatData, link: "admin/education-format",
        name: "Education Format", label: "Danh mục Hệ đào tạo",
        description: "Danh mục hệ đào tạo có quản lý tại đơn vị",
        icon: <IconSquareLetterH style={{ width: '70%', height: '70%' }} />,
        iconColor: "#2b8a3e",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.EducationRegulationData, link: "admin/governing/education-regulation",
        name: "Official regulation", label: "Danh mục Quy chế/ Thông tư",
        description: "Danh mục quy chế/ thông tư dành cho đối tượng đào tạo",
        icon: <IconRubberStamp style={{ width: '70%', height: '70%' }} />,
        iconColor: "#c92a2a",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.SubjectGroupData, link: "admin/subject-group",
        name: "Subject group", label: "Danh mục Nhóm môn học",
        description: "Danh mục nhóm môn học phân chia kiến thức theo từng chương trình đào tạo",
        icon: <IconChartCohort style={{ width: '70%', height: '70%' }} />,
        iconColor: "#15aabf",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.IRMList, link: "admin/IRM-list",
        name: "IRM List", label: "Thang đo IRM",
        description: "Danh mục bộ quy tắc quy đổi giá trị cho ma trận IRM (Introduce - Reinforce - Master)",
        icon: <IconChartDots style={{ width: '70%', height: '70%' }} />,
        iconColor: "#15aabf",
        UIType: "Danh mục dữ liệu"
    },

]

const menuList_col2 = [
    {
        pageId: AppPage.ProgramFormatData, link: "admin/program-format",
        name: "Program format", label: "Danh mục bậc hệ đào tạo",
        description: "Danh mục bậc hệ đào tạo có quản lý tại đơn vị",
        icon: <IconSchool style={{ width: '70%', height: '70%' }} />,
        iconColor: "#5f3dc4",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.ProgramData, link: "admin/program",
        name: "Program", label: "Danh mục Chương trình (Ngành) ",
        description: "Danh mục chương trình đào tạo (Ngành) mà đơn vị có đào tạo",
        icon: <IconBook style={{ width: '70%', height: '70%' }} />,
        iconColor: "#4c6ef5",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.EnrollmentBatchData, link: "admin/enrollment-batch",
        name: "Enrollment batch", label: "Danh mục Khóa/ Khối đào tạo",
        description: "Danh mục Khóa/ Khối lớp mà đơn vị có quản lý",
        icon: <IconUsersGroup style={{ width: '70%', height: '70%' }} />,
        iconColor: "#e8590c",
        UIType: "Danh mục dữ liệu"
    },
    {
        pageId: AppPage.SubjectData, link: "admin/subject",
        name: "Subject", label: "Danh mục Môn học",
        description: "Danh mục môn học có đào tạo tại đơn vị",
        icon: <IconVocabulary style={{ width: '70%', height: '70%' }} />,
        iconColor: "#099268",
        UIType: "Danh mục dữ liệu"
    },
    // {
    //     pageId: AppPage.ApplyIRMForGrade, link: "admin/grade/grade-irm",
    //     name: "Apply IRM For Grade", label: "Thang đo IRM áp dụng theo Khoá",
    //     description: "Quy định thang đo IRM cụ thể nào sẽ được áp dụng cho từng Khóa học",
    //     icon: <IconApps style={{ width: '70%', height: '70%' }} />,
    //     iconColor: "#099268",
    //     UIType: "Danh mục dữ liệu"
    // },
    // {
    //     pageId: null, link: "admin/subjectGroup/MIT",
    //     name: "Subject group MIT", label: "Quan hệ Nhóm môn học và Thang MIT",
    //     description: "Mối quan hệ liên kết giữa nhóm môn học và mức độ đo theo thang MIT",
    //     icon: <IconHierarchy style={{ width: '70%', height: '70%' }} />,
    //     iconColor: "rgb(0, 0, 0)",
    //     UIType: "Cấu hình liên kết"
    // },

]


export default function AllGradeSubjectMenuCards() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const router = useRouter();

    const canViewAssignCurriculumpPredefinedDataMenuListCol1 = menuList_col1.filter((menu) => canViewAssignCurriculumpPredefinedDataMenuListItem(userStore, userPermissionStore, menu.pageId));
    const canViewAssignCurriculumpPredefinedDataMenuListCol2 = menuList_col2.filter((menu) => canViewAssignCurriculumpPredefinedDataMenuListItem(userStore, userPermissionStore, menu.pageId));
    const isCol1HasData = canViewAssignCurriculumpPredefinedDataMenuListCol1.length > 0;
    const isCol2HasData = canViewAssignCurriculumpPredefinedDataMenuListCol2.length > 0;
    const isOnlyOneColHasData = !isCol1HasData || !isCol2HasData;

    if (canViewAssignCurriculumpPredefinedDataMenuList(userStore, userPermissionStore)) {
        return (
            <>
                <SimpleGrid cols={isOnlyOneColHasData ? 1 : { base: 1, lg: 2 }} spacing="md" mt="md">
                    {isCol1HasData && <Stack>
                        {canViewAssignCurriculumpPredefinedDataMenuListCol1.map((menu, index) => {
                            return <Paper
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
                        })
                        }
                    </Stack>}

                    {isCol2HasData && <Stack> {
                        canViewAssignCurriculumpPredefinedDataMenuListCol2.map((menu, index) => {
                            return <Paper
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
                        }
                        )
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