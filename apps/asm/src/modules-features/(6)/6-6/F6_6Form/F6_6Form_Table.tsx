import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyNumberFormatter from '@/components/DataDisplay/NumberFormatter/MyNumberFormatter';
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Anchor, Checkbox, Fieldset } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react'
interface I {
    maKeHoach?: string; // BT2401
    maYeuCau?: string; // YCBT2536
    maVach?: string; // TV25633
    ngayYeuCau?: Date; // 15/01/2024
    donViSuDung?: string; // Phòng kế toán
    daKhaoSat?: boolean; // true
    ngayKhaoSat?: Date; // 15/01/2024
    ketQuaKhaoSat?: string; // Hổng panel màn hình
    uocTinhChiPhiThayThe?: number; // 500.000
    uocTinhChiPhiPhanCong?: number; // 150.000
    tongChiPhiUocTinh?: number; // 650.000
    nguoiDuyet?: string; // Trần Quốc Thiệu
    ngayDuyet?: Date; // 16/01/2024
    ghiChuDuyet?: string; // Chờ kế hoạch sửa
    trangThaiDuyet?: string; // Đã duyệt
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function F6_6Form_Table() {
    const listState = useListState<I>()
    const query = useQuery<I[]>({
        queryKey: [`F6_6Form_Table`],
        queryFn: async () => [
            {
                maKeHoach: "BT2401",
                maYeuCau: "YCBT2536",
                maVach: "TV25633",
                ngayYeuCau: new Date("2025-01-15T00:00:00Z"),
                donViSuDung: "Phòng kế toán",
                daKhaoSat: true,
                ngayKhaoSat: new Date("2025-01-16T00:00:00Z"),
                ketQuaKhaoSat: "Hổng panel màn hình",
                uocTinhChiPhiThayThe: 500000,
                uocTinhChiPhiPhanCong: 150000,
                tongChiPhiUocTinh: 650000,
                nguoiDuyet: "Trần Quốc Thiệu",
                ngayDuyet: new Date("2025-01-17T00:00:00Z"),
                ghiChuDuyet: "Chờ kế hoạch sửa",
                trangThaiDuyet: "Đã duyệt",
                ngayCapNhat: new Date("2025-01-17T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã kế hoạch",
            accessorKey: "maKeHoach",
        },
        {
            header: "Mã yêu cầu",
            accessorKey: "maYeuCau",
        },
        {
            header: "Mã vạch",
            accessorKey: "maVach",
        },
        {
            header: "Ngày yêu cầu",
            accessorKey: "ngayYeuCau",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayYeuCau!)),
        },
        {
            header: "Đơn vị sử dụng",
            accessorKey: "donViSuDung",
        },
        {
            header: "Đã khảo sát",
            accessorKey: "daKhaoSat",
            Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />,
        },
        {
            header: "Ngày khảo sát",
            accessorKey: "ngayKhaoSat",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayKhaoSat!)),
        },
        {
            header: "Kết quả khảo sát",
            accessorKey: "ketQuaKhaoSat",
        },
        {
            header: "Ước tính chi phí thay thế",
            accessorKey: "uocTinhChiPhiThayThe",
            Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />,
        },
        {
            header: "Ước tính chi phí phân công",
            accessorKey: "uocTinhChiPhiPhanCong",
            Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />,
        },
        {
            header: "Tổng chi phí ước tính",
            accessorKey: "tongChiPhiUocTinh",
            Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />,
        },
        {
            header: "Người duyệt",
            accessorKey: "nguoiDuyet",
        },
        {
            header: "Ngày duyệt",
            accessorKey: "ngayDuyet",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayDuyet!)),
        },
        {
            header: "Ghi chú duyệt",
            accessorKey: "ghiChuDuyet",
        },
        {
            header: "Trạng thái duyệt",
            accessorFn: (row) => <Anchor>{row.trangThaiDuyet}</Anchor>
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!)),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTableSelect exportAble={true} listLabel='Danh sách tài sản liên quan' columns={columns} data={query.data} listState={listState} />
    );
}
