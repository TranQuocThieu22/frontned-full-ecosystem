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
    name?: string;
    unit?: string;
    quantity?: number;
    price?: number;
    totalPrice?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IAssetViewModel[] = [
    {
        id: 1,
        name: "Tivi 25 inch",
        unit: "Chiếc",
        quantity: 2,
        price: 1000000,
        totalPrice: 2000000,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    },
    {
        id: 2,
        name: "Máy chiếu",
        unit: "Chiếc",
        quantity: 1,
        price: 5000000,
        totalPrice: 5000000,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    },
    {
        id: 3,
        name: "Điều hòa Đaikin 2 chiều",
        unit: "Chiếc",
        quantity: 3,
        price: 15000000,
        totalPrice: 45000000,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    },
    {
        id: 4,
        name: "Máy in canon 2900",
        unit: "Chiếc",
        quantity: 1,
        price: 3000000,
        totalPrice: 3000000,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    },
    {
        id: 5,
        name: "Máy tính để bàn",
        unit: "Chiếc",
        quantity: 5,
        price: 10000000,
        totalPrice: 50000000,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    },
    {
        id: 6,
        name: "Máy chiếu đa vật thể",
        unit: "Chiếc",
        quantity: 2,
        price: 7000000,
        totalPrice: 14000000,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    },
    {
        id: 7,
        name: "Bàn ghế học sinh bán trú",
        unit: "Bộ",
        quantity: 10,
        price: 2000000,
        totalPrice: 20000000,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    }
]


export default function F3_5ButtonViewAssetList(
    { contractId }: { contractId: number }
) {
    const AssetList = useQuery<IAssetViewModel[]>({
        queryKey: [`F6_9Assetlist`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const disc = useDisclosure(false)

    const columns = useMemo<MRT_ColumnDef<IAssetViewModel>[]>(() => [
        {
            header: "Tên tài sản",
            accessorKey: "name",
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
            accessorKey: "price",
            accessorFn(originalRow) {
                return originalRow.price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
            },
        },
        {
            header: "Thành tiền",
            accessorKey: "totalPrice",
            accessorFn(originalRow) {
                return originalRow.totalPrice?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
            },
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
                title="Danh vật tư liên quan"
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



