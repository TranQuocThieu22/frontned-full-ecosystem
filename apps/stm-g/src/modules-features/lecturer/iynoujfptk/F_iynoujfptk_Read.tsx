import useQ_Dashboard_GetLecturer from "@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetLecturer";
import { Card, Flex, Grid, Text } from "@mantine/core";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import F_iynoujfptk_CourseDetail from './F_iynoujfptk_CourseDetail';
import F_iynoujfptk_CourseList from './F_iynoujfptk_CourseList';
import F_thfkexfuki_generalInfor from './F_iynoujfptk_generalInfor';
import F_iynoujfptk_HeaderInfo from "./F_iynoujfptk_HeaderInfo";
import F_iynoujfptk_LineChart from './F_iynoujfptk_LineChart';
import F_iynoujfptk_PieChart from './F_iynoujfptk_PieChart';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface ISchedule {
    id?: number;
    name?: string;
    startDate?: string;
    endDate?: string;
    addressName?: string;
    addressCapacity?: number;
    lecturerName?: string[];
    subjectName?: string;
}

export default function F_iynoujfptk_Read() {
    const [lecturerId] = useState<number>(14345);



    const queryDashboardLecturer = useQ_Dashboard_GetLecturer({
        lecturerId: lecturerId
    });
    if (queryDashboardLecturer.isLoading) return <Text>Đang tải</Text>;
    if (queryDashboardLecturer.isError) return <Text>Không có dữ liệu</Text>;



    return (
        <Grid mih="100vh">
            <Grid.Col span={{ base: 12, md: 12, lg: 8.6 }} order={{ base: 2, md: 2, lg: 1 }}>
                <Flex direction="column" gap={"sm"} h={{ base: 'auto', sm: '100%' }} mih={{ base: 'auto', sm: '100vh' }}>

                    <Flex display={{ base: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                        <F_iynoujfptk_HeaderInfo
                            data={{
                                totalOngoingCourseSection: queryDashboardLecturer.data?.data.totalOngoingCourseSection,
                                totalRequiringAttendance: queryDashboardLecturer.data?.data.totalRequiringAttendance,
                                totalTeachingSessions: queryDashboardLecturer.data?.data.totalTeachingSessions,
                            }}
                        />
                    </Flex>
                    <Card display={{ base: 'block', sm: 'block', md: 'block', lg: 'none' }}>
                        <F_iynoujfptk_CourseDetail
                            lecturerId={lecturerId}
                        />
                    </Card>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 12, md: 5, lg: 5 }}>
                            <Card
                                mah={{ base: '47vh', md: '30vh', lg: '47vh' }}
                                h={{ base: '47vh', md: '30vh', lg: '47vh' }}>
                                <F_iynoujfptk_CourseList
                                    courses={queryDashboardLecturer.data?.data.courseSections?.map((course) => ({
                                        id: course.id,
                                        name: course.name,
                                        totalSession: course.totalSession,
                                        totalSessionsCompleted: course.totalSessionsCompleted,
                                    })) ?? []}
                                />
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 12, md: 7, lg: 7 }}>
                            <Card
                                mah={{ base: '47vh', md: '30vh', lg: '47vh' }}
                                h={{ base: '47vh', md: '30vh', lg: '47vh' }}>
                                <F_iynoujfptk_PieChart
                                    totalCompletedCourseSection={queryDashboardLecturer.data?.data.totalCompletedCourseSection}
                                    totalOngoingCourseSection={queryDashboardLecturer.data?.data.totalOngoingCourseSection}
                                    totalUpcomingCourseSection={queryDashboardLecturer.data?.data.totalUpcomingCourseSection}
                                />
                            </Card>
                        </Grid.Col>
                    </Grid>

                    <Card h="auto" style={{ flex: 1 }}>
                        <F_iynoujfptk_LineChart
                            courses={queryDashboardLecturer.data?.data.courseSections?.map((course) => ({
                                id: course.id,
                                name: course.name,
                                scheduleChart: course.scheduleChart
                            })) ?? []}
                        />
                    </Card>
                </Flex>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12, lg: 3.4 }} order={{ base: 1, md: 1, lg: 2 }}>
                <Flex direction="column" gap={"sm"} h={{ base: 'auto', md: '100%', sm: '100%' }} mih={{ base: 'auto', md: '100%', sm: '100vh' }}>
                    <Card mih={{ base: '25vh', lg: '30vh' }}>
                        {F_thfkexfuki_generalInfor({
                            data: {
                                id: 1,
                                fullName: "Tô Ngọc Lan",
                                dob: new Date("2021-01-01"),
                                email: "nguyenhoanganhtu@gmail.com",
                                phoneNumber: "08179853517",
                            }
                        })}
                    </Card>
                    <Card display={{ base: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                        <F_iynoujfptk_CourseDetail
                            lecturerId={lecturerId}
                        />
                    </Card>
                    <Flex display={{ base: 'block', sm: 'block', md: 'block', lg: 'none' }}>
                        <F_iynoujfptk_HeaderInfo
                            data={{
                                totalOngoingCourseSection: queryDashboardLecturer.data?.data.totalOngoingCourseSection,
                                totalRequiringAttendance: queryDashboardLecturer.data?.data.totalRequiringAttendance,
                                totalTeachingSessions: queryDashboardLecturer.data?.data.totalTeachingSessions,
                            }}
                        />
                    </Flex>


                </Flex>
            </Grid.Col>
        </Grid >
    );
}



