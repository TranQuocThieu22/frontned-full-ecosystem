'use client';

import { Grid, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MyButton, MyButtonModal, MyDateInput, MyFileInput, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { IUpdateCompilationProgressTask } from './interfaces/UpdateCompilationProgressViewModel';

type IFormData = {
  status: string;
  completionPercentage: number;
  notes: string;
  actualCompletionDate?: string;
  attachedDocuments?: File;
};

export default function UpdateCompilationProgressActionBtn({ values }: { values: IUpdateCompilationProgressTask }) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<IFormData>({
    initialValues: {
      status: values.status.toString(),
      completionPercentage: values.completionPercentage,
      notes: values.notes || '',
      actualCompletionDate: values.actualCompletionDate || '',
      attachedDocuments: undefined,
    },
  });

  const handleSubmit = async (values: IFormData) => {
    console.log(values);
    close();
  };

  return (
    <MyButtonModal
      crudType="update"
      variant='transparent'
      title="Chi tiết công việc"
      label="Cập nhật"
      disclosure={[opened, { open, close, toggle: () => open() }]}
      modalSize="xl"
    >
      <form onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={6}>
              <Select
                label="Trạng thái công việc"
                placeholder="Chọn trạng thái"
                data={[
                  { value: '0', label: 'Chưa bắt đầu' },
                  { value: '1', label: 'Đang thực hiện' },
                  { value: '2', label: 'Hoàn thành' },
                  { value: '3', label: 'Tạm dừng' },
                ]}
                {...form.getInputProps('status')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                label="% hoàn thành"
                placeholder="Nhập phần trăm hoàn thành"
                type="number"
                min={0}
                max={100}
                {...form.getInputProps('completionPercentage')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyDateInput
                label="Ngày hoàn thành thực tế"
                placeholder="Chọn ngày hoàn thành thực tế"
                {...form.getInputProps('actualCompletionDate')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyFileInput
                label="Tài liệu sản phẩm trung gian kèm file"
                placeholder="Chọn file tài liệu"
                {...form.getInputProps('attachedDocuments')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                rows={4}
                {...form.getInputProps('notes')}
              />
            </Grid.Col>
          </Grid>

          <MyButton type="submit" w="full">
            Lưu
          </MyButton>
        </Stack>
      </form>
    </MyButtonModal>
  );
}
