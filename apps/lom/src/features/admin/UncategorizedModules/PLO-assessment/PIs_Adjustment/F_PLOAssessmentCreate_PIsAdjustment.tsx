'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyNumberInput from '@/components/ui/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/ui/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';



export default function F_PLOAssessmentCreate_PIsAdjustment({ data }: { data: any[] }) {
    const mappedArray = data?.map(item => ({
        value: item.id.toString(),
        label: `${item.code || "N/A"} - ${item.description || "No description"}`
    }));
    const form = useForm<any>({
        initialValues: {
            coeploId: data && data.length > 0 ? data[0].id || 0 : 0,
            code: "",
            description: "",
            densityPI: 0
        }
    })
    return (
        <MyButtonCreate crudType='create' form={form} onSubmit={async (value) => {
            try {
                const response = await baseAxios.post("/COEPI/Create", value)
                if (response.data.isSuccess === 0 || response.data.data === "Tỷ trọng PI của một PLO không vượt quá 100%") {
                    notifications.show({ message: "Vui lòng nhập tổng tỷ trọng nhỏ hơn 100", color: "red" });
                    return Promise.reject(new Error)
                } else {
                    return Promise.resolve()
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                form.setErrors({ densityPLO: "Lỗi kết nối đến server!" });
            }
        }} >
            <Select required label="Mã PLO" data={mappedArray}
                defaultValue={form.values.coeploId.toString()}
                onChange={(value) => form.setFieldValue("coeploId", Number(value))}
            />
            <MyTextInput required label='Mã PIs' {...form.getInputProps("code")} />
            <MyTextArea label='Mô tả' {...form.getInputProps("description")} />
            <MyNumberInput min={0} step={1} label='Tỷ trọng PI' {...form.getInputProps("densityPI")} />
        </MyButtonCreate>
    )
}