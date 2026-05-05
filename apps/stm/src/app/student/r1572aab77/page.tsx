"use client";
import F_r1572aab77_CourseDetail from "@/features/student/r1572aab77/F_r1572aab77_CourseDetail";
import F_r1572aab77_CourseList from "@/features/student/r1572aab77/F_r1572aab77_CourseList";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Grid } from "@mantine/core";

//r1572aab77
export default function Page() {
  return (
    <CustomPageContent>
      <Grid w={"100%"}>
        <Grid.Col span={4}>
          <F_r1572aab77_CourseList />
        </Grid.Col>
        <Grid.Col span={8}>
          <F_r1572aab77_CourseDetail />
        </Grid.Col>
      </Grid>
      {/* <F_r1572aab77_Read /> */}
    </CustomPageContent>
  );
}
