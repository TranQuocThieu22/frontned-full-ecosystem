'use client';
import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { IStandard } from '@/shared/interfaces/standard/Standard';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { useForm } from '@mantine/form';
import { CustomActionIconUpdate } from "@aq-fe/core-ui/shared/components/button/CustomActionIconUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';

export default function StandardStructure_UpdateStandard({
  value,
}: {
  value: IStandard;
}) {
  const store = useS_Shared_Filter();
  const form = useForm<IStandard>({
    initialValues: {
      ...value,
      note: value.note ? value.note : '',
      nameEg: value.nameEg ? value.nameEg : '',
    },
    validate: {
      code: (value) => (!value ? 'Vui lòng nhập mã tiêu chuẩn' : null),
      name: (value) => (!value ? 'Vui lòng nhập tên tiêu chuẩn' : null),
    },
  });

  return (
    <CustomButtonCreateUpdate
      isUpdate
      modalProps={{
        size: "40%",
        title: "Chi tiết danh sách tiêu chuẩn"
      }}
      form={form}
      onSubmit={() => {
        const body = {
          ...form.values,
          eaqStandardSetId: store.state.StandardSet?.id,
        };
        return service_EAQStandard.update(body);
      }}
    >
      <CustomTextInput
        withAsterisk
        readOnly
        label="Mã tiêu chuẩn"
        {...form.getInputProps('code')}
      />
      <CustomTextInput
        withAsterisk
        label="Tên tiêu chuẩn"
        {...form.getInputProps('name')}
      />
      <CustomTextInput
        label="Tên tiêu chuẩn Eg"
        {...form.getInputProps('nameEg')}
      />
      <CustomTextArea label="Ghi chú" {...form.getInputProps('note')} />
    </CustomButtonCreateUpdate>
  );
}
