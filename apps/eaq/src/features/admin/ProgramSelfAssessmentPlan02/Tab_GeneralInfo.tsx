import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { SimpleGrid, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useS_Shared_AssessmentCouncilDecisionId from "./store/AssessmentCouncilDecisionStore";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";

export default function Tab_GeneralInfo(
    {
        form,
        isUpdate,
        mainDisclosure,
        viewOnly = false,
    }: {
        form: UseFormReturnType<IEvaluationPlan>,
        isUpdate: boolean,
        mainDisclosure: UseDisclosureReturnValue,
        viewOnly?: boolean
    }
) {
    const filterStore = useS_Shared_Filter();
    const councilDescionIdStore = useS_Shared_AssessmentCouncilDecisionId();
    const [assessmentCouncilDecisionId, setAssessmentCouncilDecisionId] = useState<number | undefined | null>(form.getValues().eaqAssessmentCouncilDecision?.id);

    const assessmentCouncilDecisionQuery = useCustomReactQuery({
        queryKey: ["MySelectAssessmentCouncilDecisionQuery_GetAll", filterStore.state.Phase?.id],
        axiosFn: async () => await service_EAQAssessmentCouncilDecision.GetEAQAssessmentCouncilDecisionsByEAQPhaseId({
            eaqPhaseId: filterStore.state.Phase?.id
        }),
        options: {
            enabled: filterStore.state.Phase?.id !== undefined && mainDisclosure[0],
        }
    })

    useEffect(() => {
        if (
            !isUpdate &&
            assessmentCouncilDecisionQuery.data?.length &&
            !form.getValues().eaqAssessmentCouncilDecisionId
        ) {
            const asseementCouncilDecisionData = assessmentCouncilDecisionQuery.data[0];
            const assessmentCouncilDecisionId = asseementCouncilDecisionData?.id!;
            setAssessmentCouncilDecisionId(assessmentCouncilDecisionId);

            form.setFieldValue("eaqPhase", assessmentCouncilDecisionQuery.data[0]?.eaqPhase);
            form.setFieldValue("eaqPhaseId", assessmentCouncilDecisionQuery.data[0]?.eaqPhaseId);
            form.setFieldValue("eaqAssessmentCouncilDecisionId", assessmentCouncilDecisionId);
            councilDescionIdStore.setState({ Id: assessmentCouncilDecisionId });
        }
    }, [assessmentCouncilDecisionQuery.data]);

    useEffect(() => {
        councilDescionIdStore.setState({ Id: assessmentCouncilDecisionId ?? undefined });
    }, [assessmentCouncilDecisionId, assessmentCouncilDecisionQuery.data]);


    return (
        <>
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <CustomTextInput label="Mã kế hoạch:" {...form.getInputProps("code")} withAsterisk readOnly={isUpdate || viewOnly} />
                    <CustomTextInput label="Tên kế hoạch:" {...form.getInputProps("name")} withAsterisk readOnly={viewOnly} />
                    <CustomSelect
                        searchable={true}
                        isLoading={assessmentCouncilDecisionQuery.isFetching}
                        isError={assessmentCouncilDecisionQuery.isError}
                        data={assessmentCouncilDecisionQuery.data?.map(x => ({
                            value: String(x.id),
                            label: x.code + " - " + x.name,
                            eaqPhase: x.eaqPhase,
                            eaqPhaseId: x.eaqPhaseId
                        })) ?? []}
                        label="Hội đồng tự đánh giá:"
                        value={assessmentCouncilDecisionId?.toString()}
                        onChange={async (value, options) => {
                            if (!value) return;
                            setAssessmentCouncilDecisionId(parseInt(value));
                            form.setFieldValue("eaqAssessmentCouncilDecisionId", parseInt(value));
                            councilDescionIdStore.setState({
                                Id: parseInt(value) ?? 0
                            });
                            form.setFieldValue("eaqPhase", ((options as any).eaqPhase));
                            form.setFieldValue("eaqPhaseId", ((options as any).eaqPhaseId));
                        }}
                        readOnly={viewOnly}
                    />
                    <CustomTextInput
                        label="Chương trình đào tạo áp dụng:"
                        value={form.getValues().eaqPhase?.eaqStandardSetTrainingProgram
                            ? `${form.getValues().eaqPhase?.eaqStandardSetTrainingProgram?.code || ""} - ${form.getValues().eaqPhase?.eaqStandardSetTrainingProgram?.name || ""}`
                            : ''
                        }
                        readOnly
                    />
                </Stack>
                <Stack>
                    <CustomDateInput label="Ngày bắt đầu:" {...form.getInputProps("startDate")} readOnly={viewOnly} />
                    <CustomDateInput label="Ngày kết thúc:" {...form.getInputProps("endDate")} readOnly={viewOnly} />
                    <CustomTextInput
                        label="Giai đoạn:"
                        value={form.getValues().eaqPhase
                            ? `${form.getValues().eaqPhase?.code || ""} - ${form.getValues().eaqPhase?.name || ""}`
                            : ''
                        }
                        readOnly
                    />
                    <CustomTextInput label="Người ký:" {...form.getInputProps("signer")} />
                </Stack>
            </SimpleGrid>
            <CustomFileInput
                pt={20}
                label="File kế hoạch"
                accept="*"
                clearable
                defaultValue={form.getValues().attachmentPath ? new File([], form.getValues().attachmentPath?.split("/").at(-1) || "") : null}
                placeholder="Chọn file"
                onChange={async (file) => {
                    if (!file) {
                        form.setFieldValue("attachmentPath", '');
                        return;
                    };
                    form.setFieldValue(
                        "attachmentDetail",
                        await fileUtils.fileToAQDocumentType(file)
                    );
                }}
                readOnly={viewOnly}
            />
            <SimpleGrid cols={2} spacing="md" pt={20}>
                <Stack>
                    <CustomTextArea label="Mục tiêu tự đánh giá:"
                        onBlur={(e) => form.setFieldValue("assessmentObjective", e.currentTarget.value)}
                        defaultValue={form.getValues().assessmentObjective ?? ""}
                        readOnly={viewOnly}
                    />
                </Stack>
                <Stack>
                    <CustomTextArea label="Phạm vi tự đánh giá:"
                        onBlur={(e) => form.setFieldValue("evaluationScope", e.currentTarget.value)}
                        defaultValue={form.getValues().evaluationScope ?? ""}
                        readOnly={viewOnly}
                    />
                </Stack>
            </SimpleGrid>
        </>
    )
}
