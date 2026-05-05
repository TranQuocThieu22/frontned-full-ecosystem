"use client";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DepartmentInfoViewModel, DepartmentTypeLabel } from './department-table';

export interface DepartmentDTO {
    id: number;
    code?: string | null;
    name?: string | null;
    note?: string | null;
    concurrencyStamp?: string;
    isEnabled: boolean;
    modifiedWhen?: Date | null;
    modifiedBy?: number | null;
    modifiedFullName?: string;
    unitId?: number | null;
    type?: number | null;
    isWorkingUnit?: boolean | null;
    order?: number | null;
    aqModuleId?: number | null;
    aqUnitId?: number | null;
}

export default function DepartmentForm({ departmentData, formHandler }: { departmentData: DepartmentInfoViewModel, formHandler: any }) {
    const queryClient = useQueryClient();

    const form = useForm<DepartmentDTO>({
        initialValues: {
            id: departmentData.id,
            code: departmentData.code ?? '',
            name: departmentData.name ?? '',
            note: departmentData.note ?? '',
            concurrencyStamp: departmentData.concurrencyStamp,
            isEnabled: departmentData.isEnabled,
            unitId: departmentData.unitId,
            type: departmentData.type,
            isWorkingUnit: departmentData.isWorkingUnit,
            order: departmentData.order,
            aqModuleId: departmentData.aqModuleId,
            aqUnitId: departmentData.aqUnitId,
        },
        validate: {
            code: (value) => value ? null : 'Dữ liệu này không được để trống',
            name: (value) => value ? null : 'Dữ liệu này không được để trống',
            type: (value) => value ? null : 'Dữ liệu này không được để trống',
        },
    });

    const DepartmentQuery = useQuery<DepartmentInfoViewModel[]>({
        queryKey: ["DepartmentSelection"],
        queryFn: async () => {
            const response = await baseAxios.get("/Department/GetAll");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const departmentCreateOrUpdateMutation = useMutation({
        mutationFn: async (departmentData: DepartmentDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/Department/Create' : '/Department/Update', departmentData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["Departments"] });
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const handleOnSubmitForm = async () => {
        departmentCreateOrUpdateMutation.mutate({ ...form.getValues() });
    }

    return (
        <>
            <form onSubmit={form.onSubmit((values) => {
                handleOnSubmitForm();
            })}>
                <Stack gap={12}>
                    <TextInput
                        disabled={form.values.id !== 0}
                        withAsterisk
                        label="Mã đơn vị"
                        placeholder='Nhập mã đơn vị'
                        {...form.getInputProps("code")} />
                    <TextInput
                        withAsterisk
                        label="Tên đơn vị"
                        placeholder='Nhập tên đơn vị'
                        {...form.getInputProps("name")} />
                    <Select
                        clearable
                        searchable
                        nothingFoundMessage="Không tìm thấy dữ liệu"
                        placeholder='Chọn loại đơn vị'
                        label="Loại đơn vị"
                        data={
                            Object.entries(DepartmentTypeLabel).map(([key, value]) => (
                                {
                                    value: key,
                                    label: value
                                }
                            )) ?? []
                        }
                        {...form.getInputProps("type")}
                        value={form.values.type !== null ? form.values.type?.toString() : ""}
                    />
                    <Select
                        clearable
                        searchable
                        nothingFoundMessage="Không tìm thấy dữ liệu"
                        placeholder='Chọn đơn vị trực thuộc'
                        label='Đơn vị trực thuộc'
                        data={
                            DepartmentQuery.data?.map((department) => ({
                                value: department.id.toString(),
                                label: department.name || "Không có tên",
                            })) ?? []
                        }
                        value={form.values.unitId !== null ? form.values.unitId?.toString() : ""}
                        onChange={(value) => form.setFieldValue("unitId", value ? parseInt(value) : null)}
                        error={form.errors.unitId}
                    />
                    <Textarea label="Ghi chú" {...form.getInputProps("note")} />
                    <Button mt={5} type='submit' w={"100%"}>Lưu</Button>
                </Stack>
            </form >
        </>
    );
}
