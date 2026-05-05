import { service_academicYear } from "@/api/services/service_academicYear";
import { AcademicYear } from "@/interfaces/academicYear";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import AcademicYearViewModel from "./interfaces/IAcademicYearViewModel";
import { CustomActionIconUpdate } from "@aq-fe/core-ui/shared/components/button/CustomActionIconUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";

export default function AcademicYearUpdateButton({ data }: { data: AcademicYear }) {
    const queryClient = useQueryClient()
    const form = useForm<AcademicYearViewModel>({
        initialValues: {
            id: data.id,
            code: data.code,
            name: data.name,
            academicYearStart: data.academicYearStart || undefined,
            academicYearEnd: data.academicYearEnd || undefined,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            academicYearStart: (value) => value ? null : 'Không được để trống',
            academicYearEnd: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <Group>
            <CustomButtonCreateUpdate
                isUpdate
                modalProps={{
                    title: "Cập nhật năm học học kỳ"
                }}
                form={form}
                onSubmit={() => {
                    const values = form.getValues();
                    const transformed = {
                        ...values,
                        code: String(values.code),
                    };
                    const request = service_academicYear.update(transformed)
                    queryClient.invalidateQueries()
                    return request

                }}
            >
                <Group grow>
                    <CustomNumberInput readOnly min={0} max={3000} label="Mã năm" {...form.getInputProps("code")} />
                    <CustomDateInput
                        label="Ngày bắt đầu"
                        {...form.getInputProps("academicYearStart")}
                    />
                </Group>
                <Group grow>
                    <CustomTextInput label="Năm học" {...form.getInputProps("name")} />
                    <CustomDateInput
                        label="Ngày kết thúc"
                        {...form.getInputProps("academicYearEnd")}
                    />
                </Group>

                <CustomTextArea
                    label="Ghi chú"
                    {...form.getInputProps('note')}
                />
            </CustomButtonCreateUpdate>
        </Group >
    );
}
