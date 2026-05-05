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
];