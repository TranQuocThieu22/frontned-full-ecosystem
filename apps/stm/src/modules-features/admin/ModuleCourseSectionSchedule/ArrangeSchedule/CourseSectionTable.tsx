'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Center, Checkbox, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableShortcut } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import HandleCSScheduleButton from "./HandleCSScheduleButton";
import ViewStudentListButton from "./ViewStudentListButton";

export interface ICourseSection {
    courseId?: number;
    timeClusterId?: number;
    quantityStudent?: number;
    quantityStudentActual?: number;
    isScheduled?: boolean;
    courseTimeCluster?: {
        courseId?: number;
        timeClusterId?: number;
        maxStudent?: number;
        courseSectionNumberTotal?: number;
        courseSectionNumber?: number;
        timeCluster?: {
            timeTypeId?: number;
            timeClusterDetails?: any[];
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            modifiedWhen?: string;
            modifiedBy?: number;
            modifiedFullName?: string;
        };
        course?: {
            status?: number;
            programId?: number;
            startDateRegistration?: Date | null;
            endDateRegistration?: Date | null;
            testDate?: Date | null;
            studyDate?: Date | null;
            endDate?: Date | null;
            price?: number;
            branchId?: number;
            skillCenterId?: number;
            program?: {
                skillCenterId?: number;
                programTypeId?: number;
                totalClassPeriodNumber?: number;
                totalHours?: number;
                isTesting?: boolean;
                certificateId?: number;
                isCancel?: boolean;
                note?: string;
                price?: number;
                scoreSystem?: number;
                scoreFormula?: number;
                scorePass?: number;
                testScoreSystem?: number;
                testScoreFormula?: number;
                testScorePass?: number;
                certificate?: any | null;
                skillCenter?: any | null;
                subjects?: any | null;
                programType?: any | null;
                programSubjects?: any[];
                scoreConfigs?: any | null;
                id?: number;
                code?: string;
                name?: string;
                concurrencyStamp?: string;
                isEnabled?: boolean;
                modifiedWhen?: string;
                modifiedBy?: number;
                modifiedFullName?: string;
            };
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            modifiedWhen?: string;
            modifiedBy?: number;
            modifiedFullName?: string;
        };
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        modifiedFullName?: string;
    };
    roomPriority?: {
        addressId?: number;
        courseSectionId?: number;
        address?: {
            location?: any | null;
            isInsiteSchool?: any | null;
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
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    }[];
    courseSectionLecturer?: {
        userId?: number;
        courseId?: any | null;
        user?: {
            id?: number;
            isBlocked?: boolean;
            roleId?: number;
            userName?: string;
            code?: string;
            email?: string;
            phoneNumber?: string;
            address?: string;
            avatarPath?: string;
            fullName?: string;
            facultyId?: any | null;
            facultyName?: any | null;
            classId?: any | null;
            majorsId?: any | null;
            workingUnitId?: any | null;
            workingUnitName?: any | null;
            gender?: number;
            dateOfBirth?: Date;
            educationLevel?: number;
            modifiedBy?: number;
            modifiedWhen?: string;
            roles?: {
                aqModuleId?: number;
                code?: string;
                name?: string;
                id?: number;
                createdWhen?: any | null;
                createdBy?: any | null;
                modifiedWhen?: any | null;
                modifiedBy?: any | null;
                concurrencyStamp?: any | null;
                isEnabled?: boolean;
            }[];
        };
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    }[];
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export default function CourseSectionTable() {
    const SelectedCourseSection = useState<ICourseSection[]>()
    const AllCourseSectionsWithSchedule = useQuery<ICourseSection[]>({
        queryKey: [`F8_4AllCourseSection`],
        queryFn: async () => {
            const response = await baseAxios.post("/CourseSection/Get",
                {
                    "courseTimeClusterIds": [],
                    "courseSectionId": 0,
                    "programId": 0,
                    "status": 0,
                    "type": 1,
                    "courseIds": [],
                    "examIds": [],
                    "pageSize": 0,
                    "pageNumber": 0
                }
            );
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const columns = useMemo<MRT_ColumnDef<ICourseSection>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "code",
        },
        {
            header: "Tên khóa học",
            accessorKey: "courseTimeCluster.course.name",
        },
        {
            header: "Ngày khai giảng",
            accessorFn(originalRow: any) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.courseTimeCluster.course?.studyDate!));
            },

        },
        {
            header: "Tổng số tiết",
            accessorKey: "courseTimeCluster.course.program.totalClassPeriodNumber",
            size: 120
        },
        {
            header: "Cụm thời gian",
            accessorKey: "courseTimeCluster.timeCluster.name",
            size: 150
        },
        {
            header: "Sỉ số",
            accessorKey: "quantityStudentActual",
            size: 120
        },
        {
            header: "Danh sách học viên",
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            <ViewStudentListButton courseSectionId={row.original.id!} />
                        </Center>
                    </>
                )
            },
            size: 130
        },
        {
            header: "Giảng viên",

            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.courseSectionLecturer?.map((csl) => csl.user?.fullName).join("\n")}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Phòng ưu tiên",
            accessorFn(originalRow) {
                return originalRow.roomPriority?.map((room, index) => {
                    return room.address?.name;
                }).join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.roomPriority?.map((room) => room.address?.name).join("\n")}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Lịch học",
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            <HandleCSScheduleButton courseSectionValues={row.original} />
                        </Center>
                    </>
                )
            },
            size: 120
        },
        {
            header: "Đã xếp",
            accessorKey: "isScheduled",
            accessorFn(originalRow) {
                return originalRow.isScheduled === true ? "Đã xếp" : "Chưa xếp";
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            <Checkbox color="green" checked={row.original.isScheduled} readOnly />
                        </Center>
                    </>
                )
            }
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat"
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // }
    ], []);

    let handleCallAPICourseSectionSchedule = async () => {
        const courseSectionIds = SelectedCourseSection[0]!.map(section => section.id);
        let res = await baseAxios.post(`/CourseSection/CourseSectionSchedule`,
            courseSectionIds
        );
        if (res.data.isSuccess) {
            AllCourseSectionsWithSchedule.refetch();
            notifications.show({
                title: "Thông báo",
                message: "Xếp lịch học thành công",
                color: "green"
            });
        }
        if (res.data.isSuccess !== 1) {
            AllCourseSectionsWithSchedule.refetch();
            notifications.show({
                title: "Thông báo",
                message: "Xếp lịch học thất bại",
                color: "red"
            });
        }
    }

    return (
        <MyDataTable
            exportAble
            columns={columns}
            data={AllCourseSectionsWithSchedule.data! || []}
            setSelectedRow={SelectedCourseSection[1]}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <Button
                                disabled={SelectedCourseSection[0]?.length === 0}
                                onClick={() => {
                                    handleCallAPICourseSectionSchedule()
                                }}
                                color="cyan" leftSection={<IconTableShortcut />}
                            >Xếp lịch học</Button>
                        </Group>
                    </>
                )
            }}
        />
    );
}
