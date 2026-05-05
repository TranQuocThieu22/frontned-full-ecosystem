'use client';

import { Grid, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MyButton, MyButtonModal, MyDateInput, MyFileInput, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { EnumApprovalDecision, IProposalEvaluationResultViewModel } from './interfaces/E_LectureApproveProposalViewModel';

type IFormData = Omit<IProposalEvaluationResultViewModel, 'approvalDecision'> & {
  approvalDecision?: string;
};

export default function E_LectureApproveProposalActionBtn({ values }: { values: IProposalEvaluationResultViewModel }) {
  const [opened, { open, close }] = useDisclosure(false);

  // const query = useQuery({
  //   queryKey: [''],
  //   queryFn: () => { return mockData; },
  // });

  const form = useForm<IFormData>({
    initialValues: {
      ...values,
      approvalDecision: values.approvalDecision?.toString() || '0',
    },
    validate: {
    }
  });

  const handleSubmit = async (values: IProposalEvaluationResultViewModel) => {
    console.log(values);
    close();
  };

  return (
    <MyButtonModal
      crudType="default"
      variant='transparent'
      title="Chi tiết phê duyệt chính thức"
      label="Phê duyệt"
      disclosure={[opened, { open, close, toggle: () => open() }]}
      modalSize="xl"
    >
      <form onSubmit={form.onSubmit((values) => {
        const transformedValues: IProposalEvaluationResultViewModel = {
          ...values,
          approvalDecision: values.approvalDecision ? parseInt(values.approvalDecision) : undefined,
        };
        handleSubmit(transformedValues);
      })}>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={6}>
              <MyDateInput
                label="Ngày phê duyệt/ từ chối"
                placeholder="Chọn ngày phê duyệt/từ chối"
                {...form.getInputProps('approvalDate')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                label="Người phê duyệt"
                placeholder="Nhập người phê duyệt"
                {...form.getInputProps('approver')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                label="Số quyết định/ Văn bản ban hành"
                placeholder="Nhập số quyết định"
                {...form.getInputProps('decisionNumber')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Trạng thái phê duyệt"
                placeholder="Chọn phê duyệt"
                defaultValue={values.approvalDecision?.toString()}
                data={[
                  { value: EnumApprovalDecision.PENDING.toString(), label: 'Chờ phê duyệt' },
                  { value: EnumApprovalDecision.APPROVED.toString(), label: 'Phê duyệt' },
                  { value: EnumApprovalDecision.REJECTED.toString(), label: 'Từ chối' },
                ]}
                {...form.getInputProps('approvalDecision')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextArea
                label="Nhận xét của ban lãnh đạo"
                placeholder="Nhập nhận xét của ban lãnh đạo"
                rows={4}
                {...form.getInputProps('leadershipComments')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextArea
                label="Lý do từ chối"
                placeholder="Nhập lý do từ chối"
                rows={4}
                {...form.getInputProps('rejectionReason')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MyFileInput
                label="File quyết định/ Văn bản ban hành"
                placeholder="Chọn file quyết định"
                {...form.getInputProps('decisionFile')}
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