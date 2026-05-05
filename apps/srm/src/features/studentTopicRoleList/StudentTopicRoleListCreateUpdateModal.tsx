'use client'

import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

interface Props {
  values?: SRMTitle
}

export default function StudentTopicRoleListCreateUpdateModal({ values }: Props) {
  const isUpdate = !!values;
  const disc = useDisclosure(false);

  const form = useForm<SRMTitle>({
    initialValues: {
      code: "",
      name: "",
      note: "",
      isDeactivate: false,
      type: EnumTitleType.StudentProjectRole
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

  console.log({ ...form.getInputProps("code") })
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
      modalProps={{
        size: "lg",
        title: isUpdate
          ? "Cập nhật vai trò thực hiện đề tài" : "Tạo vai trò thực hiện đề tài mới",
      }}
    >
      <CustomTextInput label="Mã vai trò" {...form.getInputProps("code")} readOnly={isUpdate} />
      <CustomTextInput label="Tên vai trò" {...form.getInputProps("name")} />

      <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
      <CustomCheckbox
        label="Là chủ nhiệm"
        checked={form.values.isLeader ?? false}
        onChange={(e) => form.setFieldValue("isLeader", e.target.checked)}
      />
      <CustomCheckbox
        label="Không sử dụng"
        checked={form.values.isDeactivate ?? false}
        onChange={(e) => form.setFieldValue("isDeactivate", e.target.checked)}
      />
    </CustomButtonCreateUpdate>
  )
}