"use client"
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { EventGroup } from "@/interfaces/eventGroup";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface IProps {
  eventGroup: EventGroup;
  refetch: () => void;
}

export default function EventGroupUpdateButton({ eventGroup, refetch }: IProps) {
  const form = useForm<EventGroup>({
    initialValues: eventGroup,
    validate: {
      code: (value) => (value ? null : "Vui lòng nhập mã nhóm hoạt động"),
      name: (value) => (value ? null : "Vui lòng nhập tên nhóm hoạt động"),
    },
  });

  useEffect(() => {
    form.setValues(eventGroup);
  }, [eventGroup]);

  return (
    <CustomButtonCreateUpdate
      isUpdate
      modalProps={{
        title: "Cập nhật nhóm hoạt động"
      }}
      form={form}
      onSubmit={async (values) => await service_eventGroup.update(values)}
    >
      <CustomTextInput
        readOnly
        description="Mã nhóm hoạt động không thể thay đổi"
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
