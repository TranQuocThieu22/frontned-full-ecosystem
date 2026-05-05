import MyContainer from "@/components/Layouts/Container/MyContainer";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { CourseRegister } from "@/modules-features/main/course/courseRegister/CourseRegister";
import { Center, Title } from "@mantine/core";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <MyContainer pb={'xl'}>
      <MyFlexColumn>
        <Center>
          <Title order={1} tt="uppercase">Đăng ký dịch vụ</Title>
        </Center>
        <CourseRegister courseId={router.query.id?.toString()} />
      </MyFlexColumn>
    </MyContainer>
  )
}
