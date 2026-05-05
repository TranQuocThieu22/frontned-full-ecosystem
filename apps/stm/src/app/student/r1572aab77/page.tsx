"use client";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_r1572aab77_CourseDetail from "@/modules-features/student/r1572aab77/F_r1572aab77_CourseDetail";
import F_r1572aab77_CourseList from "@/modules-features/student/r1572aab77/F_r1572aab77_CourseList";
import { Grid } from "@mantine/core";

//r1572aab77
export default function Page() {
  return (
    <MyPageContent>
      <Grid w={"100%"}>
        <Grid.Col span={4}>
          <F_r1572aab77_CourseList />
        </Grid.Col>
        <Grid.Col span={8}>
          <F_r1572aab77_CourseDetail />
        </Grid.Col>
      </Grid>
      {/* <F_r1572aab77_Read /> */}
    </MyPageContent>
  );
}
