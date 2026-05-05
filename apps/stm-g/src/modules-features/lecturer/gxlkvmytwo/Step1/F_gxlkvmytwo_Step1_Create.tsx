import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  Paper,
  Select,
  Stack
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useMutation } from '@tanstack/react-query';
import { I_student } from "./F_gxlkvmytwo_Step1";

interface Props {
  nextStep: () => void;
}

export default function F_gxlkvmytwo_Step1_Create({ nextStep }: Props) {

  const form = useForm<I_student>({
    initialValues: {
      code: "",
      avatar: "",
      fullName: "",
      dateOfBirth: undefined,
      gender: "",
      birthPlace: "",
      email: "",
      phone: "",
      address: "",
      idNumber: "",
      idIssueDate: undefined,
      idIssuePlace: "",
    },
    validate: {
      code: (value) => (value ? null : 'Vui lòng nhập mã học viên'),
      // fullName: (value) => (value ? null : 'Vui lòng nhập họ tên'),
      // email: (value) => (value ? (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ') : 'Email không hợp lệ'),
      // phone: (value) => (value ? (/^[0-9]{10}$/.test(value) ? null : 'Số điện thoại không hợp lệ') : 'Số điện thoại không hợp lệ'),
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: I_student) => {
      // return await baseAxios.post("", values);
      console.log(values)
    },
    onSuccess: () => {
      // Chuyển đến bước tiếp theo
      nextStep();
    },
  });

  const handleSubmit = (values: I_student) => {
    mutation.mutate(values);
  };

  const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
  return (
    <Box pos="relative">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={9}>
            <Grid gutter="xs">
              <Grid.Col span={4}>
                <MyTextInput
                  label="Mã học viên"
                  {...form.getInputProps("code")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <MyTextInput
                  label="Họ tên"
                  {...form.getInputProps("fullName")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DateInput
                  label="Ngày sinh"
                  valueFormat="DD/MM/YYYY"
                  rightSection={<IconSearch size={16} style={{ opacity: 0 }} />}
                  {...form.getInputProps("dateOfBirth")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <MyTextInput
                  label="Nơi sinh"
                  {...form.getInputProps("birthPlace")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Giới tính"
                  data={genderOptions}
                  {...form.getInputProps("gender")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <MyTextInput
                  label="Email"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <MyTextInput
                  label="Số điện thoại"
                  {...form.getInputProps("phone")}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <MyTextInput
                  label="Địa chỉ"
                  {...form.getInputProps("address")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <MyTextInput
                  label="CCCD"
                  {...form.getInputProps("idNumber")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DateInput
                  label="Ngày cấp CCCD"
                  valueFormat="DD/MM/YYYY"
                  rightSection={<IconSearch size={16} style={{ opacity: 0 }} />}
                  {...form.getInputProps("idIssueDate")}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <MyTextInput
                  label="Nơi cấp CCCD"
                  {...form.getInputProps("idIssuePlace")}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={3}>
            <Stack align="center">
              <Paper shadow="xs" style={{ width: 150, height: 150 }}>
                <Image
                  alt="Student photo"
                  fallbackSrc="https://placehold.co/150x150"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
        <Group justify="end" mt="md">
          <Button
            type="submit"
            rightSection={<IconArrowRight />}
            loading={mutation.isPending}
          >
            Thêm và tiếp tục
          </Button>
        </Group>
      </form>
    </Box>
  )
}
