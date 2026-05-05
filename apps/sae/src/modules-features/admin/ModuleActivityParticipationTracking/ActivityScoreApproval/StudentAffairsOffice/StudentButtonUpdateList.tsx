"use client"
import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import useM_StudentsActivityParticipation_Create from '@/hooks/mutation-hooks/StudentsActivityParticipation/useM_StudentsActivityParticipation_Create';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { StudentList } from '@/interfaces/account';
import { Event } from '@/interfaces/event';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomColumnDef, CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { Flex, Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUserPlus, IconUsersPlus } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import StudentButtonDeleteList from './StudentButtonDeleteList';

type IconType = "number" | "icon";

export default function StudentButtonUpdateList({ eventValue, iconType = "number", completedByUserId, userWorkingUnitId, userRoleIds }: { eventValue: Event, iconType?: IconType, completedByUserId: number | null, userWorkingUnitId: number | null, userRoleIds: number[] | null }) {
    const [isLoading, setIsLoading] = useState(false);

    const [fileData, setFileData] = useState<any[]>([]);
    const disc = useDisclosure();
    const permissionStore = usePermissionStore();
    const currentLoginUser = useAuthenticateStore();
    const paginationState = useState({ pageIndex: 0, pageSize: 10 });
    const [user, setUser] = useState<StudentList | null>(null);

    const [studentSearchInput, setStudentSearchInput] = useState("");

    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);

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
        queryKey: ["students", debouncedStudentSearch, paginationState[0].pageIndex, paginationState[0].pageSize],
        axiosFn: () => service_account.getStudentList({
            paging: {
                pageNumber: paginationState[0].pageIndex + 1,
                pageSize: paginationState[0].pageSize,
            },
            name: debouncedStudentSearch,
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
            // studentId: (value) => value ? null : 'Không được để trống',
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

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => { form_multiple.setValues({ importedData: fileData }) }, [fileData])

    const handleSubmit = async () => {
        try {
            if (!user) {
                notifications.show({ message: 'Vui lòng chọn sinh viên', color: 'red' });
                return;
            }
            const validationResult = form.validate()
            if (validationResult.hasErrors) return;

            await mutation.mutate({
                StudentId: user?.id,
                EventId: eventValue.id ?? 0,
                Point: (form.values.point ?? 0).toString(),
            });

            setIsLoading(false);
            form.reset();
            setUser(null);
            setStudentSearchInput("");
        } catch (error) {
            notifications.show({
                message: "Có lỗi xảy ra khi thêm hoạt động.",
                color: "red",
            });
        }
    };

    const columns = useMemo<CustomColumnDef<StudentEvent>[]>(() => [
        { header: "Mã sinh viên", accessorKey: "studentCode", },
        { header: "Họ và tên", accessorKey: "studentName", },
        {
            header: "Điểm", accessorKey: "point", size: 80,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull>
                        <Text size="sm">{row.point}</Text>
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Đăng ký", accessorKey: "isRegistration", size: 130,
            type: "squareCheck"
        }
    ], [])

    if (studentEventQuery.isLoading) return "Loading...";

    return (
        <Group>
            <CustomButtonModal
                modalProps={{
                    size: "60%",
                    title: "Danh sách sinh viên tham gia"
                }}
                buttonProps={{
                    variant: iconType === "number" ? 'transparent' : 'filled',
                    children: iconType === "number" ? `${eventValue.participationCount ?? 0}`
                        : <IconUserPlus />
                }}
                disclosure={disc}
            >
                {(permissionStore.state.currentPermissionPage?.isCreate) &&
                    ((completedByUserId !== null && userWorkingUnitId !== null &&
                        completedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                    <>
                        <Grid align="flex-end">
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <CustomSelect
                                    label="Sinh viên"
                                    description={'Mã hoặc tên sinh viên'}
                                    searchable
                                    searchValue={studentSearchInput}
                                    onSearchChange={(value) => {
                                        setStudentSearchInput(value);
                                        // Only clear selection if input is completely cleared
                                        if (value === '') {
                                            setUser(null);
                                        }
                                    }}
                                    data={studentQuery.data?.map((item) => ({
                                        label: `${item.code} - ${item.fullName}`,
                                        value: item.code ?? ''
                                    })) || []}
                                    value={user?.code ?? null}
                                    onChange={(value) => {
                                        if (value) {
                                            const foundUser = studentQuery.data?.find((item) => item.code === value);
                                            if (foundUser) {
                                                setUser(foundUser);
                                                setStudentSearchInput(foundUser.code ?? ''); // Sync search input
                                            }
                                        } else {
                                            setUser(null);
                                            setStudentSearchInput(''); // Clear search input
                                        }
                                    }}
                                    placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
                                    nothingFoundMessage={studentSearchInput.length > 0 && studentSearchInput.length < 2 ?
                                        "Nhập ít nhất 2 ký tự để tìm kiếm" :
                                        studentQuery.isLoading ? "Đang tìm kiếm..." : "Không tìm thấy kết quả"
                                    }
                                    limit={20}
                                    clearable
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 3 }}>
                                <CustomNumberInput
                                    label="Điểm"
                                    description={`Điểm tối thiểu ${eventValue.minPoint} - Điểm tối đa ${eventValue.maxPoint}`}

                                    hideControls
                                    min={eventValue.minPoint}
                                    {...form.getInputProps('point')}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 2 }}>
                                <Flex direction="column" justify="flex-end" align="center" h={60}>
                                    <CustomButton
                                        onClick={handleSubmit}
                                        leftSection={<IconUsersPlus />}
                                        color='blue'>
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
                    data={isLoading ? [] : (studentEventQuery.data || [])}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                {(permissionStore.state.currentPermissionPage?.isDelete) &&
                                    ((completedByUserId !== null && userWorkingUnitId !== null &&
                                        completedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                                    <>
                                        <StudentButtonDeleteList id={row.original.id!} name={row.original.studentName!} />
                                    </>
                                    :
                                    <></>
                                }
                            </CustomCenterFull>
                        )
                    }}
                >
                </CustomDataTable>
            </CustomButtonModal>
        </Group>
    )
}
