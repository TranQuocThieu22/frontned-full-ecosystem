"use client";
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { MyButton, MyButtonModal, MyCheckbox, MySelect, MyTextArea } from 'aq-fe-framework/components';
import { I_CompilationProgress, MonitoringStatusLabel } from './CompilationProgressMonitoringTable';

export default function CompilationProgressMonitoringUpdate({ data }: { data: I_CompilationProgress }) {
    const disc = useDisclosure(false)

    const form = useForm<I_CompilationProgress>({
        initialValues: data,
    });

    const monitoringStatusOptions = Object.entries(MonitoringStatusLabel).map(([value, label]) => ({
        value,
        label,
    }));

    return (
        <MyButtonModal
            modalSize={"60%"}
            label="Giám sát"
            title="Chi tiết nội dung biên soạn"
            disclosure={disc}
            crudType="update"
            onSubmit={() => {
            }}
        >
            <MySelect label='Trạng thái giám sát'
                data={monitoringStatusOptions}
                value={data.monitoringStatus?.toString()} />
            <MyTextArea label='Mô tả' {...form.getInputProps("monitoringNote")} />
            <MyCheckbox pt={"md"} label="Thông báo yêu cầu báo cáo bổ sung" defaultChecked={data.requiresReportSupplement || false} />
            <MyButton crudType="save" w={'100%'} />
        </MyButtonModal>
    );
}
