'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_vahqbeopau_Create from "./F_vahqbeopau_Create";
import F_vahqbeopau_Delete from "./F_vahqbeopau_Delete";
import F_vahqbeopau_Update from "./F_vahqbeopau_Update";


// Interface định nghĩa dữ liệu
export interface I_vahqbeopau {
    id?: number; // STT
    maDotXet?: string; // Mã đợt xét
    tenDotXet?: string; // Tên đợt xét
    soQuyetDinh?: string; // Số quyết định
    ngayKy?: Date; // Ngày ký
}

// Component hiển thị bảng dữ liệu
export default function F_vahqbeopau_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_vahqbeopau[]>({
        queryKey: ["dotXetData"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                maDotXet: "Dot1",
                tenDotXet: "Đợt 1 2024",
                soQuyetDinh: "QD/XTT-20241",
                ngayKy: new Date("2024-09-01"),
            },
            
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_vahqbeopau>[]>(
        () => [
            {
                header: "Mã đợt xét",
                accessorKey: "maDotXet",
            },
            {
                header: "Tên đợt xét",
                accessorKey: "tenDotXet",
            },
            {
                header: "Số quyết định",
                accessorKey: "soQuyetDinh",
            },
            {
                header: "Ngày ký",
                accessorFn: (row) =>
                row.ngayKy
                    ? U0DateToDDMMYYYString(new Date(row.ngayKy))
                    : "N/A",
            },
        ],
        []
    );

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
                    <F_vahqbeopau_Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setImportData}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                    >
                        Nhập từ file
                    </AQButtonCreateByImportFile>
                    {/* <Button>
                        Xóa
                    </Button> */}
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_vahqbeopau_Update data={row.original} />
                        <F_vahqbeopau_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
