import { useS_Shared_FilterStudent } from "@/features/shared/FilterStudent/useS_FilterStudent"
import F_Shared_UserInfoCard from "@/features/shared/UserInfoCard/F_Shared_UserInfoCard"
import { Grid, MantineStyleProp, Paper } from "@mantine/core"
import CetificateTable from "./StudentData/CetificateTable"
import CourseTable from "./StudentData/CourseTable"
import ExamTable from "./StudentData/ExamTable"
import LecturerCommentTable from "./StudentData/LecturerCommentTable"
import PaymentTable from "./StudentData/PaymentTable"
import { useS_thfkexfuki } from "./useS_thfkexfuki"

export default function F_thfkexfuki_StudentProfile() {
  const filterStudent_store = useS_Shared_FilterStudent()

  const styleCount: MantineStyleProp = {
    fontWeight: 700,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: "4px"
  }
  const studentStatusData = useS_thfkexfuki()
  // const StudentStatusData = useQuery<IUserDashboardData>({
  //   queryKey: ["F_emsiqqmzrm_Read_StudentStatusData"],
  //   queryFn: async () => {
  //     const USERID = 9108
  //     // const PARAM = `id=${currentUser.state.userId}`
  //     const PARAM = `id=${USERID}`
  //     const res = await baseAxios.get(`/UserDashboard/GetStudentDashboard?${PARAM}`)
  //     return res.data.data
  //   },
  //   enabled: !!filterStudent_store.state.userId
  // })
  return (
    <>
      {studentStatusData.state.studentDashboard && (
        <Grid   >
          <Grid.Col span={{ base: 12, md: 6, lg: 2 }} >

            <F_Shared_UserInfoCard
              userId={filterStudent_store.state.userId}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}  >
            <Paper h={"100%"} >
              <PaymentTable studentData={studentStatusData.state.studentDashboard || {}} styleCount={styleCount} />
            </Paper>

          </Grid.Col >
          <Grid.Col span={{ base: 12, md: 12, lg: 5 }}  >
            <Paper h={"100%"} >
              <CetificateTable studentData={studentStatusData.state.studentDashboard || {}} styleCount={styleCount} />
            </Paper>

          </Grid.Col >
          <Grid.Col span={12} >
            <Paper >

              <CourseTable studentData={studentStatusData.state.studentDashboard || {}} styleCount={styleCount} />
            </Paper>

          </Grid.Col >
          <Grid.Col span={12} >
            <Paper >

              <ExamTable studentData={studentStatusData.state.studentDashboard || {}} styleCount={styleCount} />
            </Paper>

          </Grid.Col >
          <Grid.Col span={12} >
            <Paper >

              <LecturerCommentTable studentData={studentStatusData.state.studentDashboard || {}} styleCount={styleCount} />
            </Paper>

          </Grid.Col >

        </Grid>
      )}
    </>
  )
}
