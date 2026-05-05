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
    errorDescription?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData2: IAssetViewModel[] = [
    {
        id: 1,
        name: "Tivi 25 inch",
        errorDescription: "Không lên hình",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date(),
    },
    {
        id: 2,
        name: "Máy chiếu",
        errorDescription: "Không kết nối được với máy tính",
        nguoiCapNhat: "User1",
        ngayCapNhat: new Date(),
    },
    {
        id: 3,
        name: "Máy in",
        errorDescription: "Kẹt giấy",
        nguoiCapNhat: "User2",
        ngayCapNhat: new Date(),
    },
    {
        id: 4,
        name: "Laptop",
        errorDescription: "Không khởi động được",
        nguoiCapNhat: "User3",
        ngayCapNhat: new Date(),
    }
]


export default function F6_6ButtonViewAssetList(
    { contractId }: { contractId: number }
) {
    const AssetList = useQuery<IAssetViewModel[]>({
        queryKey: [`F6_6ButtonViewAssetList`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData2
        },
    })

    const disc = useDisclosure(false)

    const columns = useMemo<MRT_ColumnDef<IAssetViewModel>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
        },
        {
            header: "Tên tài sản",
            accessorKey: "name",
        },
        {
            header: "Mô tả lỗi",
            accessorKey: "errorDescription",
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



