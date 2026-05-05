import { Badge, Card, Group, ScrollArea, Text, ThemeIcon } from "@mantine/core";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { IUserDashboardData } from "./interfaces/StudentDashBoard";

export default function UpcomingCoursesCard({ studentData }: { studentData: IUserDashboardData }) {
    const upcomingCourses = studentData.course?.courses?.filter((course) => {
        const today = new Date();
        const studyDate = course.studyDate ? new Date(course.studyDate) : new Date(0);
        return studyDate > today;
    }) || [];


    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '40vh' }}>
            <Text size="lg" fw={700} mb="md" tt="uppercase">
                Khóa sắp khai giảng
            </Text>
            <ScrollArea.Autosize h={300}>

                {upcomingCourses && upcomingCourses.length > 0 ? (
                    upcomingCourses.map((course, index) => (
                        <Card key={index} shadow="xs" padding="md" radius="md" withBorder mb="sm">
                            <Group mb="xs">
                                <Text fw={600}>{course.courseName}</Text>
                                <Badge color="blue" variant="light">
                                    Sắp khai giảng
                                </Badge>
                            </Group>
                            <Group gap="xs" mb="xs">
                                <ThemeIcon variant="light" color="teal" size="sm">
                                    <IconCalendar size={14} />
                                </ThemeIcon>
                                <Text size="sm">
                                    {utils_date_dateToDDMMYYYString(new Date(course.studyDate || 0))}
                                </Text>
                            </Group>
                            <Group gap="xs" mb="xs">
                                <ThemeIcon variant="light" color="orange" size="sm">
                                    <IconCalendar size={14} />
                                </ThemeIcon>
                                <Text size="sm">{course.timeCluster}</Text>
                            </Group>
                            <Group gap="xs">
                                <ThemeIcon variant="light" color="red" size="sm">
                                    <IconMapPin size={14} />
                                </ThemeIcon>
                                <Text size="sm">{course.branchName}</Text>
                            </Group>
                        </Card>
                    ))
                ) : (
                    <Text c="dimmed" size="sm" ta="center" pb={8}>
                        Chưa có khóa học nào sắp tới.
                    </Text>
                )}
            </ScrollArea.Autosize>
        </Card>
    );
}
