import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IReport } from "@/shared/interfaces/report/IReport";
import { ITaskDetailReportRequestBody } from "@/shared/interfaces/task/ITaskDetailReportRequestBody";
import { Grid, Group, ScrollArea, Stack, Table, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";

interface Props {
    values?: IReport;
}

export default function CompletedTaskUpdateModal({ values }: Props) {
    const disc = useDisclosure();

    const form = useForm<IReport>({
        initialValues: { result: values?.result || "" },
        validate: {
            result: (value) => (value && value.length > 0 ? null : "Kết quả cải tiến không được để trống"),
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
                title: "Chi tiết kết quả cải tiến",
            }}
            buttonProps={{
                actionType: "update",
                variant: "outline",
                children: "Sửa",
                loading: updateReportMutation.isPending,
            }}
        >
            <Grid gutter="xl">
                {/* Cột trái: thông tin chi tiết */}
                <Grid.Col span={6}>
                    <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td width="40%" fw={600} c="dimmed">
                                    Mã tiêu chí
                                </Table.Td>
                                <Table.Td>
                                    {values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width="40%" fw={600} c="dimmed">
                                    Tên tiêu chí
                                </Table.Td>
                                <Table.Td>
                                    {values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.name}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width="40%" fw={600} c="dimmed">
                                    Mã hạn chế
                                </Table.Td>
                                <Table.Td>
                                    {values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width="40%" fw={600} c="dimmed">
                                    Tên hạn chế
                                </Table.Td>
                                <Table.Td>
                                    {values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.name}
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
                </Grid.Col>

                {/* Cột phải: Editor */}
                <Grid.Col span={6}>
                    <CustomRichTextEditor
                        richTextEditorProps={{
                            h: "50vh",
                        }}
                        scrollAreaAutosizeProps={{
                            mah: "85%"
                        }}
                        label="Kết quả cải tiến"
                        withAsterisk
                        value={form.getValues().result}
                        onChange={(value: string) => form.setFieldValue("result", value)}
                        error={form.errors.result?.toString()}
                    />
                </Grid.Col>
            </Grid>

            <CustomButton
                loading={updateReportMutation.isPending}
                actionType="save"
                onClick={handleSubmit}
            />
        </CustomButtonModal>
    );
}
