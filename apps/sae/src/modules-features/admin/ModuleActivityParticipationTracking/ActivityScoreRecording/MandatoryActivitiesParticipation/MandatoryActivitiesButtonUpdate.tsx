"use client"
import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { StudentEventParticipation } from '@/interfaces/studentsActivityParticipation';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCheckbox } from '@aq-fe/core-ui/shared/components/input/CustomCheckbox';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUserPlus, IconUsersPlus } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { IMandatoryActivitiesEventInfoViewModel, IMandatoryActivitiesInfoViewModel } from './interfaces/IMandatoryActivitiesParticipationViewModel';
import MandatoryActivitiesButtonDelete from './MandatoryActivitiesButtonDelete';


export default function MandatoryActivitiesButtonUpdate({ eventValue, iconType, reviewedByUserId, userWorkingUnitId, userRoleIds }: { eventValue: IMandatoryActivitiesEventInfoViewModel, iconType?: String, reviewedByUserId: number, userWorkingUnitId: number | null, userRoleIds: number[] | null }) {
    const [isLoading, setIsLoading] = useState(false);
    const permissionStore = usePermissionStore()
    const currentLoginUser = useAuthenticateStore()
    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const studentEventQuery = useCustomReactQuery({
        queryKey: ["MandatoryActivitiesButtonUpdate_GetBy", eventValue.id],
        axiosFn: () => service_studentsActivityParticipation.getBy(
            `?eventid=${eventValue.id}`
        ),
        options: {
            enabled: disc[0],
        },
    });

    const studentQuery = useCustomReactQuery({
        queryKey: ["students", eventValue.id],
        axiosFn: () => service_account.getStudentList({
            paging: {
                pageNumber: 1,
                pageSize: 100,
            }
        }),
        options: {
            enabled: disc[0],
        }
    })

    const form = useForm<StudentEvent>({
        initialValues: {
            studentId: -1,
            eventId: 0,
            point: 0,
            id: 0,
            isRegistration: false,
            isEnabled: false
        },
        validate: {
            studentId: (value) => {
                if (value === undefined || value === null || value === -1) {
                    return 'Vui lòng chọn sinh viên'
                }

                return null
            },
            point: (value) => {
                if (!value) return null;

                if (Number(value) < eventValue.minPoint!) {
                    return 'Điểm phải lớn hơn hoặc bằng điểm tối thiểu';
                } else if (Number(value) > eventValue.maxPoint!) {
                    return 'Điểm phải nhỏ hớn hoặc bằng điểm tối đa';
                }
                return null;

            },

        }
    })

    const queryDataList = [studentEventQuery, studentQuery]

    useEffect(() => {
        if (queryDataList.every((dataList) => dataList.isSuccess)) {
            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }, queryDataList);

    const ENDPOINT = "StudentsActivityParticipation/Create"

    const mutation = useMutation({
        mutationFn: async (body: StudentEventParticipation) => {
            const res = await axiosInstance.post(ENDPOINT, body)
            return res
        }
    })

    const handleSubmit = async () => {
        try {
            const validationResult = form.validate()
            if (validationResult.hasErrors) return;

            await mutation.mutateAsync({
                StudentId: form.values.studentId,
                EventId: eventValue.id,
                Point: form.values.point?.toString(),
            } as StudentEventParticipation,
            );

            queryClient.invalidateQueries({ queryKey: ["F_ifomc84mnz_Read"] })

            setIsLoading(false);
            form.reset();
        } catch (error) {
            console.log(error);
            notifications.show({
                message: "Có lỗi xảy ra khi thêm hoạt động.",
                color: "red",
            });
        }
    };

    const columns = useMemo<MRT_ColumnDef<IMandatoryActivitiesInfoViewModel>[]>(() => [
        { header: "Họ và tên", accessorKey: "studentName", },
        {
            header: "Điểm", accessorKey: "point", size: 80,
            accessorFn: (row) =>
                <CustomCenterFull>
                    <Text> {row.point}</Text>
                </CustomCenterFull>
        },
        {
            header: "Tham gia", accessorKey: "isRegistration", size: 80,
            accessorFn: (row) =>
                <CustomCenterFull>
                    <CustomCheckbox
                        checked={row.isRegistration}
                        readOnly
                    />
                </CustomCenterFull>
        }
    ], [])

    return (
        <Group>
            <CustomButtonModal
                isActionIcon
                modalProps={{
                    size: "60%",
                    title: "Danh sách sinh viên tham gia"

                }}
                actionIconProps={{
                    variant: "transparent",
                    //todo: ktra lại chỗ này onsubmit ko có prop trong action icon prop
                    // onSubmit:{handleSubmit}
                    children: iconType === "number"
                        ? <Text fz={"sm"} fw={400} span c={(eventValue?.participationCount ?? 0) > 0 ? "blue" : "black"}>{eventValue.participationCount ?? 0}</Text>
                        : <IconUserPlus color="blue" />
                }}
                disclosure={disc}
            >
                {(permissionStore.state.currentPermissionPage?.isCreate ||
                    permissionStore.state.currentPermissionPage?.isUpdate) &&
                    ((reviewedByUserId !== null && userWorkingUnitId !== null &&
                        reviewedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                    <>
                        <Grid align="flex-start">
                            <Grid.Col span={3}>
                                <CustomSelect
                                    label='Sinh viên'
                                    data={
                                        isLoading
                                            ? []
                                            : (
                                                studentQuery.data?.map((studentEvent) => ({
                                                    value: (studentEvent.id ?? '').toString(),
                                                    label: studentEvent.fullName ?? '',
                                                })) || []
                                            )
                                    }
                                    onChange={(value) => {
                                        form.setFieldValue('studentId', Number(value))
                                    }}
                                    placeholder="Chọn sinh viên"
                                    error={form.errors.studentId}
                                />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <CustomNumberInput
                                    label="Điểm"
                                    hideControls
                                    min={eventValue.minPoint}
                                    {...form.getInputProps('point')}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <CustomButton
                                    hidden={!permissionStore.state.currentPermissionPage?.isCreate}
                                    mt={'2.8vh'} onClick={handleSubmit} leftSection={<IconUsersPlus />} color='blue'>
                                    Thêm
                                </CustomButton>
                            </Grid.Col>
                        </Grid>
                    </>
                    :
                    <Text c="dimmed" fz={"sm"}>Đơn vị của bạn không có quyền cập nhật điểm cho hoạt động này</Text>
                }

                <CustomDataTable
                    enableRowNumbers={true}
                    enableColumnFilterModes={true}
                    enableColumnFilters={true}

                    columns={columns}
                    data={isLoading ? [] : (studentEventQuery.data || [])}

                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <MandatoryActivitiesButtonDelete id={row.original.id!} name={row.original.studentName!} />
                            </CustomCenterFull>
                        )
                    }}
                >
                </CustomDataTable>
            </CustomButtonModal>
        </Group>
    )
}
