'use client'
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Button, Select, Stack, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DepartmentInfoViewModel } from '../Department/department-table'
import { ProgramInfoViewModel } from './program-table'

export interface ProgramDTO {
    id: number;
    code?: string | null;
    name?: string | null;
    note?: string | null;
    departmentId?: number | null;
    concurrencyStamp?: string;
    isEnabled: boolean;
}

export default function ProgramForm({ programData, formHandler }: { programData: ProgramInfoViewModel, formHandler: any }) {
    const queryClient = useQueryClient();
    const departmentQuery = useQuery<DepartmentInfoViewModel[]>({
        queryKey: ["Departments"],
        queryFn: async () => {
            const response = await baseAxios.get("/Department/GetAll");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const form = useForm<ProgramDTO>({
        initialValues: {
            ...programData,
            code: programData.code ?? '',
            name: programData.name ?? '',
            note: programData.note ?? '',
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            departmentId: (value) => value ? null : 'Không được để trống',
        }
    })

    const programCreateOrUpdateMutation = useMutation({
        mutationFn: async (programData: ProgramDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/COEProgram/Create' : '/COEProgram/Update', programData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["Programs"] });
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const handleOnSubmitForm = async () => {
        programCreateOrUpdateMutation.mutate({ ...form.getValues() });
    };

    return (
        <form onSubmit={form.onSubmit((values) => {
            handleOnSubmitForm();
        })}>
            <Stack>
                <TextInput disabled={form.values.id !== 0} withAsterisk label='Mã chương trình' placeholder='Nhập mã chương trình' {...form.getInputProps("code")} />
                <TextInput withAsterisk label='Tên chương trình' placeholder='Nhập tên chương trình' {...form.getInputProps("name")} />
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
                            label: `${department.code} - ${department.name}` || "không có dữ liệu tên",
                        })) ?? []
                    }
                    value={form.values.departmentId !== null ? form.values.departmentId?.toString() : ""}
                    onChange={(value) => form.setFieldValue("departmentId", value ? parseInt(value) : null)}
                    error={form.errors.departmentId}
                />
                <Textarea label='Ghi chú' placeholder='Nhập ghi chú' minRows={4} {...form.getInputProps("note")} />
                <Button mt={5} type='submit' w={"100%"}>Lưu</Button>
            </Stack>
        </form >
    )
}


