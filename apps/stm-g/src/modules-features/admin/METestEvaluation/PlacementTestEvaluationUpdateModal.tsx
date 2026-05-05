"use client";
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MyCheckbox, MyNumberInput, MySelect, MyTextArea } from 'aq-fe-framework/components';
import { Grid } from '@mantine/core';
import { I_TestResult } from './interfaces';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';

export default function PlacementTestEvaluationUpdateModal({ values }: { values: I_TestResult }) {
    const disc = useDisclosure();
    const form = useForm<I_TestResult>({
        initialValues: values,
    });

    return (
        <MyCenterFull>

            <MyActionIconUpdate
                modalSize={"60%"}
                title="Chi tiết kết quả test"
                disclosure={disc}
                crudType="update"
                onSubmit={() => { }}
                form={form}>
                <Grid mb={20}>
                    <Grid.Col span={6}>
                        <MyNumberInput min={0} label='Điểm số tổng quan' {...form.getInputProps("overallScore")} />
                        <MyTextArea pt={20} label='Chi tiết điểm số' {...form.getInputProps("detailedScores")} />
                        <MyCheckbox pt={20} label='Đã đánh giá' {...form.getInputProps("status")} checked={values.status === 2} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <MySelect
                            label='Đề xuất cấp độ/Chương trình'
                            data={["Toán Khối 7 - Cấp độ A", "Toán Khối 7 - Cấp độ B"]}
                            defaultValue={values.suggestedLevel}
                            {...form.getInputProps("suggestedLevel")}
                        />
                        <MySelect pt={20}
                            label='Trạng thái kết quả'
                            data={["Chưa đánh giá", "Đã đánh giá"]}
                            defaultValue={(values.status !== 1) ? "Đã đánh giá" : "Chưa đánh giá"}
                        />
                        <MySelect pt={7}
                            label='Người đánh giá'
                            data={["Thầy Trần Văn Dũng", "Cô Nguyễn Thị Mai"]}
                            defaultValue={"Thầy Trần Văn Dũng"}
                            {...form.getInputProps("evaluator")}
                        />
                    </Grid.Col>
                </Grid>
            </MyActionIconUpdate>
        </MyCenterFull>
    );
}
