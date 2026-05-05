"use client";

import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { service_Department } from "@/shared/APIs/service__department";
import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { departmenType } from "@aq-fe/core-ui/shared/consts/enum/departmentEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function TrainingProgramListCreateOrUpdateButton(
    { data, isLoading }:
        { data?: ITrainingProgram, isLoading?: boolean }) {
    const disc = useDisclosure();
    const queryClient = useQueryClient()
    const form = useForm<ITrainingProgram>({
        initialValues: data ? {
            ...data,
            note: (data.note !== null && data.note !== undefined) ? data.note : "",
        } : {
            code: "",
            name: "",
            admissionStartYear: null,
            firstGraduationYear: null,
            duration: "",
            educationMode: "",
            trainingLevel: "",
            note: "",
            // eaqStandardSetId: StandardSetId
        },
        validate: {
            code: (value) => ((!!value && value.length > 0) ? null : "Không được để trống"),
            name: (value) => ((!!value && value.length > 0) ? null : "Không được để trống"),
            admissionStartYear: (value) => {
                if (!value) return "Không được để trống";
                if (value < 0 || value > 10000) return "Giá trị năm không hợp lệ";
                return null;
            },
            firstGraduationYear: (value) => {
                if (!!value && (value < 0 || value > 10000)) return "Giá trị năm không hợp lệ";
                return null;
            },
            duration: (value) => ((!!value && value.length > 0) ? null : "Không được để trống"),
            educationMode: (value) => ((!!value && value.length > 0) ? null : "Không được để trống"),
            trainingLevel: (value) => ((!!value && value.length > 0) ? null : "Không được để trống"),
            departmentId: (value) => {
                // Check if value is null, undefined, or 0 (which would be invalid for an ID)
                if (value === null || value === undefined || value === 0) {
                    return "Vui lòng chọn đơn vị quản lí";
                }
                return null;
            },
        }
    });

    // departmentType là đơn vị quản lý, lấy 1 là lấy theo khoa
    const UnitNameQuery = useCustomReactQuery({
        queryKey: ["UnitNameQuery_GetAll"],
        axiosFn: () => service_Department.FindbyType({ Type: departmenType.Falcuty }).then(res => {
            if (res.data.isSuccess === 1 && res.data.data && !data) {
                form.setFieldValue("departmentId", res.data?.data[0]?.id);
            };
            return res;
        }),
        options: {
            enabled: disc[0],
        },
    })

    function handleSubmit() {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return false;
        }
        if (!!data) {
            return service_EAQTrainingProgram.update(form.getValues());
        };
        return service_EAQTrainingProgram.create(form.getValues());
    }

    useEffect(() => {
        if (data) {
            form.setValues({
                ...data,
                note: (data.note !== null && data.note !== undefined) ? data.note : "",
            })
        }

        if (!disc[0]) {
            form.reset();
            form.clearErrors();
        }
    }, [data, disc[0]]);

    return (
        <CustomButtonCreateUpdate
            disclosure={disc}
            isUpdate={!!data}
            modalProps={{
                size: "85%",
            }}
            form={form}
            onSubmit={() => handleSubmit()}
            submitButtonProps={{
                disabled: UnitNameQuery.isFetching
            }}
            buttonProps={{
                loading: isLoading,
            }}
            actionIconProps={{
                loading: isLoading,
            }}
            useCustomReactMutationProps={{
                options: {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['standardSetQuery'], refetchType: 'active' });
                    }
                }
            }}
        >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
                <Stack>
                    <CustomTextInput
                        maxLength={1000}
                        label="Mã chương trình đào tạo"
                        {...form.getInputProps("code")}
                        readOnly={!!data}
                        withAsterisk
                    />

                    <CustomTextInput
                        maxLength={1000}
                        label="Tên chương trình đào tạo"
                        {...form.getInputProps("name")}
                        withAsterisk
                    />

                    <CustomTextInput
                        maxLength={1000}
                        label="Thời gian đào tạo chuẩn"
                        {...form.getInputProps("duration")}
                        withAsterisk
                    />

                    <CustomNumberInput
                        label="Năm bắt đầu tuyển sinh"
                        {...form.getInputProps("admissionStartYear")}
                        withAsterisk
                        min={0}
                        max={10000}
                        step={1}
                        allowNegative={false}
                        allowDecimal={false}
                    />
                </Stack>
                <Stack>
                    <CustomSelect
                        searchable
                        label="Khoa/Viện quản lý"
                        isLoading={UnitNameQuery.isFetching}
                        withAsterisk
                        data={UnitNameQuery.data?.map((item) => ({ label: String(item.code) + " - " + String(item.name), value: String(item.id) })) || []}
                        {...form.getInputProps("departmentId")}
                        value={String(form.values.departmentId)}
                        onChange={val => {
                            return form.setFieldValue("departmentId", (val && val !== "") ? Number(val) : null)
                        }}
                    />
                    <CustomTextInput
                        maxLength={1000}
                        withAsterisk
                        label="Trình độ đào tạo"
                        {...form.getInputProps("trainingLevel")}
                    />
                    <CustomTextInput
                        maxLength={1000}
                        withAsterisk
                        label="Loại hình đào tạo"
                        {...form.getInputProps("educationMode")}
                    />
                    <CustomNumberInput
                        maxLength={1000}
                        label="Năm tốt nghiệp khóa đầu"
                        {...form.getInputProps("firstGraduationYear")}
                        min={0}
                        max={10000}
                        step={1}
                        allowNegative={false}
                        allowDecimal={false}
                    />
                </Stack>
            </SimpleGrid>
            <CustomTextArea
                label="Ghi chú"
                {...form.getInputProps("note")}
                value={form.values.note || ""}
            />
        </CustomButtonCreateUpdate >
    );
}
