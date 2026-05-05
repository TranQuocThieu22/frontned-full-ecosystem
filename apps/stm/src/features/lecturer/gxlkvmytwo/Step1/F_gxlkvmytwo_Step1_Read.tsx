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
  Stack,
  TextInput
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { I_student } from "./F_gxlkvmytwo_Step1";
interface Props {
  student: I_student;
  nextStep: () => void;
}

export default function F_gxlkvmytwo_Step1_Read({ student, nextStep }: Props) {
  const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
  return (
    <Box pos="relative">
      <Grid>
        <Grid.Col span={9}>
          <Grid gutter="xs">
            <Grid.Col span={4}>
              <TextInput
                label="Mã học viên"
                value={student.code}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Họ tên"
                value={student.fullName}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DateInput
                label="Ngày sinh"
                value={student.dateOfBirth}
                valueFormat="DD/MM/YYYY"
                readOnly
                rightSection={<IconSearch size={16} style={{ opacity: 0 }} />}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Nơi sinh"
                value={student.birthPlace}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Giới tính"
                value={student.gender}
                data={genderOptions}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Email"
                value={student.email}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Số điện thoại"
                value={student.phone}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                label="Địa chỉ"
                value={student.address}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="CCCD"
                value={student.idNumber}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DateInput
                label="Ngày cấp CCCD"
                value={student.idIssueDate}
                valueFormat="DD/MM/YYYY"
                readOnly
                rightSection={<IconSearch size={16} style={{ opacity: 0 }} />}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Nơi cấp CCCD"
                value={student.idIssuePlace}
                readOnly
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col span={3}>
          <Stack align="center">
            <Paper shadow="xs" style={{ width: 150, height: 150 }}>
              <Image
                src={student.avatar}
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
          rightSection={<IconArrowRight />}
          onClick={nextStep}
        >
          Tiếp tục
        </Button>
      </Group>
    </Box>
  );
}
