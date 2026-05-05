"use client";
import { service_academicYear } from "@/api/services/service_academicYear";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import AcademicYearViewModel from "./interfaces/IAcademicYearViewModel";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";

export default function AcademicYearCreateButton() {
    const dis = useDisclosure()
    const form = useForm<AcademicYearViewModel>({
        initialValues: {
            id: 0,
            code: '',
            name: '',
            academicYearStart: '',
            academicYearEnd: '',
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            academicYearStart: (value) => value ? null : 'Không được để trống',
            academicYearEnd: (value) => value ? null : 'Không được để trống',
        }
    });


    return (
        <CustomButtonCreateUpdate
            form={form}
            modalProps={{
                size: '90%',
                title: "12.1 Danh mục năm học - học kỳ (Thêm mới)"

            }}
            buttonProps={{
                actionType: "create",
                children: "Thêm"

            }}
            disclosure={dis}
            onSubmit={() => {
                const values = form.getValues();

                const transformed = {
                    ...values,
                    code: String(values.code),
                };
                return service_academicYear.create(transformed);

            }}
        >
            <Group grow>
                <CustomNumberInput min={0} max={3000} label="Mã năm" {...form.getInputProps("code")} />
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
    );
}
