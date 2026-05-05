import { CommonNotification } from "@/interfaces/commonNotification";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface IProps {
  form: UseFormReturnType<CommonNotification>;
}

export default function InformationTab({ form }: IProps) {
  return (
    <Stack>
      <CustomTextInput
        withAsterisk
        label="Mã thông báo"
        value={form.values.code}
        onChange={() => {}}
      />
      <CustomTextInput
        withAsterisk
        label="Tiêu đề thông báo"
        value={form.values.name}
        onChange={() => {}}
      />
      <CustomRichTextEditor
        label="Nội dung chính"
        withAsterisk={true}
        value={form.values.content}
        onChange={() => {}}
      />
      <CustomCheckbox
        label="Bắt buộc phải xem khi đăng nhập"
        checked={form.values?.isMandatory || false}
        onChange={() => {}}
      />
    </Stack>
  );
}
