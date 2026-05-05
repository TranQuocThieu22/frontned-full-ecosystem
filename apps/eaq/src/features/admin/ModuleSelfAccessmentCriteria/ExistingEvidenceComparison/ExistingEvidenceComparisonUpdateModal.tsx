"use client";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { Table, Stack, Divider, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import CollectEvidenceButton from "./CollectEvidenceButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";

export default function ExistingEvidenceComparisonUpdateModal({
  values,
}: {
  values?: ITaskDetailEvidence;
}) {
  const modalDisc = useDisclosure();
  const [selectedEvidence, setSelectedEvidence] = useState<IEvidence | undefined>();

  const existingEvidenceForm = useForm({
    initialValues: {
      eaqExpectedEvidenceNote: values?.eaqExpectedEvidenceNote || "",
    },
  });

  useEffect(() => {
    existingEvidenceForm.setValues({
      eaqExpectedEvidenceNote: values?.eaqExpectedEvidenceNote || "",
    });
  }, [values]);

  const collectEvidenceMutation = useCustomReactMutation({
    axiosFn: async ({ evidenceId }: { evidenceId?: number }) => {
      return await service_EAQEvaluationPlan.TaskDetailEvidenceCollectEvidence({
        eaqTaskDetailEvidenceId: values?.id,
        eaqEvidenceId: evidenceId,
        note: existingEvidenceForm.getValues().eaqExpectedEvidenceNote
      });
    },
    autoInvalidate: true,
    successNotification: "Thu thập minh chứng thành công",
    options: {
      onSuccess: () => {
        modalDisc[1].close();
      }
    }
  });

  const handleSubmit = () => {
    collectEvidenceMutation.mutate({ evidenceId: selectedEvidence?.id });
  }

  const criteriaRows = [
    { label: 'Mã tiêu chí', value: values?.eaqTaskDetail?.eaqCriteria?.code },
    { label: 'Mã minh chứng dự kiến', value: values?.eaqExpectedEvidenceCode },
    { label: 'Tên minh chứng dự kiến', value: values?.eaqExpectedEvidenceName },
  ];

  const evidenceRows = [
    { label: 'Mã minh chứng', value: selectedEvidence?.code ?? values?.eaqEvidence?.code },
    { label: 'Tên minh chứng', value: selectedEvidence?.name ?? values?.eaqEvidence?.name },
    { label: 'Số - Ngày ban hành', value: values?.eaqExpectedEvidenceDate },
    { label: 'Đơn vị ban hành', value: values?.eaqExpectedEvidenceUnitRelease },
  ];

  return (
    <CustomButtonModal
      isActionIcon
      modalProps={{
        size: "50%",
        title: "Chi tiết minh chứng thu thập"
      }}
      actionIconProps={{
        actionType: "update",
      }}
      disclosure={modalDisc}
    >
      <Stack gap="lg">
        {/* Criteria Information Section */}
        <Box>
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
        </Box>

        <Divider label="Thu thập minh chứng" labelPosition="center" />

        {/* Evidence Collection Button */}
        <Group justify="center">
          <CollectEvidenceButton onSelectEvidence={(value) => setSelectedEvidence(value)} />
        </Group>

        {/* Evidence Information Section */}
        <Box>
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
        </Box>

        {/* Notes Section */}
        <CustomTextArea
          label="Ghi chú"
          {...existingEvidenceForm.getInputProps("eaqExpectedEvidenceNote")}
        />

        <CustomButton actionType="save" onClick={() => handleSubmit()} />

      </Stack>
    </CustomButtonModal>
  );
}
