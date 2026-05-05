"use client"
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyNumberInput from '@/components/ui/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/ui/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';


export default function F_PLOAssessmentCreate({ id }: { id: number }) {
    const form = useForm<any>({
        initialValues: {
            code: "",
            coeGradeId: id,
            passedDensity: 0,
            densityPLO: 0,
            description: "",
            proficiency: null
        },
    });
    return (
        <Group>
            <MyButtonCreate
                form={form}
                onSubmit={
                    async (value) => {
                        try {
                            const response = await baseAxios.post("/COEPLO/Create", value)
                            if (response.data.isSuccess === 0) {
                                notifications.show({ message: response.data.data[""], color: "red" });
                                return Promise.reject(new Error)
                            } else {
                                return Promise.resolve()
                            }
                        } catch (error) {
                            form.setErrors({ densityPLO: "Xảy ra lỗi, vui lòng thử lại sau!" });
                        }
                    }
                }>
                <MyTextInput required label='Mã PLO' {...form.getInputProps("code")} />
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
            </MyButtonCreate>
        </Group>
    )
}

