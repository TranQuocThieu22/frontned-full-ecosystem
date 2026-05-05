'use client'
import { enum_certificateTypes } from "@/constants/enum/enum_certificateTypes";
import { aqService } from "@/shared/APIs/aqService";
import { certificateService } from "@/shared/APIs/certificateService";
import { skillCenterService } from "@/shared/APIs/skillCenterService";
import { Certificate } from "@/shared/interfaces/certificate";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { FileInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function CertificateListCreateUpdate({ values }: { values?: Certificate }) {
    const isUpdate = !!values

    const getFile_query = useCustomReactQuery({
        queryKey: ["aqService.getFile", values?.imagePath],
        axiosFn: () => aqService.getFile(values?.imagePath!),
        options: { enabled: isUpdate }
    })

    const skillCenterQuery = useCustomReactQuery({
        queryKey: ["getAllSkillCenter_query"],
        axiosFn: () => skillCenterService.getAll()
    })

    const form = useForm<Certificate>({
        mode: "uncontrolled",
        validate: {
            code: (value: string | undefined) => value
                ? /^[A-Za-z0-9][A-Za-z0-9-]+$/.test(value)
                    ? null
                    : "Chỉ được nhập ký tự thường, số , và dấu '-' "
                : "Không được để trống",
            name: (value: string | undefined) => value ? null : 'Không được để trống',
        },
    });

    useEffect(() => {
        const newValues = {
            ...values,
            note: values?.note || "",
            imageDetail: {
                fileName: getFile_query.data?.fileName,
                fileBase64String: getFile_query.data?.fileBase64String,
                fileExtension: getFile_query.data?.fileExtension,
            }
        }
        form.setInitialValues(newValues)
        form.setValues(newValues)
    }, [values, getFile_query.data])

    return (
        <CustomButtonCreateUpdate
            modalProps={{ title: isUpdate ? "Sửa chứng chỉ/ Chứng nhận" : "Thêm chứng chỉ/ Chứng nhận" }}
            isUpdate={isUpdate}
            form={form}
            onSubmit={(formValues) => {
                const { skillCenter, ...newObj } = formValues;
                return isUpdate ? certificateService.update(newObj) : certificateService.create(newObj);
            }}
        >
            <Stack>
                <TextInput label="Mã Chứng Chỉ" readOnly={isUpdate} {...form.getInputProps("code")} />
                <TextInput label="Tên Chứng Chỉ" {...form.getInputProps("name")} />
                <Select
                    label="Phân Loại"
                    data={converterUtils.enumToSelectOptions(enum_certificateTypes)}
                    value={form.getValues().type?.toString()}
                    onChange={(e) => form.setFieldValue("type", parseInt(e!))}
                />
                {skillCenterQuery.data &&
                    <Select
                        searchable
                        label="Trung Tâm kỹ năng"
                        data={skillCenterQuery.data.map(item => ({
                            value: item.id?.toString()!,
                            label: item.name || ""
                        }))}
                        value={form.getValues().skillCenterId?.toString()}
                        onChange={(e) => form.setFieldValue("skillCenterId", parseInt(e!))}
                    />
                }
                <TextInput label="Mã liên kết" {...form.getInputProps("link")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
                <FileInput
                    label="File mẫu chứng chỉ"
                    value={new File([], form.getValues().imageDetail?.fileName || "")}
                    onChange={async (e) => {
                        form.setFieldValue("imageDetail", await fileUtils.fileToAQDocumentType(e!))
                    }}
                />
            </Stack>
        </CustomButtonCreateUpdate>
    );
}
