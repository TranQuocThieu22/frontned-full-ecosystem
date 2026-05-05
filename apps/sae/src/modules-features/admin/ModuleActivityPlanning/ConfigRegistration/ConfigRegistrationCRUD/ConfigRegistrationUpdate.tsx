"use client";

import { service_classActivityPlan } from "@/api/services/service_classActivityPlan";
import { ClassActivityPlan } from "@/interfaces/classActivityPlan";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ConfigRegistrationUpdate({
  data,
  disabled,
}: {
  data: ClassActivityPlan[];
  disabled: boolean;
}) {
  const selectedItems = data && data.length > 0 ? data : [];
  const isMultiple = selectedItems.length > 1;

  const form = useForm<{
    startRegistration: Date | undefined;
    endRegistration: Date | undefined;
  }>({
    initialValues: {
      startRegistration: undefined,
      endRegistration: undefined,
    },
    validate: {
      startRegistration: (value) => {
        if (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selectedDate = new Date(value);
          selectedDate.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            return "Ngày bắt đầu đăng ký phải lớn hơn hoặc bằng ngày hiện tại";
          }
        }
        return null;
      },
      endRegistration: (value) => {
        if (value && value < new Date()) {
          return "Ngày kết thúc đăng ký phải lớn hơn ngày hiện tại";
        }
        if (value && form.values.startRegistration && value < form.values.startRegistration) {
          return "Ngày kết thúc đăng ký phải lớn hơn ngày bắt đầu đăng ký";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: {
    startRegistration: Date | undefined;
    endRegistration: Date | undefined;
  }) => {
    if (selectedItems.length === 0) {
      return undefined as any; // Explicitly cast to satisfy TypeScript
    }
    const updatePromises = selectedItems.map((item) =>
      service_classActivityPlan.update({
        ...item,
        startRegistration: values.startRegistration,
        endRegistration: values.endRegistration,
      })
    );
    const results = await Promise.all(updatePromises);
    return results[0];
  };
  return (
    <CustomButtonCreateUpdate
      modalProps={{
        title: `Khoảng thời gian đăng ký ${isMultiple ? `(${selectedItems.length} lớp)` : ""}`
      }}
      buttonProps={{
        children: `Gán thời gian ${isMultiple ? `cho ${selectedItems.length} lớp` : ""}`,
        disabled: disabled
      }}
      form={form}
      onSubmit={handleSubmit}
    >
      <Group grow>
        <CustomDateInput
          label="Ngày bắt đầu đăng ký"
          withAsterisk
          clearable={false}
          {...form.getInputProps("startRegistration")}
          error={form.errors.startRegistration}
          onChange={(value) => {
            if (value) {
              form.setFieldValue("startRegistration", new Date(value));
            }
          }}
        />
        <CustomDateInput
          label="Ngày kết thúc đăng ký"
          clearable={false}
          {...form.getInputProps("endRegistration")}
          error={form.errors.endRegistration}
          onChange={(value) => {
            if (value) {
              form.setFieldValue("endRegistration", new Date(value));
            }
          }}
        />
      </Group>
    </CustomButtonCreateUpdate>
  );
}
