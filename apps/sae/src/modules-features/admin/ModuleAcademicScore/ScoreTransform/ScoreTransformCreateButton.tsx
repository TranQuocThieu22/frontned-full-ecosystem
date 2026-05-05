'use client'
import { service_scoreTransform } from '@/api/services/service_scoreTransform';
import { useForm } from '@mantine/form';
import { ScoreTransformViewModel } from './interfaces/IScoreTransformViewModel';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';

export default function ScoreTransformCreateButton() {
    const form = useForm<ScoreTransformViewModel>({
        initialValues: {
            averageScore: 0,
            point: 0,
            code: "",
            name: "",
            isEnabled: true
        },
        validate: {

        }
    });


    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: '40%',
                title: 'Thang đo điểm học tập và quy đổi điểm rèn luyện'
            }}
            form={form}
            onSubmit={async (values) => {
                return await service_scoreTransform.create(values)
            }}
        >
            <CustomNumberInput allowNegative={false} label='Ngưỡng điểm học tập >=' {...form.getInputProps("averageScore")} />
            <CustomNumberInput allowNegative={false} label='Điểm rèn luyện quy đổi' {...form.getInputProps("point")} />
        </CustomButtonCreateUpdate>
    )
}
