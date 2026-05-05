'use client'
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Button, Group, Loader, NumberInput, Select, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export interface ProgramFormatDTO {
    id: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled: boolean;
    nameEg?: string | null;
    coeRegulationId?: number | null,
    coeTrainingSystemId?: number | null,
    coeTrainingLevelId?: number | null,
    numSemestersMax?: number | null,
    numSemestersProgram?: number | null,
    numSemestersYear?: number | null
}

export default function ProgramFormatForm({ programFormatData, formHandler }: { programFormatData: ProgramFormatDTO, formHandler: any }) {
    const queryClient = useQueryClient();
    const form = useForm<ProgramFormatDTO>({
        initialValues: {
            ...programFormatData,
            code: programFormatData.code ?? '',
            name: programFormatData.name ?? '',
            nameEg: programFormatData.nameEg ?? ''
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            coeRegulationId: (value) => (value ? null : "Không được để trống"),
            coeTrainingSystemId: (value) => (value ? null : "Không được để trống"),
            coeTrainingLevelId: (value) => (value ? null : "Không được để trống"),
            numSemestersMax: (value) => ((value && value >= 0) ? null : "Giá trị không hợp lệ"),
            numSemestersProgram: (value) => ((value && value >= 0) ? null : "Giá trị không hợp lệ"),
            numSemestersYear: (value) => ((value && value >= 0) ? null : "Giá trị không hợp lệ"),

        }
    })

    const regulationQuery = useQuery({
        queryKey: ["Regulations"],
        queryFn: async () => {
            const response = await baseAxios.get("/COERegulation/GetAll");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const educationLevelQuery = useQuery({
        queryKey: ["EducationLevels"],
        queryFn: async () => {
            const response = await baseAxios.get("/COETrainingLevel/GetAll");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const educationFormatQuery = useQuery({
        queryKey: ["EducationFormats"],
        queryFn: async () => {
            const response = await baseAxios.get("/COETrainingSystem/GetAll");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const programFormatCreateOrUpdateMutation = useMutation({
        mutationFn: async (programFormatData: ProgramFormatDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/COEDegreeLevel/Create' : '/COEDegreeLevel/Update', programFormatData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["ProgramFormats"] });
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const handleOnSubmitForm = async () => {
        programFormatCreateOrUpdateMutation.mutate({ ...form.getValues() });
    }

    return (
        <form onSubmit={form.onSubmit((values) => {
            handleOnSubmitForm();
        })}>
            <Stack gap={12}>
                <TextInput disabled={form.values.id !== 0} withAsterisk label='Mã bậc hệ' placeholder='Nhập mã bậc hệ' {...form.getInputProps("code")} />
                <TextInput withAsterisk label='Tên bậc hệ' placeholder='Nhập tên bậc hệ' {...form.getInputProps("name")} />
                <TextInput label='Tên bậc hệ Eg' placeholder='Nhập tên bậc hệ Eg' {...form.getInputProps("nameEg")} />
                <Select
                    withAsterisk
                    clearable
                    searchable
                    nothingFoundMessage="Không tìm thấy dữ liệu"
                    placeholder='Chọn Quy chế'
                    label='Quy chế'
                    disabled={regulationQuery.isFetching}
                    rightSection={regulationQuery.isFetching ? <Loader size="xs" /> : null}
                    data={
                        regulationQuery.data?.map((regulation: any) => ({
                            value: regulation.id.toString(),
                            label: regulation.name || "Không có tên",
                        })) ?? []
                    }
                    value={form.values.coeRegulationId !== null ? form.values.coeRegulationId?.toString() : ""}
                    onChange={(value) => form.setFieldValue("coeRegulationId", value ? parseInt(value) : null)}
                    error={form.errors.coeRegulationId}
                />
                <Group gap={10} grow>
                    <Select
                        withAsterisk
                        clearable
                        searchable
                        nothingFoundMessage="Không tìm thấy dữ liệu"
                        placeholder='Chọn Bậc đào tạo'
                        label='Bậc đào tạo'
                        disabled={educationLevelQuery.isFetching}
                        rightSection={educationLevelQuery.isFetching ? <Loader size="xs" /> : null}
                        data={
                            educationLevelQuery.data?.map((educationLevel: any) => ({
                                value: educationLevel.id.toString(),
                                label: educationLevel.name || "Không có tên",
                            })) ?? []
                        }
                        value={form.values.coeTrainingLevelId !== null ? form.values.coeTrainingLevelId?.toString() : ""}
                        onChange={(value) => form.setFieldValue("coeTrainingLevelId", value ? parseInt(value) : null)}
                        error={form.errors.coeTrainingLevelId}
                    />
                    <Select
                        withAsterisk
                        clearable
                        searchable
                        nothingFoundMessage="Không tìm thấy dữ liệu"
                        placeholder='Chọn Hệ đào tạo'
                        label='Hệ đào tạo'
                        disabled={educationFormatQuery.isFetching}
                        rightSection={educationFormatQuery.isFetching ? <Loader size="xs" /> : null}
                        data={
                            educationFormatQuery.data?.map((educationFormat: any) => ({
                                value: educationFormat.id.toString(),
                                label: educationFormat.name || "Không có tên",
                            })) ?? []
                        }
                        value={form.values.coeTrainingSystemId !== null ? form.values.coeTrainingSystemId?.toString() : ""}
                        onChange={(value) => form.setFieldValue("coeTrainingSystemId", value ? parseInt(value) : null)}
                        error={form.errors.coeTrainingSystemId}
                    />
                </Group>
                <Group gap={10} grow>
                    <NumberInput withAsterisk min={0} label='Số học kỳ chương trình' placeholder='Nhập dữ liệu' {...form.getInputProps("numSemestersProgram")} />
                    <NumberInput withAsterisk min={0} label='Số học kỳ tối đa' placeholder='Nhập dữ liệu' {...form.getInputProps("numSemestersMax")} />
                    <NumberInput withAsterisk min={0} label='Số học kỳ năm học' placeholder='Nhập dữ liệu' {...form.getInputProps("numSemestersYear")} />
                </Group>
                <Button mt={5} type='submit' w={"100%"}>Lưu</Button>
            </Stack>
        </form >
    )
}


