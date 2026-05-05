'use client'
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { Center, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ActivityButtonConfirm from "./ActivityButtonConfirm";
import { IActivityApprovalInfoViewModel } from "./interfaces/ActivityApprovalViewModel";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";

export default function ActivityApprovalRead() {
    const { data: data, isLoading, isError } = useQuery({
        queryKey: ['ActivityApprovalRead'],
        queryFn: () => {
            return mockData;
        }
    });

    const columns = useMemo<MRT_ColumnDef<IActivityApprovalInfoViewModel>[]>(() => [
        {
            accessorKey: "tenDieu",
            header: "Điều",
        },
        {
            accessorKey: "code",
            header: "Mã hoạt động",
        },
        {
            accessorKey: "name",
            header: "Tên hoạt động",
        },
        {
            accessorKey: "donViToChuc",
            header: "Đơn vị tổ chức",
        },
        {
            accessorKey: "donViGhiNhan",
            header: "Đơn vị ghi nhận",
        },
        {
            accessorKey: "donViCongNhan",
            header: "Đơn vị công nhận",
        },
        {
            accessorKey: "diaDiemToChuc",
            header: "Địa điểm tổ chức",
        },
        {
            accessorKey: "slsvDuKien",
            header: "Số lượng sinh viên dự kiến",
        },
        {
            accessorKey: "pointMax",
            header: "Điểm tối đa",
        },
        {
            accessorKey: "doiTuong",
            header: "Đối tượng",
        },
        {
            accessorKey: "startDate",
            header: "Từ ngày",
            accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.startDate))
        },
        {
            accessorKey: "endDate",
            header: "Đến ngày",
            accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.endDate))
        },
        {
            accessorKey: 'confirm',
            header: 'Duyệt',
            accessorFn: (row) => <Center>
                <CustomCheckbox checked={row.confirm} readOnly label="" />
            </Center>,
            size: 140
        }
    ], [data])

    if (isLoading) return <Text>Đang tải dữ liệu...</Text>;
    if (isError) return <Text>Lỗi tải dữ liệu</Text>;

    return (
        <CustomFieldset title="Danh sách hoạt động ngoại khóa">
            <CustomDataTable
                columns={columns}
                data={data || []}
                enableRowSelection={true}
                enableColumnResizing={true}
                enableGrouping={true}
                enableStickyHeader={true}
                enableStickyFooter={true}
                initialState={{
                    density: 'xs',
                    expanded: true,
                    grouping: ['tenDieu'],
                    pagination: { pageIndex: 0, pageSize: 20 },
                    sorting: [{ id: 'tenDieu', desc: false }],
                }}
                renderRowActions={({ row }) => {
                    return <ActivityButtonConfirm confirm={row.original.confirm ?? false} />
                }}
            />
        </CustomFieldset>
    );
}

const mockData: IActivityApprovalInfoViewModel[] = [
    {
        maDieu: 'D1',
        tenDieu: 'Điều 1',
        code: 'HD001',
        name: 'Hiến máu nhân đạo',
        donViToChuc: 'Đoàn trường',
        donViGhiNhan: 'Đoàn trường',
        donViCongNhan: 'Phòng công tác sinh viên',
        diaDiemToChuc: '',
        slsvDuKien: 250,
        pointMax: 15,
        doiTuong: 'Toàn trường',
        startDate: '2024-01-02',
        endDate: '2024-01-05',
        confirm: false
    },
    {
        maDieu: 'D1',
        tenDieu: 'Điều 1',
        code: 'HD002',
        name: 'Không vi phạm quy định tổ chức thi',
        donViToChuc: 'Đoàn trường',
        donViGhiNhan: 'Đoàn trường',
        donViCongNhan: 'Phòng công tác sinh viên',
        diaDiemToChuc: '',
        slsvDuKien: 250,
        pointMax: 15,
        doiTuong: 'Toàn trường',
        startDate: '2024-01-02',
        endDate: '2024-01-05',
        confirm: false
    },
    {
        maDieu: 'D1',
        tenDieu: 'Điều 1',
        code: 'HD003',
        name: 'Không vi phạm pháp luật an toàn giao thông',
        donViToChuc: 'Đoàn trường',
        donViGhiNhan: 'Đoàn trường',
        donViCongNhan: 'Phòng công tác sinh viên',
        diaDiemToChuc: '',
        slsvDuKien: 250,
        pointMax: 15,
        doiTuong: 'Toàn trường',
        startDate: '2024-01-02',
        endDate: '2024-01-05',
        confirm: false
    },
    {
        maDieu: 'D2',
        tenDieu: 'Điều 2',
        code: 'HD004',
        name: 'Thực hiện nghĩa vụ đóng học phí',
        donViToChuc: 'Đoàn trường',
        donViGhiNhan: 'Đoàn trường',
        donViCongNhan: 'Phòng công tác sinh viên',
        diaDiemToChuc: '',
        slsvDuKien: 250,
        pointMax: 15,
        doiTuong: 'Toàn trường',
        startDate: '2024-01-02',
        endDate: '2024-01-05',
        confirm: true
    },
]
