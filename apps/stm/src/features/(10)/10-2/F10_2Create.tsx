'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    maKhoaThi?: string;
    tenKhoaThi?: string;
    tinhChatPhong?: string;
    ngayThi?: Date;
    maKhoaHoc?: string;
    tenKhoaHoc?: string;
    tenChuongTrinh?: string;
    ngayKhaiGiang?: Date;
    soLuongHocVien?: number;
    hocVienDuThi?: number;
    thiSinhTuDo?: number;
    tongSo?: number;
    soLuongDaPhanNhom?: number;
    soLuongChuaPhanNhom?: number;
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
}

export default function F10_2Create() {
    const query = useQuery<I[]>({
        queryKey: [`F10_2Create`],
        queryFn: async () => [
            { id: 1, maKhoaThi: "LTB24101-10", tenKhoaThi: "Khóa thi lập trình web ngày 15/06/2024", tinhChatPhong: "Máy tính", ngayThi: new Date("2024-06-15T00:00:00Z"), maKhoaHoc: "LTB24101", tenKhoaHoc: "Lập trình web khóa 2024", tenChuongTrinh: "Lập trình web", ngayKhaiGiang: new Date("2024-01-15T00:00:00Z"), soLuongHocVien: 55, hocVienDuThi: 42, thiSinhTuDo: 33, tongSo: 75, soLuongDaPhanNhom: 20, soLuongChuaPhanNhom: 50, ngayCapNhat: new Date("2024-02-12T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn A" },
            { id: 2, maKhoaThi: "LTB24102-20", tenKhoaThi: "Khóa thi lập trình mobile ngày 20/07/2024", tinhChatPhong: "Máy tính", ngayThi: new Date("2024-07-20T00:00:00Z"), maKhoaHoc: "LTB24102", tenKhoaHoc: "Lập trình mobile khóa 2024", tenChuongTrinh: "Lập trình mobile", ngayKhaiGiang: new Date("2024-02-01T00:00:00Z"), soLuongHocVien: 60, hocVienDuThi: 50, thiSinhTuDo: 40, tongSo: 90, soLuongDaPhanNhom: 30, soLuongChuaPhanNhom: 60, ngayCapNhat: new Date("2024-03-15T00:00:00Z"), nguoiCapNhat: "GV. Nguyễn Thị B" },
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã khóa thi",
            accessorKey: "maKhoaThi",
        },
        {
            header: "Tên khóa thi",
            accessorKey: "tenKhoaThi"
        },
        {
            header: "Tính chất phòng",
            accessorKey: "tinhChatPhong"
        },
        {
            header: "Ngày thi",
            accessorKey: "ngayThi",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayThi!))
        },
        {
            header: "Mã khóa học",
            accessorKey: "maKhoaHoc"
        },
        {
            header: "Tên khóa học",
            accessorKey: "tenKhoaHoc"
        },
        {
            header: "Tên chương trình",
            accessorKey: "tenChuongTrinh"
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "ngayKhaiGiang",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayKhaiGiang!))
        },
        {
            header: "Số lượng học viên",
            accessorKey: "soLuongHocVien",
        },
        {
            header: "Học viên dự thi",
            accessorKey: "hocVienDuThi",
        },
        {
            header: "Thí sinh tự do",
            accessorKey: "thiSinhTuDo",
        },
        {
            header: "Tổng số",
            accessorKey: "tongSo",
        },
        {
            header: "Số lượng đã phân nhóm",
            accessorKey: "soLuongDaPhanNhom",
        },
        {
            header: "Số lượng chưa phân nhóm",
            accessorKey: "soLuongChuaPhanNhom",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat!))
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyFlexColumn>
            <Group align="end">
                <MyNumberInput w={380} label="Sĩ số tối đa/ Phòng thi" />
                <MySelect label="Công thức sắp xếp" defaultValue={'Ngẫu nhiên'} data={['Ngẫu nhiên', 'Tên họ lót tăng dần']} />
                <MySelect label="Công thức tách nhóm thi" defaultValue={'Chia đều'} data={['Chia đều', 'Giữ nguyên lớp đầu']} />
                <Button>Chia nhóm thi</Button>
            </Group>
            <MyFieldset title="Danh sách khóa thi">
                <MyDataTable
                    enableRowSelection
                    columns={columns}
                    data={query.data!}
                />
            </MyFieldset>
        </MyFlexColumn>
    );
}
