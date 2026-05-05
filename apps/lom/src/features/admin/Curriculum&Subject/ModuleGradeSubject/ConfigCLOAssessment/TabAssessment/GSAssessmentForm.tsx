"use client"
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification';
import { CRUD_TYPES } from '@/data/constants/types';
import { FormulaType } from '@/data/enum/clo-assessment.enum';
import { DisclosureHandler } from '@/interfaces/common/interfaces';
import { CRUDType } from '@/types/types';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Loader, MultiSelect, Select, SimpleGrid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IGSFormula } from '../TabFormula/Interfaces';
import { handleUpdateSelectedCLO } from './Helpers/MapCLOSelectionToGSMethod';
import { IGSAssessment, IGSAssessmentUpdateModel, IGSCLO } from './Interfaces';

export interface IGSAssessmentFormProps {
    CRUDType: CRUDType;
    initialValue: IGSAssessment;
    modalHandler?: DisclosureHandler;
    gradeSubjectId: number;
}

export const FormulaTypeLabel: Record<FormulaType, string> = {
    [FormulaType.CHUYENCAN]: "Chuyên cần",
    [FormulaType.QUATRINH]: "Quá trình",
    [FormulaType.CUOIKY]: "Cuối kỳ"
};

export default function GSAssessmentForm({ CRUDType, initialValue, modalHandler, gradeSubjectId }: IGSAssessmentFormProps) {
    const queryClient = useQueryClient();
    const allGSFormulas = useQuery<IGSFormula[]>({
        queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COESubjectFormula/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        }
    })

    const allGSCLOs = useQuery<IGSCLO[]>({
        queryKey: [`GSCLOByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COECLO/GetCLOBygradeSubjectId?gradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        }
    })

    const [selectedCLO, setSelectedCLO] = useState<string[]>(initialValue?.coeSubjectMethods?.map((item) => item.coecloId!.toString()) || []);
    const form = useForm<IGSAssessmentUpdateModel>({
        initialValues: {
            id: initialValue?.id!,
            code: initialValue?.code ? initialValue?.code : null,
            name: initialValue?.name ? initialValue?.name : "",
            concurrencyStamp: initialValue?.concurrencyStamp ? initialValue?.concurrencyStamp : 'string',
            isEnabled: initialValue?.isEnabled!,
            coeGradeSubjectId: initialValue?.coeGradeSubjectId!,
            coeSubjectFormulaId: initialValue?.coeSubjectFormulaId ? initialValue?.coeSubjectFormulaId : null,
            content: initialValue?.content ? initialValue?.content : '',
            assessmentWhen: initialValue?.assessmentWhen ? initialValue?.assessmentWhen : '',
            assessmentDuration: initialValue?.assessmentDuration ? initialValue?.assessmentDuration : '',
            assessmentTool: initialValue?.assessmentTool ? initialValue?.assessmentTool : null,
            questionType: initialValue?.questionType ? initialValue?.questionType : null,
            coeSubjectMethods: initialValue?.coeSubjectMethods ? initialValue?.coeSubjectMethods : [],
        },
        validate: {
            // rate: (value) => value == 0 ? 'Không được để trống' : null,
            // AssessmentType: (value) => value ? null : 'Không được để trống',
        }
    })

    const mutateGSAssessment = useMutation({
        mutationFn: async (values: IGSAssessmentUpdateModel) => {
            const url = CRUDType === CRUD_TYPES.Create ? '/COESubjectAssessment/Create' : '/COESubjectAssessment/Update';
            const response = await baseAxios.post(url, values);
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
            return response.data;
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({
                queryKey: ['GSAssessments', gradeSubjectId]
            });
            modalHandler?.close();

        },
        onError: (error) => {
            showGeneralErrorNotification();
        },
    });

    const handleOnSubmitForm = async (values: IGSAssessmentUpdateModel) => {
        let GSMethodList = handleUpdateSelectedCLO(values.id!, selectedCLO, form.getValues().coeSubjectMethods ?? []);
        form.setFieldValue("name", form.getValues().content!);
        form.setFieldValue("coeSubjectMethods", GSMethodList);
        mutateGSAssessment.mutate(form.getValues());
    }

    return (
        <>
            <form onSubmit={form.onSubmit((values) => {
                handleOnSubmitForm(values);
            })}>
                <Select
                    clearable
                    placeholder='Chọn hình thức đánh giá'
                    label='Hình thức đánh giá'
                    disabled={allGSFormulas.isFetching}
                    rightSection={allGSFormulas.isFetching ? <Loader size="xs" /> : null}
                    data={
                        allGSFormulas.data?.map((item) => (
                            {
                                value: item.id?.toString() || "",
                                label: FormulaTypeLabel[item.formulaType as FormulaType] ?? "Không xác định",
                            }
                        )) || []
                    }
                    value={form.values.coeSubjectFormulaId?.toString()}
                    onChange={(value) => form.setFieldValue("coeSubjectFormulaId", parseInt(value!))}
                />
                <TextInput
                    placeholder='Nhập nội dung đánh giá'
                    label='Nội dung đánh giá'
                    {...form.getInputProps('content')}
                />
                <SimpleGrid
                    cols={{ base: 1, sm: 2 }}
                    spacing={{ base: 4, sm: 12 }}
                >
                    <TextInput
                        placeholder='Nhập thời điểm đánh giá'
                        label='Thời điểm đánh giá'
                        {...form.getInputProps('assessmentWhen')}
                    />
                    <TextInput
                        placeholder='Nhập thời gian đánh giá'
                        label='Thời gian đánh giá'
                        {...form.getInputProps('assessmentDuration')}
                    />
                </SimpleGrid>
                <Select
                    clearable
                    placeholder='Chọn phương pháp đánh giá'
                    label='Phương pháp đánh giá'
                    data={[
                        { value: "1", label: "Trắc nghiệm" },
                        { value: "2", label: "Tự luận" },
                        { value: "3", label: "Trắc nghiệm + Tự luận" },
                        { value: "4", label: "Tiểu luận" },
                        { value: "5", label: "Vấn đáp" },
                    ]}
                    value={form.values.questionType?.toString()}
                    onChange={(value) => form.setFieldValue("questionType", parseInt(value!))}
                />
                <MultiSelect
                    clearable
                    placeholder='Chọn CLO'
                    label='CLO'
                    disabled={allGSCLOs.isFetching}
                    rightSection={allGSCLOs.isFetching ? <Loader size="xs" /> : null}
                    data={
                        allGSCLOs.data?.map((item) => (
                            {
                                value: item.id?.toString() ?? "",
                                label: item.code! + " - " + (item.description ? item.description : "Chưa có mô tả"),
                            }
                        )) || []
                    }
                    value={selectedCLO}
                    onChange={(setSelectedCLO)}
                />
                <Select
                    clearable
                    placeholder='Chọn công cụ đánh giá'
                    label='Loại công cụ đánh giá'
                    data={[
                        { value: "1", label: "Rubrics" },
                    ]}
                    value={form.values.assessmentTool?.toString() ?? ""}
                    onChange={(value) => form.setFieldValue("assessmentTool", parseInt(value!))}
                />
                <Button mt={32} w={"100%"} type="submit">Lưu</Button>
            </form>
        </>
    )
}

