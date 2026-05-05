'use client';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import {
    AQButtonExportData,
    MyButtonViewPDF,
    MyDataTable,
    MyFieldset,
    MyFlexColumn
} from 'aq-fe-framework/components';
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import ProdutcDeliveryDelete from './DeleteProductDelivery';
import ProdutcDeliveryUpdate from './UpdateProductDelivery';

export interface I_ProdutcDelivery {
    id?: number;
    maBienBanBanGiao?: string; // Mã biên bản bàn giao
    ngayBanGiao?: string; // Ngày bàn giao
    donViBanGiao?: string; // Đơn vị bàn giao
    donViTiepNhan?: string; // Đơn vị tiếp nhận
    nguoiBanGiao?: string; // Người bàn giao
    nguoiTiepNhan?: string; // Người tiếp nhận
    cacBanThaoDuocBanGiao?: string; // Các bản thảo được bàn giao (M3 BT, Tên Giáo trình, Phiên bản)
    mucDichBanGiao?: string; // Mục đích bàn giao
    fileBienBanBanGiao?: string; // File biên bản bàn giao
}

export default function ProdutcDeliveryTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const query = useQuery<I_ProdutcDelivery[]>({
        queryKey: ['ProdutcDelivery'],
        queryFn: async () => mockData,
    });

    const columns = useMemo<MRT_ColumnDef<I_ProdutcDelivery>[]>(
        () => [
            {
                header: "Mã biên bản bàn giao",
                accessorKey: "maBienBanBanGiao",
            },
            {
                header: "Ngày bàn giao",
                accessorKey: "ngayBanGiao",
                Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
            },
            {
                header: "Đơn vị bàn giao",
                accessorKey: "donViBanGiao",
            },
            {
                header: "Đơn vị tiếp nhận",
                accessorKey: "donViTiepNhan",
            },
            {
                header: "Người bàn giao",
                accessorKey: "nguoiBanGiao",
            },
            {
                header: "Người tiếp nhận",
                accessorKey: "nguoiTiepNhan",
            },
            {
                header: "Các bản thảo được bàn giao (Mã BT, Tên Giáo trình, Phiên bản)",
                accessorKey: "cacBanThaoDuocBanGiao",
                size: 320
            },
            {
                header: "Mục đích bàn giao",
                accessorKey: "mucDichBanGiao",
            },
            {
                header: "File biên bản bàn giao",
                accessorKey: "fileBienBanBanGiao",
                Cell: ({ cell }) => (
                    <MyButtonViewPDF />
                ),
            },
        ],
        []
    );
    const exportConfig = {
        fields: [
            { fieldName: 'maBienBanBanGiao', header: "Mã biên bản bàn giao", },
            { fieldName: 'ngayBanGiao', header: "Ngày bàn giao", },
            { fieldName: 'donViBanGiao', header: "Đơn vị bàn giao", },
            { fieldName: 'donViTiepNhan', header: "Đơn vị tiếp nhận", },
            { fieldName: 'nguoiBanGiao', header: "Người bàn giao", },
            { fieldName: 'nguoiTiepNhan', header: "Người tiếp nhận", },
            { fieldName: 'cacBanThaoDuocBanGiao', header: "Các bản thảo được bàn giao (M3 BT, Tên Giáo trình, Phiên bản)", },
            { fieldName: 'mucDichBanGiao', header: "Mục đích bàn giao", },
            { fieldName: 'fileBienBanBanGiao', header: "File biên bản bàn giao", },
        ],
    };

    if (query.isLoading) return <div>Loading...</div>;
    if (query.isError) return <div>Không có dữ liệu...</div>;

    return (
        <MyFieldset title="Bàn giao sản phẩm biên soạn">
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            <AQButtonExportData
                                objectName="paymentProposal"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <ProdutcDeliveryUpdate values={row.original} />
                            <ProdutcDeliveryDelete id={row.original.id || 0} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

export const mockData: I_ProdutcDelivery[] = [
    {
        id: 1,
        maBienBanBanGiao: "BB02025001",
        ngayBanGiao: "2025-12-10",
        donViBanGiao: "Phòng Quản lý Khoa học",
        donViTiepNhan: "Nhà xuất bản Giáo dục",
        nguoiBanGiao: "Nguyễn Thị K (CBQLKH01)",
        nguoiTiepNhan: "Lê Văn M (Đại diện NXB)",
        cacBanThaoDuocBanGiao: "“BT002, Giáo trình Phân tích Dữ liệu Lớn,V2.1,BT004, Giáo trình Dược lý học,V2.2”",
        mucDichBanGiao: "Xuất bản và phát hành",
        fileBienBanBanGiao: "",
    },
    {
        id: 2,
        maBienBanBanGiao: "BB02025002",
        ngayBanGiao: "2025-12-15",
        donViBanGiao: "Phòng Quản lý Khoa học",
        donViTiepNhan: "Thư viện Trường",
        nguoiBanGiao: "Nguyễn Thị K (CBQLKH01)",
        nguoiTiepNhan: "Trần V H (Thủ thư)",
        cacBanThaoDuocBanGiao: "“BT001, Giáo trình Nguyễn lý Kế toán,V1.2”",
        mucDichBanGiao: "Lưu trữ và phục vụ tham khảo",
        fileBienBanBanGiao: "",
    },
    {
        id: 3,
        maBienBanBanGiao: "BB02025003",
        ngayBanGiao: "2025-12-20",
        donViBanGiao: "Phòng Quản lý Khoa học",
        donViTiepNhan: "Khoa Công nghệ Thông tin",
        nguoiBanGiao: "Nguyễn Thị K (CBQLKH01)",
        nguoiTiepNhan: "Phạm L M (Trưởng Khoa CNTT)",
        cacBanThaoDuocBanGiao: "“BT003, Giáo trình Kinh tế Vi mô,V0.9”",
        mucDichBanGiao: "Dùng vào giảng dạy học phần",
        fileBienBanBanGiao: "",
    }
]
