import { MyButtonModal } from '@/components/ui/Buttons/ButtonModal/MyButtonModal';
import { Group, Tabs, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import F_lz8rrabyws_PIs_Adjustment from './PIs_Adjustment/F_PLOAssessmentTable_PIsAdjustment';
import F_PLOAssessmentTable_PLOAdjustment from './PLO_Adjustment/F_PLOAssessmentTable_PLOAdjustment';

// interface IF_lz8rrabyws_Read {
//     id?: number;
//     code?: string;
//     name?: string;
//     courseCode?: string;
//     falcutyCode?: string;
//     PLOCode?: string;
//     PLOPercentage?: number;
//     descriptionPage1?: string;
//     PIsCode?: string;
//     PIsPercentage?: number;
//     descriptionPage2?: string;
//     nguoiCapNhat?: string;
//     ngayCapNhat?: Date | undefined;
// }
export default function F_PLOAssessmentUpdate({ id, name, enrollmentBatchCode, enrollmentBatchName }: { id: number, name: string, enrollmentBatchCode: string, enrollmentBatchName: string }) {
    const dis = useDisclosure()


    return (
        <MyButtonModal modalSize={"90%"} disclosure={dis} label='Cập nhật' title='Chi tiết chuẩn đầu ra chương trình đào tạo'>
            <Group mt={5}>
                <Group gap={8}>
                    <Text fw={600}>Chương trình:</Text><Text>{name}</Text>
                </Group>
                <Group gap={8}>
                    <Text fw={600}>Khoá:</Text><Text>{enrollmentBatchName}</Text><Text c="dimmed">({enrollmentBatchCode})</Text>
                </Group>
            </Group>
            <Tabs variant="pills" radius="xs" color="cyan" defaultValue="chuanDauRaPLO" >
                <Tabs.List mt={4}>
                    <Tabs.Tab value="chuanDauRaPLO">Chuẩn đầu ra PLO</Tabs.Tab>
                    <Tabs.Tab value="chiSoThucHienPIs">Chỉ số thực hiện PIs</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="chuanDauRaPLO"><F_PLOAssessmentTable_PLOAdjustment id={id} name={name} /></Tabs.Panel>
                <Tabs.Panel value="chiSoThucHienPIs"><F_lz8rrabyws_PIs_Adjustment id={id} name={name} /></Tabs.Panel>
            </Tabs>

        </MyButtonModal>
    )
}
