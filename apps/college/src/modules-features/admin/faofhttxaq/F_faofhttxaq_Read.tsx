'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_faofhttxaq_Create from "./F_faofhttxaq_Create";
import F_faofhttxaq_Delete from "./F_faofhttxaq_Delete";
import F_faofhttxaq_Update from "./F_faofhttxaq_Update";
export interface I {
    id?: number; // STT
    studentCode?: string; // Mã sinh viên
    name?: string //họ tên
    birthDate?: Date //Ngày sinh
    sex?: string //Giới tính
    policyCode?: string //Mã diện chính sách
    policyName?: string //Tên diện chính sách
    semYearStart?: string //năm học kỳ bắt đầu
    percentDisscount?: number //Phần trăm miễn giảm
    amountMoneyDiscount?: number //Số tiền miễn giảm
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_faofhttxaq_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfReasons`],
        queryFn: async () => [
            {
                id: 1,
                studentCode: "SV0001",
                name: "Nguyễn Ngọc Anh",
                birthDate: new Date("2000-01-01"),
                sex:"Nữ",
                policyCode:"HCN",
                policyName:"Hộ cận nghèo",
                semYearStart: "2024 - 1",
                percentDisscount: 50,
                amountMoneyDiscount: 500000,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            // {
            //     id: 2,
            //     courseCode: "CNTT",
            //     name: "Công nghệ thông tin",
            //     khoaQuanLy: 2,
            //     nguoiCapNhat: "Quản trị viên",
            //     ngayCapNhat: new Date("2024-12-23")
            // },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: "studentCode",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Ngày sinh",
            accessorKey: "birthDate",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.birthDate!));
            },
        },
        {
            header: "Giới tính",
            accessorKey: "sex",
            // accessorFn: (row) => {
            //     if (row.type === "1") return "Quyết định vào mới";
               
            // }
        },
        {
            header: "Mã diện chính sách",
            accessorKey: "policyCode",
        },
        {
            header: "Tên diện chính sách",
            accessorKey: "policyName",
        },
        {
            header: "NHHK bắt đầu",
            accessorKey: "semYearStart",
        },
        {
            header: "% Giảm",
            accessorKey: "percentDisscount",
        },
        {
            header: "Số tiền giảm",
            accessorKey: "amountMoneyDiscount",
        },

        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",

        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },

        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
        enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_faofhttxaq_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                       
                        <F_faofhttxaq_Update doituong={row.original} />
                        <F_faofhttxaq_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
