"use client"
import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import useM_StudentsActivityParticipation_Create from '@/hooks/mutation-hooks/StudentsActivityParticipation/useM_StudentsActivityParticipation_Create';
import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCheckbox } from '@aq-fe/core-ui/shared/components/input/CustomCheckbox';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { Flex, Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconUserPlus } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import StudentButtonDeleteList from './StudentButtonDeleteList';
type IconType = "number" | "icon";

export default function StudentButtonUpdateList({ eventValue, iconType = "number", completedByUserId, userWorkingUnitId, userRoleIds }: { eventValue: Event, iconType?: IconType, completedByUserId: number | null, userWorkingUnitId: number | null, userRoleIds: number[] | null }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const disc = useDisclosure();
    const permissionStore = usePermissionStore();
    const currentLoginUser = useAuthenticateStore();

    const studentEventQuery = useCustomReactQuery({
        queryKey: ["StudentButtonUpdateList_GetBy", eventValue.id],
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

    const mutation = useM_StudentsActivityParticipation_Create();

    const form = useForm<StudentEvent>({
        initialValues: {
            studentId: 0,
            eventId: 0,
            point: 0,
            id: 0,
            isRegistration: false,
            isEnabled: false,
            event: null as unknown as Event
        },
        validate: {
            studentId: (value) => value ? null : 'Không được để trống',
            point: (value) => value ? null : 'Không được để trống',
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => { form_multiple.setValues({ importedData: fileData }) }, [fileData])

    const handleSubmit = async () => {
        try {
            const validationResult = form.validate()
            if (validationResult.hasErrors) return;

            mutation.mutate({
                StudentId: form.values.studentId ?? 0,
                EventId: eventValue.id ?? 0,
                Point: (form.values.point ?? 0).toString(),
            });
            form.reset();
        } catch (error) {
            notifications.show({
                message: "Có lỗi xảy ra khi thêm hoạt động.",
                color: "red",
            });
        }
    };

    const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(() => [
        { header: "Họ và tên", accessorKey: "studentName", },
        {
            header: "Điểm", accessorKey: "point", size: 80,
        },
        {
            header: "Đăng ký", accessorKey: "isRegistration", size: 80,
            accessorFn: (row) =>
                <CustomCheckbox
                    checked={row.isRegistration ?? false}
                    readOnly
                />
        }
    ], [])

    if (studentEventQuery.isLoading) return "Loading...";

    return (
        <Group>
            <CustomButtonModal
                isActionIcon
                modalProps={{
                    size: "70%",
                    title: "Danh sách sinh viên tham gia"


                }}
                actionIconProps={{
                    variant: "transparent",
                    //todo check lại chỗ này, onsubmit lạ
                    // onSubmit: handleSubmit,
                    children: iconType === "number" ? <Text fz={"sm"} fw={400} span c={(eventValue?.participationCount ?? 0) > 0 ? "blue" : "black"}>{eventValue.participationCount ?? 0}</Text> : <IconUserPlus color="blue" />
                }}
                disclosure={disc}
            >
                {
                    (permissionStore.state.currentPermissionPage?.isCreate ||
                        permissionStore.state.currentPermissionPage?.isUpdate) &&
                        ((completedByUserId !== null && userWorkingUnitId !== null &&
                            completedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                        <>
                            <Grid align="flex-start">
                                <Grid.Col span={{ base: 12, md: 7 }}>
                                    <CustomSelect
                                        label='Sinh viên'
                                        data={
                                            studentQuery.data?.map((studentEvent) => ({
                                                value: (studentEvent.id ?? '').toString(),
                                                label: studentEvent.fullName ?? '',
                                            })) || []}
                                        onChange={(value) => {
                                            form.setFieldValue('studentId', Number(value))
                                        }}
                                        value={form.values.studentId ? form.values.studentId.toString() : null}
                                        placeholder="Chọn sinh viên"
                                        error={form.errors.studentId}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 3 }}>
                                    <CustomNumberInput
                                        label="Điểm"
                                        hideControls
                                        min={eventValue.minPoint}
                                        {...form.getInputProps('point')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 2 }}>
                                    <Flex direction="column" justify="flex-end" align="center" h={60}>
                                        <CustomButton onClick={handleSubmit} leftSection={<IconPlus />} color='blue'>
                                            Thêm
                                        </CustomButton>
                                    </Flex>
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
                    data={studentEventQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <StudentButtonDeleteList id={row.original.id!} name={row.original.studentName!} />
                            </CustomCenterFull>
                        )
                    }}
                >
                </CustomDataTable>
            </CustomButtonModal>
        </Group>
    )
}

