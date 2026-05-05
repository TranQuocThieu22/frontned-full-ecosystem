import { CLOService, ICLO } from "@/shared/APIs/CLOService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import useS_CLO from "./useS_CLO";

interface Props {
  values: ICLO
}

export default function CLOUpdate({ values }: Props) {
  const store = useS_CLO()
  const form = useForm<ICLO>({
    initialValues: {
      ...values,
      description: ''
    },
    validate: {
      code: (value: any) => value ? null : 'Không được để trống',
      name: (value: any) => value ? null : 'Không được để trống',
    }
  })
  return (
    <CustomButtonCreateUpdate
      isUpdate
      form={form} onSubmit={() => {
        {
          const body: ICLO = {
            id: values.id,
            code: form.getValues().code,
            name: form.getValues().name,
            description: form.getValues().description,
            evaSubjectId: store.state.subjectId,
            concurrencyStamp: values.concurrencyStamp,
            isEnabled: true,
          }
          return CLOService.update(body)
        }
      }}>
      <MyTextInput readOnly label="Mã CLO" withAsterisk {...form.getInputProps("code")} />
      <MyTextArea label="Tên CLO" withAsterisk {...form.getInputProps("name")} />
      <MyTextArea label="Mô tả chi tiết" {...form.getInputProps("description")} />
    </CustomButtonCreateUpdate>
  )
}