import { service_Department } from '@/shared/APIs/service__department';
import { service_EAQAnalysis } from '@/shared/APIs/service_EAQAnalysis';
import { ITaskDetail } from '@/shared/interfaces/task/ITaskDetail';
import { ITaskDetailAnalysis } from '@/shared/interfaces/task/ITaskDetailAnalysis';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { Table, Stack, Group, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import QualityAssurancePlanDetailInfo from '@/features/admin/ModuleQualityAssurancePlan/QualityAssurancePlanDetailInfo';

interface Props {
    data?: ITaskDetailAnalysis;
}

export interface IPlanSubmit {
    id?: number;
    code?: string;
    name?: string;
    duration?: string;
    expectedResult?: string
    supportUnit?: string;
    hostUnitId: number;
    userId?: number
    note?: string;
}

export default function QualityAssurancePlanCreateUpdate({ data }: Props) {
    const filterStore = useS_Shared_Filter()
    const queryClient = useQueryClient()
    const disc = useDisclosure();

    const departmentQuery = useCustomReactQuery({
        queryKey: ['departmentQuery'],
        axiosFn: async () => service_Department.getAll(),
        options: {
            enabled: disc[0]
        }
    })

    const form = useForm<Partial<Record<keyof ITaskDetail, any>>>({
        initialValues: {
            ...data,
            hostUnitId: data?.hostUnitId || '',
            supportUnit: data?.supportUnit || '',
            note: data?.note || ''
        },
        validate: { hostUnit: (value) => value ? null : "Dữ liệu không được để trống" }
    });

    const handleSubmit = () => {
        const validationResult = form.validate();

        if (validationResult.errors.host) {
            notifications.show({
                title: "Chưa chọn đơn vị chủ trì",
                message: "Vui lòng chọn đơn vị chủ trì",
                color: "red"
            })
            return false;
        }

        const payload: IPlanSubmit = {
            id: data?.id!,
            code: data?.code,
            name: data?.name,
            duration: data?.duration,
            expectedResult: data?.expectedResult,
            hostUnitId: Number(form.values.hostUnitId),
            supportUnit: form.values.supportUnit,
            userId: data?.user?.id,
            note: form.values.note,
        };

        return service_EAQAnalysis.updateEAQTaskDetailAnalysis(payload).then((res: any) => {
            notifications.show({
                title: "Lưu thành công",
                message: `Cập nhật dữ liệu ${data?.code} thành công`,
                color: "green"
            })
            queryClient.invalidateQueries({ queryKey: ["QualityAssurancePlanTable_TaskDetail", filterStore.state.Phase?.id] });
            disc[1].close();
        }).catch((res: any) => {
            notifications.show({
                title: "Lưu không thành công",
                message: `Vui lòng kiểm tra lại dữ liệu của ${data?.code}`,
                color: "red"
            })
        })
    }

    useEffect(() => {
        if (!data) return;
        form.setValues({
            ...data,
            hostUnitId: data?.hostUnitId || '',
            supportUnit: data?.supportUnit || '',
            note: data?.note || ''
        });
    }, [data])

    // Information rows for the vertical table
    const infoRows = [
        { label: 'Mã yêu cầu', value: form.values.eaqAnalysis?.eaqRequirement?.code },
        { label: 'Tên yêu cầu', value: form.values.eaqAnalysis?.eaqRequirement?.name },
        { label: 'Mã công việc', value: form.values.code },
        { label: 'Tên công việc', value: form.values.name },
    ];

    return (
        <CustomButtonModal
            disclosure={disc}
            isActionIcon
            modalProps={{
                size: '80%',
                title: 'Chi tiết kế hoạch'
            }}
            actionIconProps={{ actionType: 'update' }}
        >
            <Grid gutter="xl">
                {/* Cột trái: Thông tin chi tiết (Vertical Table) */}
                <Grid.Col span={6}>
                    <QualityAssurancePlanDetailInfo form={form} />
                </Grid.Col>

                {/* Cột phải: Form inputs */}
                <Grid.Col span={6}>
                    <Stack gap="md">
                        <CustomSelect
                            isLoading={departmentQuery.isLoading}
                            isError={departmentQuery.isError}
                            withAsterisk
                            label="Đơn vị chủ trì"
                            placeholder="Chọn đơn vị chủ trì"
                            data={departmentQuery.data?.map((item) => ({
                                value: String(item.id),
                                label: String(item.code + " - " + item.name)
                            })) || []}
                            value={form.values.hostUnitId ? String(form.values.hostUnitId) : ''}
                            onChange={(value) => form.setFieldValue("hostUnitId", value || "")}
                            error={form.errors.hostUnitId}
                            clearable={false}
                        />

                        <CustomTextArea
                            label="Đơn vị phối hợp"
                            placeholder="Nhập đơn vị phối hợp (ngăn cách bằng dấu phẩy nếu nhiều)"
                            value={form.values.supportUnit}
                            autosize
                            minRows={5}
                            onChange={(e) =>
                                form.setFieldValue("supportUnit", e.currentTarget.value)
                            }
                        />

                        <CustomTextArea
                            label="Ghi chú"
                            placeholder="Nhập ghi chú"
                            value={form.values.note || ''}
                            onChange={(e) =>
                                form.setFieldValue("note", e.currentTarget.value)
                            }
                            autosize
                            minRows={10}
                        />
                    </Stack>
                </Grid.Col>
            </Grid>
            <CustomButton actionType="save" onClick={handleSubmit}>
                Lưu
            </CustomButton>

        </CustomButtonModal>
    )
}
