import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyTextArea, MyDateInput } from "aq-fe-framework/components";
import { MyButtonCreateUpdate, MySelect, MyTextInput } from "aq-fe-framework/core";

const interactionChannelOptions = ["Điện thoại", "Email", "Zalo", "Trực tiếp"];
const interactionTypeOptions = ["Cuộc gọi tư vấn", "Gửi thông tin", "Phản hồi", "Lên lịch hẹn"];
const interactionResultOptions = ["Cần theo dõi thêm", "Thành công", "Đã giải quyết"];

export default function InteractionLogbookCreateOrUpdate({data}:{data?:any}) {
    const form = useForm<any>(
      {initialValues:data?? {}}
    )
  return (
    <MyButtonCreateUpdate onSubmit={() => { }} form={form} isUpdate={!!data} modalProps={{ size: "70%" }}>
        <SimpleGrid cols={2} spacing="md">
    <Stack>
      <MyTextInput label="Mã KH/HS:" {...form.getInputProps("customerCode")} />
      <MyTextInput label="Họ và tên HS:" {...form.getInputProps("customerName")} />
      <MySelect
        data={interactionTypeOptions}
        label="Loại tương tác:"
        {...form.getInputProps("interactionType")}
      />
      <MySelect
        data={interactionResultOptions}
        label="Kết quả tương tác:"
        {...form.getInputProps("interactionResult")}
      />
      <MyTextArea label="Nội dung tương tác:" {...form.getInputProps("interactionContent")} />
    </Stack>
    <Stack>
      <MyDateInput label="Ngày tương tác:" {...form.getInputProps("interactionDate")} />
      <MyTextInput label="Thời gian tương tác:" {...form.getInputProps("interactionTime")} />
      <MySelect
        data={interactionChannelOptions}
        label="Kênh tương tác:"
        {...form.getInputProps("interactionChannel")}
      />
      <MyDateInput label="Ngày hẹn hành động tiếp theo:"  value={form.values.nextActionDate} />
      <MyTextArea label="Kế hoạch hành động tiếp theo:" {...form.getInputProps("nextActionPlan")} />
      
    </Stack>
  </SimpleGrid>
    </MyButtonCreateUpdate>
  )
}
