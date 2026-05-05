"use client";

import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { AccreditationType } from "./StandardSetManagementTable";

export default function StandardSetCreateUpdateModal({
    values,
}: {
    values?: IStandardSet;
}) {
    const disc = useDisclosure(false);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (!values) return;
        form.setValues({
            ...values,
            image: new File([], values.imagePath?.split("/")[2] ?? ""),
        });
    }, [values]);

    const accreditationTypeOptions = [
        {
            value: AccreditationType.TrainingProgram.toString(),
            label: "Chương trình đào tạo",
        },
        // {
        //   value: AccreditationType.EducationtalInstitution.toString(),
        //   label: "Cơ sở giáo dục",
        // },
    ];

    const form = useForm<IStandardSet>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
            concurrencyStamp: "string",
            isEnabled: true,
            description: "",
            issuedDate: "",
            version: "",
            accreditationType: 1,
            imagePath: "string",
            image: undefined, // Thay đổi để lưu trữ File object
            imageDetail: {
                fileName: "",
                fileExtension: "",
                fileBase64String: "",
            },
        },
        validate: {
            code: (value) => (value ? null : "Vui lòng nhập mã bộ tiêu chuẩn"),
            name: (value) => (value ? null : "Vui lòng nhập tên bộ tiêu chuẩn"),
            issuedDate: (value) => (value ? null : "Vui lòng chọn ngày ban hành"),
            // version: (value) => (value ? null : "Vui lòng nhập phiên bản"),
            accreditationType: (value) =>
                value ? null : "Vui lòng chọn loại kiểm định",
            imageDetail: (value) => {
                if (!!values) return;
                return value &&
                    value.fileBase64String &&
                    value.fileBase64String.length > 0
                    ? null
                    : "Vui lòng chọn file";
            },
        },
    });

    function handleSubmit(formValues: IStandardSet, isUpdate?: boolean) {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return false;
        }
        if (isUpdate) return service_EAQStandardSet.update(formValues);
        return service_EAQStandardSet.create(formValues);
    }

    return (
        <CustomButtonCreateUpdate
            form={form}
            modalProps={{
                size: "60%",
                title: !values ? "Tạo bộ tiêu chuẩn mới" : "Chi tiết bộ tiêu chuẩn",
            }}
            isUpdate={!!values}
            onSubmit={() => handleSubmit(form.values, !!values)}
            disclosure={disc}
            useCustomReactMutationProps={{
                options: {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['standardSetQuery'] });
                    }
                }
            }}
        >
            <Stack>
                <CustomTextInput
                    withAsterisk
                    label="Mã bộ tiêu chuẩn"
                    {...form.getInputProps("code")}
                    error={form.errors.code}
                    readOnly={!!values}
                />
                <CustomTextInput
                    withAsterisk
                    label="Tên bộ tiêu chuẩn"
                    {...form.getInputProps("name")}
                    error={form.errors.name}
                />
            </Stack>

            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <Stack gap={0}>
                    <CustomTextArea
                        label="Mô tả bộ tiêu chuẩn"
                        description="Nhập mô tả bộ tiêu chuẩn"
                        {...form.getInputProps("description")} minRows={5} maxRows={5} />

                    <CustomFileInput
                        withAsterisk
                        label="File tiêu chuẩn"
                        description="Chọn file tiêu chuẩn"
                        pt={6}
                        placeholder={form.values.image?.name || "Chọn file"}
                        accept="image/png,image/jpeg,application/pdf"
                        error={form.errors.imageDetail}
                        value={form.values.image}
                        onChange={async (files) => {
                            if (!files) return;
                            form.setFieldValue("image", files);

                            const imageDetail = await fileUtils.fileToAQDocumentType(files);
                            form.setFieldValue("imageDetail", imageDetail);
                        }}
                    />
                </Stack>
                <Stack gap={0}>
                    <CustomDateInput
                        withAsterisk
                        label="Ngày ban hành"
                        description="Chọn ngày ban hành"
                        {...form.getInputProps("issuedDate")}
                        error={form.errors.issuedDate}
                    />

                    <CustomTextInput
                        pt={6}
                        label="Tên phiên bản"
                        description="Chọn phiên bản cho bộ tiêu chuẩn"
                        {...form.getInputProps("version")}
                        error={form.errors.version}
                    />

                    <CustomSelect
                        label="Loại kiểm định"
                        description="Chọn loại kiểm định"
                        pt={6}
                        data={accreditationTypeOptions}
                        value={form.values.accreditationType?.toString()}
                        onChange={(value) =>
                            form.setFieldValue("accreditationType", Number(value))
                        }
                    />
                </Stack>

            </SimpleGrid>

        </CustomButtonCreateUpdate >
    );
}
