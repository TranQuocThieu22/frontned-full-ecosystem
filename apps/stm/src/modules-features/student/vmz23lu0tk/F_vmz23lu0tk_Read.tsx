import baseAxios from "@/api/config/baseAxios";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Avatar, Box, Card, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import { IconCalendar, IconCalendarEvent, IconCalendarWeek, IconCertificate, IconCircleCheckFilled, IconMail } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import F_vmz23lu0tk_CourseList from "./F_vmz23lu0tk_CourseList";
import F_vmz23lu0tk_CourseOpen from "./F_vmz23lu0tk_CourseOpen";
import F_vmz23lu0tk_CourseSchedule from "./F_vmz23lu0tk_CourseSchedule";
import F_vmz23lu0tk_Exam from "./F_vmz23lu0tk_Exam";
import F_vmz23lu0tk_LecturerFeedback from "./F_vmz23lu0tk_LecturerFeedback";
import F_vmz23lu0tk_RadiaChart from "./F_vmz23lu0tk_RadiaChart";
import StatsCard from "./F_vmz23lu0tk_StatsCard";
import { IUserDashboardData } from "./interfaces/StudentDashBoard";

export default function F_vmz23lu0tk_Read() {
    const auThenticate_store = useStore_Authenticate()

    const StudentStatusData = useQuery<IUserDashboardData>({
        queryKey: ["F_emsiqqmzrm_Read_StudentStatusData"],
        queryFn: async () => {
            // const USERID = 1078
            const PARAM = `studentId=${auThenticate_store.state.userId}`
            // const PARAM = `studentId=${USERID}`
            const res = await baseAxios.get(`/UserDashboard/GetStudentDashboard?${PARAM}`)
            return res.data.data
        },
        enabled: !!auThenticate_store.state.userId,
    })
    if (StudentStatusData.isLoading) return "Đang tải dữ liệu...";
    if (StudentStatusData.isError) return "Không có dữ liệu...";
    const Birth = utils_date_dateToDDMMYYYString(new Date(StudentStatusData.data?.dateOfBirth || ""))
    return (
        <>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 4 }} order={{ base: 1, lg: 2 }}>
                    <Card style={{ height: '870px' }}>
                        <Group>
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
                                size={65}
                                radius="md"
                            />
                            <Box>
                                <Text style={{ fontSize: '18px' }} fw={600}> {StudentStatusData.data?.fullName || 'no data'}<IconCircleCheckFilled stroke={2} style={{ color: 'var(--mantine-color-green-6)' }} /></Text>
                                <Text style={{ fontSize: '13px' }}><IconCalendarWeek stroke={1} />:  {Birth || 'no data'}</Text>
                                <Text style={{ fontSize: '13px' }}><IconMail stroke={1} />:   {StudentStatusData.data?.email || 'no data'}</Text>
                            </Box>
                        </Group>
                        <F_vmz23lu0tk_RadiaChart studentData={StudentStatusData.data || {}} />
                        <F_vmz23lu0tk_CourseOpen studentData={StudentStatusData.data || {}} />
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 8 }} order={{ base: 2, lg: 1 }}>
                    {/* row 1 */}
                    <SimpleGrid
                        cols={{ base: 1, md: 3, lg: 3, xl: 3 }}
                        spacing={{ base: 10, sm: 'sm' }}
                        verticalSpacing={{ base: 'md', sm: 'sm' }}
                    >
                        {/* box 1 */}
                        <StatsCard
                            color='#36A2EB'
                            icon={<IconCalendar style={{ width: "30px", height: '30px' }} />}
                            label="Khóa học"
                            value={StudentStatusData.data?.course?.totalCount ?? 0}
                            link=""
                            borderColor="#36A2EB"
                        />
                        <StatsCard
                            color='#4BC0C0'
                            icon={<IconCalendarEvent style={{ width: "30px", height: '30px' }} />}
                            label="Khóa thi"
                            value={StudentStatusData.data?.exam?.totalCount ?? 0}
                            borderColor="#4BC0C0"
                            link=""
                        />
                        <StatsCard
                            color='#FFCE56'
                            icon={<IconCertificate stroke={2} style={{ width: "30px", height: '30px' }} />}
                            label="Chứng chỉ nhận được"
                            value={StudentStatusData.data?.certificate?.totalCount ?? 0}
                            borderColor="#FFCE56"
                            link=""
                        />
                    </SimpleGrid>

                    {/* row 2 */}
                    <Grid mt={"md"}>
                        <Grid.Col span={{ base: 12 }}>
                            {/* box lịch hoạt động */}
                            <F_vmz23lu0tk_CourseSchedule currentUserId={auThenticate_store.state.userId || 0} />
                        </Grid.Col>
                    </Grid>

                    {/* row 3 */}
                    <Grid mt={"xs"}>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            {/* box khóa đang học */}
                            <F_vmz23lu0tk_CourseList studentData={StudentStatusData.data || {}} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            {/* box sắp thi */}
                            <F_vmz23lu0tk_Exam studentData={StudentStatusData.data || {}} />
                        </Grid.Col>
                    </Grid>

                </Grid.Col>
            </Grid>
            {/* row 4 */}
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    {/* box nhận xét */}
                    <F_vmz23lu0tk_LecturerFeedback studentData={StudentStatusData.data || {}} />
                </Grid.Col>
            </Grid>
        </>


    )
}