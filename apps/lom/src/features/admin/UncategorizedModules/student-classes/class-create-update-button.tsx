"use client"
import { ClassService } from '@/api/services/ClassService';
import { service_COEGrade } from '@/api/services/service_COEGrade';
import { Class } from '@/interfaces/shared-interfaces/Class';
import { COEClass } from '@/interfaces/shared-interfaces/COEClass';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface ClassCreateUpdateButtonProps {
    data?: COEClass,
    loading?: boolean
}

export default function ClassCreateUpdateButton({ data, loading }: ClassCreateUpdateButtonProps) {
    const isUpdate = !!data;
    const modalDisc = useDisclosure()
    const queryClient = useQueryClient();

    const gradeListQuery = useCustomReactQuery({
        queryKey: ["EnrollmentBatchs"],
        axiosFn: () => service_COEGrade.getAll(),
        options: {
            enabled: modalDisc[0],
            refetchOnWindowFocus: false
        }
    })

    const classForm = useForm<Class>({
        initialValues: {
            code: "",
            name: "",
            egName: "",
            coeGradeId: undefined,
            note: ""
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            egName: (value) => value ? null : 'Không được để trống',
        }
    });

    useEffect(() => {
        if (!isUpdate || !data) return;

        classForm.setValues({
            ...data,
            code: data.code ?? "",
            name: data.name ?? "",
            egName: data.egName ?? "",
            coeGradeId: data.coeGrade?.id ?? undefined,
            note: data.note ?? ""
        });
    }, [data]);

    useEffect(() => {
        if (isUpdate) return;

        classForm.reset();
    }, [isUpdate]);

    useEffect(() => {
        if (!modalDisc[0] || !gradeListQuery.isSuccess || isUpdate) return;

        classForm.setFieldValue("coeGradeId", gradeListQuery.data?.[0]?.id);
    }, [gradeListQuery.isSuccess, isUpdate, modalDisc[0]]);

    function handleSubmitClass() {
        const validationResult = classForm.validate();
        if (validationResult.hasErrors) return false;

        const classValues = classForm.getValues();
        return isUpdate
            ? ClassService.update(classValues)
            : ClassService.create(classValues)
    }

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            buttonProps={{
                loading: loading
            }}
            modalProps={{
                title: isUpdate ? "Chỉnh sửa lớp" : "Thêm lớp",
                size: "lg",
            }}
            disclosure={modalDisc}
            form={classForm}
            onSubmit={() => handleSubmitClass()}
            onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ["EnrollmentBatchs"] });
                modalDisc[1].close();
            }}
        >
            <CustomTextInput
                label="Mã lớp"
                {...classForm.getInputProps("code")}
                disabled={isUpdate}
            />
            <CustomTextInput
                label="Tên lớp"
                {...classForm.getInputProps("name")}
            />
            <CustomTextInput
                label="Tên lớp Eg"
                {...classForm.getInputProps("egName")}
            />
            <CustomSelect
                label="Khóa"
                isLoading={gradeListQuery.isLoading}
                data={gradeListQuery.data?.map(e => ({
                    value: e.id!.toString(),
                    label: `${e.code ?? 'Không có dữ liệu mã'} - ${e.name ?? 'Không có dữ liệu tên'}`
                })) ?? []}
                value={classForm.values.coeGradeId ? String(classForm.values.coeGradeId) : ""}
                onChange={(value) => classForm.setFieldValue("coeGradeId", value ? Number(value) : undefined)}
            />
            <CustomTextArea
                label="Ghi chú"
                minRows={4}
                {...classForm.getInputProps("note")}
            />
        </CustomButtonCreateUpdate>
    );
}
