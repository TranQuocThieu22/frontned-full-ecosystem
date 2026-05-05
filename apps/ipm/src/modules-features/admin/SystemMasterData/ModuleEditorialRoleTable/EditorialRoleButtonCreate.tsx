import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import {
  MyButtonCreate,
  MyCheckbox,
  MyTextArea,
  MyTextInput
} from "aq-fe-framework/components";
import { IEditorialRole } from "./interface/EditorialRoleViewModel";

export default function EditorialRoleButtonCreate() {
  const form = useForm<IEditorialRole>({
    initialValues: {
      id: 0,
      roleCode: "",
      roleName: "",
      isDisabled: false,
      note: "",
    },
    validate: {
      roleCode: (value) => (value ? null : "Vui lồn nhập mã vai trò"),
      roleName: (value) => (value ? null : "Vui lồn nhập tên vai trò"),
    },
  });
  return (
    <MyButtonCreate
      label="Thêm"
      modalSize={"30%"}
      form={form}
      title="Chi tiết vai trò thực hiện biên soạn"
      onSubmit={() => { }}
    >

      <MyFlexColumn>
        <MyTextInput
          label="Mã vai trò"
          placeholder="Nhập mã vai trò"
          {...form.getInputProps("roleCode")}
        />
        <MyTextInput
          label="Tên vai trò"
          placeholder="Nhập tên vai trò"
          {...form.getInputProps("roleName")}
        />
        <MyTextArea
          minRows={4}
          label="Ghi chú"
          placeholder="Nhập ghi chú"
          {...form.getInputProps("note")}
        />
        <MyCheckbox label="Ngừng sử dụng" {...form.getInputProps("isDisabled")} />
      </MyFlexColumn>

    </MyButtonCreate>
  );
}
