import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import { StudentList } from '@/interfaces/account';
import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { StudentEventParticipation } from '@/interfaces/studentsActivityParticipation';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomColumnDef, CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import CustomSearchableSelect from '@aq-fe/core-ui/shared/components/input/CustomSearchableSelect';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUserPlus, IconUsersPlus } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import StudentAffairsParticipationButtonDelete from './StudentAffairsButtonDelete';
import { useCustomReactMutation } from '@aq-fe/core-ui/shared/hooks/useCustomReactMutation';
interface Props {
    eventValue: Event,
    iconType?: String,
    reviewedByUserId: number | null,
    userWorkingUnitId: number | null,
    userRoleIds: number[] | null,
}
export default function StudentAffairsButtonUpdate({
    eventValue,
    iconType,
    reviewedByUserId,
    userWorkingUnitId,
    userRoleIds

}: Props) {
    const minSearchLength = 2
    const debounceMs = 800
    const scrollThreshold = 100
    const [pageSize, setPageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
    const paginationState = useState({ pageIndex: 0, pageSize: 10 });

    const [studentSearchInput, setStudentSearchInput] = useState("");

    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", debounceMs);

    const permissionStore = usePermissionStore()
    const currentLoginUser = useAuthenticateStore()

    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const [isDuplicate, setIsDuplicate] = useState(false);

    const { state: permissionState } = permissionStore;
    const canAddStudent = () => {
        const hasPermission = permissionState.currentPermissionPage?.isCreate
        return hasPermission &&
            (reviewedByUserId !== null &&
                userWorkingUnitId !== null &&
                reviewedByUserId === userWorkingUnitId) ||
            (userRoleIds?.some(item => item === 2)) ||
            currentLoginUser.state.userId?.toString() === '1';
    };
    const studentEventQuery = useCustomReactQuery({
        queryKey: ["StudentAffairsParticipationButtonUpdate_GetBy", eventValue.id],
        axiosFn: () => service_studentsActivityParticipation.getBy(
            `?eventid=${eventValue.id}`
        ),
        options: {
            enabled: disc[0],
        },
    });

    const studentQuery = useCustomReactQuery({
        queryKey: ["students", debouncedStudentSearch, currentPage, pageSize],
        axiosFn: () => service_account.getStudentList({
            paging: {
                pageNumber: currentPage,
                pageSize: pageSize
            },
            name: debouncedStudentSearch,
        }),
        options: {
            enabled: disc[0],
            placeholderData: (previousData) => previousData
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
            // studentId: (value) => {
            //     if (value === undefined || value === null || value === -1) {
            //         return 'Vui lòng chọn sinh viên'
            //     }

            //     return null
            // },
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

    const ENDPOINT = "StudentsActivityParticipation/Create"

    const mutation = useCustomReactMutation({
        axiosFn: async (body: StudentEventParticipation) => {
            const res = await axiosInstance.post(ENDPOINT, body)
            return res
        },
        successNotification: 'Thêm sinh viên thành công!'

    })

    const handleSubmit = async () => {
        try {
            if (!selectedStudent) {
                notifications.show({ message: 'Vui lòng chọn sinh viên', color: 'red' });
                return;
            }
            const validationResult = form.validate()
            if (validationResult.hasErrors) return

            mutation.mutate({
                StudentId: selectedStudent?.id,
                EventId: eventValue.id,
                Point: form.values.point?.toString(),
            } as StudentEventParticipation,
            );

            queryClient.invalidateQueries({ queryKey: ["F_ifomc84mnz_Read"] })

            setIsLoading(false);
            form.reset();
            setSelectedStudent(null);
            setStudentSearchInput("");
        } catch (error) {
            console.log(error);
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
            accessorFn: (row) =>
                <CustomCenterFull>
                    <Text size='sm'> {row.point}</Text>
                </CustomCenterFull>
        },
        {
            header: "Tham gia", accessorKey: "isRegistration", size: 150,
            type: "squareCheck",
        }
    ], [])
    // Kiểm tra trùng lặp
    useEffect(() => {
        if (selectedStudent && studentEventQuery.data) {
            const duplicate = studentEventQuery.data.some(
                (event: StudentEvent) => event.studentId === selectedStudent.id
            );
            setIsDuplicate(duplicate);
        } else {
            setIsDuplicate(false);
        }
    }, [selectedStudent, studentEventQuery.data]);

    return (
        <Group>
            <CustomButtonModal
                // isActionIcon={iconType === "number" ? true : false}
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
                {canAddStudent() ?
                    <Grid align="center" >
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <CustomSearchableSelect
                                description={'Mã hoặc tên sinh viên'}
                                query={studentQuery}
                                value={selectedStudent}
                                onChange={setSelectedStudent}
                                searchValue={studentSearchInput}
                                onSearchChange={setStudentSearchInput}
                                scrollThreshold={scrollThreshold}
                                config={{
                                    getValue: (account) => account.id?.toString() ?? '',
                                    getLabel: (account) => `${account.code} - ${account.fullName}`,
                                    minSearchLength: minSearchLength,
                                    currentPage: currentPage,
                                    setCurrentPage: setCurrentPage,
                                    debouncedSearch: debouncedStudentSearch,
                                    searchInput: studentSearchInput,
                                    setSearchInput: setStudentSearchInput
                                }}
                                error={isDuplicate ? "Sinh viên này đã được thêm vào hoạt động" : undefined}
                                label="Sinh viên"
                                placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
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
                        <Grid.Col span={{ base: 12, md: 2 }} mt={5}>
                            <CustomButton
                                hidden={!permissionStore.state.currentPermissionPage?.isCreate}
                                onClick={handleSubmit}
                                leftSection={<IconUsersPlus />}
                                color='blue'>
                                Thêm
                            </CustomButton>
                        </Grid.Col>
                    </Grid>
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
                                {canAddStudent() ?
                                    <StudentAffairsParticipationButtonDelete
                                        id={row.original.id!}
                                        name={row.original.studentName!} />
                                    :
                                    <></>
                                }
                            </CustomCenterFull>
                        )
                    }}
                >
                </CustomDataTable>
            </CustomButtonModal>
        </Group >
    )
}
