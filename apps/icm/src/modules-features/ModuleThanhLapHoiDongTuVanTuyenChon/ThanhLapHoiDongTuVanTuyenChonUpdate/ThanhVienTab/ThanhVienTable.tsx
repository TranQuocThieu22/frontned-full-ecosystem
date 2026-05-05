import { useForm } from "@mantine/form";
import { MyButton, MyCenterFull, MyDataTable, MySelect } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DanhSachVienChucTable from "./DanhSachVienChucTable";
import ThanhVienDelete from "./ThanhVienDelete";
import ThanhVienDeleteList from "./ThanhVienDeleteList";

export interface IThanhVienHoiDong {
    id?: number;
    maVienChuc?: string;
    hoTen?: string;
    ngaySinh?: Date;
    gioiTinh?: string;
    donVi?: string;
    chucVu?: string;
    vaiTro?: string;
}

const vaiTroOptions = [
    { value: "Chủ tịch", label: "Chủ tịch" },
    { value: "Phó Chủ tịch", label: "Phó Chủ tịch" },
    { value: "Ủy viên phản biện", label: "Ủy viên phản biện" },
    { value: "Ủy viên", label: "Ủy viên" },
    { value: "Thư ký", label: "Thư ký" },
];

export default function ThanhVienTable() {
    const form = useForm<IThanhVienHoiDong[]>({
        initialValues: {
            ...mockData
        },
    });

    const columns = useMemo<MRT_ColumnDef<IThanhVienHoiDong>[]>(() => [
        { header: "Mã viên chức", accessorKey: "maVienChuc", },
        { header: "Họ tên", accessorKey: "hoTen", },
        {
            header: "Ngày sinh", accessorKey: "ngaySinh",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngaySinh),
        },
        { header: "Giới tính", accessorKey: "gioiTinh", },
        { header: "Đơn vị", accessorKey: "donVi", },
        { header: "Chức vụ", accessorKey: "chucVu", },
        {
            header: "Vai trò",
            accessorKey: "vaiTro",
            enableEditing: true,
            Cell: ({ row }) => (
                <MySelect
                    data={vaiTroOptions}
                    {...form.getInputProps(`${row.index}.vaiTro`)}
                />
            ),
        },
    ], []);

    return (
        <MyDataTable
            enableRowSelection
            columns={columns}
            data={mockData || []}
            renderTopToolbarCustomActions={({ table }) => (
                <>
                    <DanhSachVienChucTable />
                    <MyButton crudType="export" />
                    <ThanhVienDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <ThanhVienDelete id={row.original.id!} code={row.original.maVienChuc!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

const mockData: IThanhVienHoiDong[] = [
    {
        id: 1,
        maVienChuc: "VC001",
        hoTen: "Nguyễn Văn A",
        ngaySinh: new Date("1975-03-15"),
        gioiTinh: "Nam",
        donVi: "Khoa Công nghệ thông tin",
        chucVu: "Trưởng khoa",
        vaiTro: "Chủ tịch",
    },
    {
        id: 2,
        maVienChuc: "VC008",
        hoTen: "Lê Thị Bình",
        ngaySinh: new Date("1980-07-22"),
        gioiTinh: "Nữ",
        donVi: "Phòng Khoa học & Công nghệ",
        chucVu: "Trưởng phòng",
        vaiTro: "Phó Chủ tịch",
    },
    {
        id: 3,
        maVienChuc: "VC012",
        hoTen: "Trần Văn Cảnh",
        ngaySinh: new Date("1978-11-01"),
        gioiTinh: "Nam",
        donVi: "Khoa Môi trường",
        chucVu: "Phó Trưởng khoa",
        vaiTro: "Ủy viên phản biện",
    },
    {
        id: 4,
        maVienChuc: "VC015",
        hoTen: "Phạm Thị Dung",
        ngaySinh: new Date("1982-09-05"),
        gioiTinh: "Nữ",
        donVi: "Khoa Kinh tế",
        chucVu: "Giảng viên chính",
        vaiTro: "Ủy viên",
    },
    {
        id: 5,
        maVienChuc: "VC019",
        hoTen: "Hoàng Trung Kiên",
        ngaySinh: new Date("1985-06-10"),
        gioiTinh: "Nam",
        donVi: "Phòng Đào tạo",
        chucVu: "Chuyên viên",
        vaiTro: "Thư ký",
    },
];