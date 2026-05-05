'use client'
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/ui/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/ui/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

export default function F_PLOAssessmentUpdate_PLOAdjustment({ data }: { data: any }) {
    const form = useForm<any>({
        initialValues: data,
        validate: {
        }
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {

            try {
                const response = await baseAxios.post("/COEPLO/Update", values);

                // Kiểm tra API phản hồi có lỗi hay không
                if (response.data.isSuccess === 0) {
                    notifications.show({ message: response.data.data[""], color: "red" });
                    return Promise.reject(new Error)
                } else {
                    return Promise.resolve()
                }
            } catch (error) {
                form.setErrors({ densityPLO: "Lỗi kết nối đến server!" });
            }
        }}
            defaultValue={data} >
            <MyTextInput disabled required label='Mã PLO' {...form.getInputProps("code")} readOnly />
            <MyTextArea label='Mô tả'
                value={form.values.description ?? ""}
                {...form.getInputProps("description")} />
            <MyNumberInput min={0} max={100} step={1} label='Ngưỡng đạt' {...form.getInputProps("passedDensity")} />
            <MyNumberInput min={0} max={100} step={1} label='Tỷ trọng PLO' {...form.getInputProps("densityPLO")} />
            <Select
                label="Năng lực người học"
                data={[
                    { value: '1', label: 'Kiến thức' },
                    { value: '2', label: 'Kỹ năng' },
                    { value: '3', label: 'Mức độ tự chủ và trách nhiệm' },
                ]}
                value={form.values.proficiency?.toString()}
                onChange={(value) => form.setFieldValue("proficiency", parseInt(value!))}
                placeholder="Chọn năng lực người học"
            >
            </Select>
        </MyActionIconUpdate>
    )
}