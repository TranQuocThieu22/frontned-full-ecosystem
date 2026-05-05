"use client";

import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";

export default function EvidenceVersionCreateButton({
  onAdd,
}: {
  onAdd: (newVersion: IEnvidenceVersion) => void;
}) {
  const modalDisc = useDisclosure(false);

  const createForm = useForm<IEnvidenceVersion>({
    mode: "uncontrolled",
    validate: {
      link: (value) => (!value ? "Link là bắt buộc" : null),
      versionNumberIssueDate: (value) => !value ? "Số - Ngày ban hành là bắt buộc" : null,
      attachFileViewModel: (value) =>
        value && value.fileBase64String && value.fileBase64String.length > 0
          ? null
          : "Vui lòng chọn file",
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

  const handleSubmit = () => {
    if (createForm.validate().hasErrors) return;

    const values = createForm.getValues();
    const randomId = String(Math.floor(Math.random() * 1000000));

    values.name = `${values.attachFileName?.split(".")[0]}_${randomId}`;
    values.code = `${values.attachFileName?.split(".")[0]}_${randomId}`;

    onAdd(values);
    createForm.reset();
    modalDisc[1].close();
  }

  return (
    <>
      <CustomButtonModal
        buttonProps={{
          actionType: "create"
        }}
        modalProps={{
          title: "Chi tiết phiên bản minh chứng",
          size: "xl"
        }}
        disclosure={modalDisc}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          handleSubmit();
        }}>
          <Stack gap="md">
            <Grid>
              <Grid.Col span={6}>
                <CustomFileInput
                  label="File đính kèm"
                  withAsterisk
                  error={createForm.errors.attachFileViewModel}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  value={createForm.values.attachFile}
                  onChange={async (file) => {
                    if (!file) return;
                    createForm.setFieldValue("attachFile", file);
                    createForm.setFieldValue("attachFileName", file.name);
                    createForm.setFieldValue(
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
                  {...createForm.getInputProps("attachFileName")}
                  readOnly
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <CustomTextInput
                  label="Link liên kết"
                  withAsterisk
                  {...createForm.getInputProps("link")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <CustomTextInput
                  withAsterisk
                  label="Số - Ngày ban hành"
                  {...createForm.getInputProps("versionNumberIssueDate")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <CustomDateInput
                  withAsterisk
                  label="Hiệu lực từ ngày"
                  {...createForm.getInputProps("validDate")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <CustomDateInput
                  withAsterisk
                  label="Hiệu lực đến ngày"
                  minDate={createForm.getValues().validDate}
                  {...createForm.getInputProps("expiredDate")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <CustomTextInput
                  withAsterisk
                  label="Đơn vị ban hành / cấp"
                  {...createForm.getInputProps("department")}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <CustomTextArea
                  label="Ghi chú phiên bản"
                  rows={3}
                  {...createForm.getInputProps("attachFileDescription")}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <CustomCheckbox
                  label="Phiên bản hiện hành"
                  {...createForm.getInputProps("isCurrent", { type: "checkbox" })}
                />
              </Grid.Col>
            </Grid>

            <CustomButton type="submit" w="full" actionType="create" />
          </Stack>
        </form>
      </CustomButtonModal>
    </>
  );
}
