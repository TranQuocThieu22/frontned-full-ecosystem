"use client";

import { useForm } from "@mantine/form";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-core-framework/shared/components/button/CustomButtonCreateUpdate";

interface NewVersionButtonProps {
  onCreate: (values: { code: string; name: string }) => void;
  /** Returns an error string if the code is already taken, null if valid */
  validateCode: (code: string) => string | null;
}

interface FormValues {
  code: string;
  name: string;
}

export function CreateVersionButton({ onCreate, validateCode }: NewVersionButtonProps) {

  const form = useForm<FormValues>({
    initialValues: {
      code: "",
      name: "",
    },
    validate: {
      code: (v) => {
        if (!v) return "Mã version không được để trống";
        return validateCode(v.trim());
      },
      name: (v) => (!v ? "Tên version không được để trống" : null),
    },
  });

  return (
    <CustomButtonCreateUpdate
      buttonProps={{
        bg: "#1A2744",
        ff: "'Roboto', sans-serif",
        fw: 700,
        children: "Tạo mới",
      }}
      submitButtonProps={{
        bg: "#1A2744",
        ff: "'Roboto', sans-serif",
        fw: 700,
      }}
      form={form}
      isUpdate={false}
      onSubmit={(values) =>
        onCreate({ code: values.code.trim(), name: values.name.trim() })
      }
      modalProps={{
        title: "Tạo version mới",
      }}
    >
      <CustomTextInput
        label="Mã version"
        placeholder="VD: RL-2027"
        withAsterisk
        {...form.getInputProps("code")}
      />
      <CustomTextInput
        label="Tên hiển thị"
        placeholder="VD: Khung điểm rèn luyện năm học 2026–2027"
        withAsterisk
        {...form.getInputProps("name")}
      />
    </CustomButtonCreateUpdate>
  );
}
