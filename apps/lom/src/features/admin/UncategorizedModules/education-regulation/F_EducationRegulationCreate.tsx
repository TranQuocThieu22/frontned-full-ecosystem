'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/ui/Combobox/Select/MySelect';
import MyTextArea from '@/components/ui/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { I_EducationRegulation } from './F_EducationRegulationTable';

export default function F_EducationRegulationCreate() {
    const form = useForm<I_EducationRegulation>({
        initialValues: {
            code: "",
            name: "",
            nameEg: "",
            regulationId: null,
            note: "",
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        },
    })

    const GetAllRegulation = useQuery<I_EducationRegulation[]>({
        queryKey: ["F_j9ul1u9c2n_GetAllRegulation"],
        queryFn: async () => {
            const result = await baseAxios.get<{ data: I_EducationRegulation[] }>('/COERegulation/getall');
            return result.data?.data || [];
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={async (values) => {
            return await baseAxios.post("/COERegulation/create",
                {
                    ...values,
                })
        }} objectName='Chi tiết Danh mục quy chế'>
            <MyTextInput label='Mã quy chế' {...form.getInputProps("code")} />
            <MyTextInput label='Tên quy chế' {...form.getInputProps("name")} />
            <MyTextInput label='Tên quy chế Eg' {...form.getInputProps("nameEg")} />
            <MySelect label='Trực thuộc' {...form.getInputProps("regulationId")} data={GetAllRegulation.data?.map((item: I_EducationRegulation) => ({
                value: item.id?.toString() || "",
                label: item.name || ""
            })) || []}
                error={form.errors.regulationId}
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


