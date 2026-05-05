'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MRT_ColumnDef } from "mantine-react-table";

// Interface định nghĩa dữ liệu
export interface F4_3ReadList {
    id?: number; // STT
    assetCode?: string; // Mã tài sản
    assetName?: string; // Tên tài sản
    barcode?: string; // Mã vạch
    unit?: string; // Đơn vị sử dụng
    newPurchaseValue?: number; // Giá trị mua mới
    beginningValue?:number;
    depreciationValue?: number; // Giá trị khấu hao
    residualValue?: number; // Giá trị còn lại
}

// Component hiển thị bảng dữ liệu
export default function F4_3ReadList() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<F4_3ReadList[]>({
        queryKey: ["assetData"], // Khóa cache
        queryFn: async () => [
            {
                id: 1,
                assetCode: "TV55SS",
                assetName: "Tivi 55 Inc",
                barcode: "TS02356",
                unit: "Phòng Hành chính",
                newPurchaseValue: 45000000,
                beginningValue:44950000,
                depreciationValue: 50000,
                residualValue: 4490000,
            },
            
        ],
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<F4_3ReadList>[]>(
        () => [
            {
                header: "Mã tài sản",
                accessorKey: "assetCode",
            },
            {
                header: "Tên tài sản",
                accessorKey: "assetName",
            },
            {
                header: "Mã vạch",
                accessorKey: "barcode",
            },
            {
                header: "Đơn vị sử dụng",
                accessorKey: "unit",
            },
            {
                header: "Giá trị mua mới",
                accessorKey: "newPurchaseValue",
                Cell: ({ cell }) =>
                    cell.getValue()
                        ? Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                              cell.getValue() as number
                          )
                        : "",
            },
            {
                header: "Giá trị đầu kỳ",
                accessorKey: "beginningValue",
                Cell: ({ cell }) =>
                    cell.getValue()
                        ? Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                              cell.getValue() as number
                          )
                        : "",
            },
            {
                header: "Giá trị khấu hao",
                accessorKey: "depreciationValue",
                Cell: ({ cell }) =>
                    cell.getValue()
                        ? Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                              cell.getValue() as number
                          )
                        : "",
            },
            {
                header: "Giá trị còn lại",
                accessorKey: "residualValue",
                Cell: ({ cell }) =>
                    cell.getValue()
                        ? Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                              cell.getValue() as number
                          )
                        : "",
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
            columns={columns}
            data={query.data!}
            
        />
    );
}
