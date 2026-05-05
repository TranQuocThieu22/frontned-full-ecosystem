'use client'
import { Checkbox, Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayClassStatus, DisplayClassStatusMap } from "../MELessonReviewsApproval/DisplayClassStatus";
import EnterPointButton from "./EnterPointButton";

export interface ClassRecord {
    maLop: string;
    tenLop: string;
    giaoVienChuNhiem: string;
    lichHoc: string;
    phongHoc: string;
    siSoHienTai: number;
    siSoToiDa: number;
    trangThaiLop: string;
    daNhapDiem: boolean;
}

export default function EnterMonthlyTestScoresTable() {

    const columns = useMemo<MRT_ColumnDef<ClassRecord>[]>(
        () => [
            {
                accessorKey: 'maLop',
                header: 'Mã lớp',
            },
            {
                accessorKey: 'tenLop',
                header: 'Tên lớp',
            },
            {
                accessorKey: 'giaoVienChuNhiem',
                header: 'Giáo viên chủ nhiệm',
            },
            {
                accessorKey: 'lichHoc',
                header: 'Lịch học',
                size: 200
            },
            {
                accessorKey: 'phongHoc',
                header: 'Phòng học',
            },
            {
                accessorFn: (row) => `${row.siSoHienTai}/${row.siSoToiDa}`,
                id: 'siSo',
                header: 'Sĩ số hiện tại/Sĩ số tối đa',
            },
            {
                accessorKey: 'trangThaiLop',
                header: 'Trạng thái lớp',
                size: 200,
                Cell: ({ row }) => <DisplayClassStatus classStatus={DisplayClassStatusMap[row.original.trangThaiLop] ?? -1} />

            },
            {
                accessorKey: 'daNhapDiem',
                header: 'Đã nhập điểm',
                Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />
            },
        ], []
    );

    return (
        <>
            <Group mb={10}>
                <MonthPickerInput
                    label="Chọn tháng"
                    locale={"vi"}
                    monthsListFormat="[Tháng] M"
                    valueFormat="[Tháng] MM YYYY"
                    defaultValue={new Date().toISOString()}
                    rightSection={<IconCalendarWeek />}
                />
            </Group>
            <MyFieldset title="Danh sách lớp" >
                <MyDataTable
                    enableRowSelection
                    enableRowNumbers
                    columns={columns}
                    data={classMockData}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <>
                                <MyButton crudType="export" />
                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <Group>
                                <EnterPointButton />
                            </Group>
                        )
                    }}
                />
            </MyFieldset>
        </>
    )


}
export const classMockData: ClassRecord[] = [
    {
        maLop: "LD1",
        tenLop: "Lập trình Web Cơ bản 1",
        giaoVienChuNhiem: "Trần Nhật Minh",
        lichHoc: "Thứ 3 & 5 (18:00–20:00)",
        phongHoc: "P.TD01",
        siSoHienTai: 10,
        siSoToiDa: 15,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD2A1",
        tenLop: "Tiếng Anh Giao tiếp A1",
        giaoVienChuNhiem: "Nguyễn Thị Hải",
        lichHoc: "Thứ 2 & 4 (19:00–21:00)",
        phongHoc: "P.TD02",
        siSoHienTai: 12,
        siSoToiDa: 15,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD2A2",
        tenLop: "Tiếng Anh Giao tiếp A2",
        giaoVienChuNhiem: "Lê Thị Quế",
        lichHoc: "Thứ 7 & CN (09:00–11:00)",
        phongHoc: "P.TD03",
        siSoHienTai: 8,
        siSoToiDa: 12,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD2B",
        tenLop: "Giải tích Nâng cao",
        giaoVienChuNhiem: "Trần Thị Phượng Thảo",
        lichHoc: "Thứ 3 & 5 (18:00–20:00)",
        phongHoc: "P.TD01",
        siSoHienTai: 11,
        siSoToiDa: 15,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD2C1",
        tenLop: "Hóa học Đại cương",
        giaoVienChuNhiem: "Hoàng Thị Hương",
        lichHoc: "Thứ 6 (18:00–21:00)",
        phongHoc: "P.TD04",
        siSoHienTai: 9,
        siSoToiDa: 10,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD2C2",
        tenLop: "Vật lý Nâng cao",
        giaoVienChuNhiem: "Trần Thị Quý",
        lichHoc: "Thứ 7 (14:00–17:00)",
        phongHoc: "P.TD05",
        siSoHienTai: 7,
        siSoToiDa: 10,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD3A",
        tenLop: "Lịch sử Việt Nam",
        giaoVienChuNhiem: "Lê Thu Trang",
        lichHoc: "Thứ 2 & 4 (18:00–20:00)",
        phongHoc: "P.TD06",
        siSoHienTai: 14,
        siSoToiDa: 15,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD3B",
        tenLop: "Kinh tế Vi mô",
        giaoVienChuNhiem: "Trần Trọng Thưởng",
        lichHoc: "Thứ 3 & 5 (19:00–21:00)",
        phongHoc: "P.TD07",
        siSoHienTai: 13,
        siSoToiDa: 15,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD3C",
        tenLop: "Địa lý Tự nhiên",
        giaoVienChuNhiem: "Lê Thị Trương An",
        lichHoc: "Thứ 6 (17:00–19:00)",
        phongHoc: "P.TD08",
        siSoHienTai: 9,
        siSoToiDa: 12,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
    {
        maLop: "LD3D",
        tenLop: "Ngữ văn Hiện đại",
        giaoVienChuNhiem: "Trần Trọng Thưởng",
        lichHoc: "Chủ Nhật (09:00–12:00)",
        phongHoc: "P.TD09",
        siSoHienTai: 10,
        siSoToiDa: 12,
        trangThaiLop: "Đang hoạt động",
        daNhapDiem: true,
    },
];
