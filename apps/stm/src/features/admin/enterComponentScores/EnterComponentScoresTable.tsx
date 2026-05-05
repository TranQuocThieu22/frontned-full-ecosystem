'use client'
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { utils_notification_show } from "@/utils/notification";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Center, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import EnterComponentScoresClassScoreButton from "./EnterComponentScoresClassScoreButton";


export default function EnterComponentScoresTable() {
    const courseQuery = useQuery<IKhoaHoc[]>({
        queryKey: [`EnterComponentScoresGetCourse`],
        queryFn: async () => {
            const response = await baseAxios.get("/course/getall");
            return response.data.data;
        },
    })

    const classQuery = useQuery<IClass[]>({
        queryKey: [`EnterComponentScoresClassQuery`],
        queryFn: async () => {
            const response = await baseAxios.post("/courseSection/get", {
                "courseTimeClusterId": 0,
                "courseSectionId": 0,
                "courseIds": [form.getValues().id],
                "pageSize": 0,
                "pageNumber": 0
            });
            return response.data.data;
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

    const columns = useMemo<CustomColumnDef<IClass>[]>(() => [
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
            Cell: ({ row }) => (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {row.original.courseSectionLecturer
                        ?.map((item) => item.user?.code)
                        .join("\n")}
                </div>
            ),
        },
        {
            header: "Tên giảng viên",
            accessorKey: "lecturerName",
            accessorFn(originalRow) {
                return originalRow.courseSectionLecturer
                    ?.map((item) => item.user?.fullName)
                    .join(", ") || "";
            },
            Cell: ({ row }) => (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {row.original.courseSectionLecturer
                        ?.map((item) => item.user?.fullName)
                        .join("\n")}
                </div>
            ),
        },
    ], []);

    useEffect(() => {
        if (!courseQuery.data) return;
        form.setFieldValue("id", courseQuery.data?.[0]?.id)
    }, [courseQuery.data])

    useEffect(() => {
        if (!form.values.id) return;
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
                        placeholder='Chọn khóa học'
                        label='Chọn Khóa học'
                        data={courseQuery.data?.map((item) => ({
                            value: item.id?.toString()!,
                            label: item.name ?? ""
                        }))}
                        {...form.getInputProps("id")}
                        value={form.getValues().id?.toString()}
                        onChange={(value: any): void => form.setFieldValue("id", parseInt(value?.toString()!))}
                    />
                </Group>
            }
            {courseQuery.data && classQuery.data &&
                <CustomDataTable
                    columns={columns}
                    data={classQuery.data!}
                    enableRowSelection={true}
                    renderRowActions={({ row }) => (
                        <Center>
                            <EnterComponentScoresClassScoreButton data={row.original} />
                        </Center>
                    )}
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
                            }}>
                                Tổng kết điểm
                            </Button>
                        </Group>
                    )}
                />
            }
        </>
    );
}

interface IClass {
    id?: number;
    code?: string;
    quantityStudentActual?: number;
    course: ICourse;
    courseTimeCluster: ICourseTimeCluster;
    courseSectionLecturer?: CourseSectionLecturer[];
}

interface CourseSectionLecturer {
    userId: number;
    courseId: number | null;
    user: any | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourse {
    status: number;
    programId: number;
    id: number;
    code: string;
    name: string;
    isEnabled: boolean;
}

interface ITimeCluster {
    timeTypeId: number;
    timeClusterDetails: any[];
    id: number;
    code: string;
    name: string;
    isEnabled: boolean;
}

interface ICourseTimeCluster {
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    timeCluster: ITimeCluster;
    id: number;
    code: string | null;
    name: string | null;
    isEnabled: boolean;
    course: ICourse;
}

interface IKhoaHoc {
    id?: number;
    code?: string;
    name?: string;
}
