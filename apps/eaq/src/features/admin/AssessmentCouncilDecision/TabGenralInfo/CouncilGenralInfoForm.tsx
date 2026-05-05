"use client";

import { IAssessmentCouncilDecision } from "@/shared/interfaces/assessmentCouncilDecision/IAssessmentCouncilDecision";
import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useMemo } from "react";

interface Props {
    values?: IAssessmentCouncilDecision,
    viewOnly?: boolean,
}

export interface CouncilGenralInfoFormHandle {
    getValues: () => IAssessmentCouncilDecision;
    validate: () => ReturnType<ReturnType<typeof useForm<IAssessmentCouncilDecision>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const CouncilGenralInfoForm = forwardRef<CouncilGenralInfoFormHandle, Props>(({ values, viewOnly }, ref) => {
    const filterStore = useS_Shared_Filter();
    const queryClient = useQueryClient();
    const loadingStandard = useIsFetching({ queryKey: ["standardSetQuery"] });
    const dataStandardSet: IStandardSet[] | undefined = queryClient.getQueryData(["standardSetQuery"]);

    const form = useForm<IAssessmentCouncilDecision>({
        mode: "uncontrolled",
        initialValues: values,
        validate: {
            code: (value) => (value ?? "").trim() === "" ? "Số quyết định không được để trống" : null,
            name: (value) => !value || value.trim() === "" ? "Tên quyết định không được để trống" : null,
            decisionDate: (value) => !value ? "Ngày quyết định không được để trống" : null,
            signerName: (value) => !value || value.trim() === "" ? "Người ký không được để trống" : null,
            eaqPhase: (value) => !value?.eaqStandardSetTrainingProgramId || isNaN(Number(value?.eaqStandardSetTrainingProgramId)) ? "Chọn chương trình áp dụng" : null,
            eaqPhaseId: (value) => !value || isNaN(Number(value)) ? "Chọn giai đoạn" : null,
        },
    });

    const phasesQuery = useCustomReactQuery({
        queryKey: ['phases', form.values.eaqPhase?.eaqStandardSetTrainingProgramId],
        axiosFn: () => {
            return service_EAQPhase.getAllByEAQStandardSetTrainingprogramId({ eaqStandardSetTrainingProgramId: form.values.eaqPhase?.eaqStandardSetTrainingProgramId })
        },
        options: {
            enabled: !!form.values.eaqPhase?.eaqStandardSetTrainingProgramId
        }
    });

    const programDataOptions = useMemo(() => {
        try {
            if (!values) {
                form.setFieldValue("eaqPhase", {
                    eaqStandardSetTrainingProgramId: filterStore.state.TrainingProgram?.id
                } as any);
                form.setFieldValue("eaqPhaseId", filterStore.state.Phase?.id);
                form.resetDirty();
            }

            return dataStandardSet?.find(i => i.id === filterStore.state.StandardSet?.id)?.trainingPrograms?.map((item) => ({
                value: String(item.id),
                label: `${item.code} - ${item.name}`,
            })) || [];
        } catch {
            return [];
        }
    }, [dataStandardSet, filterStore.state.TrainingProgram])

    // expose hàm cho component cha
    useImperativeHandle(ref, () => ({
        getValues: () => form.getValues(),
        validate: () => form.validate(),
        resetForm: () => form.reset(),
        isDirty: () => form.isDirty(),
        setErrors: (errors) => form.setErrors(errors),
    }));

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
                <Stack>
                    <CustomTextInput
                        withAsterisk
                        label="Số quyết định"
                        {...form.getInputProps("code")}
                        readOnly={!!values || viewOnly}
                    />
                    <CustomDateInput
                        withAsterisk
                        label="Ngày quyết định"
                        {...form.getInputProps("decisionDate")}
                        readOnly={viewOnly}
                    />
                    <CustomFileInput
                        label="File Quyết định thành lập"
                        accept=".pdf"
                        clearable
                        defaultValue={form.values.imageDetail?.fileName ? new File([], form.values.imageDetail?.fileName || "") : undefined}
                        onChange={async (file) => {
                            if (!file) {
                                form.setFieldValue("imagePath", null);
                                return;
                            };
                            form.setFieldValue(
                                "imageDetail",
                                await fileUtils.fileToAQDocumentType(file)
                            );
                        }}
                        error={form.errors.imageDetail}
                        readOnly={viewOnly}
                    />
                </Stack>
                <Stack>
                    <CustomSelect
                        withAsterisk
                        isLoading={loadingStandard > 0}
                        label="Chương trình đào tạo áp dụng"
                        data={programDataOptions}
                        placeholder={programDataOptions?.length === 0 ? "Không có dữ liệu" : "Chọn chương trình đào tạo"}
                        value={form.values.eaqPhase?.eaqStandardSetTrainingProgramId !== undefined ? String(form.values.eaqPhase?.eaqStandardSetTrainingProgramId) : null}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("eaqPhase", {
                                eaqStandardSetTrainingProgramId: id
                            } as any);
                            form.setFieldValue("eaqPhaseId", undefined);
                        }}
                        error={form.errors.eaqTrainingProgramId}
                        readOnly={!!values || viewOnly}
                    />
                    <CustomSelect
                        withAsterisk
                        isLoading={phasesQuery.isFetching}
                        isError={phasesQuery.isError}
                        label="Giai đoạn"
                        data={
                            phasesQuery.data?.map((item) => ({
                                value: String(item.id),
                                label: `${item.code} - ${item.name}`,
                            })) || []
                        }
                        placeholder={phasesQuery.data?.length === 0 ? "Không có dữ liệu" : "Chọn giai đoạn"}
                        value={form.values.eaqPhaseId !== undefined ? String(form.values.eaqPhaseId) : null}
                        onChange={(value) => {
                            form.setFieldValue("eaqPhaseId", value !== null ? Number(value) : undefined);
                        }}
                        error={form.errors.eaqPhaseId}
                        readOnly={viewOnly}
                    />
                    <CustomTextInput
                        withAsterisk
                        label="Người ký"
                        {...form.getInputProps("signerName")}
                        readOnly={viewOnly}
                    />
                </Stack>
            </SimpleGrid>
            <CustomTextArea
                withAsterisk
                mt="sm"
                label="Tên quyết định"
                {...form.getInputProps("name")}
                readOnly={viewOnly}
            />
        </>
    );
});

CouncilGenralInfoForm.displayName = "GenralInfoForm";
export default CouncilGenralInfoForm;
