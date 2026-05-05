import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

interface I_F12_12_Form {
  code?: string;
  name?: string;
  isUsed?: boolean;
  note?: string;
}

export default function F12_12Update({
  equipmentDecisionValues,
}: {
  equipmentDecisionValues: I_F12_12_Form;
}) {
  const form = useForm<I_F12_12_Form>({
    initialValues: {
      ...equipmentDecisionValues,
    },
  });

  return (
    <MyActionIconUpdate
      modalSize={"80%"}
      form={form}
      onSubmit={() => {
        console.log(form.values);
      }}
    >
      <MyTextInput label="Mã quyết định" {...form.getInputProps("code")} />
      <MyTextInput label="Tên quyết định" {...form.getInputProps("name")} />
      <Group>
        <Checkbox label="Đang sử dụng" {...form.getInputProps("isUsed", { type: "checkbox" })} />
      </Group>
      <MyTextInput
        label="Ghi chú"
        placeholder="Nhập ghi chú (nếu có)"
        {...form.getInputProps("note")}
      />{" "}
    </MyActionIconUpdate>
  );
}
