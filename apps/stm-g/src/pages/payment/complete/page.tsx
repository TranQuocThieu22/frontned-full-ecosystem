import MyContainer from "@/components/Layouts/Container/MyContainer";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import CompletePayment from "@/modules-features/main/CompletePayment";
import { Center, Title } from "@mantine/core";


export default function Page() {
  return (
    <MyContainer pb={'xl'} w={'70%'}>
      <MyFlexColumn>
        <Center>
          <Title order={1} tt="uppercase">Hoàn thành đăng ký</Title>
        </Center>

        <CompletePayment />
      </MyFlexColumn>
    </MyContainer>
  )
}
