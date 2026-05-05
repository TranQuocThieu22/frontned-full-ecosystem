'use client'
import MyTextEditor from '@/components/Inputs/TextEditor/MyTextEditor'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow'
import { Button, Fieldset, FileInput, MultiSelect } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconMail } from '@tabler/icons-react'


interface I {
  tieuDe: string,
  danhSachNguoiNhanId: number[],
  noiDungThongBao: string
}
export default function ScientificResearchTopicRegistrationAnnouncementSendMail() {
  const form = useForm<I>({
    initialValues: {
      tieuDe: "",
      danhSachNguoiNhanId: [],
      noiDungThongBao: ""
    },
    transformValues: (values) => ({
      ...values,
      // Chuyển đổi danh sách người nhận từ string[] thành number[]
      danhSachNguoiNhanId: values.danhSachNguoiNhanId.map(id => Number(id))
    })
  })

  return (
    <Fieldset legend="Thông báo đăng ký đề tài nghiên cứu khoa học">
      <form onSubmit={form.onSubmit(values => {
        console.log(values);

      })}>
        <MyFlexColumn>
          <MyTextInput label="Tiêu đề thông báo" />
          <MultiSelect label="Danh sách người nhận" placeholder='Danh sách đối tượng cần thông báo' multiple data={[{ value: "1", label: "thieutran411@gmail.com" }, { value: "2", label: "phamtien@gmail.com" }]} {...form.getInputProps("danhSachNguoiNhanId")} />
          <MyTextEditor label='Nôi dung thông báo' {...form.getInputProps("noiDungThongBao")} />
          <MyFlexRow justify={"space-between"}>
            <FileInput label="Đính kèm file minh chứng" placeholder="Chọn file minh chứng" />
            <Button type='submit' leftSection={<IconMail />}>Gửi thông báo</Button>
          </MyFlexRow>
        </MyFlexColumn>
      </form>
    </Fieldset>
  )
}
