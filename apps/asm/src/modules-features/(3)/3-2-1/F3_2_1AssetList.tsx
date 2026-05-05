'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
// REVIEW : 48272 F6_7ReadContractList


interface IAssetListViewModel {
    id?: number;
    departmentOfRequest?: string;
    name?: string;
    category?: string;
    specification?: string;
    usagePurpose?: string;
    unit?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IAssetListViewModel[] = [
    {
        id: 1,
        departmentOfRequest: "Phòng hành chính",
        name: "Máy in HP 1020",
        category: undefined,
        specification: undefined,
        usagePurpose: "In ấn",
        unit: "Cái",
        quantity: 2,
        unitPrice: 1500000,
        totalPrice: 3000000,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-22"),
    },
    {
        id: 2,
        departmentOfRequest: "Phòng đào tạo",
        name: "Xe bán tải ISUZU",
        category: undefined,
        specification: undefined,
        usagePurpose: "Vận chuyển nhanh tài liệu giữa các cơ sở",
        unit: "Chiếc",
        quantity: 1,
        unitPrice: 785000000,
        totalPrice: 785000000,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-22"),
    }
]

export default function F3_2_1AssetList() {
    const dis = useDisclosure();

    const assetList = useQuery<IAssetListViewModel[]>({
        queryKey: [`F3_2_1AssetList`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const columns = useMemo<MRT_ColumnDef<IAssetListViewModel>[]>(
        () => [
            {
                header: "Đơn vị yêu cầu",
                accessorKey: "departmentOfRequest",
            },
            {
                header: "Tên vật tư",
                accessorKey: "name",
            },
            {
                header: " Phân loại",
                accessorKey: "category",
            },
            {
                header: "Quy cách",
                accessorKey: "specification",
            },
            {
                header: "Mục đích sử dụng",
                accessorKey: "usagePurpose",
            },
            {
                header: "Đơn vị tính",
                accessorKey: "unit",
            },
            {
                header: "Số lượng",
                accessorKey: "quantity",
            },
            {
                header: "Đơn giá",
                accessorKey: "unitPrice",
                accessorFn: (row) => <MyNumberFormatter value={row.unitPrice} />,
            },
            {
                header: "Thành tiền",
                accessorKey: "totalPrice",
                accessorFn: (row) => <MyNumberFormatter value={row.totalPrice} />,
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn: (row) =>
                    row.ngayCapNhat ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat)) : "",
            },

        ],
        []
    );

    if (assetList.isLoading) return "Đang tải dữ liệu..."
    if (assetList.isError) return "Không có dữ liệu..."
    return (
        <MyButtonModal disclosure={dis} modalSize={'90%'} label='Xem' title="Danh sách vật tư trong kế hoạch mua sắm">
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={assetList.data!}
                exportAble={true}
            />
        </MyButtonModal>
    )
}
