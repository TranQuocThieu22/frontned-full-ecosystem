'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_3_3_1Create from "./F5_3_3_1Create";
import F5_3_3_1Delete from "./F5_3_3_1Delete";
import F5_3_3_1Update from "./F5_3_3_1Update";

interface I {
    id?: number;
    soQuyetDinh?: string;
    ngayquyetDinh?: Date;
    tenQuyetDinh?: string;
    tenDeTai?: string;
    fileQuyetDinh?: string
}

export default function F5_3_3_1Read() {
    const query = useQuery<I[]>({
        queryKey: [`F5_3_3_1Read`],
        queryFn: async () => [
            {
                id: 1,
                soQuyetDinh: "QD001",
                ngayquyetDinh: new Date("2024-01-15T00:00:00Z"),
                tenQuyetDinh: "Quyết định bổ nhiệm",
                tenDeTai: "Nghiên cứu AI trong giáo dục",
                fileQuyetDinh: "ada.pdf"
            },
            {
                id: 2,
                soQuyetDinh: "QD002",
                ngayquyetDinh: new Date("2024-02-20T00:00:00Z"),
                tenQuyetDinh: "Quyết định tài trợ",
                tenDeTai: "Ứng dụng Blockchain trong quản lý",
                fileQuyetDinh: "ada.pdf"
            },
            {
                id: 3,
                soQuyetDinh: "QD003",
                ngayquyetDinh: new Date("2024-03-25T00:00:00Z"),
                tenQuyetDinh: "Quyết định hỗ trợ nghiên cứu",
                tenDeTai: "Phân tích dữ liệu lớn trong y tế",
                fileQuyetDinh: "ada.pdf"
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "soQuyetDinh",
        },
        {
            header: "Ngày quyết định",
            accessorKey: "ngayquyetDinh",
            Cell: ({ cell }) => {
                return U0DateToDDMMYYYString(new Date(cell.getValue<Date>()));
            },
        },
        {
            header: "Tên quyết định",
            accessorKey: "tenQuyetDinh",
        },
        {
            header: "Tên đề tài",
            accessorKey: "tenDeTai",
        },
        {
            header: "File quyết định",
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
            renderTopToolbarCustomActions={() => <F5_3_3_1Create />}
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        <F5_3_3_1Update values={row.original} />
                        <F5_3_3_1Delete id={row.original.id!} />
                        {/* <F11_1UpdateRoleActivityCategory values={row.original} />
            <F11_1DeleteRoleActivityCategory roleActivityId={row.original.id!} /> */}
                    </MyCenterFull>
                );
            }}
        />
    );
}
