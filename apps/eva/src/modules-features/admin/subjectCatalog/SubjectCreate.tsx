import { difficultyService } from "@/shared/APIs/difficultyService";
import { ISubject, subjectService } from "@/shared/APIs/subjectService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { useEffect } from "react";

export default function SubjectCreate() {
  const disc = useDisclosure()
  const form = useForm<ISubject>({
    mode: "uncontrolled",
    validate: {
      code: (value) => value ? null : "Tên không được để trống",
      name: (value) => value ? null : "Tên không được để trống"
    }
  });

  const diffucultyQuery = useMyReactQuery({
    queryKey: [`CodeFormulaRead`],
    axiosFn: async () => difficultyService.getAll(),
    options: {
      enabled: disc[0],
      refetchOnWindowFocus: false
    }
  })
  useEffect(() => {
    if (!diffucultyQuery.data) return
    form.setValues({
      id: 0,
      code: "",
      name: "",
      evaDifficultyId: 1,
      note: ""
    },)
  }, [diffucultyQuery.data])
  return (
    <CustomButtonCreateUpdate
      disclosure={disc}
      modalProps={{
        title: "Chi tiết môn học"
      }}
      form={form}
      onSubmit={async (values) => {
        const body: ISubject = {
          id: 0,
          code: form.getValues().code,
          name: form.getValues().name,
          concurrencyStamp: 'string',
          isEnabled: true,
          evaDifficultyId: form.getValues().evaDifficultyId,
          note: form.getValues().note || ''

        };
        return subjectService.create(body);
      }}>
      <MyTextInput label="Mã môn học" withAsterisk {...form.getInputProps("code")} />
      <MyTextInput label="Tên môn học" withAsterisk {...form.getInputProps("name")} />
      <Select
        clearable={false}
        placeholder="Nhập thang đo độ khó"
        label="Thang đo độ khó"
        data={
          diffucultyQuery.data?.map((item: any) => ({
            value: item.id?.toString()!,
            label: item.name! == null ? '' : item.name!,
          })) ?? []
        }
        value={form.getValues().evaDifficultyId?.toString()}
        onChange={(value) => form.setFieldValue('evaDifficultyId', value ? Number(value) : undefined)}
      />
      <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
    </CustomButtonCreateUpdate>
  );
} 