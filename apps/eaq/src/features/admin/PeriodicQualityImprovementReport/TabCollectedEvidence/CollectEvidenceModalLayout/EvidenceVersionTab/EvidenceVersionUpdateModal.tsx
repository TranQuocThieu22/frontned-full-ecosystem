"use client";

import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";

export default function EvidenceVersionUpdateModal({
  values,
  onUpdate,
}: {
  values: IEnvidenceVersion;
  onUpdate: (updated: IEnvidenceVersion) => void;
}) {
  const modalDisc = useDisclosure(false);

  const updateForm = useForm<IEnvidenceVersion>({
    mode: "uncontrolled",
    validate: {
      link: (value) => (!value ? "Link là bắt buộc" : null),
      versionNumberIssueDate: (value) => !value ? "Số - Ngày ban hành là bắt buộc" : null,
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
      department: (value) => (!value ? "Đơn vị là bắt buộc" : null),
    },
  });

  useEffect(() => {
    updateForm.setValues({
      ...values,
      isEnabled: true,
      attachFile: new File([], values.attachFileName ?? ""),
    });
  }, [values]);

  const handleSubmit = () => {
    if (updateForm.validate().hasErrors) return;

    onUpdate(updateForm.getValues());

    modalDisc[1].close();
  };

  return (
    <CustomButtonModal
      isActionIcon
      actionIconProps={{ actionType: "update" }}
      modalProps={{
        size: "xl",
        title: "Chi tiết phiên bản minh chứng"
      }}
      disclosure={modalDisc}
    >
      <Stack gap="md">
        <Grid>
          <Grid.Col span={6}>
            <CustomFileInput
              label="File đính kèm"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={updateForm.values.attachFile}
              onChange={async (file) => {
                if (!file) return;
                updateForm.setFieldValue("attachFile", file);
                updateForm.setFieldValue("attachFileName", file.name);
                updateForm.setFieldValue(
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
              value={updateForm.getValues().attachFileName}
              readOnly
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              withAsterisk
              label="Link liên kết"
              {...updateForm.getInputProps("link")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              withAsterisk
              label="Số - Ngày ban hành"
              {...updateForm.getInputProps("versionNumberIssueDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomDateInput
              withAsterisk
              label="Hiệu lực từ ngày"
              clearable={false}
              {...updateForm.getInputProps("validDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomDateInput
              withAsterisk
              label="Hiệu lực đến ngày"
              clearable={false}
              {...updateForm.getInputProps("expiredDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              withAsterisk
              label="Đơn vị ban hành / cấp"
              {...updateForm.getInputProps("department")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomTextArea
              label="Ghi chú phiên bản"
              rows={3}
              {...updateForm.getInputProps("attachFileDescription")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomCheckbox
              label="Phiên bản hiện hành"
              {...updateForm.getInputProps("isCurrent", { type: "checkbox" })}
            />
          </Grid.Col>
        </Grid>

        <CustomButton fullWidth actionType="save" onClick={handleSubmit} />
      </Stack>
    </CustomButtonModal >
  );
}
