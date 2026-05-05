"use client"
import baseAxios from '@/api/config/baseAxios';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { ENUM_GENDER } from '@/constants/enum/global';
import { utils_date_dateToDDMMYYYString, utils_date_getWeekDay } from '@/utils/date';
import { Button, Grid, Group, Select, SelectProps, Table, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { ICourseSectionSchedule, ICsScheduleUpdateModel, IStudentAttendanceUpdateModel, IStudentByCsScheduleId } from './interface';

export default function AttendanceTableButtonModal(
    { csScheduleValues }: { csScheduleValues: ICourseSectionSchedule }
) {
    const disc = useDisclosure(false)
    const [csValues, setCsValues] = useState<ICsScheduleUpdateModel>({
        id: csScheduleValues.id,
        code: csScheduleValues.code,
        name: csScheduleValues.name,
        concurrencyStamp: csScheduleValues.concurrencyStamp,
        isEnabled: csScheduleValues.isEnabled,
        subjectName: csScheduleValues.subjectName,
        courseSectionId: csScheduleValues.courseSectionId,
        addressId: csScheduleValues.addressId,
        classPeriodStart: csScheduleValues.classPeriodStart,
        classPeriodEnd: csScheduleValues.classPeriodEnd,
        lecturerReview: csScheduleValues.lecturerReview,
        startDate: csScheduleValues.startDate,
        endDate: csScheduleValues.endDate,
        // courseSectionScheduleLecturer: csScheduleValues.courseSectionScheduleLecturer
        courseSectionScheduleLecturer: []

    })
    const [studentAttendanceList, setStudentAttendanceList] = useState<IStudentAttendanceUpdateModel[]>([])

    const ClassParticipantByScheduleId = useQuery<IStudentByCsScheduleId[]>({
        queryKey: [`ClassParticipantByScheduleId`, csScheduleValues.id],
        queryFn: async () => {
            const response = await baseAxios.post(`/CourseSection/StudentAttendenceProcess?courseSectionScheduleId=${csScheduleValues.id}`);

            if (response.data.data) {
                let updatedData = response.data.data.map((item: IStudentByCsScheduleId) => {
                    const { user, ...rest } = item;
                    return {
                        ...rest
                    };
                })
                setStudentAttendanceList(updatedData)
            }
            return response.data.data
        },
        enabled: disc[0]
    })

    const getColorByValue = (value: string | null): string => {
        switch (value) {
            case '1': return '#4CAF50'; // Green for present
            case '2': return '#F44336'; // Red for absent
            case '3': return '#FF9800'; // Orange for late
            case '4': return '#2196F3'; // Blue for early leave
            default: return '#757575';  // Default gray
        }
    };

    const icons: Record<string, React.ReactNode> = {
        1: <div
            style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: getColorByValue("1"),
                marginRight: 8
            }}
        />,
        2: <div
            style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: getColorByValue("2"),
                marginRight: 8
            }}
        />,
        3: <div
            style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: getColorByValue("3"),
                marginRight: 8
            }}
        />,
        4: <div
            style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: getColorByValue("4"),
                marginRight: 8
            }}
        />,
    };

    const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
        <>
            <Group
                flex="1"
                style={{
                    padding: '4px 4px',
                    borderRadius: '4px',
                }}
            >
                <Group
                    wrap='nowrap'
                >
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: getColorByValue(option.value),
                            marginRight: 8
                        }}
                    />
                    <Group
                        wrap='nowrap'
                    >
                        {option.label}
                    </Group>
                </Group>
            </Group>
        </>

    );

    const columns = useMemo<MRT_ColumnDef<IStudentByCsScheduleId>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorFn(originalRow) {
                return (originalRow.user?.gender === null ? '' : ENUM_GENDER[originalRow.user?.gender!])
            },
            size: 80,
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn(originalRow) {
                return originalRow.user?.dateOfBirth === null ? null : utils_date_dateToDDMMYYYString(new Date(originalRow.user?.dateOfBirth!));
            },
            size: 100,
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber",
            size: 120,
        },
        {
            header: "Email",
            accessorKey: "user.email",
        },
        {
            header: "Trạng thái học viên",
            accessorFn(originalRow) {
                return 'Chưa có dữ liệu'
            },
            size: 150
        },
        {
            header: "Hiện diện",
            accessorKey: 'status',
            accessorFn(originalRow) {
                return originalRow.status === null ? '' : originalRow.status!.toString()
            },
            Cell: ({ cell, row }) =>
                <Select
                    clearable={false}
                    searchable={false}
                    allowDeselect={false}
                    variant="unstyled"
                    leftSection={icons[row.original.status!.toString()]}
                    rightSection={<></>}
                    renderOption={renderSelectOption}
                    placeholder='điểm danh'
                    data={[
                        { value: "1", label: "Hiện diện" },
                        { value: "2", label: "Vắng mặt" },
                        { value: "3", label: "Đi trễ" },
                        { value: "4", label: "Về sớm" },
                    ]}
                    defaultValue={row.original.status === null ? null : row.original.status!.toString()}
                    onChange={(value) => {
                        handleFieldChange(row.original, "status", value === null ? null : parseInt(value))
                        //mutate directly to the original data
                        row.original.status = value === null ? undefined : parseInt(value)
                    }}
                />,
            maxSize: 160,
        },
        {
            header: "Giảng viên đánh giá",
            accessorKey: "lecturerReview",
            Cell: ({ row }) => {
                return (
                    <>
                        <Textarea
                            minRows={3}
                            placeholder="nhập đánh giá"
                            defaultValue={row.original.lecturerReview}
                            onBlur={(e) => handleFieldChange(row.original, "lecturerReview", e.currentTarget.value)}
                        />
                    </>
                )
            },
            size: 300,
        },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
            },
        }
    ], [
        //todo: fix bug, async color change after save button clicked
        ClassParticipantByScheduleId.data
    ]);


    // Handle changes for any field
    const handleFieldChange = (row: IStudentByCsScheduleId, fieldName: keyof IStudentByCsScheduleId, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null
        setStudentAttendanceList((prev) => {
            const existingIndex = prev.findIndex((item: any) => item.id === row.id);
            const updatedExams = [...prev];
            updatedExams[existingIndex] = {
                ...updatedExams[existingIndex],
                [fieldName]: fieldValue
            };
            return updatedExams;
        });
    };

    const handleCallAPICheckAttendance = async () => {
        let response1 = await baseAxios.put("/CourseSection/UpdateStudentAttendence", studentAttendanceList);
        let response2 = await baseAxios.post("/CourseSection/UpdateSectionSchedule", csValues);

        if (response1.data.isSuccess === 1 && response2.data.isSuccess === 1) {
            ClassParticipantByScheduleId.refetch()
            notifications.show({
                title: "Thao tác thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
        }
        if (response1.data.isSuccess !== 1 || response2.data.isSuccess !== 1) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red"
            })
        }
    }

    return (
        <>
            <MyButtonModal
                modalSize={"90%"}
                variant='light'
                color='lime'
                label="Điểm danh"
                title="Điểm danh buổi học"
                disclosure={disc}>
                <MyFlexColumn >
                    <Grid>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Table
                                // mt={{ base: 0, lg: 16 }}
                                w={'100%'}
                                variant="vertical" layout="fixed">
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Th w={160}>Mã lớp</Table.Th>
                                        <Table.Td>{csScheduleValues.courseSection?.code!}</Table.Td>
                                    </Table.Tr>

                                    <Table.Tr>
                                        <Table.Th>Tên khóa học</Table.Th>
                                        <Table.Td>{csScheduleValues.courseSection?.courseTimeCluster?.course?.name}</Table.Td>
                                    </Table.Tr>

                                    <Table.Tr>
                                        <Table.Th>Lịch học</Table.Th>
                                        <Table.Td>{utils_date_getWeekDay(new Date(csScheduleValues.startDate!), 'vi')}, Ngày {utils_date_dateToDDMMYYYString(new Date(csScheduleValues.startDate!))}</Table.Td>
                                    </Table.Tr>

                                    <Table.Tr>
                                        <Table.Th>Tiết bắt đầu</Table.Th>
                                        <Table.Td>{csScheduleValues.classPeriodStart}</Table.Td>
                                    </Table.Tr>

                                    <Table.Tr>
                                        <Table.Th>Số tiết</Table.Th>
                                        <Table.Td>{(csScheduleValues.classPeriodEnd! - csScheduleValues.classPeriodStart!) + 1}</Table.Td>
                                    </Table.Tr>

                                    <Table.Tr>
                                        <Table.Th>Thời gian học</Table.Th>
                                        <Table.Td>{csScheduleValues.totalMinute!} phút</Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Textarea
                                label="Nhận xét của giảng viên"
                                minRows={5}
                                placeholder="Nhập nhận xét của giảng viên"
                                defaultValue={csValues.lecturerReview}
                                onBlur={(e) => setCsValues({ ...csValues, lecturerReview: e.currentTarget.value })}
                            />
                            <Group justify='flex-end' mt={24}>
                                <Button
                                    onClick={() => {
                                        handleCallAPICheckAttendance()
                                    }}
                                >Lưu</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>

                    <>
                        <MyDataTable
                            initialState={{
                                density: "xs",
                                pagination: { pageIndex: 0, pageSize: 10 },
                                columnPinning: {
                                    right: ["mrt-row-actions", "status", "lecturerReview"]
                                },
                                columnVisibility: {
                                    ['modifiedFullName']: false,
                                    ['modifiedWhen']: false
                                }
                            }}
                            columns={columns}
                            data={ClassParticipantByScheduleId.data || []}
                        />
                    </>
                </MyFlexColumn>
            </MyButtonModal>
        </>
    )
}



