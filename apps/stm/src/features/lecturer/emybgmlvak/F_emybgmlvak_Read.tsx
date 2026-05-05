'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { utils_notification_show } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import F_emybgmlvak_EnterClassScoreButton from "./F_emybgmlvak_EnterClassScoreButton";


export interface F_student {
    id: number;
    name: string;
    gender: string;
    dob: string;
    status: string;
    inclass: number;
    midterm: number;
    final: number;
    total: number;
    pass: null;
}

export interface F_class {
    id: number;
    code: string;
    size: number;
    instructorCode: string;
    instructor: string;
    status: string;
    gradeProgress: string;
    students: F_student[];
}

const classes: F_class[] = [
    {
        id: 1,
        code: "LTB24101-01",
        size: 20,
        instructorCode: "GV001",
        instructor: "Nguyễn Văn A",
        status: "Đang diễn ra",
        gradeProgress: "1/3",
        students: [
            { id: 1, name: "Nguyễn Văn A", gender: "Nam", dob: "01/01/1990", status: "Đang học", inclass: 7, midterm: 8.5, final: 8, total: 8.1, pass: null },
            { id: 2, name: "Nguyễn Văn B", gender: "Nam", dob: "01/01/1990", status: "Đang học", inclass: 4, midterm: 4, final: 5, total: 4, pass: null },
            { id: 3, name: "Nguyễn Văn C", gender: "Nam", dob: "01/01/1990", status: "Đang học", inclass: 7, midterm: 8.5, final: 8, total: 8.1, pass: null },
            { id: 4, name: "Nguyễn Văn D", gender: "Nam", dob: "01/01/1990", status: "Đang học", inclass: 7, midterm: 8.5, final: 8, total: 8.1, pass: null },
            { id: 5, name: "Nguyễn Văn E", gender: "Nam", dob: "01/01/1990", status: "Đang học", inclass: 7, midterm: 8.5, final: 8, total: 8.1, pass: null },
            { id: 6, name: "Nguyễn Văn F", gender: "Nam", dob: "01/01/1990", status: "Đang học", inclass: 7, midterm: 8.5, final: 8, total: 8.1, pass: null },
            { id: 7, name: "Nguyễn Văn G", gender: "Nam", dob: "01/01/1990", status: "Đang học", inclass: 7, midterm: 8.5, final: 8, total: 8.1, pass: null }
        ]
    }
];
export default function F_emybgmlvak_Read(
) {
    const courseQuery = useQuery<IKhoaHoc[]>({
        queryKey: [`F_emybgmlvak_Read`],
        queryFn: async () => {
            const response = await baseAxios.get("/course/getall");
            const result = response.data.data;
            return result
        },
    })
    const currentUser = useAuthenticateStore()
    //TODO currentUser id 1077
    // const tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDc3IiwiY19oYXNoIjoiYzk3MjgxNDYxZTYxNjk2MGRiYzcxNjJmZGRiMTUxZWZjMzVkMmIyODg1OGQ2YzNhNTUxNzI1NWZkOTEzY2U0YiIsImp0aSI6IjRmNjE5OGUyLTlkMTAtNDM3Ni1iZmVjLTIxMTJlYzk1MTA4NiIsImlhdCI6MTc0NDc3MjkwNiwibmJmIjoxNzQ0NzcyOTA1LCJleHAiOjE3NTI1NDg5MDUsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.0wuxvOchf8nGu_JELwGbITW92C7YZfhc-Gm3VvQKz68"
    // const currentUser = useQuery<any>({
    //     queryKey: [`currentUser`],
    //     queryFn: async () => {
    //         const response = await baseAxios.get("/Account/GetCurrentUser", {
    //             headers: {
    //                 Authorization: `Bearer ${tempToken}`,
    //             },
    //         });
    //         const result = response.data.data;
    //         return result
    //     },
    // })


    const classQuery = useQuery<I[]>({
        queryKey: [`F9_2classQuery`],
        queryFn: async () => {
            // TODO dữ liệu đang cứng 
            const response = await baseAxios.post("/courseSection/get", {
                "courseTimeClusterId": 0,
                "courseSectionId": 0,
                "courseIds": [form.getValues().id],
                "pageSize": 0,
                "pageNumber": 0,
                "lecturerId": currentUser.state.userId
            });
            const result = response.data.data;

            return result
        },
        refetchOnWindowFocus: false
    });

    const form = useForm<IKhoaHoc>({
        initialValues: {
            id: courseQuery.data?.[0]?.id,
            code: "",
            name: "",
        },
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "code",
        },
        {
            header: "Sĩ số",
            accessorKey: "quantityStudent",
            size: 120
        },
        {
            header: "Mã giảng viên",
            accessorKey: "lecturerCode",
            accessorFn(originalRow) {
                if (!originalRow.courseSectionLecturer || originalRow.courseSectionLecturer.length === 0) {
                    return "";
                }
                return originalRow.courseSectionLecturer
                    .map((item) => item.user && item.user.code ? item.user.code : "")
                    .filter(code => code !== "")
                    .join(", ");
            },
        },
        //     Cell: ({ row }) => {
        //         return row.original.courseSectionLecturer && row.original.courseSectionLecturer.length > 0 ? (
        //                 {row.original.courseSectionLecturer
        //                     ?.map((item) => item.user && item.user.code ? item.user.code : "")
        //                     .filter(code => code !== "")
        //                     .join("\n")}
        //                     .join("\n")}
        //             </div>
        //         ) : null
        //     },
        // },
        {
            header: "Tên giảng viên",
            accessorKey: "lecturerName",
            accessorFn(originalRow) {
                return originalRow.courseSectionLecturer
                    ?.map((item) => item.user && item.user.fullName ? item.user.fullName : "")
                    .filter(name => name !== "")
                    .join(", ") || "";
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.courseSectionLecturer
                                ?.map((item) => item.user && item.user.fullName ? item.user.fullName : "")
                                .filter(name => name !== "")
                                .join("\n")}
                        </div>
                    </>
                )
            },
        },
    ], []);

    useEffect(() => {
        if (!courseQuery.data) {
            return
        }
        form.setFieldValue("id", courseQuery.data?.[0]?.id)
    }, [courseQuery.data])
    useEffect(() => {
        if (!form.values.id) {
            return
        }
        classQuery.refetch()
    }, [form.values.id])
    if (courseQuery.isLoading) return "Đang tải dữ liệu...";
    if (courseQuery.isError) return "Không có dữ liệu...";
    if (classQuery.isLoading) return "Đang tải dữ liệu...";
    if (classQuery.isError) return "Không có dữ liệu...";

    return (
        <>
            {courseQuery.data && classQuery.data &&
                <MyDataTable
                    columns={columns}
                    data={classQuery.data!}
                    enableRowSelection={true}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F_emybgmlvak_EnterClassScoreButton data={row.original} />
                            </MyCenterFull>
                        );
                    }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <Button onClick={async () => {
                                const selectedRowData = table.getSelectedRowModel().flatRows.map((row) => row.original)
                                const courseSectionIds = selectedRowData.map((item) => item.id).join(",");
                                const PARAM = `?CourseSectionIds= ${courseSectionIds}`
                                const result = await baseAxios.post("/Course/SummaryScoreComponent" + PARAM)
                                if (!result.data.data || result.data.data.length === 0) {
                                    return utils_notification_show({ crudType: "error", message: "Có lỗi" });
                                }
                                return utils_notification_show({ crudType: "update", message: "Dữ liệu được lưu thành công!" })
                            }}>Tổng kết điểm</Button>
                        </Group >
                    )
                    }
                />

            }
        </>
    );
}

