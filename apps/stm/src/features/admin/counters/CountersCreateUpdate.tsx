'use client'
import { Counter, BusinessType, ObjectType, RepeatCycle } from './interfaces';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils';
import baseAxios from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { Select, Stack, TextInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface Props {
  values?: Counter;
}

export default function CountersCreateUpdate({ values }: Props) {
  const isUpdate = !!values;

  const form = useForm<Counter>({
    mode: 'uncontrolled',
    validate: {
      code: (value) => (value ? null : 'Không được để trống'),
      name: (value) => (value ? null : 'Không được để trống'),
      businessType: (value) => (value ? null : 'Không được để trống'),
      objectType: (value) => (value ? null : 'Không được để trống'),
      repeatCycle: (value) => (value ? null : 'Không được để trống'),
      prefix: (value) => (value ? null : 'Không được để trống'),
      suffix: (value) => (value ? null : 'Không được để trống'),
      length: (value) => (value ? null : 'Không được để trống'),
    },
  });

  useEffect(() => {
    const newValues: Counter = {
      ...values,
      code: values?.code ?? '',
      name: values?.name ?? '',
      businessType: values?.businessType ?? '1',
      objectType: values?.objectType ?? '1',
      repeatCycle: values?.repeatCycle ?? '1',
      prefix: values?.prefix ?? '',
      suffix: values?.suffix ?? '',
      length: values?.length ?? '',
      useZero: values?.useZero ?? 'Có',
    };
    form.setInitialValues(newValues);
    form.setValues(newValues);
  }, [values]);

  return (
    <CustomButtonCreateUpdate
      isUpdate={isUpdate}
      form={form}
      modalProps={{
        title: isUpdate ? 'Sửa bộ đếm' : 'Thêm bộ đếm',
      }}
      onSubmit={(formValues) => {
        // Prototype – giữ nguyên hành vi cũ: gọi API rỗng
        return baseAxios.post('', formValues);
      }}
    >
      <Stack>
        <TextInput label="Mã bộ đếm" disabled={isUpdate} {...form.getInputProps('code')} />
        <TextInput label="Tên bộ đếm" {...form.getInputProps('name')} />
        <Select
          label="Loại nghiệp vụ"
          data={converterUtils.enumToSelectOptions(BusinessType)}
          value={form.getValues().businessType}
          onChange={(v) => form.setFieldValue('businessType', v || undefined)}
        />
        <Select
          label="Loại đối tượng"
          data={converterUtils.enumToSelectOptions(ObjectType)}
          value={form.getValues().objectType}
          onChange={(v) => form.setFieldValue('objectType', v || undefined)}
        />
        <Select
          label="Chu kỳ lặp lại"
          data={converterUtils.enumToSelectOptions(RepeatCycle)}
          value={form.getValues().repeatCycle}
          onChange={(v) => form.setFieldValue('repeatCycle', v || undefined)}
        />
        <TextInput label="Tiền tố" {...form.getInputProps('prefix')} />
        <TextInput label="Hậu tố" {...form.getInputProps('suffix')} />
        <TextInput label="Chiều dài" {...form.getInputProps('length')} />
        <Checkbox
          label="Có dùng số 0"
          checked={form.getValues().useZero === 'Có'}
          onChange={(e) => form.setFieldValue('useZero', e.currentTarget.checked ? 'Có' : 'Không')}
        />
      </Stack>
    </CustomButtonCreateUpdate>
  );
}

