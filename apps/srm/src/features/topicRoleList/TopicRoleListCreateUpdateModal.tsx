'use client'
import { titleService } from "@/shared/APIs/titleService";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

interface Props {
    values?: SRMTitle,
    isHavingLeader?: boolean
}

export default function TopicRoleListCreateUpdateModal({ values, isHavingLeader }: Props) {
    const isUpdate = !!values;
    const disc = useDisclosure(false);

    const form = useForm<SRMTitle>({
        initialValues: {
            code: "",
            name: "",
            note: "",
            isDeactivate: false,
            isLeader: false,
            type: 1
        },
        validate: {
            code: (value) => value ? null : "Vui lòng nhập mã vai trò",
            name: (value) => value ? null : "Vui lòng nhập tên vai trò",
        },
    })

    useEffect(() => {
        if (!values) return;
        form.setValues({
            ...values,
        });
    }, [values]);

    function handleSubmit(formValues: SRMTitle, isUpdate: boolean) {
        if (!isUpdate) {
            return titleService.create(formValues);
        }
        else {
            return titleService.update(formValues);
        }
    }

    return (
        <CustomButtonCreateUpdate
            form={form}
            isUpdate={isUpdate}
            onSubmit={() => handleSubmit(form.values, isUpdate)}
            disclosure={disc}
            useCustomReactMutationProps={{
                successNotification: isUpdate
                    ? "Cập nhật thành công" : "Tạo thành công"
            }}
            modalProps={{
                size: "lg",
                title: isUpdate
                    ? "Cập nhật vai trò thực hiện đề tài" : "Tạo vai trò thực hiện đề tài mới",
            }}
            scrollAreaAutosizeProps={{ h: "auto" }}
        >
            <CustomTextInput label="Mã vai trò" {...form.getInputProps("code")} readOnly={isUpdate} />
            <CustomTextInput label="Tên vai trò" {...form.getInputProps("name")} />
            <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
            <CustomCheckbox
                label="Không sử dụng"
                checked={form.values.isDeactivate ?? false}
                onChange={(e) => form.setFieldValue("isDeactivate", e.target.checked)}
            />
            {isHavingLeader
                && values?.isLeader != true
                && (
                    <span
                        style={{
                            color: "blue",
                            fontStyle: "italic",
                            fontSize: "0.75rem",
                        }}
                    >
                        Một vai trò khác hiện đang là chủ nhiệm
                    </span>
                )}
            <CustomCheckbox
                label="Là chủ nhiệm"
                checked={form.values.isLeader ?? false}
                onChange={(e) => form.setFieldValue("isLeader", e.target.checked)}
                mt={0}
            />
        </CustomButtonCreateUpdate>
    )
}
