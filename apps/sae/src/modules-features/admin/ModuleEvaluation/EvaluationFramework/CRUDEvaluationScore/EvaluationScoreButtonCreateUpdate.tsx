'use client'

import { service_standard } from '@/api/services/service_standard';
import { Standard } from '@/interfaces/standard';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface EvaluationScoreButtonProps {
    /** When provided, component operates in update mode */
    values?: Standard;
    /** Optional: Override modal title */
    modalTitle?: string;
}

const DEFAULT_INITIAL_VALUES: Standard = {
    id: 0,
    code: '',
    name: '',
    concurrencyStamp: "",
    isEnabled: true,
    minPoint: 0,
    maxPoint: 0,
    note: "",
    orderBy: null,
    events: [],
};

export default function EvaluationScoreButtonCreateUpdate({ values, modalTitle }: EvaluationScoreButtonProps) {
    const isUpdateMode = !!values;

    const { data: existingData = [] } = useCustomReactQuery({
        queryKey: ["EvaluationScoreButton_Standard_GetAll"],
        axiosFn: () => service_standard.getAll(),
    });

    const form = useForm<Standard>({
        initialValues: values || DEFAULT_INITIAL_VALUES,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            maxPoint: (value) => {
                if (value == null) return "Không được để trống";
                if (value < 0) return "Điểm tối đa không được âm";

                // Calculate total points excluding current item (if updating)
                const otherTotal = existingData
                    .filter((item) => !isUpdateMode || item.id !== values.id)
                    .reduce((sum, item) => sum + (item.maxPoint || 0), 0);

                if (otherTotal + value > 100) {
                    const action = isUpdateMode ? 'cập nhật' : 'thêm';
                    return `Tổng điểm vượt quá 100 (hiện tại: ${otherTotal}, ${action}: ${value})`;
                }

                return null;
            }
        }
    });

    // Reset form when values change (important for update mode)
    useEffect(() => {
        if (values) {
            form.setValues(values);
            form.resetDirty(values);
            form.clearErrors();
        }
    }, [values]);

    const handleSubmit = async (formValues: Standard) => {
        return isUpdateMode
            ? await service_standard.update(formValues)
            : await service_standard.create(formValues);
    };

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdateMode}
            modalProps={{
                size: "60%",
                title: modalTitle || "Khung điểm đánh giá"
            }}
            form={form}
            onSubmit={handleSubmit}
        >
            <CustomTextInput
                disabled={isUpdateMode}
                withAsterisk
                label='Mã'
                {...form.getInputProps("code")}
            />
            <CustomTextArea
                withAsterisk
                label='Tên'
                {...form.getInputProps("name")}
            />
            <Grid>
                <Grid.Col span={4}>
                    <CustomNumberInput
                        min={0}
                        max={100}
                        withAsterisk
                        label='Giới hạn điểm tối đa'
                        {...form.getInputProps("maxPoint")}
                    />
                </Grid.Col>
                <Grid.Col span={8}>
                    <CustomTextInput
                        label='Ghi chú'
                        {...form.getInputProps("note")}
                    />
                </Grid.Col>
            </Grid>
        </CustomButtonCreateUpdate>
    );
}
