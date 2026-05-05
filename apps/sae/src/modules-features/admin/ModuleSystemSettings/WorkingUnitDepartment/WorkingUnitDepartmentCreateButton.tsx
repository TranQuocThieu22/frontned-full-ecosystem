'use client'
import { service_department } from '@/api/services/service_department';
import { ENUM_DEPARTMENT_TYPE } from '@/constants/enum/global';
import { useForm } from '@mantine/form';
import IWorkingUnitDepartmentViewModel from './interfaces/IWorkingUnitDepartmentViewModel';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';

export default function WorkingUnitDepartmentCreateButton() {
    const form = useForm<IWorkingUnitDepartmentViewModel>({
        initialValues: {
            code: "",
            type: 0,
            isWorkingUnit: true,
            name: ""
        },
        validate: {
            code: (value) => (value && !(/^\s*$/.test(value))) ? null : 'Không được để trống',
            name: (value) => (value && !(/^\s*$/.test(value))) ? null : 'Không được để trống',
            type: (value) => value !== null && value !== undefined ? null : 'Không được để trống',
        }
    });

    const departmentTypeOptions = Object.entries(ENUM_DEPARTMENT_TYPE)
        .filter(([key, value]) => !isNaN(Number(value))) // lọc chiều string => number
        .map(([label, value]) => ({
            value: value.toString(), // Mantine Select dùng string cho value
            label: label
        }));


    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: '30%',
                title: 'Danh mục đơn vị công nhận điểm'
            }}
            form={form}
            onSubmit={async (values) => {
                return await service_department.create(values);
            }}
        >
            <CustomTextInput withAsterisk label='Mã đơn vị' {...form.getInputProps("code")} />
            <CustomTextArea withAsterisk label='Tên đơn vị' {...form.getInputProps("name")} />
            <CustomSelect
                withAsterisk
                label='Loại đơn vị'
                data={departmentTypeOptions}
                {...form.getInputProps("type")}
            />

        </CustomButtonCreateUpdate>
    )
}
