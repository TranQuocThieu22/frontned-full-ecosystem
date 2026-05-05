import { contractService } from "@/shared/APIs/contractService";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAnalyze, IconDeviceFloppy } from "@tabler/icons-react";
import { MRT_TableInstance } from "mantine-react-table";

interface ReminderCreateAssignButtonProps {
    table: MRT_TableInstance<SRMContract>,
    data: SRMContract[],
    loading?: boolean
}

export default function ReminderCreateAssignButton({ table, data, loading }: ReminderCreateAssignButtonProps) {
    const disc = useDisclosure();
    const form = useForm({
        initialValues: {
            ReportingCycle: 1,
            ReminderDate: 1,
        },
    });

    const mutation = useCustomReactMutation({
        axiosFn: () => contractService.assignReportDate(data.map((item) => ({
            SRMContractId: item.id!,
            ReportingCycle: form.values.ReportingCycle ?? 1,
            ReminderDate: form.values.ReminderDate,
        }))),
        options: {
            onSuccess: () => {
                disc[1].close();
                table.resetRowSelection();
            }
        }
    })

    return (
        <CustomButtonModal
            disclosure={disc}
            buttonProps={{
                actionType: "save",
                leftSection: <IconAnalyze />,
                children: "Gán ngày báo cáo",
                disabled: data.length === 0,
                loading: loading
            }}
            modalProps={{ title: "Danh sách đăng ký tuyển chọn", size: 'md' }}
        >
            <CustomNumberInput
                label="Chu kỳ báo cáo (tháng)"
                placeholder="Nhập chu kỳ báo cáo"
                min={1}
                max={999}
                {...form.getInputProps('ReportingCycle')}
            />
            <CustomNumberInput
                label="Ngày nhắc trong tháng"
                min={1}
                max={31}
                {...form.getInputProps('ReminderDate')}
            />
            <CustomButton
                leftSection={<IconDeviceFloppy size={16} />}
                onClick={() => {
                    mutation.mutate();
                }}
            >Lưu</CustomButton>
        </CustomButtonModal>
    );
}