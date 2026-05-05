import MySelect from '@/components/Combobox/Select/MySelect'
import MyTextEditor from '@/components/Inputs/TextEditor/MyTextEditor'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow'
import { Button, Fieldset, FileInput, MultiSelect } from '@mantine/core'
import { IconMail } from '@tabler/icons-react'

export default function F5_2_1NoticeOfRegistrationOfProposedOrientation() {
  return (
    <Fieldset legend="Thông báo đăng ký đề xuất định hướng">
      <MyFlexColumn>
        <MySelect label="Chọn loại thông báo" data={["Thông báo đăng ký đề xuất định hướng"]} />
        <MyTextInput label='Tiêu đề thông báo' />
        <MultiSelect label="Danh sách người nhận" placeholder='Chọn danh sách người nhận' data={['thieutran411@gmail.com', 'tung@gmail.com', 'nhi@gmail.com']} />
        <MyTextEditor label='Nội dung thông báo' />
        <MyFlexRow align={"end"} justify={"space-between"}>
          <FileInput label="Đính kèm file minh chứng" placeholder="Chọn file minh chứng" />
          <Button leftSection={<IconMail />}>Gửi thông báo</Button>
        </MyFlexRow>
      </MyFlexColumn>
    </Fieldset>
  )
}
