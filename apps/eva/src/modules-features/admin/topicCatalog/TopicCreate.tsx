import { ITopic, topicService } from "@/shared/APIs/topicService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import useS_Topic from "./useS_Topic";


export default function TopicCreate() {
  const store = useS_Topic()
  const form = useForm<ITopic>({
    mode: "uncontrolled",
    validate: {
      code: (value: any) => value ? null : 'Không được để trống',
      name: (value: any) => value ? null : 'Không được để trống',
    }
  })
  return (
    <CustomButtonCreateUpdate
      modalProps={{
        title: "Chi tiết chương/ chủ đề"
      }}
      form={form} onSubmit={(values) => {
        const body: ITopic = {
          id: 0,
          code: form.getValues().code,
          name: form.getValues().name,
          concurrencyStamp: 'string',
          isEnabled: true,
          note: form.getValues().note,
          evaSubjectId: store.state.subjectId,
        }
        return topicService.create(body)
      }}>
      <MyTextInput label="Mã chương/ chủ đề" {...form.getInputProps("code")} />
      <MyTextInput label="Tên chương/ chủ đề" {...form.getInputProps("name")} />
      <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
    </CustomButtonCreateUpdate>
  )
}
