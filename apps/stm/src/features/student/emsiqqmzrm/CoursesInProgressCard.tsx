import { Button, Group, Paper, Progress, ScrollArea, Stack, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import PaperLayout from "./PaperLayout";
import { IUserDashboardData } from "./interfaces/StudentDashBoard";

// Mock data


export default function CoursesInProgressCard({ studentData }: { studentData: IUserDashboardData }) {
    const [opened, setOpened] = useState(false);

    const visibleCourses = studentData.course?.courses?.filter((course) => {
        const today = new Date();
        const studyDate = course.studyDate ? new Date(course.studyDate) : new Date(0);
        return studyDate <= today;
    });

    const inProgressCourse = opened ? visibleCourses : visibleCourses?.slice(0, 2);
    return (
        <PaperLayout
            title="Khóa học của tôi"
            rightButton={
                inProgressCourse && inProgressCourse.length > 0 ? (
                    <Button
                        variant="light"
                        size="xs"
                        rightSection={opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        onClick={() => setOpened((prev) => !prev)}
                    >
                        {opened ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                ) : null
            }
        >
            <ScrollArea.Autosize offsetScrollbars type="auto" scrollbarSize={1}>
                <Stack gap={8} mt={16} mb={8}>
                    {inProgressCourse && inProgressCourse.length > 0 ? (
                        inProgressCourse.map((course, index) => (
                            <Paper key={index} withBorder p={0}>
                                <Group wrap="nowrap" p={16}>
                                    <Stack gap={8} style={{ flex: 2 }}>
                                        <Group gap="xs">
                                            <Text fw={500} c="dimmed">
                                                Khóa học
                                            </Text>
                                        </Group>
                                        <Text fw={700} fz={20}>
                                            {course.courseName}
                                        </Text>
                                    </Stack>

                                    <Stack gap={8} style={{ flex: 1 }}>
                                        <Text fw={500} c="dimmed">
                                            Số buổi/tổng số buổi
                                        </Text>
                                        <Group gap={4}>
                                            <Text fw={500} ta="center" size="lg">
                                                {course.attendance}
                                            </Text>
                                        </Group>
                                    </Stack>
                                </Group>

                                {course.attendance && (
                                    <Progress
                                        value={
                                            (parseInt(course.attendance.split('/')[0] || '0') /
                                                parseInt(course.attendance.split('/')[1] || '1')) *
                                            100
                                        }
                                    />
                                )}
                            </Paper>
                        ))
                    ) : (
                        <Text c="dimmed" size="sm" ta="center" pb={8}>
                            Hiện tại không có khóa học nào đang diễn ra.
                        </Text>
                    )}

                </Stack>
            </ScrollArea.Autosize>

            {!opened && (inProgressCourse?.length ?? 0) > 2 && (
                <Text c="dimmed" size="sm" ta="center" pb={8}>
                    Còn {(inProgressCourse?.length ?? 0) - 2} khóa học khác
                </Text>
            )}
        </PaperLayout>
    );
}
