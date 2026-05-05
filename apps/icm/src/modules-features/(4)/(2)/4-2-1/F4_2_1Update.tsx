import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IDangKyNhiemVuDeTaiViewModel {
  id?: number | undefined;
  code?: string | undefined;
  name?: string | undefined;
  loaiDeTai?: string | undefined;
  soGioDangKy?: string | undefined;
  phanTramDaThucHien?: string | undefined;
  fileMinhChung?: string | undefined;


}
export default function F4_2_1Update({ data }: { data: IDangKyNhiemVuDeTaiViewModel }) {
  const form = useForm<IDangKyNhiemVuDeTaiViewModel>({
    initialValues: {
      ...data,
    }
  })
  return (
    <MyActionIconUpdate
      form={form}
      onSubmit={() => {
        // return baseAxios.put("/userNCKHs/" + form.values.id, form.values)
        console.log("chỉnh sửa thành công: ", form.values);

      }}
    >
      <MyFlexColumn>
        <MyTextInput label="Loại đề tài" {...form.getInputProps("loaiDeTai")} />
        <MyTextInput label="Số giờ đăng ký" {...form.getInputProps("soGioDangKy")} />
        <MyTextInput label="% đã thực hiện" {...form.getInputProps("phanTramDaThucHien")} />
        <FileInput label="File minh chứng" {...form.getInputProps("fileMinhChung")} />

      </MyFlexColumn>
    </MyActionIconUpdate>

  )
}
