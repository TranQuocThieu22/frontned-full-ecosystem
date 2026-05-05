'use client';
import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { IStandard } from '@/shared/interfaces/standard/Standard';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { useForm } from '@mantine/form';
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

export default function StandardStructure_CreateStandard() {
    const store = useS_Shared_Filter();
    const form = useForm<IStandard>({
        initialValues: {
            code: '',
            name: '',
            nameEg: '',
            note: '',
        },
        validate: {
            code: (value) => (!value ? 'Vui lòng nhập mã tiêu chuẩn' : null),
            name: (value) => (!value ? 'Vui lòng nhập tên tiêu chuẩn' : null),
        },
    });

    return (
        <CustomButtonCreateUpdate
            isUpdate={false}
            form={form}
            onSubmit={() => {
                const body = {
                    ...form.values,
                    eaqStandardSetId: store.state.StandardSet?.id,
                };
                return service_EAQStandard.create(body);
            }}
            modalProps={{
                size: '40%',
                title: 'Thêm tiêu chuẩn mới'
            }}
        >
            <CustomTextInput
                withAsterisk
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
            <CustomTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('note')}
            />
        </CustomButtonCreateUpdate>
    );
}
