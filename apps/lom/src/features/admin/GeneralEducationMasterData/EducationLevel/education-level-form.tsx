'use client'
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface EducationLevelDTO {
    id: number,
    code?: string | null,
    name?: string | null,
    concurrencyStamp?: string | null,
    isEnabled: boolean,
    nameEg?: string | null,
    note?: string | null,
}

export default function EducationLevelForm({ educationLevelData, formHandler }: { educationLevelData: EducationLevelDTO, formHandler: any }) {
    const queryClient = useQueryClient();

    const form = useForm<EducationLevelDTO>({
        initialValues: {
            ...educationLevelData,
            code: educationLevelData.code ?? '',
            name: educationLevelData.name ?? '',
            nameEg: educationLevelData.nameEg ?? '',
            note: educationLevelData.note ?? '',
        },
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : "Không được để trống",
        }
    })

    const educationLevelCreateOrUpdateMutation = useMutation({
        mutationFn: async (educationLevelData: EducationLevelDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/COETrainingLevel/Create' : '/COETrainingLevel/Update', educationLevelData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["EducationLevels"] });
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const handleOnSubmitForm = async () => {
        educationLevelCreateOrUpdateMutation.mutate({ ...form.getValues() });
    };

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                handleOnSubmitForm();
            })}
        >
            <Stack>
                <TextInput withAsterisk disabled={form.values.id !== 0} label='Mã bậc' placeholder='Nhập mã bậc' {...form.getInputProps("code")} />
                <TextInput withAsterisk label='Tên bậc' placeholder='Nhập tên bậc' {...form.getInputProps("name")} />
                <TextInput label="Tên bậc Eg" placeholder='Nhập tên bậc Eg' {...form.getInputProps("nameEg")} />
                <Textarea label="Ghi chú" placeholder='Nhập dữ liệu' {...form.getInputProps("note")} />
                <Button mt={8} w={"100%"} type='submit'>Lưu</Button>
            </Stack>
        </form>
    )
}

