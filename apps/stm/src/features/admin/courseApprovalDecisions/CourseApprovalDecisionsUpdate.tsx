'use client'
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { Button, Grid, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarWeek, IconUpload } from '@tabler/icons-react';
import { CourseApprovalDecision } from './interfaces';

interface Props {
  values: CourseApprovalDecision;
}

export default function CourseApprovalDecisionsUpdate({ values }: Props) {
  const disc = useDisclosure(false);

  const form = useForm<CourseApprovalDecision>({
    initialValues: {
      ...values,
    },
  });

  return (
    <CustomButtonModal
      disclosure={disc}
      modalProps={{ title: `Chi tiết ${values.loaiQuyetDinh?.toLowerCase()}` }}
      buttonProps={{ children: 'Sửa', variant: 'subtle' }}
    >
      <Grid>
        <Grid.Col span={6}>
          <Text fw={500}>
            Mã học viên: <Text span>{values.maHocVien}</Text>
          </Text>
          <Text fw={500}>
            Ngày sinh:{' '}
            <Text span>
              {values.ngaySinh ? dateUtils.toDDMMYYYY(values.ngaySinh) : ''}
            </Text>
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fw={500}>
            Họ tên: <Text span>{values.hoTen}</Text>
          </Text>
          <Text fw={500}>
            Giới tính: <Text span>{values.gioiTinh}</Text>
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text fw={500}>
            Khóa học:{' '}
            <Text span>
              {values.maKhoaHoc} - {values.tenKhoaHoc}
            </Text>
          </Text>
        </Grid.Col>
      </Grid>

      <DateInput
        rightSection={<IconCalendarWeek />}
        label="Ngày quyết định"
        value={values.ngayQuyetDinh ? new Date(values.ngayQuyetDinh) : null}
        onChange={(d) =>
          form.setFieldValue(
            'ngayQuyetDinh',
            d ? dateUtils.toDDMMYYYY(new Date(d)) : undefined,
          )
        }
      />
      <TextInput label="Tên quyết định" {...form.getInputProps('tenQuyetDinh')} />
      <Textarea label="Ghi chú" {...form.getInputProps('ghiChu')} />
      <Button leftSection={<IconUpload />}>Minh chứng</Button>
      <Button mt="md">Lưu</Button>
    </CustomButtonModal>
  );
}

