"use client"
import MyContainer from "@/components/Layouts/Container/MyContainer";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ExamRegister } from "@/features/main/exam/examRegister/ExamRegister";
import { Center, Title } from "@mantine/core";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    return (
        <MyContainer pb={'xl'}>
            <MyFlexColumn>

                <Center>
                    <Title order={1} tt="uppercase">Đăng ký dịch vụ</Title>
                </Center>

                <ExamRegister courseId={"1"} />

            </MyFlexColumn>
        </MyContainer>
    )
}
