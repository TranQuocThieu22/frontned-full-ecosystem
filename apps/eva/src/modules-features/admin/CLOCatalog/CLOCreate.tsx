import { CLOService, ICLO } from "@/shared/APIs/CLOService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import useS_CLO from "./useS_CLO";

export default function CLOCreate() {
  const store = useS_CLO()
  const form = useForm<ICLO>({
    mode: "uncontrolled",
    validate: {
      code: (value: any) => value ? null : 'Không được để trống',
      name: (value: any) => value ? null : 'Không được để trống',
    }
  })
  return (
    <CustomButtonCreateUpdate
      modalProps={{
        title: "Chi tiết chuẩn đầu ra môn học (CLO)"
      }}
      form={form} onSubmit={(values) => {
        const body: ICLO = {
          id: 0,
          code: form.getValues().code,
          name: form.getValues().name,
          description: form.getValues().description,
          evaSubjectId: store.state.subjectId,
          concurrencyStamp: 'string',
          isEnabled: true,
        }
        return CLOService.create(body)
      }}>
      <MyTextInput label="Mã CLO" withAsterisk {...form.getInputProps("code")} />
      <MyTextArea label="Tên CLO" withAsterisk {...form.getInputProps("name")} />
      <MyTextArea label="Mô tả chi tiết" {...form.getInputProps("description")} />
    </CustomButtonCreateUpdate>
  )
}