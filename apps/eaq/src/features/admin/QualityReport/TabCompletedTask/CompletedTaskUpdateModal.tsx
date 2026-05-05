"use client";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IReport } from "@/shared/interfaces/report/IReport";
import { ITaskDetailReportRequestBody } from "@/shared/interfaces/task/ITaskDetailReportRequestBody";
import { Grid, Stack, Table, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";

interface Props {
  values?: IReport;
}

export default function CompletedTaskUpdateModal({ values }: Props) {
  const disc = useDisclosure();

  const form = useForm({
    initialValues: { result: values?.result || "" },
    validate: {
      result: (value) => (value && value.length > 0 ? null : "Công việc đã thực hiện không được để trống"),
    },
  });

  useEffect(() => {
    if (values) form.setValues(values);
  }, [values]);

  const updateReportMutation = useCustomReactMutation({
    axiosFn: async ({ payload }: { payload: ITaskDetailReportRequestBody }) =>
      await service_EAQAnalysis.updateEAQTaskDetailReport(payload),
    autoInvalidate: true,
    successNotification: "Thu thập minh chứng thành công",
    options: {
      onSuccess: () => disc[1].close(),
    },
  });

  const handleSubmit = async () => {
    const validate = form.validate();
    if (validate.hasErrors) return;

    const payload: ITaskDetailReportRequestBody = {
      id: values?.id,
      order: values?.order,
      reportDate: values?.reportDate,
      note: values?.note,
      result: form.getValues().result,
      reportStatus: values?.reportStatus,
    };

    updateReportMutation.mutate({ payload });
  };

  return (
    <CustomButtonModal
      disclosure={disc}
      modalProps={{
        size: "90%",
        title: "Chi tiết công việc thực hiện"
      }}
      buttonProps={{
        actionType: "update",
        variant: "outline",
        children: "Sửa",
        loading: updateReportMutation.isPending,
      }}
    >
      <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td width="40%" fw={600} c="dimmed">
              Mã tiêu chí
            </Table.Td>
            <Table.Td>
              {values?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="40%" fw={600} c="dimmed">
              Tên tiêu chí
            </Table.Td>
            <Table.Td>
              {values?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.name}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="40%" fw={600} c="dimmed">
              Mã hạn chế
            </Table.Td>
            <Table.Td>
              {values?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.code}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="40%" fw={600} c="dimmed">
              Tên hạn chế
            </Table.Td>
            <Table.Td>
              {values?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.name}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="40%" fw={600} c="dimmed">
              Mã công việc
            </Table.Td>
            <Table.Td>
              {values?.eaqTaskDetail?.code}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="40%" fw={600} c="dimmed">
              Tên công việc
            </Table.Td>
            <Table.Td>
              {values?.eaqTaskDetail?.name}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <CustomTextArea
        label="Công việc đã thực hiện"
        minRows={13}
        maxRows={13}
        maxLength={3000}
        withAsterisk
        value={form.getValues().result ?? ""}
        onChange={(event) => form.setFieldValue("result", event.target.value)}
      />

      <CustomButton loading={updateReportMutation.isPending} actionType="save" onClick={handleSubmit} />
    </CustomButtonModal>
  );
}
