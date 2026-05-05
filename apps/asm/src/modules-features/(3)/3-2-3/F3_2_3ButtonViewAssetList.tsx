"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

interface IAssetViewModel {
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

const mockData: IAssetViewModel[] = [
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


export default function F3_2_3_ButtonViewAssetList(
    { contractId }: { contractId: number }
) {
    const AssetList = useQuery<IAssetViewModel[]>({
        queryKey: [`F3_2_3Assetlist`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const disc = useDisclosure(false)

    const columns = useMemo<MRT_ColumnDef<IAssetViewModel>[]>(() => [
        {
            header: "Đơn vị yêu cầu",
            accessorKey: "departmentOfRequest",
        },
        {
            header: "Tên tài sản",
            accessorKey: "name",
        },
        {
            header: "Phân loại",
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
        },
        {
            header: "Thành tiền",
            accessorKey: "totalPrice",
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


    return (
        <>
            <MyButtonModal
                modalSize={"100%"}
                variant='light'
                color='lime'
                label="Xem"
                title="Danh tài sản liên quan"
                disclosure={disc}

            >
                <MyFlexColumn >
                    {AssetList.isLoading && "Đang tải dữ liệu..."}
                    {AssetList.isError && "Lỗi khi tải dữ liệu..."}
                    <>
                        <MyDataTable
                            exportAble
                            layoutMode='grid'
                            initialState={{
                                density: "xs",
                                pagination: { pageIndex: 0, pageSize: 10 },
                                columnPinning: { right: ["mrt-row-actions"] },
                                columnVisibility: {
                                    nguoiCapNhat: false,
                                    ngayCapNhat: false
                                }
                            }}
                            columns={columns}
                            data={AssetList.data!}
                        />
                    </>
                </MyFlexColumn>
            </MyButtonModal>
        </>
    )
}



