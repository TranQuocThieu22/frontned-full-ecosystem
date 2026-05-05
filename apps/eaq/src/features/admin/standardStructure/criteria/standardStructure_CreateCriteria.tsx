'use client';
import { service_EAQCriteria } from '@/shared/APIs/service_EAQCriteria';
import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { ICriteria } from '@/shared/interfaces/criteria/Criteria';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

export default function StandardStructure_CreateCriteria() {
  const standardSetStore = useS_Shared_Filter();
  const standardQuery = useCustomReactQuery({
    queryKey: [
      'standardQuery',
      'GetAllByEAQStandardId',
      standardSetStore.state.StandardSet?.id,
    ],
    axiosFn: () =>
      service_EAQStandard.GetAllByEAQStandardSetId({
        eaqStandardSetId: standardSetStore.state.StandardSet?.id,
      }),
    options: {
      enabled: !!standardSetStore.state.StandardSet,
    },
  });

  const form = useForm<ICriteria>({
    initialValues: {
      code: '',
      name: '',
      englishName: '',
      evidence: '',
      note: '',
      eaqStandardId: undefined, // Add this to initial values
    },
    validate: {
      code: (value) => (!value ? 'Vui lòng nhập mã tiêu chí' : null),
      name: (value) => (!value ? 'Vui lòng nhập tên tiêu chí' : null),
      eaqStandardId: (value) => (!value ? 'Vui lòng chọn tiêu chuẩn' : null), // Add validation
    },
  });

  useEffect(() => {
    if (standardQuery.data?.length && !form.values.eaqStandardId) {
      const first = standardQuery.data[0];
      form.setFieldValue('eaqStandardId', first?.id);
    }
  }, [standardQuery.data, form.values.eaqStandardId, form]);

  return (
    <CustomButtonCreateUpdate
      isUpdate={false}
      form={form}
      onSubmit={(values) => {
        const body = {
          ...values,
          eaqStandardSetId: standardSetStore.state.StandardSet?.id,
          eaqStandardId: values.eaqStandardId,
        };
        return service_EAQCriteria.create(body)
      }}
      modalProps={{
        size: '40%',
        title: 'Thêm tiêu chí mới'
      }}

    >
      <CustomSelect
        withAsterisk
        searchable
        label="Tiêu chuẩn"
        data={
          standardQuery.data?.map((e) => ({
            value: e.id?.toString() || '',
            label: `${e.code} - ${e.name}`,
          })) || []
        }
        {...form.getInputProps('eaqStandardId')}
        value={form.values.eaqStandardId?.toString() ?? ''}
        onChange={(value) => {
          const selected = standardQuery.data?.find(
            (s) => s.id?.toString() === value
          );
          form.setFieldValue('eaqStandardId', selected?.id);
        }}
      />

      <CustomTextInput
        withAsterisk
        label="Mã tiêu chí/ chỉ số"
        {...form.getInputProps('code')}
      />
      <CustomTextInput
        withAsterisk
        label="Tên tiêu chí/ chỉ số"
        {...form.getInputProps('name')}
      />
      <CustomTextInput label="Tên tiêu chí Eg" {...form.getInputProps('englishName')} />
      <CustomTextArea
        label="Minh chứng gợi ý"
        {...form.getInputProps('evidence')}
      />
      <CustomTextArea label="Ghi chú" {...form.getInputProps('note')} />
    </CustomButtonCreateUpdate>
  );
}
