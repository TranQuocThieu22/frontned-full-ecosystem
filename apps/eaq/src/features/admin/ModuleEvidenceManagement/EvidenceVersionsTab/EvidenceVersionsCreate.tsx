"use client";

import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";

export default function EvidenceVersionsCreate({
  onAddAction,
  existingVersions = [],
}: {
  onAddAction: (newVersion: IEnvidenceVersion) => void;
  existingVersions?: IEnvidenceVersion[];
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<IEnvidenceVersion>({
    mode: "uncontrolled",
    initialValues: {
      attachFileName: "",
      link: "",
      versionNumberIssueDate: "",
      validDate: undefined,
      expiredDate: undefined,
      attachFileDescription: "",
      isCurrent: false,
    },
    validate: {
      versionNumberIssueDate: (value) =>
        !value ? "Số - Ngày ban hành là bắt buộc" : null,

      validDate: (value, values) => {
        if (!value) return "Ngày hiệu lực là bắt buộc";
        if (
          values.expiredDate &&
          new Date(value) > new Date(values.expiredDate)
        ) {
          return "Ngày hiệu lực phải nhỏ hơn hoặc bằng ngày hết hạn";
        }
        return null;
      },

      expiredDate: (value, values) => {
        if (!value) return "Ngày hết hạn là bắt buộc";
        if (values.validDate && new Date(value) < new Date(values.validDate)) {
          return "Ngày hết hạn phải lớn hơn hoặc bằng ngày hiệu lực";
        }
        return null;
      },
      department: (value) => !value ? "Đơn vị là bắt buộc" : null,
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!opened) {
      form.reset();
    }
  }, [opened]);

  const handleAdd = (existingVersions: IEnvidenceVersion[]) => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    const values = form.getValues();

    // Check if trying to add a current version when one already exists
    if (values.isCurrent) {
      const hasExistingCurrent = existingVersions.some(
        (v) => v.isCurrent && v.statusAction !== "isDelete"
      );

      if (hasExistingCurrent) {
        notifications.show({
          color: "orange",
          message: "Đã tồn tại phiên bản hiện hành. Vui lòng bỏ chọn phiên bản hiện hành của phiên bản cũ trước khi thêm phiên bản hiện hành mới.",
        });
        return;
      }
    }

    const randomId = String(Math.floor(Math.random() * 1000000));
    const newVersion: IEnvidenceVersion = {
      ...values,
      name: `${values.attachFileName?.split(".")[0]}_${randomId}`,
      code: `${values.attachFileName?.split(".")[0]}_${randomId}`,
    };

    onAddAction(newVersion);
    form.reset();
    close();
  };

  return (
    <CustomButtonModal
      buttonProps={{
        actionType: "create",
      }}
      modalProps={{
        size: 'xl',
        title: 'Chi tiết phiên bản minh chứng'
      }}
      disclosure={[opened, { open, close, toggle: () => { } }]}
    >
      <Stack gap="md">
        <Grid>
          <Grid.Col span={6}>
            <CustomFileInput
              label="File đính kèm"
              error={form.errors.attachFileViewModel}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={form.values.attachFile}
              onChange={async (file) => {
                if (!file) return;
                form.setFieldValue("attachFile", file);
                form.setFieldValue("attachFileName", file.name);
                form.setFieldValue(
                  "attachFileViewModel",
                  await fileUtils.fileToAQDocumentType(file)
                );
              }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              label="Tên file"
              placeholder=""
              {...form.getInputProps("attachFileName")}
              readOnly
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              label="Link liên kết"
              {...form.getInputProps("link")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              withAsterisk
              label="Số - Ngày ban hành"
              {...form.getInputProps("versionNumberIssueDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomDateInput
              withAsterisk
              label="Hiệu lực từ ngày"
              {...form.getInputProps("validDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomDateInput
              withAsterisk
              label="Hiệu lực đến ngày"
              {...form.getInputProps("expiredDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              withAsterisk
              label="Đơn vị ban hành/ cấp"
              {...form.getInputProps("department")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomTextArea
              label="Ghi chú phiên bản"
              rows={3}
              {...form.getInputProps("attachFileDescription")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomCheckbox
              label="Phiên bản hiện hành"
              {...form.getInputProps("isCurrent", { type: "checkbox" })}
            />
          </Grid.Col>
        </Grid>

        <CustomButton
          w="full"
          actionType="create"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAdd(existingVersions);
          }}
        />
      </Stack>
    </CustomButtonModal>
  );
}
