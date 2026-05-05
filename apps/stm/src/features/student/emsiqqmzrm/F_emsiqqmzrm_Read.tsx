// import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
// import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
// import { Box, Grid } from "@mantine/core";
// import { useQuery } from "@tanstack/react-query";
// import { useAuthenticateStore as useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
// import ActivityCalendarCard from "./ActivityCalendarCard";
// import CoursesInProgressCard from "./CoursesInProgressCard";
// import DashboardSummaryCards from "./DashboardSummaryCards";
// import InstructorCommentsCard from "./InstructorCommentsCard";
// import UpcomingCoursesCard from "./UpcomingCoursesCard";
// import UpcomingExamsCard from "./UpcomingExamsCard";
// import UserProfileCard from "./UserProfileCard";
// import { IUserDashboardData } from "./interfaces/StudentDashBoard";

// export default function F_emsiqqmzrm_Read() {
//     const currentUser = useAuthenticateStore()

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const highlightedDates = [
//         { day: 17, month: 2 },
//         { day: 19, month: 2 },
//         { day: 26, month: 2 },
//         { day: 28, month: 2 },
//         { day: 21, month: 2 },
//         { day: 24, month: 2 }
//     ];

//     const getDayProps: DatePickerProps['getDayProps'] = (date: string) => {
//         const dateObj = new Date(date);
//         const isToday =
//             dateObj.getDate() === today.getDate() &&
//             dateObj.getMonth() === today.getMonth() &&
//             dateObj.getFullYear() === today.getFullYear();

//         const isHighlighted = highlightedDates.some(
//             d => dateObj.getDate() === d.day && dateObj.getMonth() === d.month && dateObj.getFullYear() === today.getFullYear()
//         );

//         if (isToday) {
//             return {
//                 style: {
//                     backgroundColor: "var(--mantine-color-blue-3)", // Ngày hôm nay màu xanh
//                     color: "var(--mantine-color-dark)",
//                     borderRadius: '50%',
//                 },
//             };
//         }

//         if (isHighlighted) {
//             return {
//                 style: {
//                     backgroundColor: "var(--mantine-color-blue-6)", // Màu nền cho ngày có khóa học
//                     color: "var(--mantine-color-white)",
//                     borderRadius: '50%',
//                 },
//             };
//         }

//         return {};
//     };

//     return (
//         <Box style={{ position: 'relative' }}>

//             <Grid>
//                 {/* Main content section */}
//                 <Grid.Col span={{ base: 12, lg: 8.5 }} order={{ base: 2, lg: 1 }}>
//                     <MyFlexColumn >
//                         <DashboardSummaryCards studentData={StudentStatusData.data || {}} />

//                         <CoursesInProgressCard studentData={StudentStatusData.data || {}} />

//                         {/* Row 2: Progress + Comments */}
//                         <Grid align="stretch" >
//                             <Grid.Col span={{ base: 12, lg: 6 }}>
//                                 <UpcomingCoursesCard studentData={StudentStatusData.data || {}} />
//                             </Grid.Col>
//                             <Grid.Col span={{ base: 12, lg: 6 }}>
//                                 <UpcomingExamsCard studentData={StudentStatusData.data || {}} />
//                             </Grid.Col>
//                         </Grid>

//                         {/* Row 3: Upcoming Courses + Exams */}


//                         <InstructorCommentsCard studentData={StudentStatusData.data || {}} />

//                     </MyFlexColumn>
//                 </Grid.Col>
//                 {/* Sidebar section */}
//                 <Grid.Col span={{ base: 12, lg: 3.5 }} order={{ base: 1, lg: 2 }}>
//                     <Grid>
//                         <Grid.Col span={12}>
//                             <UserProfileCard userData={StudentStatusData.data} />
//                         </Grid.Col>
//                         <Grid.Col span={12}>
//                             <ActivityCalendarCard currentUserId={currentUser.state.userId || 0}
//                             />
//                         </Grid.Col>
//                     </Grid>
//                 </Grid.Col>

//             </Grid>
//         </Box>

//                         </Group>

//                         <Group
//                             mt={"5"}
//                             align="flex-end"
//                             gap={"xs"}
//                         >
//                             <Text
//                                 fw={700}
//                                 fz="h1"
//                             >{7}
//                             </Text>

//                         </Group>


//                     </Paper>
//                     {/* box 3 */}
//                     <Paper withBorder
//                         p="md"
//                         radius="md"
//                         key="Số buổi cần dạy">
//                         <Group justify="space-between">

//                             <Text
//                                 tt="uppercase"
//                                 size="lg"
//                                 c="dimmed"
//                             >
//                                 Chứng chỉ nhận được
//                             </Text>

//                             <Box>
//                                 <IconCalendar opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />
//                             </Box>

//                         </Group>

//                         <Group
//                             mt={"5"}
//                             align="flex-end"
//                             gap={"xs"}
//                         >
//                             <Text
//                                 fw={700}
//                                 fz="h1"
//                             >{3}
//                             </Text>

//                         </Group>


//                     </Paper>
//                 </SimpleGrid>

//                 {/* row 2 */}
//                 <Grid mt={"md"}>
//                     <Grid.Col span={{ base: 12, lg: 6 }}>
//                         {/* box khóa học */}
//                         <Card
//                             style={{ height: "35vh" }}
//                         >
//                             <ScrollArea.Autosize>
//                                 <Text
//                                     tt="uppercase"
//                                     size="lg"
//                                     c="dimmed"
//                                     fw="bold"
//                                 >Khóa học đang học</Text>
//                                 <CourseListGenerator />
//                             </ScrollArea.Autosize>
//                         </Card>
//                     </Grid.Col>
//                     <Grid.Col span={{ base: 12, lg: 6 }}>
//                         {/* box nhận xét */}
//                         <Card style={{ height: "35vh" }}>
//                             <ScrollArea.Autosize>
//                                 <Text
//                                     tt="uppercase"
//                                     size="lg"
//                                     c="dimmed"
//                                     fw="bold"
//                                 >Nhận xét của giảng viên</Text>
//                                 <CommentGenerator />
//                             </ScrollArea.Autosize>
//                         </Card>
//                     </Grid.Col>
//                 </Grid>

//                 {/* row 3 */}
//                 <Grid mt={"md"}>
//                     <Grid.Col span={{ base: 12, lg: 6 }}>
//                         {/* box khai giảng */}
//                         <Card style={{ height: "35vh" }}>
//                             <ScrollArea.Autosize>

//                                 <Text
//                                     tt="uppercase"
//                                     size="lg"
//                                     c="dimmed"
//                                     fw="bold"
//                                 >Khóa sắp khai giảng</Text>
//                                 <OpeningGenerator />
//                             </ScrollArea.Autosize>
//                         </Card>
//                     </Grid.Col>
//                     <Grid.Col span={{ base: 12, lg: 6 }}>

//                         {/* box sắp thi */}
//                         <Card style={{ height: "35vh" }}>
//                             <ScrollArea.Autosize>
//                                 <Text
//                                     tt="uppercase"
//                                     size="lg"
//                                     c="dimmed"
//                                     fw="bold"
//                                 >Khoa thi sắp tổ chức</Text>
//                                 <ExamGenerator />
//                             </ScrollArea.Autosize>
//                         </Card>
//                     </Grid.Col>
//                 </Grid>

//             </Grid.Col>
//             <Grid.Col span={{ base: 12, lg: 3 }}>
//                 <Grid>
//                     <Grid.Col span={{ base: 12, lg: 12 }} >

//                         <Card style={{ maxHeight: '40vh', height: '40vh' }}>

//                             <ScrollArea>

//                                 <MyFlexColumn gap={'s'} pt={'15'} style={{ justifyContent: 'center', alignItems: 'center' }}>
//                                     <Avatar
//                                         src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
//                                         size={230}
//                                         style={{ maxHeight: '100%' }}
//                                         radius="md"
//                                     />
//                                     <Text style={{ fontSize: '1.5rem' }}>Tô Ngọc Lan</Text>
//                                     <Text style={{ fontSize: '1.5rem' }}>01/01/2021</Text>
//                                     <Text style={{ fontSize: '1.5rem' }}>lananhle@gmail.com</Text>
//                                 </MyFlexColumn>

//                             </ScrollArea>
//                         </Card>
//                     </Grid.Col>
//                     <Grid.Col span={{ base: 12, lg: 12 }} >

//                         <Card style={{

//                             maxHeight: '40vh',
//                             height: '40vh'
//                         }}>
//                             <Text
//                                 tt="uppercase"
//                                 size="lg"
//                                 c="dimmed"
//                             >Lịch hoạt động</Text>
//                             {/* <MyFlexColumn> */}
//                             <ScrollArea>

//                                 <DatePicker
//                                     value={value}
//                                     onChange={(val: string) => setValue(val ? new Date(val) : null)}
//                                     size="lg"
//                                     style={{
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         display: 'flex'
//                                     }}
//                                     defaultDate={new Date()}
//                                     getDayProps={getDayProps}
//                                 />
//                                 <CourseDetailGenerator />
//                             </ScrollArea>
//                         </Card>
//                     </Grid.Col>
//                 </Grid>
//             </Grid.Col>
//         </Grid>
//     )
// }


export default function F_emsiqqmzrm_Read() {
    return (
        <div>F_emsiqqmzrm_Read</div>
    )
}
