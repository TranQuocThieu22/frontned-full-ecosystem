'use client'

import { service_department } from '@/api/services/service_department';
import { ENUM_DEPARTMENT_TYPE } from '@/constants/enum/global';
import { Department } from '@/interfaces/department';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';


export default function WorkingUnitDepartmentUpdateButton({ values }: { values: Department }) {

    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<Department>({
        initialValues: values,
        validate: {
            code: (value) => (value && !(/^\s*$/.test(value))) ? null : 'Không được để trống',
            name: (value) => (value && !(/^\s*$/.test(value))) ? null : 'Không được để trống',
            type: (value) => value ? null : 'Không được để trống',
        }
    });


    const departmentTypeOptions = Object.entries(ENUM_DEPARTMENT_TYPE)
        .filter(([key, value]) => !isNaN(Number(value)))
        .map(([label, value]) => ({
            value: value.toString(),
            label: label
        }));

    useEffect(() => {
        if (values) {
            form.setValues({
                ...values
            });
        }
    }, [values]);


    return (
        <CustomButtonCreateUpdate
            isUpdate
            modalProps={{
                size: '30%'
            }}
            form={form}
            onSubmit={async (values) => {
                return await service_department.update(values);
            }}>
            <CustomTextInput description="Không được chỉnh sửa mã đơn vị" readOnly label='Mã đơn vị' {...form.getInputProps("code")} />
            <CustomTextArea withAsterisk label='Tên đơn vị' {...form.getInputProps("name")} />
            <CustomSelect
                withAsterisk
                label="Loại đơn vị"
                data={departmentTypeOptions}
                {...form.getInputProps("type")}
                value={form.values.type ? form.values.type.toString() : undefined}
            />
        </CustomButtonCreateUpdate>
    )
}
