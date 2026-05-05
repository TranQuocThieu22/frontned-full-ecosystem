"use client"
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { EventGroup } from "@/interfaces/eventGroup";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function EventGroupCreateButton() {
  const form = useForm<EventGroup>({
    initialValues: {
      code: "",
      name: "",
      isDefault: false,
      eventNumber: 0,
    },
    validate: {
      code: (value) => (value ? null : "Vui lòng nhập mã nhóm hoạt động"),
      name: (value) => (value ? null : "Vui lòng nhập tên nhóm hoạt động"),
    },
  });

  return (
    <CustomButtonCreateUpdate
      modalProps={{
        title: "Thêm nhóm hoạt động"

      }}
      form={form}
      onSubmit={(values: any) => service_eventGroup.create(values)}
    >
      <CustomTextInput
        label="Mã nhóm hoạt động"
        placeholder="Nhập mã nhóm hoạt động"
        {...form.getInputProps("code")}
      />
      <CustomTextInput
        label="Tên nhóm hoạt động"
        placeholder="Nhập tên nhóm hoạt động"
        {...form.getInputProps("name")}
      />
      <Checkbox
        label="Đặt làm mặc định"
        mt="md"
        {...form.getInputProps("isDefault", { type: "checkbox" })}
      />
    </CustomButtonCreateUpdate>
  );
}
