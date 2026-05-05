import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

interface IValidAsset {
    id?: number;
    donViYeuCau?: string;
    tenVatTu?: string;
    mucDich?: string;
    donViTinh?: string;
    soLuong?: number;
    donGia?: string;
    thanhTien?: string;
    trangThai?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

let mockData: IValidAsset[] = [
    {
        id: 1,
        donViYeuCau: "Phòng đào tạo",
        tenVatTu: "Xe bán tải ISUZU",
        mucDich: "Vận chuyển nhanh tài liệu giữa các cơ sở",
        donViTinh: "Chiếc",
        soLuong: 1,
        donGia: "785.000.000",
        thanhTien: "785.000.000",
        trangThai: "Hợp lệ",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-12-01")
    }
];

export default function F3_5SelectAsset() {
    const disc = useDisclosure()
    const danhSachNhomCanXet = useQuery<IValidAsset[]>({
        queryKey: [`F3_5SelecteAsset`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })
    const columnChonKhoaHoc = useMemo<MRT_ColumnDef<IValidAsset>[]>(
        () => [
            {
                accessorKey: "donViYeuCau",
                header: "Đơn vị yêu cầu"
            },
            {
                accessorKey: "tenVatTu",
                header: "Tên vật tư"
            },
            {
                accessorKey: "mucDich",
                header: "Mục đích sử dụng"
            },
            {
                accessorKey: "donViTinh",
                header: "Đơn vị tính"
            },
            {
                accessorKey: "soLuong",
                header: "Số lượng "
            },
            {
                accessorKey: "donGia",
                header: "Đơn giá"
            },
            {
                accessorKey: "thanhTien",
                header: "Thành tiền"
            },
            {
                header: "Trạng thái",
                accessorKey: "trangThai",
            },
            {
                accessorKey: "nguoiCapNhat",
                header: "Người cập nhật"
            },
            {
                accessorKey: "ngayCapNhat",
                header: "Ngày cập nhật",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!))
                },
            }
        ],
        []
    );
    return (
        <Group>
            <MyButtonModal disclosure={disc} modalSize={'100%'}
                leftSection={<IconPlus />}
                color='blue'
                label="Thêm">
                Danh sách yêu cầu mua sắm đã duyệt hợp lệ
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    columns={columnChonKhoaHoc}
                    enableRowNumbers={true}
                    data={danhSachNhomCanXet.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <Button>Chọn</Button>
                                </Group>
                            </>
                        )
                    }}

                />
            </MyButtonModal >
        </Group>
    )
}
