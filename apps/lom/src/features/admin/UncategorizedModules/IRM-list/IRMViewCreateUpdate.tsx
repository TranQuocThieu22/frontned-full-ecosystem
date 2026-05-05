"use client"
import { COEIRMService } from '@/api/services/COEIRMService';
import { COEIRM } from '@/interfaces/shared-interfaces/COEIRM';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface IRMFormProps {
    data?: COEIRM,
    readOnly?: boolean
}

export default function IRMViewCreateUpdate({ data, readOnly }: IRMFormProps) {

    const IRMForm = useForm<COEIRM>({
        initialValues: data ? data : {
            note: "",
            code: "",
            name: "",
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            i: (value) => value ? null : 'Không được để trống',
            r: (value) => value ? null : 'Không được để trống',
            m: (value) => value ? null : 'Không được để trống',
        }
    });

    useEffect(() => {
        if (data) IRMForm.setValues(data);
    }, [data])

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết thang đo",
                size: "70%"
            }}
            readOnlyAllInput={readOnly}
            isUpdate={!!data}
            actionIconProps={{
                actionType: readOnly ? "view" : "update"
            }}
            form={IRMForm}
            onSubmit={(values) => {
                return data
                    ? COEIRMService.update(values)
                    : COEIRMService.create(values);
            }}
        >
            <SimpleGrid cols={2}>
                <CustomTextInput
                    readOnly={!!data}
                    label="Mã thang đo"
                    withAsterisk
                    {...IRMForm.getInputProps("code")}
                />
                <CustomTextInput
                    label="Tên thang do"
                    withAsterisk
                    {...IRMForm.getInputProps("name")}
                />
                <CustomNumberInput
                    label="Giá trị I"
                    withAsterisk
                    {...IRMForm.getInputProps("i")}
                />
                <CustomNumberInput
                    label="Giá trị R"
                    withAsterisk
                    {...IRMForm.getInputProps("r")}
                />
                <CustomNumberInput
                    label="Giá trị M"
                    withAsterisk
                    {...IRMForm.getInputProps("m")}
                />
            </SimpleGrid>
            <CustomTextArea
                label="Ghi chú"
                {...IRMForm.getInputProps("note")}
            />
        </CustomButtonCreateUpdate >
    );
}
