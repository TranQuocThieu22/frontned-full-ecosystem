"use client";

import { CriteriaAssignmentStatusEnumLabel, EnumCriteriaAssignmentStatus } from "@/shared/constants/enum/CriteriaAssignmentStatusEnum";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { Table, Grid, Group, Stack, Text, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPencilCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";

export default function EvidenceCollectionCensorshipApprovalModal({
  values,
}: {
  values: ITaskDetailEvidence;
}) {
  const disc = useDisclosure();
  const queryClient = useQueryClient();
  const form = useForm<ITaskDetailEvidence>({
    initialValues: {
      ...values,
      review: values.review || ''
    },
    validate: {
      verificationStatus: (value) =>
        value ? null : "Trạng thái kiểm duyệt không được để trống",
    },
  });

  useEffect(() => {
    form.setValues(values);
  }, [values]);

  const handleSubmit = async () => {
    if (form.validate().hasErrors) {
      return;
    }

    const {
      eaqTaskDetail,
      eaqEvidence,
      eaqExpectedEvidenceUnitRelease,
      eaqExpectedEvidenceNote,
      eaqExpectedEvidenceName,
      eaqExpectedEvidenceCode,
      eaqExpectedEvidenceDate,
      eaqTaskDetailId,
      eaqEvidenceId,
      modifiedFullName,
      ...payload
    } = form.values;

    const result = await service_EAQEvaluationPlan.ReviewEAQTaskDetailEvidence(
      payload
    );

    if (result.data.isSuccess === 1) {
      form.reset();
      await queryClient.invalidateQueries();
      disc[1].close();
      notifications.show({
        color: "green",
        message: "Cập nhật thành công",
      });
    } else {
      notifications.show({
        color: "red",
        message: "Có lỗi đã xảy ra",
      });
    }
  };

  // Criteria information rows
  const criteriaRows = [
    { label: 'Mã tiêu chí', value: values.eaqTaskDetail?.eaqCriteria?.code },
    { label: 'Mã minh chứng dự kiến', value: values.eaqExpectedEvidenceCode },
    { label: 'Tên minh chứng dự kiến', value: values.eaqExpectedEvidenceName },
  ];

  // Evidence information rows
  const evidenceRows = [
    { label: 'Tên minh chứng', value: values.eaqEvidence?.name },
    { label: 'Số - Ngày ban hành', value: values.eaqExpectedEvidenceDate },
    { label: 'Đơn vị ban hành', value: values.eaqExpectedEvidenceUnitRelease },
  ];

  return (
    <CustomButtonModal
      disclosure={disc}
      modalProps={{
        size: "70%",
        title: "Chi tiết kiểm duyệt"
      }}
      buttonProps={{
        actionType: "update",
        variant: "outline",
        leftSection: <IconPencilCheck />,
        children: "Duyệt",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          {/* Criteria Information Section */}
          <div>
            <Divider
              label="Thông tin tiêu chí"
              labelPosition="center"
              mb="md"
            />
            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
              <Table.Tbody>
                {criteriaRows.map((row, index) => (
                  row.value && (
                    <Table.Tr key={index}>
                      <Table.Td width="40%" fw={600} c="dimmed">
                        {row.label}
                      </Table.Td>
                      <Table.Td>{row.value}</Table.Td>
                    </Table.Tr>
                  )
                ))}
              </Table.Tbody>
            </Table>
          </div>

          {/* Evidence Information Section */}
          <div>
            <Divider
              label="Kiểm duyệt minh chứng"
              labelPosition="center"
              mb="md"
            />
            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
              <Table.Tbody>
                {evidenceRows.map((row, index) => (
                  row.value && (
                    <Table.Tr key={index}>
                      <Table.Td width="40%" fw={600} c="dimmed">
                        {row.label}
                      </Table.Td>
                      <Table.Td>{row.value}</Table.Td>
                    </Table.Tr>
                  )
                ))}
              </Table.Tbody>
            </Table>
          </div>

          {/* Review Form Section */}
          <Stack gap="md">
            <CustomSelect
              label="Trạng thái kiểm duyệt minh chứng"
              placeholder="Chọn trạng thái kiểm duyệt"
              withAsterisk
              defaultValue={form.values.verificationStatus?.toString()}
              data={converterUtils.mapEnumToSelectData(
                EnumCriteriaAssignmentStatus,
                CriteriaAssignmentStatusEnumLabel
              )}
              onChange={(value) => {
                form.setFieldValue("verificationStatus", parseInt(value ?? "0"));
              }}
              error={form.errors.verificationStatus}
            />

            <CustomTextArea
              label="Nhận xét"
              placeholder="Nhập nhận xét"
              minRows={4}
              maxRows={4}
              {...form.getInputProps("review")}
            />

            <Group gap="xs">
              <CustomCheckbox
                label="Gửi thông báo"
                checked={form.values.isSendMail}
                onChange={(event) =>
                  form.setFieldValue(
                    "isSendMail",
                    event.currentTarget.checked
                  )
                }
              />
            </Group>
          </Stack>

          {/* Submit Button */}
          <CustomButton
            type="submit"
            loading={form.submitting}
            actionType="save"
          >
            Lưu
          </CustomButton>
        </Stack>
      </form>
    </CustomButtonModal>
  );
}
