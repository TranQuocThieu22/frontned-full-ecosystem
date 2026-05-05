"use client";

import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";

export default function EvidenceVersionView({
  values,
}: {
  values: IEnvidenceVersion;
}) {
  const modalDisc = useDisclosure(false);

  const evidenceVersionForm = useForm<IEnvidenceVersion>({
    mode: "uncontrolled",
  });

  useEffect(() => {
    evidenceVersionForm.setValues({
      ...values,
      isEnabled: true,
      attachFile: new File([], values.attachFileName ?? ""),
    });
  }, [values]);

  return (
    <CustomButtonModal
      isActionIcon
      actionIconProps={{
        actionType: "view",
      }}
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
              readOnly
              label="File đính kèm"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={evidenceVersionForm.values.attachFile}
              onChange={async (file) => {
                if (!file) return;
                evidenceVersionForm.setFieldValue("attachFile", file);
                evidenceVersionForm.setFieldValue("attachFileName", file.name);
                evidenceVersionForm.setFieldValue(
                  "attachFileViewModel",
                  await fileUtils.fileToAQDocumentType(file)
                );
              }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              readOnly
              label="Tên file"
              placeholder=""
              {...evidenceVersionForm.getInputProps("attachFileName")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              readOnly
              label="Link liên kết"
              {...evidenceVersionForm.getInputProps("link")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              readOnly
              withAsterisk
              label="Số - Ngày ban hành"
              {...evidenceVersionForm.getInputProps("versionNumberIssueDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomDateInput
              readOnly
              withAsterisk
              label="Hiệu lực từ ngày"
              {...evidenceVersionForm.getInputProps("validDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomDateInput
              readOnly
              withAsterisk
              label="Hiệu lực đến ngày"
              {...evidenceVersionForm.getInputProps("expiredDate")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <CustomTextInput
              readOnly
              withAsterisk
              label="Đơn vị ban hành / cấp"
              {...evidenceVersionForm.getInputProps("department")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomTextArea
              readOnly
              label="Ghi chú phiên bản"
              rows={3}
              {...evidenceVersionForm.getInputProps("attachFileDescription")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <CustomCheckbox
              readOnly
              label="Phiên bản hiện hành"
              checked={evidenceVersionForm.getValues().isCurrent == true}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </CustomButtonModal >
  );
}
