'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ChoosePreferredRoom from "./ChoosePreferredRoom";
import StudentTable from "./StudentTable";
import AssignPreferredRoomSaveButton from "./AssignPreferredRoomSaveButton";
import { ICourseTimeClusters } from "@/interfaces/courseTimeClusters";

interface Iprogram {
    totalClassPeriodNumber?: number //tổng số tiết
}
interface Icourse {
    startDateRegistration?: Date,
    program?: Iprogram
}
interface ItimeCluster {
    name?: string
}
interface Iaddress {
    id?: number,
    code?: string,
    name?: string
}
export interface I8_3roomPriority {
    id?: number,
    code?: string,
    name?: string,
    addressId?: number,
    address?: Iaddress,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    status?: "Deleted" | 'New' | "Updated"
}
export interface I8_3DanhSachLop {
    id?: number;
    code?: string;
    name?: string;
    course?: Icourse
    timeCluster?: ItimeCluster
    quantityStudent?: number;
    courseTimeCluster?: ICourseTimeClusters
    roomPriority?: I8_3roomPriority[]
    ngayCapNhat?: Date;  // Thêm trường này
    nguoiCapNhat?: string; // Thêm trường này
}

export default function AssignPreferredRoomTable() {
    const query = useQuery<I8_3DanhSachLop[]>({
        queryKey: [`AssignPreferredRoomTable`],
        queryFn: async () => {
            const res = await baseAxios.post("/CourseSection/get", {
                "courseTimeClusterId": 0,
                "courseSectionId": 0,
                "courseIds": [

                ],
                "pageSize": 0,
                "pageNumber": 0
            })
            return res.data.data
        },
        refetchOnWindowFocus: false
    })
    const rowSelectionState = useState<I8_3DanhSachLop[]>()
    const columns = useMemo<MRT_ColumnDef<I8_3DanhSachLop>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "code",
        },
        {
            header: "Tên khóa học",
            accessorKey: "name"
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "course.startDateRegistration",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.courseTimeCluster?.course?.studyDate!))
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
        },
        {
            header: "Danh sách học viên",
            accessorFn: (row) => <StudentTable id={row.id!} />
        },
        {
            header: "Phòng ưu tiên",
            minSize: 250,
            accessorKey: "roomPriority",
            accessorFn: (row) => <ChoosePreferredRoom id={row.id!} danhSachPhong={row.roomPriority!} />,
        },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat!))
        // },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat",
        // }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            initialState={{ columnPinning: { right: ['roomPriority'] } }}
            columns={columns}
            data={query.data!}
            exportAble
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => <AssignPreferredRoomSaveButton />}
            setSelectedRow={rowSelectionState[1]}
        />
    )
}