interface I {
    id?: number;
    code?: string;
    courseName?: string;
    startDateRegistration?: Date | undefined;
    totalClassPeriodNumber?: number;
    totalHours?: number;
    timeClusterDetails?: ItimeClusterDetails[];
    quantityStudent?: number;
    dsHocVien?: number;
    status?: number
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
    course: ICourse
    courseTimeCluster: ICourseTimeCluster
    courseSectionLecturer?: CourseSectionLecturer[]
}

interface ICourse {
    status: number;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string | null;
    price: number;
    branchId: number;
    skillCenterId: number;
    skillCenter: any | null;
    branch: any | null;
    program: any | null;
    courseTimeClusters: ICourseTimeCluster[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface ItimeClusterDetails {
    id?: number,
    code?: string,
    name?: string,
    timeClusterId?: number,
    dayOfWeek?: number,
    startTime?: Date,
    endTime?: Date,
    classPeriodStart?: number,
    classPeriodEnd?: number,

}
interface ICourseTimeCluster {
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    timeCluster: ITimeCluster;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
    course: ICourse
}
interface ITimeCluster {
    timeTypeId: number;
    timeClusterDetails: any[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface CourseSectionLecturer {
    userId: number;
    courseId: number | null;
    user: any | null; // Consider using a specific type instead of 'any' if possible
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}


interface IKhoaHoc {
    id?: number;
    code?: string;
    name?: string;
}