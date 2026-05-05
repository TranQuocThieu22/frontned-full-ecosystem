'use client'
import { service_aq } from "@/api/services/service_aq";
import { service_certificate } from "@/api/services/service_certificate";
import { service_skillCenter } from "@/api/services/service_skillCenter";
import { enum_certificateTypes } from "@/constants/enum/enum_certificateTypes";
import { ICertificate } from "@/interfaces/certificate";
import { ISkillCenter } from "@/interfaces/skillCenter";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyActionIconUpdate, MyButtonCreate, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_converter_enumToSelectOptions, utils_file_fileToAQDocumentType } from "aq-fe-framework/utils";
import { useEffect } from "react";


export default function F_4rnlp1kp26_Form({ values }: { values?: ICertificate }) {
    const disc = useDisclosure()
    const getFile_query = useMyReactQuery({
        queryKey: ["service_aq.getFile", values?.imagePath],
        axiosFn: () => service_aq.getFile(values?.imagePath!),
        options: {
            enabled: values != undefined && disc[0] == true
        }
    })

    const getAllSkillCenter_query = useMyReactQuery({
        queryKey: ["getAllSkillCenter_query"],
        axiosFn: () => service_skillCenter.getAll()
    })
    const form = useForm<ICertificate>({
        mode: "uncontrolled",
        validate: {
            code: (value) => value
                ? /^[A-Za-z0-9][A-Za-z0-9-]+$/.test(value)
                    ? null
                    : "Chỉ được nhập ký tự thường, số , và dấu '-' "
                : "Không được để trống",
            name: (value) => value ? null : 'Không được để trống',
        },
    });
    useEffect(() => {
        async function setFormValue() {
            form.setValues(values ? {
                ...values,
                type: values.type,
                skillCenter: {
                    id: values.skillCenter?.id,
                    name: values.skillCenter?.name!
                },
                imageDetail: {
                    fileName: getFile_query.data?.fileName,
                    fileBase64String: getFile_query.data?.fileBase64String,
                    fileExtension: getFile_query.data?.fileExtension
                }
            } : {
                code: "",
                name: "",
                type: 0,
                link: "",
                note: "",
                imageDetail: await utils_file_fileToAQDocumentType(new File([], ""))
            })
        }
        setFormValue()
    }, [getFile_query.data])

    if (values) {
        return (
            <MyActionIconUpdate
                disclosure={disc}
                title="Chi tiết chứng chỉ/ Chứng nhận"
                form={form}
                onSubmit={(values) => {
                    const { skillCenter, ...newObj } = values;
                    disc[1].close();
                    return service_certificate.update(newObj);
                }}
            >
                <CertificateFormFields form={form} isUpdate={true} skillCenters={getAllSkillCenter_query.data} />
            </MyActionIconUpdate>
        );
    }

    return (
        <MyButtonCreate
            title="Chi tiết chứng chỉ/ Chứng nhận"
            form={form}
            onSubmit={(values) => {
                const { skillCenter, ...newObj } = values;
                return service_certificate.create(newObj);
            }}
        >
            <CertificateFormFields form={form} isUpdate={false} skillCenters={getAllSkillCenter_query.data} />
        </MyButtonCreate>
    );
}


function CertificateFormFields({
    form,
    isUpdate,
    skillCenters
}: {
    form: ReturnType<typeof useForm<ICertificate>>,
    isUpdate: boolean,
    skillCenters: ISkillCenter[] | undefined
}) {
    return (
        <>
            <MyTextInput
                label="Mã Chứng Chỉ"
                disabled={isUpdate}
                {...form.getInputProps("code")}
            />
            <MyTextInput
                label="Tên Chứng Chỉ"
                {...form.getInputProps("name")}
            />
            <MySelect
                label="Phân Loại"
                data={utils_converter_enumToSelectOptions(enum_certificateTypes)}
                value={form.getValues().type?.toString()}
                onChange={(e) => form.setFieldValue("type", parseInt(e!))}
            />
            {skillCenters &&
                <MySelect
                    searchable
                    label="Trung Tâm kỹ năng"
                    data={skillCenters.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name || ""
                    }))}
                    value={form.getValues().skillCenterId?.toString()}
                    onChange={(e) => form.setFieldValue("skillCenterId", parseInt(e!))}
                />
            }
            <MyTextInput
                label="Mã liên kết"
                {...form.getInputProps("link")}
            />
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("note")}
            />
            <MyFileInput
                label="File mẫu chứng chỉ"
                value={new File([], form.getValues().imageDetail?.fileName || "")}
                onChange={async (e) => {
                    form.setFieldValue("imageDetail", await utils_file_fileToAQDocumentType(e!))
                }}
            />
        </>
    )
}