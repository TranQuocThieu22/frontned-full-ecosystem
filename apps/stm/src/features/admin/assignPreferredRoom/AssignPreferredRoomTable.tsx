'use client'
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import AssignPreferredRoomChooseRoom from "./AssignPreferredRoomChooseRoom";
import AssignPreferredRoomSaveButton from "./AssignPreferredRoomSaveButton";
import AssignPreferredRoomStudentTable from "./AssignPreferredRoomStudentTable";
import { CourseTimeClusters } from "@/shared/interfaces/courseTimeClusters";

interface IAddress {
    id?: number;
    code?: string;
    name?: string;
}

export interface I8_3roomPriority {
    id?: number;
    code?: string;
    name?: string;
    addressId?: number;
    address?: IAddress;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    status?: "Deleted" | "New" | "Updated";
}

export interface I8_3DanhSachLop {
    id?: number;
    code?: string;
    name?: string;
    courseTimeCluster?: CourseTimeClusters;
    quantityStudent?: number;
    quantityStudentActual?: number;
    roomPriority?: I8_3roomPriority[];
}

export default function AssignPreferredRoomTable() {
    const query = useQuery<I8_3DanhSachLop[]>({
        queryKey: ["AssignPreferredRoomTable"],
        queryFn: async () => {
            const res = await baseAxios.post("/CourseSection/get", {
                courseTimeClusterId: 0,
                courseSectionId: 0,
                courseIds: [],
                pageSize: 0,
                pageNumber: 0,
            });
            return res.data.data;
        },
        refetchOnWindowFocus: false,
    });

    const [selectedRows, setSelectedRows] = useState<I8_3DanhSachLop[]>([]);

    const columns = useMemo<CustomColumnDef<I8_3DanhSachLop>[]>(
        () => [
            { header: "Mã lớp", accessorKey: "code" },
            { header: "Tên khóa học", accessorKey: "name" },
            {
                header: "Ngày khai giảng",
                id: "studyDate",
                accessorFn: (row) =>
                    row.courseTimeCluster?.course?.studyDate
                        ? new Date(row.courseTimeCluster.course.studyDate).toLocaleDateString("vi-VN")
                        : "",
            },
            {
                header: "Tổng số tiết",
                accessorKey: "courseTimeCluster.courseSectionNumberTotal",
            },
            {
                header: "Cụm thời gian",
                accessorKey: "courseTimeCluster.timeCluster.name",
            },
            { header: "Sĩ số", accessorKey: "quantityStudentActual" },
            {
                header: "Danh sách học viên",
                id: "studentList",
                accessorFn: (row) => <AssignPreferredRoomStudentTable id={row.id!} />,
            },
            {
                header: "Phòng ưu tiên",
                accessorKey: "roomPriority",
                size: 250,
                accessorFn: (row) => (
                    <AssignPreferredRoomChooseRoom id={row.id!} danhSachPhong={row.roomPriority!} />
                ),
            },
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <CustomDataTable
            columns={columns}
            data={query.data!}
            setSelectedRow={setSelectedRows}
            enableRowSelection
            initialState={{ columnPinning: { right: ["roomPriority"] } }}
            renderTopToolbarCustomActions={({ exportButton }) => (
                <>
                    {exportButton}
                    <AssignPreferredRoomSaveButton />
                </>
            )}
        />
    );
}
