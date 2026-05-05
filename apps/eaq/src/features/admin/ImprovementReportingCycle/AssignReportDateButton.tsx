import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { Group, List, Modal, SimpleGrid, ThemeIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCalendarWeek, IconCircleCheck, IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_TableInstance } from "mantine-react-table";
import { useState } from "react";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";

interface Props {
    table: MRT_TableInstance<ITaskDetailAnalysis>
    analysisType?: analysisTypeEnum
}


export default function AssignReportDateButton({ table, analysisType }: Props) {
    const selectedRow = table.getSelectedRowModel().rows;
    const selectedTaskDetailAnalysis = selectedRow.filter(i => i.original.reportCount === 0);
    const [dataSuccess, setDataSuccess] = useState<ITaskDetailAnalysis[]>([]);
    const dis = useDisclosure();
    const queryClient = useQueryClient();
    const disclosureViewSuccess = useDisclosure();

    const form = useForm<any>({
        initialValues: {
            startDate: undefined,
            endDate: undefined,
            frequency: undefined,
            reportDay: undefined
        },
        validate: {
            startDate: (value) => value ? null : "Không được để trống",
            endDate: (value, formValues) => {
                if (!value) return "Không được để trống";

                const end = new Date(value);
                const start = new Date(formValues.startDate || "");

                if (start && !isNaN(start.getTime()) && end <= start) return "Ngày kết thúc phải sau ngày bắt đầu";
            },
            frequency: (value) => value ? null : "Không được để trống",
            reportDay: (value) => value ? null : "Không được để trống"
        }
    })

    const handleOpenSuccessModal = () => {
        disclosureViewSuccess[1].open();
    };

    const mutation = useCustomReactMutation({
        axiosFn: (body: any) => {
            return service_EAQAnalysis.createPeriodicReport(body);
        },
        enableDefaultSuccess: false,
        options: {
            onSuccess: () => {
                dis[1].close();
                form.reset();
                setDataSuccess(selectedTaskDetailAnalysis.map(i => i.original))
                queryClient.invalidateQueries({ queryKey: ["task_detail_analysis_report_cycle_list"] });
                table.resetRowSelection();
                notifications.show({
                    message: <Group justify="space-between">
                        Gán ngày báo cáo thành công
                        <CustomButton
                            size="xs"
                            onClick={handleOpenSuccessModal}
                        >
                            Xem danh sách
                        </CustomButton>
                    </Group >,
                    color: "green",
                    autoClose: 5000
                });

            }
        }
    })

    const handleSubmit = () => {
        const validate = form.validate();
        if (validate.hasErrors) {
            return;
        }

        if (!selectedTaskDetailAnalysis || selectedTaskDetailAnalysis.length === 0) {
            notifications.show({
                message: "Chỉ có thể gán ngày báo cáo cho các dòng chưa có ngày báo cáo",
                color: "#FFC400",
                autoClose: 5000
            })
            dis[1].close();
            return;
        }
        const body = form.getValues();
        body.eaqTaskDetailIds = selectedTaskDetailAnalysis.map(i => (i.original.id));
        mutation.mutate(body);
    }

    return (<>
        <CustomButtonModal
            disclosure={dis}
            buttonProps={{
                actionType: 'update',
                children: "Gán ngày báo cáo",
                variant: "light",
                color: "blue",
                leftSection: <IconPlus />,
                disabled: selectedRow.length === 0,
            }}
            modalProps={{
                title: "Chi tiết chu kỳ báo cáo",
                size: "30%"
            }}
        >
            <SimpleGrid cols={{ md: 1, sm: 1, xs: 1, xl: 1, lg: 2 }}>
                <CustomDateInput
                    label="Ngày bắt đầu"
                    withAsterisk
                    locale="vi"
                    weekdayFormat={(date) => {
                        const day = new Date(date).getDay();
                        return day === 0 ? "CN" : `T${day + 1}`;
                    }}
                    monthsListFormat="[Tháng] M"
                    monthLabelFormat="[Tháng] MM YYYY"
                    rightSection={<IconCalendarWeek />}
                    {...form.getInputProps("startDate")}
                    clearable={false}
                />
                <CustomDateInput
                    label="Ngày kết thúc"
                    locale="vi"
                    weekdayFormat={(date) => {
                        const day = new Date(date).getDay();
                        return day === 0 ? "CN" : `T${day + 1}`;
                    }}
                    monthsListFormat="[Tháng] M"
                    monthLabelFormat="[Tháng] MM YYYY"
                    withAsterisk
                    rightSection={<IconCalendarWeek />}
                    {...form.getInputProps("endDate")}
                    clearable={false}
                />
                <CustomNumberInput
                    withAsterisk
                    step={1}
                    label="Chu kỳ báo cáo (tháng)"
                    min={1}
                    allowDecimal={false}
                    {...form.getInputProps("frequency")}
                />
                <CustomNumberInput
                    withAsterisk
                    step={1}
                    label="Ngày báo cáo (ngày trong tháng)"
                    min={1}
                    max={31}
                    allowDecimal={false}
                    {...form.getInputProps("reportDay")}
                />
            </SimpleGrid>
            <CustomButton
                loading={mutation.isPending}
                fullWidth
                actionType="save"
                onClick={() => {
                    handleSubmit();
                }}
            />
        </CustomButtonModal>
        <Modal
            onClose={disclosureViewSuccess[1].close}
            opened={disclosureViewSuccess[0]}
            title={`Danh sách ${analysisType === analysisTypeEnum.Limitation ? "hạn chế" : "công việc"} vừa gán ngày báo cáo`}
        >
            <List
                spacing="xs"
                size="sm"
                center
                icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCircleCheck size={16} />
                    </ThemeIcon>
                }
            >
                {dataSuccess?.map((i, index) => {
                    const code = analysisType === analysisTypeEnum.Limitation ? i.eaqAnalysis?.eaqLimitation?.code : i.code;
                    return (
                        <List.Item key={`${i.id}-${index}-${code}`}>{code || ""}</List.Item>
                    )
                })
                }
            </List>
        </Modal>
    </>)
};
