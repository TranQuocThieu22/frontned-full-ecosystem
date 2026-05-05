import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { IReport } from "@/shared/interfaces/report/IReport";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Grid, Group, Stack, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import CollectEvidenceButton from "./CollectEvidenceButton";
import { notifications } from "@mantine/notifications";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

interface ModalProps {
    values?: IReport,
    isLoading: boolean,
}

interface OptionProps {
    value: string;
    label: string;
    taskDetailEvidence?: ITaskDetailEvidence;
}

export default function CollectedEvidenceUpdateModal({ values, isLoading }: ModalProps) {
    const modalDisc = useDisclosure();

    // const [taskDetailEvidences, setTaskDetailEvidences] = useState(values?.eaqTaskDetail?.eaqTaskDetailEvidences || []);

    const [selectedTaskDetailEvidence, setSelectedTaskDetailEvidence] = useState<ITaskDetailEvidence | undefined>();
    const [selectedEvidence, setSelectedEvidence] = useState<IEvidence | undefined>();

    const taskDetailEvidenceQuery = useCustomReactQuery({
        queryKey: ["taskDetailEvidences", values?.eaqTaskDetail?.id],
        axiosFn: () => service_EAQAnalysis.getEAQTaskDetailEvidencesByEAQTaskDetailId({ eaqTaskDetailId: values?.eaqTaskDetail?.id }),
        options: {
            enabled: modalDisc[0]
        }
    })

    // useEffect(() => {
    //     setTaskDetailEvidences(values?.eaqTaskDetail?.eaqTaskDetailEvidences || []);
    //     setSelectedTaskDetailEvidence(taskDetailEvidences[0]);
    // }, [values]);

    // useEffect(() => {
    //     if (selectedTaskDetailEvidence) {
    //         setSelectedEvidence(selectedTaskDetailEvidence.eaqEvidence);
    //     }
    // }, [selectedTaskDetailEvidence]);

    useEffect(() => {
        if (taskDetailEvidenceQuery.data?.length == 0) return;
        const defaultValue = taskDetailEvidenceQuery.data?.[0];

        setSelectedTaskDetailEvidence(defaultValue);

        const matchingValue = values?.eaqTaskDetail?.eaqTaskDetailEvidences
            ?.find(x => x.id === defaultValue?.id);

        setSelectedEvidence(matchingValue?.eaqEvidence);
    }, [taskDetailEvidenceQuery.data, values]);


    const collectEvidenceMutation = useCustomReactMutation({
        axiosFn: async ({
            taskDetailId,
            taskDetailEvidenceId,
            evidenceId
        }: {
            taskDetailId?: number,
            taskDetailEvidenceId?: number,
            evidenceId?: number
        }) => {

            if (!taskDetailId && taskDetailEvidenceId) {
                return await service_EAQAnalysis.collectEvidence({
                    eaqTaskDetailEvidenceId: taskDetailEvidenceId,
                    eaqEvidenceId: evidenceId,
                    eaqReportId: values?.id
                });
            }

            return await service_EAQAnalysis.collectEvidence({
                eaqTaskDetailId: taskDetailId,
                eaqEvidenceId: evidenceId,
                eaqReportId: values?.id
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
        if (!selectedEvidence?.id) {
            notifications.show({
                color: "red",
                message: "Vui lòng chọn minh chứng"
            })

            return;
        }

        if (values?.eaqTaskDetail?.eaqTaskDetailEvidences?.length === 0
            && taskDetailEvidenceQuery.data?.length === 0
        ) {
            collectEvidenceMutation.mutate({ taskDetailId: values?.eaqTaskDetail?.id, evidenceId: selectedEvidence?.id });

            return;
        }

        collectEvidenceMutation.mutate({ taskDetailEvidenceId: selectedTaskDetailEvidence?.id, evidenceId: selectedEvidence?.id });
    }

    return (
        <CustomButtonModal
            modalProps={{
                size: "90%",
                title: "Chi tiết minh chứng thu thập"
            }}
            buttonProps={{
                actionType: "update",
                variant: "outline",
                children: "Sửa",
            }}
            disclosure={modalDisc}>
            <Grid gutter="xl">
                {/* Cột trái: thông tin chi tiết */}
                <Grid.Col span={5}>
                    <Stack gap="lg">
                        {/* Task Information Table */}
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td width="45%" fw={600} c="dimmed">
                                        Mã tiêu chí
                                    </Table.Td>
                                    <Table.Td>
                                        {values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code}
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td width="45%" fw={600} c="dimmed">
                                        Mã yêu cầu
                                    </Table.Td>
                                    <Table.Td>
                                        {values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code}
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td width="45%" fw={600} c="dimmed">
                                        Mã công việc
                                    </Table.Td>
                                    <Table.Td>
                                        {values?.eaqTaskDetail?.code}
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td width="45%" fw={600} c="dimmed">
                                        Tên công việc
                                    </Table.Td>
                                    <Table.Td>
                                        {values?.eaqTaskDetail?.name}
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>

                        {/* Expected Evidence Selection */}
                        <CustomSelect
                            label="Minh chứng dự kiến"
                            isLoading={isLoading || taskDetailEvidenceQuery.isLoading}
                            data={taskDetailEvidenceQuery.data?.map((item) => ({
                                value: String(item.id || "N/A"),
                                label: `${item.code || "N/A"} - ${item.name || "N/A"}`,
                                taskDetailEvidence: item
                            })) || []}
                            value={selectedTaskDetailEvidence?.id?.toString() ?? ""}
                            onChange={(value, options: OptionProps) => {
                                setSelectedTaskDetailEvidence(options.taskDetailEvidence);
                                const matchingValue = values?.eaqTaskDetail?.eaqTaskDetailEvidences
                                    ?.find(x => x.id === options.taskDetailEvidence?.id);
                                {/*Sẽ gọi useEffect ở trên để cập nhật lại menuData minh chứng gốc
                                          của values ngay sau khi chọn minh chứng dự kiến khác */}
                                setSelectedEvidence(matchingValue?.eaqEvidence);
                            }}
                        />

                        {/* Collect Evidence Button */}
                        <Group justify="center">
                            <CollectEvidenceButton onSelectEvidence={(value) => setSelectedEvidence(value)} />
                        </Group>

                        {/* Evidence Information Table */}
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td width="45%" fw={600} c="dimmed">
                                        Tên minh chứng
                                    </Table.Td>
                                    <Table.Td>
                                        {selectedEvidence?.name}
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td width="45%" fw={600} c="dimmed">
                                        Số - Ngày ban hành
                                    </Table.Td>
                                    <Table.Td>
                                        {selectedEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate}
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td width="45%" fw={600} c="dimmed">
                                        Đơn vị ban hành
                                    </Table.Td>
                                    <Table.Td>
                                        {selectedEvidence?.eaqEvidenceCurrentVersion?.department?.toString()}
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Stack>
                </Grid.Col>

                {/* Cột phải: Editor */}
                <Grid.Col span={7}>
                    <CustomTextArea
                        label="Công việc đã thực hiện"
                        readOnly
                        value={values?.result ?? ""}
                        minRows={22}
                        maxRows={22}
                    />
                </Grid.Col>
            </Grid>
            <CustomButton loading={collectEvidenceMutation.isPending} actionType="save" onClick={() => { handleSubmit() }} />
        </CustomButtonModal>
    )
};

// <Grid gutter="xl">
//     {/* Cột trái: thông tin chi tiết (scrollable) */}
//     <Grid.Col span={6}>
//         <Stack gap={5}>
//             <Text fw={500}>Mã công việc: <Text span>{values?.eaqTaskDetail?.code}</Text></Text>
//             <Text fw={500}>Tên công việc: <Text span>{values?.eaqTaskDetail?.name}</Text></Text>

//             <CustomSelect
//                 my={20}
//                 label="Minh chứng dự kiến"
//                 isLoading={isLoading || taskDetailEvidenceQuery.isLoading}
//                 data={taskDetailEvidenceQuery.data?.map((item) => ({
//                     value: String(item.id || "N/A"),
//                     label: `${item.code || "N/A"} - ${item.name || "N/A"}`,
//                     taskDetailEvidence: item
//                 })) || []}
//                 value={selectedTaskDetailEvidence?.id?.toString() || ""}
//                 onChange={(value, options: OptionProps) => {
//                     setSelectedTaskDetailEvidence(options.taskDetailEvidence);

//                     const matchingValue = values?.eaqTaskDetail?.eaqTaskDetailEvidences
//                         ?.find(x => x.id === options.taskDetailEvidence?.id);

//                     setSelectedEvidence(matchingValue?.eaqEvidence);

//                     {/*Sẽ gọi useEffect ở trên để cập nhật lại menuData minh chứng gốc
//                     của values ngay sau khi chọn minh chứng dự kiến khác */}
//                     setSelectedEvidence(matchingValue?.eaqEvidence);
//                 }}
//             />

//             <CollectEvidenceButton onSelectEvidence={(value) => setSelectedEvidence(value)} />

//             <Text fw={500}>Tên minh chứng: <Text span>{selectedEvidence?.name}</Text></Text>
//             <Text fw={500}>Số - Ngày ban hành: <Text span>{selectedEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate}</Text></Text>
//             <Text fw={500}>Đơn vị ban hành: <Text span>{selectedEvidence?.eaqEvidenceCurrentVersion?.department?.toString()}</Text></Text>
//         </Stack>
//     </Grid.Col>

//     {/* Cột phải: Editor + Button */}
//     <Grid.Col span={6}>
//         <CustomRichTextEditor
//             richTextEditorProps={{
//                 h: "50vh",
//             }}
//             scrollAreaAutosizeProps={{
//                 mah: "85%"
//             }}
//             label="Kết quả cải tiến"
//             readOnly
//             value={values?.result}
//         />
//     </Grid.Col>
// </Grid>
