'use client'

import { service_dayOffRequest } from "@/api/services/service_dayOffRequest";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { IDayOffRequest } from "@/interfacesForViewModels/DayOffRequest/IDayOffRequest";
import { MyButtonViewPDF, MyCenterFull } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ScheduleDetail from "./ScheduleDetail";
import ScheduleDetailAction from "./ScheduleDetailAction";


export interface F_lecturer {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    dayAbsence: number;
    approveAbsence: number;
    detail: string;
    fileProve: F_dayAbsence[];
    reason: string;
    plan: string;
    status: string;
}

export interface F_dayAbsence {
    id: number;
    lecturerName: string;
    date: string;
    classStartDate: string;
    classPeriod: number;
    room: string;
    classID: string;
    classSize: string;
    checked?: boolean;
}

const lecturers: F_lecturer[] = [
    {
        id: 1,
        name: "Tô Ngọc Lâm",
        startDate: "01/03/2025",
        endDate: "10/03/2025",
        dayAbsence: 12,
        approveAbsence: 10,
        detail: "",
        fileProve: [
            { id: 1, lecturerName: "", date: "03/03/2025", classStartDate: "11", classPeriod: 2, room: "P032", classID: "LTW2401", classSize: "25", checked: true },
            { id: 2, lecturerName: "", date: "05/03/2025", classStartDate: "11", classPeriod: 2, room: "P032", classID: "LTW2401", classSize: "25", checked: false },
            { id: 3, lecturerName: "", date: "07/03/2025", classStartDate: "11", classPeriod: 2, room: "P032", classID: "LTW2401", classSize: "25", checked: true },
            { id: 4, lecturerName: "", date: "09/03/2025", classStartDate: "11", classPeriod: 2, room: "P032", classID: "LTW2401", classSize: "25", checked: false },
            { id: 5, lecturerName: "", date: "12/03/2025", classStartDate: "11", classPeriod: 2, room: "P032", classID: "LTW2401", classSize: "25", checked: true },
            { id: 6, lecturerName: "", date: "14/03/2025", classStartDate: "11", classPeriod: 2, room: "P032", classID: "LTW2401", classSize: "25", checked: false },
        ],
        reason: "Bệnh",
        plan: "Hết bệnh thì dạy bù sau",
        status: "Đang chờ xử lí",
    },
];


export default function F_jdtonxkhjl_Read(
) {
    const stateArr = ["Chờ xử lý", "Đã duyệt", "Đã hủy"];

    // const dayOffRequestQuery = useQuery<IDayOffRequest[]>({
    //     queryKey: ["F_jdtonxkhjl_Read"],
    //     queryFn: async () => {
    //         const response = await baseAxios.get("/DayOffRequest/GetAll?cols=User");
    //         return response.data.data;
    //     },
    // });
    const dayOffRequestQuery = useMyReactQuery({
        queryKey: ["F_jdtonxkhjl_Read"],
        axiosFn: async () => service_dayOffRequest.getAll({ params: "?cols=User" }),
        // enabled: false,
    })
    const columns = useMemo<MRT_ColumnDef<IDayOffRequest>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "maGiangVien",
                accessorFn: (row) => {
                    return row.user?.code;
                },
            },
            {
                header: "Họ tên",
                accessorKey: "hoTen",
                accessorFn: (row) => {
                    return row.user?.fullName;
                },
            },
            {
                header: "Từ ngày",
                accessorKey: "startDate",
                accessorFn: (originalRow) =>
                    originalRow.fromDate ? utils_date_dateToDDMMYYYString(new Date(originalRow.fromDate)) : "",
            },
            {
                header: "Đến ngày",
                accessorKey: "endDate",
                accessorFn: (originalRow) =>
                    originalRow.toDate ? utils_date_dateToDDMMYYYString(new Date(originalRow.toDate)) : "",
            },
            {
                header: "Số buổi nghỉ",
                accessorKey: "totalSection",
                // accessorFn: (originalRow) => {
                //     const { fromDate, toDate } = originalRow;
                //     if (!fromDate || !toDate) return "";

                //     const start = new Date(fromDate);
                //     const end = new Date(toDate);

                //     // Reset time to midnight to ensure correct difference
                //     start.setHours(0, 0, 0, 0);
                //     end.setHours(0, 0, 0, 0);

                //     const timeDiff = end.getTime() - start.getTime();
                //     const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

                //     // If same day, it's 1 buổi nghỉ, otherwise add 1 to include both start & end dates
                //     return dayDiff >= 0 ? dayDiff + 1 : 0;
                // },
            },
            {
                header: "Số buổi nghỉ đã xử lý",
                accessorKey: "totalReferenceSection",

            },
            {
                header: "Chi tiết buổi nghỉ",
                accessorKey: "uj",
                Cell: ({ row }) => {
                    return <ScheduleDetail fromDate={row.original.fromDate?.toString()} toDate={row.original.toDate?.toString()} lecturerId={row.original.userId} />
                },

            },
            {
                header: "File minh chứng",
                accessorKey: "file",
                Cell: ({ row }) => (
                    <MyButtonViewPDF filePath={row.original.filePath} />
                ),
            },
            {
                header: "Lý do",
                accessorKey: "reason",

            },
            {
                header: "Kế hoạch bù",
                accessorKey: "comment",

            },
            // {
            //     header: "Trạng thái",
            //     accessorKey: "status",

            // },
            {
                header: "Trạng thái",
                accessorKey: "state",
                accessorFn: (row) => {
                    if (row.status === undefined || row.status === null) {
                        return "Không hợp lệ";
                    }

                    const index = Number(row.status);

                    if (isNaN(index) || index < 0 || index > 6) {
                        return "Không hợp lệ";
                    }

                    return stateArr[index];
                },
            },

            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn: (originalRow) => originalRow.ngayCapNhat ? utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat)) : ""
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",
            // }
        ],
        []
    );
    if (dayOffRequestQuery.isLoading) return "Đang tải dữ liệu..."
    if (dayOffRequestQuery.isError) return "Có lỗi xảy ra!"
    return (
        <MyFieldset title="Danh sách lớp giảng dạy">
            <MyDataTable
                exportAble
                columns={columns}
                enableRowNumbers={true}
                data={dayOffRequestQuery.data || []}

                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ScheduleDetailAction fromDate={row.original.fromDate?.toString()} toDate={row.original.toDate?.toString()} lecturerId={row.original.userId}></ScheduleDetailAction>
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

