import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

export interface I_tuvpbavwxd_create {
  maDotThi?: string;//Mã đợt thi
  tenDotThi?: string;//Tên đợt thi
  ngayBatDau?: Date;//Ngày bắt đầu
  ngayKetThuc?: Date;//Ngày kết thúc
  congBoDuLieu?: boolean;//Công bố dữ liệu
  ghiChu?: string;//Ghi chú
}


export default function F_tuvpbavwxd_Create() {
  const form = useForm<I_tuvpbavwxd_create>({
    initialValues: {
      maDotThi: '',
      tenDotThi: '',
      ngayBatDau: undefined,
      ngayKetThuc: undefined,
      congBoDuLieu: false,
      ghiChu: '',
    },
    validate: {
      maDotThi: (value) => (value ? null : 'Mã đợt thi bắt buộc nhập'),
      tenDotThi: (value) => (value ? null : 'Tên đợt thi bắt buộc nhập'),
      ngayBatDau: (value) => {
        if (!value) return 'Ngày bắt đầu bắt buộc nhập'
        if (form.values.ngayKetThuc && value > form.values.ngayKetThuc) return 'Ngày bắt đầu phải trước ngày kết thúc'
      },
      ngayKetThuc: (value) => {
        if (!value) return 'Ngày kết thúc bắt buộc nhập'
        if (form.values.ngayBatDau && value < form.values.ngayBatDau) return 'Ngày kết thúc phải sau ngày bắt đầu'
      },
    }
  });
  return (
    <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết đợt thi'>
      <MyTextInput label="Mã đợt thi" {...form.getInputProps('maDotThi')} />
      <MyTextInput label="Tên đợt thi" {...form.getInputProps('tenDotThi')} />
      <MyDateInput label="Ngày bắt đầu" {...form.getInputProps('ngayBatDau')} />
      <MyDateInput label="Ngày kết thúc" {...form.getInputProps('ngayKetThuc')} />
      <MyCheckbox label="Công bố dữ liệu" {...form.getInputProps('congBoDuLieu')} />
      <MyTextArea label="Ghi chú" {...form.getInputProps('ghiChu')} />
    </MyButtonCreate>
  )
}
