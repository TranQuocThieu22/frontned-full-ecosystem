'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F8_3_2Create from "./F8_3_2Create";
import F8_3_2Delete from "./F8_3_2Delete";
import F8_3_2Update from "./F8_3_2Update";

export interface IF8_3_2ListOfAttendees {
    id?: number; // STT
    code?: string; // Mã giảng viên
    name?: string; // Họ tên
    hocHamHocVi?: string; // Học hàm - Học vị
    donViCongTac?: string; // Đơn vị công tác
}

export default function ReadTemplate() {
    const query = useQuery<IF8_3_2ListOfAttendees[]>({
        queryKey: [`ListOfAttendees`],
        queryFn: async () => [
            {
                id: 1,
                code: "GV001",
                name: "Nguyễn Văn A",
                hocHamHocVi: "PGS.TS",
                donViCongTac: "Trường Đại học ABC",
            },
            {
                id: 2,
                code: "GV002",
                name: "Trần Thị B",
                hocHamHocVi: "TS",
                donViCongTac: "Viện Nghiên cứu XYZ",
            },
            {
                id: 3,
                code: "GV003",
                name: "Lê Văn C",
                hocHamHocVi: "ThS",
                donViCongTac: "Trường Cao đẳng DEF",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<IF8_3_2ListOfAttendees>[]>(() => [
        {
            header: "Mã giảng viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Học hàm - Học vị",
            accessorKey: "hocHamHocVi",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "donViCongTac",
        },
        {
            header: "Có viết bài tham dự",
            accessorFn: (row) => {
                return <Checkbox />
            }
        },
        {
            header: "File tóm tắt file tham dự",
            accessorFn: (row) => {
                return <MyButtonViewPDF />
            }
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F8_3_2Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F8_3_2Update values={row.original} />
                        <F8_3_2Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
