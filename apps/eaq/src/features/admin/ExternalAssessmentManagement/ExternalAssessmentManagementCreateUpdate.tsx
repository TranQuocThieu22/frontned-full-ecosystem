import { documentTypeEnum, documentTypeEnumLabel } from '@/shared/constants/enum/DocumentTypeEnum'
import { IExternalAssessment } from '@/shared/interfaces/externalAssessment/IExternalAssessment'
import { IStandardSet } from '@/shared/interfaces/standardSet/StandardSet'
import { service_EAQExternalAssessment } from '@/shared/APIs/service_EAQExternalAssessment'
import { service_EAQPhase } from '@/shared/APIs/service_EAQPhase'
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter'
import { SimpleGrid, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from '@aq-fe/core-ui/shared/utils/fileUtils'

interface props {
    data?: IExternalAssessment,
    loading?: boolean
};

export function ExternalAssessmentManagementCreateUpdate({ data, loading }: props) {
    const disc = useDisclosure(false);
    const [trainingProgramId, setTrainingProgramId] = useState<number>(0);
    const filterStore = useS_Shared_Filter();
    const queryClient = useQueryClient();
    const loadingStandard = useIsFetching({ queryKey: ["standardSetQuery"] });
    const dataStandardSet: IStandardSet[] | undefined = queryClient.getQueryData(["standardSetQuery"]);

    const form = useForm<IExternalAssessment>({
        mode: "uncontrolled",
        initialValues: {
            id: data?.id || 0,
            code: data?.code || '',
            documentDate: data?.documentDate || "",
            eaqPhaseId: data?.eaqPhaseId || 0,
            eaqTrainingProgramId: data?.eaqPhase?.eaqStandardSetTrainingProgramId || 0,
            documentType: data?.documentType || 0,
            note: data?.note || '',
            documentFilePath: data?.documentFilePath || '',
            documentFileDetail: data?.documentFileDetail || {}
        },
        validate: {
            documentDate: (value) => ((!!value && value.length > 0) ? null : "Vui lòng nhập ngày văn bản"),
            code: (value) => ((!!value && value.length > 0) ? null : "Vui lòng nhập số văn bản"),
            name: (value) => ((!!value && value.length > 0) ? null : "Vui lòng nhập tên văn bản"),
            eaqPhaseId: (value) => ((!!value && value > 0) ? null : "Vui lòng chọn giai đoạn"),
            eaqTrainingProgramId: (value) => trainingProgramId > 0 ? null : "Vui lòng chọn chương trình đào tạo",
            documentType: (value) => ((!!value && value > 0) ? null : "Vui lòng chọn loại văn bản"),
        }
    })

    const programDataOptions = useMemo(() => {
        try {
            if (!data) {
                setTrainingProgramId(filterStore.state.TrainingProgram?.id || 0);
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


    const phaseQuery = useCustomReactQuery({
        queryKey: ["PhaseList_ExternalAssessmentManagementCreateUpdate_getBytrainingProgramId", trainingProgramId],
        axiosFn: async () => service_EAQPhase.getAllByEAQStandardSetTrainingprogramId(
            { eaqStandardSetTrainingProgramId: trainingProgramId }
        ).then(res => {
            if (trainingProgramId === data?.eaqPhase?.eaqTrainingProgramId) {
                form.setFieldValue("eaqPhaseId", data?.eaqPhaseId || undefined);
            } else {
                form.setFieldValue("eaqPhaseId", res.data.data?.[0]?.id || undefined);
            }
            return res;
        }),
        options: {
            enabled: !!filterStore.state.StandardSet?.id && !!trainingProgramId && disc[0],
        }
    })



    const handleSave = () => {
        const validate = form.validate();
        if (validate.hasErrors) {
            return false;
        }

        form.setFieldValue("eaqPhase", {})
        form.setFieldValue("eaqTrainingProgram", {})

        if (data) {
            return service_EAQExternalAssessment.update(form.getValues());
        }
        return service_EAQExternalAssessment.create(form.getValues());
    }

    useEffect(() => {
        if (data) {
            form.setValues(data);
            setTrainingProgramId(data.eaqPhase?.eaqStandardSetTrainingProgramId || 0);
        }

        if (!disc[0]) {
            form.reset();
        }
    }, [data, disc[0]])

    return (
        <CustomButtonCreateUpdate
            form={form}
            modalProps={{
                size: '70%',
                title: !data
                    ? 'Tạo hồ sơ liên quan đánh giá ngoài'
                    : 'Chi tiết hồ sơ liên quan đánh giá ngoài',
            }}
            onSubmit={() => handleSave()}
            isUpdate={!!data}
            disclosure={disc}
            actionIconProps={{
                loading: loading,
            }}
            buttonProps={{
                loading: loading,
            }}
        >
            <CustomTextInput
                withAsterisk
                readOnly={!!data}
                label="Số văn bản"
                defaultValue={form.getValues().code}
                error={form.errors.code}
                {...form.getInputProps("code")}
            />
            <CustomTextInput
                label="Tên văn bản"
                withAsterisk
                defaultValue={form.getValues().name}
                error={form.errors.name}
                {...form.getInputProps("name")}
            />
            <CustomSelect
                withAsterisk
                label="Loại văn bản"
                data={converterUtils.mapEnumToSelectData(documentTypeEnum, documentTypeEnumLabel).filter(item => Number(item.value) > documentTypeEnum.form04)}
                value={String(form.values.documentType)}
                onChange={val =>
                    form.setFieldValue('documentType', Number(val))
                }
                error={form.errors.documentType}
            />
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Stack>
                    <CustomSelect
                        isLoading={loadingStandard > 0}
                        withAsterisk
                        label="Chương trình đào tạo"
                        data={programDataOptions}
                        value={String(trainingProgramId)}
                        onChange={val => {
                            form.setFieldValue('eaqTrainingProgramId', Number(val));
                            form.setFieldValue('eaqPhaseId', undefined);
                            setTrainingProgramId(Number(val));
                        }}
                        error={form.errors.eaqTrainingProgramId}
                    />
                    <CustomSelect
                        withAsterisk
                        isLoading={loadingStandard > 0 || phaseQuery.isFetching}
                        label="Giai đoạn đánh giá"
                        data={phaseQuery.data?.map(item => ({ value: String(item.id), label: String(item.code) })) || []}
                        placeholder={phaseQuery.data?.length === 0 ? "Không có dữ liệu" : "Chọn giai đoạn"}
                        value={form.values.eaqPhaseId !== undefined ? String(form.values.eaqPhaseId) : null}
                        onChange={val => form.setFieldValue('eaqPhaseId', Number(val))}
                        error={form.errors.eaqPhaseId}
                    />
                </Stack>
                <Stack>
                    <CustomDateInput
                        withAsterisk
                        label="Ngày văn bản"
                        defaultValue={form.getValues().documentDate}
                        {...form.getInputProps("documentDate")}
                        error={form.errors.documentDate}
                    />
                    <CustomFileInput
                        label="File đính kèm"
                        accept=".pdf"
                        placeholder="Chọn file"
                        value={new File([], form.getValues().documentFileDetail?.fileName || form.getValues().documentFilePath?.split("/").pop() || "")}
                        onChange={async (e) => form.setFieldValue('documentFileDetail', await fileUtils.fileToAQDocumentType(e!))}
                    />
                </Stack>
            </SimpleGrid>
            <CustomTextArea
                label="Ghi chú"
                // {...form.getInputProps('note')}
                defaultValue={form.values.note ?? ""}
                onBlur={(event) => form.setFieldValue('note', event.currentTarget.value)}
            />
        </CustomButtonCreateUpdate>
    )
}
