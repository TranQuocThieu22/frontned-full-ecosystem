import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import { IStandard } from "@/shared/interfaces/standard/Standard";
import { ITask } from "@/shared/interfaces/task/ITask";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { MRT_Row } from "mantine-react-table";
import { useEffect } from "react";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function TaskAssignmentTabCreateOrUpdate(
    {
        data,
        onClick,
        assessmentCouncilDecisionId,
        standardData
    }:
        {
            data?: MRT_Row<ITask>,
            onClick: ({
                childForm,
                disclosure,
                row
            }: {
                childForm: UseFormReturnType<ITask>,
                disclosure: UseDisclosureReturnValue,
                row?: MRT_Row<ITask>,
            }) => void,

            assessmentCouncilDecisionId?: number | null,
            standardData?: IStandard[]
        }) {
    const TADisclosure = useDisclosure(false);

    // api gọi council group by council decision id
    const councilGroupQuery = useCustomReactQuery({
        queryKey: ["MySelectcouncilGroupQuery_GetAll", assessmentCouncilDecisionId],
        axiosFn: async () => (
            await service_EAQAssessmentCouncilDecision.getAllEAQCouncilGroupByEAQAssessmentCouncilDecisionId({
                EAQAssessmentCouncilDecisionId: assessmentCouncilDecisionId!
            })),
        options: {
            enabled: !!assessmentCouncilDecisionId && TADisclosure[0],
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false
        }
    })

    const taskAssignmentTabForm = useForm<ITask>({
        initialValues: {
            eaqStandardId: undefined,
            eaqCouncilGroupId: undefined,
            evidenceCollectionTime: "",
            note: "",
        },
        validate: {
            eaqStandardId: (value) => value ? null : "Vui lòng chọn tiêu chuẩn",
            eaqCouncilGroupId: (value) => value ? null : "Vui lòng chọn nhóm công tác",
            evidenceCollectionTime: (value) => value ? null : "Vui lòng điền vào thời gian thu thập thông tin và minh chứng",
        }
    });

    // Handle edit mode - load existing data
    useEffect(() => {
        if (data && TADisclosure[0]) {
            taskAssignmentTabForm.setValues(data.original);
        } else if (!data && !TADisclosure[0]) {
            // Reset when modal closes
            taskAssignmentTabForm.reset();
            taskAssignmentTabForm.clearErrors();
        }
    }, [data, TADisclosure[0]]);

    // Handle create mode - set default values only when NOT editing
    useEffect(() => {
        if (!data && TADisclosure[0] && councilGroupQuery.data) {
            const firstStandardId = standardData?.at(0)?.id;
            const firstGroupId = councilGroupQuery.data?.at(0)?.id;

            // Only set if not already set
            if (firstStandardId && !taskAssignmentTabForm.values.eaqStandardId) {
                taskAssignmentTabForm.setFieldValue("eaqStandardId", firstStandardId);
                taskAssignmentTabForm.setFieldValue(
                    "eaqStandard",
                    standardData?.find(x => x.id === firstStandardId)
                );
            }
            if (firstGroupId && !taskAssignmentTabForm.values.eaqCouncilGroupId) {
                taskAssignmentTabForm.setFieldValue("eaqCouncilGroupId", firstGroupId);
                taskAssignmentTabForm.setFieldValue(
                    "eaqCouncilGroup",
                    councilGroupQuery.data?.find(x => x.id === firstGroupId)
                );
            }
        }
    }, [TADisclosure[0], data, councilGroupQuery.data, standardData]);

    return (
        <CustomButtonModal
            modalProps={{ size: "80%", title: !!data ? "Chỉnh sửa dữ liệu" : "Thêm dữ liệu" }}

            isActionIcon={!!data}
            actionIconProps={{ children: <IconEdit color="orange" />, bg: "orange.1" }}
            buttonProps={{ children: "Thêm", leftSection: <IconPlus /> }}
            disclosure={TADisclosure}
        >
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <CustomSelect
                        searchable={true}
                        withAsterisk
                        data={standardData?.map(x => ({
                            value: x.id?.toString() ?? "",
                            label: x.code + " - " + x.name
                        })) || []}
                        label="Tiêu chuẩn:"
                        value={taskAssignmentTabForm.values.eaqStandardId?.toString() ?? ""}
                        onChange={(value) => {
                            if (value) {
                                const numericValue = parseInt(value);
                                taskAssignmentTabForm.setFieldValue("eaqStandardId", numericValue);
                                taskAssignmentTabForm.setFieldValue(
                                    "eaqStandard",
                                    standardData?.find(x => x.id === numericValue)
                                );
                            }
                        }}
                        error={taskAssignmentTabForm.errors.eaqStandardId}
                    />
                </Stack>
                <Stack>
                    <CustomSelect
                        searchable={true}
                        withAsterisk
                        data={councilGroupQuery.data?.map(x => ({
                            value: x.id?.toString() ?? "",
                            label: x.code + " - " + x.name
                        })) || []}
                        label="Nhóm công tác:"
                        value={taskAssignmentTabForm.values.eaqCouncilGroupId?.toString() ?? ""}
                        onChange={(value) => {
                            if (value) {
                                const numericValue = parseInt(value);
                                taskAssignmentTabForm.setFieldValue("eaqCouncilGroupId", numericValue);
                                taskAssignmentTabForm.setFieldValue(
                                    "eaqCouncilGroup",
                                    councilGroupQuery.data?.find(x => x.id === numericValue)
                                );
                            }
                        }}
                        error={taskAssignmentTabForm.errors.eaqCouncilGroupId}
                    />
                </Stack>
            </SimpleGrid>
            <CustomTextArea
                withAsterisk
                label="Thời gian thu thập thông tin và minh chứng (Dự kiến):"
                {...taskAssignmentTabForm.getInputProps("evidenceCollectionTime")}
            />
            <CustomTextArea
                label="Ghi chú:"
                {...taskAssignmentTabForm.getInputProps("note")}
            />
            <CustomButton
                actionType="save"
                onClick={() => onClick({
                    childForm: taskAssignmentTabForm,
                    disclosure: TADisclosure,
                    row: data
                })}
            />
        </CustomButtonModal>
    )
}
