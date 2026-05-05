'use client'

import { service_scoreTransform } from '@/api/services/service_scoreTransform';
import { ScoreTransform } from '@/interfaces/scoreTransform';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

export default function ScoreTransformUpdateButton({ values }: { values: ScoreTransform }) {

    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<ScoreTransform>({
        initialValues: values,
        validate: {
        }
    });

    useEffect(() => {
        if (values) {
            form.setValues({
                ...values
            });
        }
    }, [values]);

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: "40%"
            }}
            isUpdate
            form={form}
            onSubmit={async (values) => {
                return await service_scoreTransform.update(values)
            }}>
            <CustomNumberInput allowNegative={false} label='Ngưỡng điểm học tập >=' {...form.getInputProps("averageScore")} />
            <CustomNumberInput allowNegative={false} label='Điểm rèn luyện quy đổi' {...form.getInputProps("point")} />
        </CustomButtonCreateUpdate>
    )
}
