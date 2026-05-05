'use client';
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import MyTextArea from '@/components/ui/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { I_EducationRegulation } from './F_EducationRegulationTable';

export default function F_EducationRegulationUpdate({ values }: { values: I_EducationRegulation }) {
    const form = useForm<I_EducationRegulation>({
        initialValues: {
            ...values
        },
        validate: {
            name: (value) => value ? null : 'Không được để trống',
        },
    });

    const GetAllRegulation = useQuery<I_EducationRegulation[]>({
        queryKey: ["F_j9ul1u9c2n_GetAllRegulation"],
        queryFn: async () => {
            const result = await baseAxios.get<{ data: I_EducationRegulation[] }>('/COERegulation/getall');
            return result.data?.data || [];
        },
    });

    useEffect(() => {
        form.setValues(values)
    }, [values]);

    return (
        <MyActionIconUpdate form={form}
            onSubmit={async (values) => {
                return await baseAxios.post("/COERegulation/update", {
                    ...values,
                })
            }}
        >
            <MyTextInput disabled label='Mã quy chế' {...form.getInputProps("code")} />
            <MyTextInput label='Tên quy chế' {...form.getInputProps("name")} />
            <MyTextInput label='Tên quy chế Eg' {...form.getInputProps("nameEg")} />
            <MySelect
                label="Trực thuộc"
                data={GetAllRegulation.data?.filter(item => item.id !== form.values.id).map((item: I_EducationRegulation) => ({
                    value: item.id?.toString() || "",
                    label: item.name || ""
                })) || []}
                value={form.values.regulationId?.toString() || ""}
                onChange={(value) => form.setFieldValue("regulationId", Number(value))}
                error={form.errors.regulationId}
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>);
}
