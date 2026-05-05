import MyContainer from "@/components/Layouts/Container/MyContainer";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import ExamPayment from "@/modules-features/main/exam/examPayment/ExamPayment";
import { Center, Title } from "@mantine/core";


export default async function Page() {
    return (
        <MyContainer pb={'xl'} w={'70%'}>
            <MyFlexColumn>

                <Center>
                    <Title order={1} tt="uppercase">Thanh toán dịch vụ</Title>
                </Center>

                <ExamPayment />

            </MyFlexColumn>
        </ MyContainer>
    )
}
