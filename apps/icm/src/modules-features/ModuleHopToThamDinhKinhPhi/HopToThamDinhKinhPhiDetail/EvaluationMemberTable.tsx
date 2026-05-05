import { useForm } from "@mantine/form";
import { MyButton, MyDataTable, MySelect, MyTextArea } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvaluationMemberDeleteList from "./EvaluationMemberDeleteList";

export interface IEvaluationMember {
    id: number;
    maThanhVien: string;
    hoTen: string;
    vaiTro: string;
    phuongThucKhoan: string;
    kienNghi: string;
}

const phuongThucKhoanOptions = [
    { value: "Khoán từng phần", label: "Khoán từng phần" },
    { value: "Khoán đến sản phẩm cuối cùng", label: "Khoán đến sản phẩm cuối cùng" },
];

export default function EvaluationMemberTable() {
    const form = useForm<IEvaluationMember[]>({
        initialValues: {
            ...mockData
        },
    });

    const columns = useMemo<MRT_ColumnDef<IEvaluationMember>[]>(() => [
        { header: "Mã thành viên", accessorKey: "maThanhVien", size: 150, },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Vai trò", accessorKey: "vaiTro", size: 150, },
        {
            header: "Phương thức khoán",
            accessorKey: "phuongThucKhoan",
            size: 250,
            enableEditing: true,
            Cell: ({ row }) => (
                <MySelect
                    data={phuongThucKhoanOptions}
                    value={row.original.phuongThucKhoan}
                    {...form.getInputProps(`${row.index}.phuongThucKhoan`)}
                />
            )
        },
        {
            header: "Kiến nghị",
            accessorKey: "kienNghi",
            size: 300,
            Cell: ({ row }) => (
                <MyTextArea
                    label=""
                    minRows={2}
                    value={row.original.kienNghi}
                    {...form.getInputProps(`${row.index}.kienNghi`)}
                />
            )
        },
    ], []);

    return (
        <MyDataTable
            enableRowSelection
            columns={columns}
            data={mockData}
            renderTopToolbarCustomActions={({ table }) => (
                <>
                    <MyButton crudType="export" />
                    <EvaluationMemberDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                </>
            )}
        />
    );
}

const mockData: IEvaluationMember[] = [
    {
        id: 1,
        maThanhVien: "NVTC001",
        hoTen: "Lê Văn An",
        vaiTro: "Tổ trưởng",
        phuongThucKhoan: "Khoán đến sản phẩm cuối cùng",
        kienNghi: "Đề nghị giữ nguyên kinh phí; cần bổ sung báo cáo tiến độ chi tiết.",
    },
    {
        id: 2,
        maThanhVien: "NVTC005",
        hoTen: "Trần Thị Bình",
        vaiTro: "Thư ký",
        phuongThucKhoan: "Khoán từng phần",
        kienNghi: "Cần làm rõ các khoản mục chi phí vật tư; giảm 5% kinh phí hội thảo.",
    },
    {
        id: 3,
        maThanhVien: "NVTC010",
        hoTen: "Hoàng Minh Đức",
        vaiTro: "Thành viên",
        phuongThucKhoan: "Khoán đến sản phẩm cuối cùng",
        kienNghi: "Kinh phí hợp lý, khuyến nghị sử dụng nguồn lực nội bộ tối đa.",
    },
];
