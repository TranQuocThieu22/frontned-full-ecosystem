"use client";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, NumberInput, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DepartmentInfoViewModel } from '../Department/department-table';
import { SubjectInfoViewModel } from './subject-table';

export interface SubjectDTO {
    id: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled: boolean;
    nameEg?: string | null;
    numberPeriod?: number | null;
    numberCredit?: number | null;
    note?: string | null;
    departmentId?: number | null;
}

export default function SubjectForm({ subjectData, formHandler }: { subjectData: SubjectInfoViewModel, formHandler: any }) {
    const queryClient = useQueryClient();
    const departmentQuery = useQuery<DepartmentInfoViewModel[]>({
        queryKey: ["Departments"],
        queryFn: async () => {
            const response = await baseAxios.get("/Department/GetAll");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const form = useForm<SubjectDTO>({
        initialValues: {
            ...subjectData,
            code: subjectData.code ?? '',
            name: subjectData.name ?? '',
            nameEg: subjectData.nameEg ?? '',
            note: subjectData.note ?? '',
        },
        validate: {
            code: (value) => ((value && value.trim().length > 0) ? null : "không được để trống"),
            name: (value) => ((value && value.trim().length > 0) ? null : "không được để trống"),
            departmentId: (value) => (value ? null : "Vui lòng chọn khoa"),
            numberPeriod: (value) => ((value && value > 0) ? null : "Số tiết phải lớn hơn 0"),
            numberCredit: (value) => ((value && value > 0) ? null : "Số tín chỉ phải lớn hơn 0"),
        },
    });

    const subjectCreateOrUpdateMutation = useMutation({
        mutationFn: async (subjectData: SubjectDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/COESubject/Create' : '/COESubject/Update', subjectData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["Subjects"] });
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const handleOnSubmitForm = async () => {
        subjectCreateOrUpdateMutation.mutate({ ...form.getValues() });
    };

    return (
        <>
            <form
                onSubmit={form.onSubmit((values) => {
                    handleOnSubmitForm();
                })}
            >
                <Stack gap={12}>
                    <TextInput withAsterisk disabled={form.values.id !== 0} label="Mã môn học" placeholder='Nhập mã môn học' {...form.getInputProps("code")} />
                    <TextInput withAsterisk label="Tên môn học" placeholder='Nhập tên môn học' {...form.getInputProps("name")} />
                    <TextInput label="Tên môn học Eg" placeholder='Nhập tên môn học Eg' {...form.getInputProps("nameEg")} />
                    <NumberInput withAsterisk min={0} label="Số tiết" placeholder='Nhập số tiết' {...form.getInputProps("numberPeriod")} />
                    <NumberInput withAsterisk min={0} label="Số tín chỉ" placeholder='Nhập số tín chỉ' {...form.getInputProps("numberCredit")} />
                    <Select
                        clearable
                        searchable
                        withAsterisk
                        nothingFoundMessage="Không tìm thấy dữ liệu"
                        placeholder='Chọn khoa quản lý'
                        label='Khoa quản lý'
                        data={
                            departmentQuery.data?.map((department) => ({
                                value: department.id.toString(),
                                label: department.name || "không có dữ liệu tên",
                            })) ?? []
                        }
                        value={form.values.departmentId !== null ? form.values.departmentId?.toString() : ""}
                        onChange={(value) => form.setFieldValue("departmentId", value ? parseInt(value) : null)}
                        error={form.errors.departmentId}
                    />
                    <Textarea label="Ghi chú" placeholder='Nhập dữ liệu' minRows={4} {...form.getInputProps("note")} />
                    <Button mt={8} w={"100%"} type='submit'>Lưu</Button>
                </Stack>
            </form >
        </>
    );
}

