import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Button, Center, Grid, Group, Paper, Select, Title } from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconArrowBack, IconCash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
interface StudentRegistrationInforProps {
  courseId: string;
}

export default function StudentRegistrationInfor({
  courseId,
}: StudentRegistrationInforProps) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      fullName: '',
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      email: '',
      phoneNumber: '',
      idNumber: '',
      idIssueDate: '',
      idIssuePlace: '',
      address: '',
    },
    validate: {
      fullName: (value) => value ? null : "Không được để trống",
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log('Form values:', values);
    //TODO: Xác nhận thông tin thanh toán => redirect trang thanh toán
    router.replace(`/main/payment/exam/${courseId}`);
  });

  const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
  return (
    <Paper p={'xl'}>
      <form onSubmit={handleSubmit}>
        <Group mb='lg'>
          <Title>Thông tin học viên đăng ký</Title>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Họ tên"
              withAsterisk
              {...form.getInputProps('fullName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <Select
              label="Giới tính"
              placeholder="Chọn"
              data={genderOptions}
              {...form.getInputProps('gender')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyDateInput
              label="Ngày sinh"
              {...form.getInputProps('dateOfBirth')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Nơi sinh"
              {...form.getInputProps('placeOfBirth')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Email"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Số điện thoại"
              {...form.getInputProps('phoneNumber')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="CCCD"
              {...form.getInputProps('idNumber')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyDateInput
              label="Ngày cấp CCCD"
              {...form.getInputProps('idIssueDate')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Nơi cấp CCCD"
              {...form.getInputProps('idIssuePlace')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12 }}>
            <MyTextInput
              label="Địa chỉ"
              {...form.getInputProps('address')}
            />
          </Grid.Col>
        </Grid>

        <Center mt={'md'}>
          <Group>
            <Button type="submit" size="md" leftSection={<IconCash />}>Thanh toán</Button>
            <Button type="button" size="md" variant="outline" leftSection={<IconArrowBack />} onClick={() => router.back()}>Quay lại</Button>
          </Group>
        </Center>
      </form>
    </Paper >
  )
}
