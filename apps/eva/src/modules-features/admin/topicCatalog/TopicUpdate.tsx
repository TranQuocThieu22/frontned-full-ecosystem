import { ITopic, topicService } from "@/shared/APIs/topicService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from 'react';
import useS_Topic from "./useS_Topic";

interface Props {
  values: ITopic
}

export default function TopicUpdate({ values }: Props) {
  const store = useS_Topic()
  const form = useForm<ITopic>({
    mode: 'uncontrolled',
    validate: {

      code: (value: any) => value ? null : 'Không được để trống',
      name: (value: any) => value ? null : 'Không được để trống',

    }
  })
  useEffect(() => {
    if (!values) return
    form.setValues({ ...values, note: values.note || '' })
  }, [values])

  return (
    <CustomButtonCreateUpdate
      isUpdate
      form={form} onSubmit={() => {
        const body: ITopic = {
          id: values.id,
          code: form.getValues().code,
          name: form.getValues().name,
          concurrencyStamp: values.concurrencyStamp,
          isEnabled: true,
          note: form.getValues().note,
          // subjectId: values.subjectId,
          evaSubjectId: store.state.subjectId,
        }
        return topicService.update(body)
      }}>
      <MyTextInput readOnly label="Mã chương/ chủ đề" {...form.getInputProps("code")} />
      <MyTextInput label="Tên chương/ chủ đề" {...form.getInputProps("name")} />
      <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
    </CustomButtonCreateUpdate>
  )
}