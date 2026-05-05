"use client";

import { service_EAQEvidenceType } from "@/shared/APIs/service_EAQEvidenceType";
import { IEvidenceType } from "@/shared/interfaces/evidence/IEvidenceType";
import { Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { service_Department } from "@/shared/APIs/service__department";

export default function EvidenceTypeCreateOrUpdate({
  values,
  isCreate = false,
}: {
  values?: IEvidenceType;
  isCreate?: boolean;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const query_Unit_GetAll = useCustomReactQuery({
    queryKey: ["query_Unit_GetAll_EvidenceTypeForm"],
    axiosFn: () => service_Department.getAll(),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const form = useForm<IEvidenceType>({
    mode: "uncontrolled",
    initialValues: {
      code: "",
      name: "",
      note: "",
      departmentId: undefined,
      isEnabled: true,
    },
    validate: {
      code: (value) => (!value ? "Mã loại minh chứng là bắt buộc" : null),
      name: (value) => (!value ? "Tên loại minh chứng là bắt buộc" : null),
    },
  });

  useEffect(() => {
    if (opened && !isCreate && values) {
      form.setValues({ ...values });
    }
  }, [opened, values, isCreate]);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const result = form.validate();
    if (result.hasErrors) return;

    try {
      setIsSubmitting(true);
      if (isCreate) {
        await service_EAQEvidenceType.create(form.getValues());
        notifications.show({
          color: "green",
          message: "Thêm thành công",
        });
      } else {
        await service_EAQEvidenceType.update(form.getValues());
        notifications.show({
          color: "green",
          message: "Sửa thành công",
        });
      }

      form.reset();
      close();
      await queryClient.invalidateQueries();
    } catch (error) {
      notifications.show({
        color: "red",
        message: "Có lỗi xảy ra khi lưu",
      });
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getModalTitle = () => {
    if (isCreate) return "Thêm mới loại minh chứng";
    return "Cập nhật loại minh chứng";
  };

  return (
    <CustomButtonModal
      isActionIcon={!isCreate}
      {...(isCreate
        ? {
          buttonProps: {
            actionType: "create",
          },
        }
        : {
          actionIconProps: {
            actionType: "update",
            color: "yellow",
            children: <IconEdit />,
          },
        })}
      modalProps={{
        title: getModalTitle(),
        size: "md",
      }}
      disclosure={[
        opened,
        {
          open,
          close: () => {
            form.reset();
            close();
          },
          toggle: () => { },
        },
      ]}
    >
      <Stack gap="md">
        <CustomTextInput
          label="Mã loại minh chứng"
          withAsterisk
          readOnly={!isCreate}
          {...form.getInputProps("code")}
        />

        <CustomTextInput
          label="Tên loại minh chứng"
          withAsterisk
          {...form.getInputProps("name")}
        />

        <CustomSelect
          data={
            query_Unit_GetAll.data?.map((item) => ({
              value: String(item.id ?? ""),
              label: String(item.name ?? ""),
            })) ?? []
          }
          label="Đơn vị"
          placeholder="Chọn đơn vị"
          isLoading={query_Unit_GetAll.isLoading}
          {...form.getInputProps("departmentId")}
          value={String(form.values.departmentId ?? "")}
          onChange={(val) =>
            form.setFieldValue(
              "departmentId",
              val !== "" ? Number(val) : undefined
            )
          }
        />

        <Textarea
          label="Ghi chú"
          placeholder="Nhập ghi chú"
          rows={4}
          {...form.getInputProps("note")}
        />

        <CustomButton
          fullWidth
          actionType="save"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Lưu
        </CustomButton>
      </Stack>
    </CustomButtonModal>
  );
}
