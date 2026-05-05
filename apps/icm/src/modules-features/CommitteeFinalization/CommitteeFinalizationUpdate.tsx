"use client";
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { MyButton, MyButtonModal, MyCheckbox, MyFieldset, MySelect, MyTextArea } from 'aq-fe-framework/components';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { I_FinalizationTracking, TaskStatusLabel } from './CommitteeFinalizationTable';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import { Grid, SimpleGrid } from '@mantine/core';

export default function CommitteeFinalizationUpdate({ data }: { data: I_FinalizationTracking }) {
    const disc = useDisclosure();

    const form = useForm<I_FinalizationTracking>({
        initialValues: data,
    });

    const finalizationStatusOptions = Object.entries(TaskStatusLabel).map(([value, label]) => ({
        value,
        label,
    }));

    return (
        <MyButtonModal
            modalSize={"60%"}
            label="Cập nhật"
            title="Chi tiết nhiệm vụ hoàn thiện"
            disclosure={disc}
            crudType="update"
            onSubmit={() => {
            }}
        >
                <Grid>
                    <Grid.Col span={6}>
                        <MyTextInput label='Phiên bản' {...form.getInputProps("version")} />
                        <MyTextInput label='Tiến độ' {...form.getInputProps("progressPercent")} />
                        <MyTextArea label='Ghi chú / Giải trình' {...form.getInputProps("note")} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <MyFileInput label='Tài liệu đính kèm' {...form.getInputProps("fileLink")} />
                        <MySelect
                            label='Trạng thái hoàn thiện'
                            data={finalizationStatusOptions}
                            {...form.getInputProps("status")}
                        />
                    </Grid.Col>
                </Grid>
            <MyButton crudType="save" w={'100%'} />
        </MyButtonModal>
    );
}
