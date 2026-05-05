import { difficultyService } from '@/shared/APIs/difficultyService';
import { ISubject, subjectService } from '@/shared/APIs/subjectService';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { useForm } from '@mantine/form';
import { MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { useMyReactQuery } from 'aq-fe-framework/hooks';
import { useEffect } from 'react';

interface Props {
  values: ISubject;
}

export default function SubjectUpdate({ values }: Props) {
  const diffucultyQuery = useMyReactQuery({
    queryKey: [`CodeFormulaRead`],
    axiosFn: async () => difficultyService.getAll(),
  });

  const form = useForm<ISubject>({
    initialValues: {
      ...values,
      note: values.note || ""
    },
  });

  useEffect(() => {
    if (!values) return;
    form.setValues(values);
  }, [values]);

  return (
    <CustomButtonCreateUpdate
      isUpdate
      form={form}
      onSubmit={async () => {
        const body: ISubject = {
          id: values.id,
          code: form.getValues().code,
          name: form.getValues().name,
          concurrencyStamp: values.concurrencyStamp,
          isEnabled: true,
          evaDifficultyId: form.getValues().evaDifficultyId,
          note: form.getValues().note
        };
        return subjectService.update(body);
      }}>
      <MyTextInput readOnly label="Mã môn học" withAsterisk {...form.getInputProps('code')} />
      <MyTextInput label="Tên môn học" withAsterisk {...form.getInputProps('name')} />
      <MySelect
        label="Thang đo độ khó"
        data={
          diffucultyQuery.data?.map((item: any) => ({
            value: item.id?.toString()!,
            label: item.name! == null ? '' : item.name!,
          })) ?? []
        }
        value={form.values.evaDifficultyId?.toString() ?? ''}
        onChange={(value) => form.setFieldValue('evaDifficultyId', value ? Number(value) : undefined)}
      // {...form.getInputProps("difficultyId")}

      />
      <MyTextArea label="Ghi chú" {...form.getInputProps('note')} />
    </CustomButtonCreateUpdate>
  );
}
