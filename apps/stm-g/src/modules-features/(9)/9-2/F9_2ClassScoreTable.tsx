'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { utils_notification_show } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import F9_2EnterClassScoreButton from "./F9_2EnterClassScoreButton";



export default function F9_2ClassScoreTable() {
    const courseQuery = useQuery<IKhoaHoc[]>({
        queryKey: [`F9_2GetCourse`],
        queryFn: async () => {
            const response = await baseAxios.get("/course/getall");
            const result = response.data.data;
            return result
        },
    })
    const classQuery = useQuery<I[]>({
        queryKey: [`F9_2classQuery`],
        queryFn: async () => {
            const response = await baseAxios.post("/courseSection/get", {
                "courseTimeClusterId": 0,
                "courseSectionId": 0,
                "courseIds": [form.getValues().id],
                "pageSize": 0,
                "pageNumber": 0
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
            accessorKey: "quantityStudentActual",
            size: 120
        },
        {
            header: "Mã giảng viên",
            accessorKey: "lecturerCode",
            accessorFn(originalRow) {
                return originalRow.courseSectionLecturer
                    ?.map((item) => item.user?.code)
                    .join(", ") || "";
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.courseSectionLecturer
                                ?.map((item) => item.user?.code)
                                .join("\n")}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Tên giảng viên",
            accessorKey: "lecturerName",
            accessorFn(originalRow) {
                return originalRow.courseSectionLecturer
                    ?.map((item) => item.user?.fullName)
                    .join(", ") || "";
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.courseSectionLecturer
                                ?.map((item) => item.user?.fullName)
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
            {courseQuery.data &&
                <Group grow mb={5}>
                    <Select
                        // clearable
                        placeholder='Chọn khóa học'
                        label='Chọn Khóa học'
                        data={courseQuery.data?.map((item: IKhoaHoc) => ({
                            value: item.id?.toString()!,
                            label: item.name! == null ? "" : item.name!
                        }))}
                        {...form.getInputProps("id")}
                        value={form.getValues().id?.toString()}
                        // defaultValue={courseQuery.data?.[0]?.id?.toString()}
                        onChange={(value: any): void => form.setFieldValue("id", parseInt(value?.toString()!))}
                    />
                </Group>
            }
            {courseQuery.data && classQuery.data &&
                <MyDataTable
                    columns={columns}
                    data={classQuery.data!}
                    enableRowSelection={true}


                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F9_2EnterClassScoreButton data={row.original} />
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
// interface I {
//     id?: number;
//     code?: string;
//     classSize?: number;
//     lecturerCode?: string;
//     lecturerName?: string;
//     classStatus?: string;
//     totalEnteredScore?: number;
//     totalRequiredScore?: number;
//     nguoiCapNhat?: string;
//     ngayCapNhat?: Date | undefined;
// }

// const mockData: I[] = [
//     {
//         id: 1,
//         code: "LTB24101-01",
//         classSize: 30,
//         lecturerCode: "GV001",
//         lecturerName: "Nguyễn Văn A",
//         classStatus: "Active",
//         totalEnteredScore: 2,
//         totalRequiredScore: 3,
//         nguoiCapNhat: "Admin",
//         ngayCapNhat: new Date("2023-01-01")
//     },
//     {
//         id: 2,
//         code: "LTB24101-02",
//         classSize: 25,
//         lecturerCode: "GV002",
//         lecturerName: "Trần Thị B",
//         classStatus: "Active",
//         totalEnteredScore: 2,
//         totalRequiredScore: 3,
//         nguoiCapNhat: "Admin",
//         ngayCapNhat: new Date("2023-02-01")
//     },
//     {
//         id: 3,
//         code: "LTB24101-03",
//         classSize: 20,
//         lecturerCode: "GV003",
//         lecturerName: "Lê Văn C",
//         classStatus: "Inactive",
//         totalEnteredScore: 2,
//         totalRequiredScore: 3,
//         nguoiCapNhat: "Admin",
//         ngayCapNhat: new Date("2023-03-01")
//     },
//     {
//         id: 4,
//         code: "LTB24101-04",
//         classSize: 35,
//         lecturerCode: "GV004",
//         lecturerName: "Phạm Thị D",
//         classStatus: "Active",
//         totalEnteredScore: 2,
//         totalRequiredScore: 3,
//         nguoiCapNhat: "Admin",
//         ngayCapNhat: new Date("2023-04-01")
//     }
// ]