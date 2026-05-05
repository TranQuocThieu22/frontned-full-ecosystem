'use client';

import { useForm } from '@mantine/form';

import { service_EAQCriteria } from '@/shared/APIs/service_EAQCriteria';
import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { ICriteria } from '@/shared/interfaces/criteria/Criteria';
import { IStandard } from '@/shared/interfaces/standard/Standard';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { useState } from 'react';
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';

export default function StandardStructure_UpdateCriteria({
  value,
}: {
  value: ICriteria;
}) {
  const standardSetStore = useS_Shared_Filter();

  const [selectStandard, setSelectStandard] = useState<IStandard>(
    value.eaqStandard || {}
  );
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
      ...value,
      note: value.note ? value.note : '',
      englishName: value.englishName ? value.englishName : '',
    },
    validate: {
      // maTieuChuan: (value) => (!value ? "Vui lòng chọn mã tiêu chuẩn" : null),
      code: (value) => (!value ? 'Vui lòng nhập mã tiêu chí' : null),
      name: (value) => (!value ? 'Vui lòng nhập tên tiêu chí' : null),
    },
  });

  return (
    <CustomButtonCreateUpdate
      isUpdate
      modalProps={{
        size: '40%',
        title: "Chi tiết danh sách tiêu chí"
      }}
      form={form}
      onSubmit={() => {
        const { eaqStandard, ...rest } = form.values;
        const body = {
          ...rest,
          eaqStandardSetId: standardSetStore.state.StandardSet?.id,
        };
        return service_EAQCriteria.update(body);
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
        value={selectStandard?.id?.toString() ?? ''}
        onChange={(value) => {
          const selected = standardQuery.data?.find(
            (s) => s.id?.toString() === value
          );
          setSelectStandard(selected || {});
          form.setFieldValue('eaqStandardId', selected?.id);
        }}
        error={form.errors.eaqStandardId}
      />
      <CustomTextInput
        readOnly
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
