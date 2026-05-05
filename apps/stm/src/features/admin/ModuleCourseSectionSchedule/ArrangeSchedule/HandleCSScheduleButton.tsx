"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { utils_date_dateToDDMMYYYString, utils_date_getWeekDay } from '@/utils/date';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Grid, Group, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTablePlus, IconTableShortcut } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { ICourseSection } from './CourseSectionTable';
import CreateCSSchedule from './CreateCSSchedule';
import DeleteCSSchedule from './DeleteCSSchedule';
import UpdateCSSchedule from './UpdateCSSchedule';
;

export const handleMappingMinutesForEachTimeTypeDetail = (classPeriodStart: number, classPeriodEnd: number, TimeTypeById: ITimeType) => {
    return TimeTypeById?.timeTypeDetails?.filter((ttd) => ttd.order! >= classPeriodStart! && ttd.order! <= (classPeriodEnd!)).reduce((acc, cur) => acc + cur.minuteNumber!, 0)
}

export default function HandleCSScheduleButton(
    { courseSectionValues }: { courseSectionValues: ICourseSection }
) {
    const disc = useDisclosure(false)

    const [lecturerInfoList, setLecturerInfoList] = useState<ILecturerInfo[]>([])
    const [subjectList, setSubjectList] = useState<ISubjectSelection[]>([])
    const [addressList, setAddressList] = useState<IAddressSelection[]>([])

    const queryClient = useQueryClient()

    const TimeClusterById = useQuery<ITimeCluster>({
        queryKey: [`F8_4AllTimeClusters${courseSectionValues.id}`],
        queryFn: async () => {
            const response = await baseAxios.get(`/TimeCluster/Get?cols=timeClusterDetails&Id=${courseSectionValues.courseTimeCluster?.timeClusterId}`);
            return response.data.data
        },
        refetchOnWindowFocus: false,
        enabled: disc[0]
    })

    const TimeTypeById = useQuery<ITimeType>({
        queryKey: [`F8_4AllTimeTypes`, courseSectionValues.id, TimeClusterById.data?.timeTypeId],
        queryFn: async () => {
            const response = await baseAxios.get(`/TimeType/Get?cols=timeTypeDetails&id=${TimeClusterById.data?.timeTypeId}`);
            if (response.data.data && TimeClusterById.data) {
                TimeClusterById.data.timeType = response.data.data
            }
            return response.data.data
        },
        enabled: TimeClusterById.isSuccess,
        refetchOnWindowFocus: false
    })

    const AllCourseSectionSchedules = useQuery<ICourseSectionSchedule[]>({
        queryKey: [`F8_4HandleCSScheduleButton${courseSectionValues.id}`],
        queryFn: async () => {
            const response = await baseAxios.get(`/CourseSection/ScheduleDetail?courseSectionId=${courseSectionValues.id}`)
            if (response.data.data.lecturerInfo) {
                setLecturerInfoList(response.data.data.lecturerInfo)
            }
            return response.data.data.courseSectionScheduleInfo
        },
        refetchOnWindowFocus: false,
        enabled: disc[0] && TimeTypeById.isSuccess
    })

    const AllSubjectsByProgramId = useQuery<ISubjectSelection[] | any>({
        queryKey: [`F8_4AllSubjectByCSId`],
        queryFn: async () => {
            const response = await baseAxios.get(`/Program/Get?cols=programSubjects&id=${courseSectionValues.courseTimeCluster?.course?.programId}`);
            if (response.data.data && response.data.data.subjects) {
                // const subjects = response.data.data.programSubjects.map((subject: IProgramSubject) => ({
                //     id: subject.subjectId,
                //     code: subject.code,
                //     name: subject.name,
                //     subjectId: subject.subjectId
                // }));
                const subjects = response.data.data.subjects.map((subject: any) => ({
                    id: subject.id,
                    code: subject.code,
                    name: subject.name,
                    classPeriodNumber: subject.classPeriodNumber,
                    hours: subject.hours,
                }));
                setSubjectList(subjects)
                return subjects;
            } else {
                return [];
            }
        },
        refetchOnWindowFocus: false,
        enabled: disc[0]
    })

    const AllAddresses = useQuery<IAddressSelection[]>({
        queryKey: [`F8_4AllAddressesByCSId`],
        queryFn: async () => {
            const response = await baseAxios.get(`/Address/GetAll?cols=branch,roomType`)
            if (response.data.data) {
                setAddressList(response.data.data)
            }
            return response.data.data
        },
        refetchOnWindowFocus: false,
        enabled: disc[0]
    })

    const columns = useMemo<MRT_ColumnDef<ICourseSectionSchedule>[]>(() => [
        {
            header: "Mã lớp",
            accessorFn(originalRow) {
                return courseSectionValues.code
            }
        },
        {
            header: "Sỉ số",
            accessorKey: "courseSection.quantityStudent",
        },
        {
            header: "Mã cụm thời gian",
            accessorFn(originalRow) {
                return originalRow.timeClusterName
            }
        },
        {
            header: "Môn học",
            accessorFn(originalRow) {
                return originalRow.subjectName;
            },
        },
        {
            header: "Giảng viên",
            accessorFn(originalRow) {
                return originalRow.courseSectionScheduleLecturer
                    ?.map((cssl) => {
                        const lecturer = lecturerInfoList.find(l => l.id === cssl.userId);
                        return lecturer?.lecturerName || 'Unknown';
                    })
                    .join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.courseSectionScheduleLecturer
                                ?.map((cssl) => {
                                    const lecturer = lecturerInfoList.find(l => l.id === cssl.userId);
                                    return lecturer?.lecturerName || 'Unknown';
                                })
                                .join('\n')}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Phòng",
            accessorKey: "address.name",
        },
        {
            header: "Sức chứa",
            accessorKey: "address.capacity",
        },
        {
            header: "Ngày",
            accessorFn(originalRow) {
                return originalRow.startDate === undefined ? '' : utils_date_dateToDDMMYYYString(new Date(originalRow.startDate))
            }
        },
        {
            header: "Thứ",
            accessorFn(originalRow) {
                return originalRow.startDate === undefined ? '' : utils_date_getWeekDay(new Date(originalRow.startDate), "vi")
            }
        },
        {
            header: "Tiết bắt đầu",
            accessorKey: "classPeriodStart",
        },
        {
            header: "Số tiết",
            accessorFn(originalRow) {
                return originalRow.classPeriodEnd! - originalRow.classPeriodStart! + 1
            },
        },
        {
            header: "Số phút",
            accessorFn(originalRow) {
                return handleMappingMinutesForEachTimeTypeDetail(originalRow.classPeriodStart!, originalRow.classPeriodEnd!, TimeTypeById.data!)
            }
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // },
    ],
        [
            TimeTypeById.data
        ]
    );

    let handleCallAPICourseSectionSchedule = async () => {
        let courseSectionIdList = [courseSectionValues.id];
        let res = await baseAxios.post(`/CourseSection/CourseSectionSchedule`,
            courseSectionIdList
        );
        if (res.data.success) {
            // AllCourseSectionsWithSchedule.refetch();
            notifications.show({
                title: "Thông báo",
                message: "Xếp lịch học thành công",
                color: "green"
            });
        }
        if (res.data.success !== 1) {
            // AllCourseSectionsWithSchedule.refetch();
            notifications.show({
                title: "Thông báo",
                message: "Xếp lịch học thất bại",
                color: "red"
            });
        }
    }

    return (
        <>
            <MyButtonModal
                modalSize={"100%"}
                variant='light'
                color='orange'
                label="Xử lý"
                title="Chi tiết lịch học"
                disclosure={disc}
            >
                <Grid mt={2} gutter={{ base: 4, lg: 4 }}>
                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Table
                            w={'100%'}
                            variant="vertical" layout="initial">
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Th w={160}>Mã lớp</Table.Th>
                                    <Table.Td>{courseSectionValues.code}</Table.Td>
                                </Table.Tr>

                                <Table.Tr>
                                    <Table.Th w={200}>Tên khóa học</Table.Th>
                                    <Table.Td>{courseSectionValues.courseTimeCluster?.course?.name}</Table.Td>
                                </Table.Tr>

                                <Table.Tr>
                                    <Table.Th w={200}>Ngày khai giảng</Table.Th>
                                    <Table.Td>{courseSectionValues.courseTimeCluster?.course?.studyDate === null ? '' : utils_date_dateToDDMMYYYString(new Date(courseSectionValues.courseTimeCluster?.course?.studyDate!))}</Table.Td>
                                </Table.Tr>

                                <Table.Tr>
                                    <Table.Th w={200}>Ngày kết thúc (dự kiến)</Table.Th>
                                    <Table.Td>{courseSectionValues.courseTimeCluster?.course?.endDate === null ? '' : utils_date_dateToDDMMYYYString(new Date(courseSectionValues.courseTimeCluster?.course?.endDate!))}</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Table
                            w={'100%'}
                            variant="vertical" layout="fixed">
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Th w={200}>Trung tâm</Table.Th>
                                    {/* <Table.Td>{courseSectionValues.course?.skillCenterId}</Table.Td> */}
                                    <Table.Td></Table.Td>
                                </Table.Tr>

                                <Table.Tr>
                                    <Table.Th w={200}>Chi nhánh</Table.Th>
                                    {/* <Table.Td>{courseSectionValues.course?.branchId}</Table.Td> */}
                                    <Table.Td></Table.Td>
                                </Table.Tr>

                                <Table.Tr>
                                    <Table.Th w={200}>Chương trình</Table.Th>
                                    <Table.Td>{courseSectionValues.courseTimeCluster?.course?.program?.name}</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Grid.Col>
                </Grid>
                <MyFlexColumn >
                    <>
                        <MyDataTable
                            columns={columns}
                            data={AllCourseSectionSchedules.data || []}
                            renderRowActions={({ row }) => {
                                return (
                                    <MyCenterFull>
                                        <UpdateCSSchedule
                                            courseSectionId={courseSectionValues.id!}
                                            csScheduleValues={row.original}
                                            lecturerInfoList={lecturerInfoList}
                                            subjectList={subjectList}
                                            adressList={addressList}
                                            timeCluster={TimeClusterById.data || {}} />
                                        <DeleteCSSchedule csScheduleValues={row.original!} />
                                    </MyCenterFull>
                                );
                            }}
                            renderTopToolbarCustomActions={() => (
                                <Group>
                                    <Button
                                        onClick={() => {
                                            handleCallAPICourseSectionSchedule()
                                        }}
                                        color="cyan" leftSection={<IconTableShortcut />}
                                    >Xếp lịch học
                                    </Button>
                                    <CreateCSSchedule
                                        courseSectionId={courseSectionValues.id!}
                                        lecturerInfoList={lecturerInfoList}
                                        subjectList={subjectList}
                                        adressList={addressList}
                                        timeCluster={TimeClusterById.data || {}} />
                                    <Button color="teal" leftSection={<IconTablePlus />}>Import</Button>
                                </Group>
                            )}
                            layoutMode='grid'
                            initialState={{
                                density: "xs",
                                pagination: { pageIndex: 0, pageSize: 10 },
                                columnPinning: { right: ["mrt-row-actions"] },
                                columnVisibility: {
                                    nguoiCapNhat: false,
                                    ngayCapNhat: false
                                }
                            }}
                        />
                    </>
                </MyFlexColumn>
            </MyButtonModal>
        </>
    )
}

export interface ITimeType {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    classPeriodMorning?: number;
    classPeriodAfternoon?: number;
    classPeriodEvening?: number;
    timeTypeDetails?: ITimeTypeDetail[];
}
interface ITimeTypeDetail {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    timeTypeId?: number;
    order?: number;
    startHour?: string;
    minuteNumber?: number;
}
export interface ITimeCluster {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    timeTypeId?: number;
    timeType?: ITimeType | null;
    maxStudent?: number;
    timeClusterDetails?: ITimeClusterDetail[];
}
interface ITimeClusterDetail {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    timeClusterId?: number;
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
    classPeriodStart?: number;
    classPeriodEnd?: number;
}
export interface ILecturerInfo {
    id?: number;
    lecturerName?: string;
}
export interface ICourseSectionSchedule {
    subjectName?: string | null;
    courseSectionId?: number;
    addressId?: number;
    classPeriodStart?: number;
    classPeriodEnd?: number;
    startDate?: string;
    endDate?: string;
    timeClusterCode?: string;
    timeClusterName?: string;
    courseSection?: {
        courseId?: number;
        timeClusterId?: number;
        quantityStudent?: number;
        quantityStudentActual?: number;
        courseTimeClusterId?: number;
        isScheduled?: boolean;
        course?: any | null;
        timeCluster?: any | null;
        roomPriority?: any[] | null;
        courseSectionLecturer?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    address?: {
        location?: any | null;
        isInsiteSchool?: boolean | null;
        capacity?: number;
        testCapacity?: number;
        block?: string;
        roomTypeId?: number;
        branchId?: number;
        roomType?: any | null;
        branch?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    courseSectionScheduleLecturer?: {
        userId?: number;
        courseSectionScheduleId?: number;
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string | null;
        isEnabled?: boolean;
    }[];
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}
interface IScheduleDetail {
    lecturerInfo?: ILecturerInfo[];
    courseSectionScheduleInfo?: ICourseSectionSchedule[];
}
interface IProgram {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    skillCenterId?: number;
    programTypeId?: number;
    totalClassPeriodNumber?: number;
    totalHours?: number;
    isTesting?: boolean;
    certificateId?: number;
    isCancel?: boolean;
    note?: string;
    price?: number;
    certificate?: any | null;
    skillCenter?: any | null;
    subjects?: any | null;
    programType?: any | null;
    programSubjects?: IProgramSubject[];
}
interface IProgramSubject {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    programId?: number;
    subjectId?: number;
    subject?: any | null;
}
export interface ISubjectSelection {
    id?: number;
    code?: string;
    name?: string;
    subjectId?: number;
}
export interface IAddressSelection {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    location?: any | null;
    isInsiteSchool?: boolean | null;
    capacity?: number;
    testCapacity?: number;
    block?: string;
    roomTypeId?: number;
    branchId?: number;
    roomType?: {
        note?: string | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    } | null;
    branch?: {
        location?: string;
        note?: string;
        skillCenterId?: number | null;
        skillCenter?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    } | null;
}

