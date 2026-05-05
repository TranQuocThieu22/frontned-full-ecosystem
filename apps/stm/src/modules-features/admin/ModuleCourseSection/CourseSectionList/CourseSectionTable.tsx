'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Center, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F8_6CourseSectionCreateModal from "./F8_6CourseSectionCreateModal";
import F8_6CourseSectionDeleteButton from "./F8_6CourseSectionDeleteButton";
import F8_6CourseSectionDeleteListButton from "./F8_6CourseSectionDeleteListButton";
import F8_6CourseSectionUpdateModal from "./F8_6CourseSectionUpdateModal";
import ManageStudentListButton from "./ManageStudentListButton";

export default function CourseSectionTable() {
    const AllCourseSections = useQuery<ICourseSection[]>({
        queryKey: [`AllCourseSection`],
        queryFn: async () => {
            const response = await baseAxios.post("/CourseSection/Get", {
                "courseTimeClusterIds": [],
                "courseSectionId": 0,
                "programId": 0,
                "status": 0,
                "type": 1,
                "courseIds": [],
                "examIds": [],
                "pageSize": 0,
                "pageNumber": 0
            });
            return response.data.data
        },
    })

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
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
            accessorKey: "courseTimeCluster.courseSectionNumberTotal",
        },
        {
            header: "Cụm thời gian",
            accessorKey: "courseTimeCluster.timeCluster.name",
        },
        {
            header: "Sĩ số",
            accessorKey: "quantityStudentActual",
            size: 120
        },
        {
            header: "Danh sách học viên",
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            <ManageStudentListButton
                                courseTimeClusterId={row.original.courseTimeClusterId!}
                                courseSectionId={row.original.id!} />
                        </Center>
                    </>
                )
            },
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

    if (AllCourseSections.isLoading) return "Đang tải dữ liệu...";
    if (AllCourseSections.isError) return "Đã xảy ra lỗi khi tải dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            exportAble
            columns={columns}
            data={AllCourseSections.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <F8_6CourseSectionCreateModal />
                    <F8_6CourseSectionDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ", fileData);
                            }
                        }
                        form={form_multiple}
                    >
                    </AQButtonCreateByImportFile>
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F8_6CourseSectionUpdateModal courseSectionValues={row.original} />
                        <F8_6CourseSectionDeleteButton courseSectionId={row.original.id} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

export interface ICourseSection {
    id?: number;
    code?: string;
    name?: string;
    quantityStudent?: number;
    quantityStudentActual?: number;
    courseTimeClusterId?: number | null;
    isScheduled?: boolean;
    status?: number;
    type?: number;
    examId?: number | null;
    certificateReviewBatchId?: number | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    courseTimeCluster?: {
        id?: number;
        courseId?: number;
        timeClusterId?: number;
        maxStudent?: number;
        courseSectionNumberTotal?: number;
        courseSectionNumber?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        timeCluster?: {
            id?: number;
            code?: string;
            name?: string;
            timeTypeId?: number;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            timeClusterDetails?: any[];
        };
        course?: {
            id?: number;
            code?: string;
            name?: string;
            status?: number;
            programId?: number;
            startDateRegistration?: Date;
            endDateRegistration?: Date;
            testDate?: Date;
            studyDate?: Date;
            endDate?: Date;
            price?: number;
            branchId?: number;
            skillCenterId?: number;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        };
    };
    course?: {
        id?: number;
        name?: string;
        program?: {
            totalClassPeriodNumber?: number;
        };
        studyDate?: Date;
    };
    timeCluster?: {
        id?: number;
        name?: string;
    };
    exam?: any | null;
    certificateReviewBatch?: any | null;
    roomPriority?: {
        id?: number;
        addressId?: number;
        courseSectionId?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        address?: {
            id?: number;
            code?: string;
            name?: string;
            capacity?: number;
            testCapacity?: number;
            block?: string;
            roomTypeId?: number;
            branchId?: number;
            location?: any | null;
            isInsiteSchool?: boolean | null;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        };
    }[];
    courseSectionLecturer?: {
        id?: number;
        userId?: number;
        courseId?: number | null;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        user?: {
            id?: number;
            userName?: string;
            code?: string;
            email?: string;
            fullName?: string;
            phoneNumber?: string;
            roleId?: number;
            roles?: {
                id?: number;
                code?: string;
                name?: string;
                aqModuleId?: number;
                isEnabled?: boolean;
            }[];
        };
    }[];
}
