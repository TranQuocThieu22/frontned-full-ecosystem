'use client';

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { U0DateToDDMMYYYString } from "@/utils/date";
import F_rihlieosdm_Create from "./F_oedzrmlcyx_Create";
import F_rihlieosdm_Delete from "./F_oedzrmlcyx_Delete";
import F_rihlieosdm_Update from "./F_oedzrmlcyx_Update";

export interface I_oedzrmlcyx {
    promulgateDate: string | Date;
    id: number;
    decisionNumber: string;
    decisionName: string;
    signer: string;
    fileLink: string;
    note?: string;
}

// Function to format Date to DD/MM/YYYY


// Component hiển thị bảng dữ liệu
export default function F_oedzrmlcyx_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_oedzrmlcyx[]>({
        queryKey: ["F_rihlieosdm_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                decisionNumber: "QD/TN241",
                promulgateDate: "2024-02-01", // Ensure consistent Date format
                decisionName: "Quyết định công nhận tốt nghiệp khóa 2024",
                signer: "Hiệu trưởng Nguyễn Hữu Quốc",
                fileLink: "Xem file",
            },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_oedzrmlcyx>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "decisionNumber",
        },
        {
            header: "Ngày quyết định",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!)),
        },
        {
            header: "Tên quyết định",
            accessorKey: "decisionName",
        },
        {
            header: "Người ký",
            accessorKey: "signer",
        },
        {
            header: "Xem file quyết định",
            accessorKey: "fileLink",
            Cell: () => <MyButtonViewPDF />,
        },
    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F_rihlieosdm_Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setImportData}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                    >
                        Import
                    </AQButtonCreateByImportFile>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                    <F_rihlieosdm_Update data={row.original} />
                    <F_rihlieosdm_Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
