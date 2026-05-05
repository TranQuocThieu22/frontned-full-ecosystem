"use client";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { Button, Paper } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import F_mmlu9n2jq1_Delete from "./F_mmlu9n2jq1_Delete";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MySelect from "@/components/Combobox/Select/MySelect";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { MyCenterFull } from "aq-fe-framework/components";

// Interface dữ liệu
export interface I_mmlu9n2jq1_Read {
    id?: number;
    maHocSinh?: string;
    hoTen?: string;
    lop?: string;
    gioiTinh?: string;
    ngaySinh?: Date;
    loaiDangKy?: string;
    ngayAn?: string;
    soNgay?: number;
    cheDoAn?: string;
    yeuCauDacBiet?: string;
    thanhTien?: number;
    daThanhToan?: boolean;
    ngayThanhToan?: Date;
    loaiGiaoDich?: string;
    maGiaoDich?: string;
    ghiChu?: string;
}

export default function F_mmlu9n2jq1_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [filterLoaiDangKy, setFilterLoaiDangKy] = useState<string | null>(null);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const queryStudentDebt = useQuery<I_mmlu9n2jq1_Read[]>({
        queryKey: ["F_mmlu9n2jq1_Read"],
        queryFn: async () => [
            {
                id: 1,
                maHocSinh: "HS001",
                hoTen: "Nguyễn Văn A",
                lop: "10A1",
                gioiTinh: "Nam",
                ngaySinh: new Date(),
                loaiDangKy: "Tháng",
                ngayAn: "03/04/2025-03/05/2025",
                soNgay: 20,
                cheDoAn: "Chay",
                yeuCauDacBiet: "",
                thanhTien: 400000,
                daThanhToan: true,
                ngayThanhToan: new Date(),
                loaiGiaoDich: "Chuyển khoản",
                maGiaoDich: "GD001",
                ghiChu: ""
            },
            {
                id: 2,
                maHocSinh: "HS002",
                hoTen: "Trần Thị B",
                lop: "10A2",
                gioiTinh: "Nữ",
                ngaySinh: new Date(),
                loaiDangKy: "Ngày",
                ngayAn: "03/04/2025-03/05/2025",
                soNgay: 15,
                cheDoAn: "Thường",
                yeuCauDacBiet: "Không hành",
                thanhTien: 300000,
                daThanhToan: false,
                ngayThanhToan: new Date(),
                loaiGiaoDich: "",
                maGiaoDich: "",
                ghiChu: "Thanh toán sau"
            },
            {
                id: 3,
                maHocSinh: "HS003",
                hoTen: "Lê Văn C",
                lop: "10A3",
                gioiTinh: "Nam",
                ngaySinh: new Date(),
                loaiDangKy: "Tuần",
                ngayAn: "03/04/2025-03/05/2025",
                soNgay: 5,
                cheDoAn: "Chay",
                yeuCauDacBiet: "",
                thanhTien: 100000,
                daThanhToan: true,
                ngayThanhToan: new Date(),
                loaiGiaoDich: "Tiền mặt",
                maGiaoDich: "GD003",
                ghiChu: ""
            },
        ]
    });

    // Filter data based on selected loaiDangKy
    const filteredData = useMemo(() => {
        if (!queryStudentDebt.data || !queryStudentDebt.isSuccess) return [];
        if (!filterLoaiDangKy) return queryStudentDebt.data;
        return queryStudentDebt.data.filter(row => row.loaiDangKy === filterLoaiDangKy);
    }, [queryStudentDebt.data, queryStudentDebt.isSuccess, filterLoaiDangKy]);

    const exportConfig = {
        fields: [
            { fieldName: "maHocSinh", header: "Mã học sinh" },
            { fieldName: "hoTen", header: "Họ tên" },
            { fieldName: "lop", header: "Lớp" },
            { fieldName: "gioiTinh", header: "Giới tính" },
            { fieldName: "ngaySinh", header: "Ngày sinh" },
            { fieldName: "loaiDangKy", header: "Loại đăng ký" },
            { fieldName: "ngayAn", header: "Ngày ăn" },
            { fieldName: "soNgay", header: "Số ngày" },
            { fieldName: "cheDoAn", header: "Chế độ ăn" },
            { fieldName: "yeuCauDacBiet", header: "Yêu cầu đặc biệt" },
            { fieldName: "thanhTien", header: "Thành tiền" },
            { fieldName: "daThanhToan", header: "Đã thanh toán" },
            { fieldName: "ngayThanhToan", header: "Ngày thanh toán" },
            { fieldName: "loaiGiaoDich", header: "Loại giao dịch" },
            { fieldName: "maGiaoDich", header: "Mã giao dịch" },
            { fieldName: "ghiChu", header: "Ghi chú" }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<I_mmlu9n2jq1_Read>[]>(
        () => [
            { header: "Mã học sinh", accessorKey: "maHocSinh" },
            { header: "Họ tên", accessorKey: "hoTen", size: 230 },
            { header: "Lớp", accessorKey: "lop" },
            { header: "Giới tính", accessorKey: "gioiTinh" },
            {
                header: "Ngày sinh",
                accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.ngaySinh!)),
            },
            { header: "Loại đăng ký", accessorKey: "loaiDangKy" },
            { header: "Ngày ăn", accessorKey: "ngayAn", size: 240 },
            { header: "Số ngày", accessorKey: "soNgay" },
            { header: "Chế độ ăn", accessorKey: "cheDoAn" },
            { header: "Yêu cầu đặc biệt", accessorKey: "yeuCauDacBiet", size: 240 },
            {
                header: "Thành tiền",
                accessorKey: "thanhTien",
                Cell: ({ cell }) =>
                    cell.getValue<number>().toLocaleString("vi-VN"),
            },
            {
                header: "Đã thanh toán",
                accessorKey: "daThanhToan",
                Cell: ({ row }) => (
                    <MyCenterFull>
                        <MyCheckbox readOnly checked={row.original.daThanhToan || false} />
                    </MyCenterFull>
                ),
            },
            {
                header: "Ngày thanh toán",
                accessorFn: row => {
                    const newDate = new Date(row.ngayThanhToan!)
                    return `${utils_date_dateToDDMMYYYString(newDate)} ${newDate.toLocaleTimeString("vi")}`;
                },
                size: 240
            },
            { header: "Loại giao dịch", accessorKey: "loaiGiaoDich" },
            { header: "Mã giao dịch", accessorKey: "maGiaoDich" },
            { header: "Ghi chú", accessorKey: "ghiChu" }
        ],
        []
    );

    const LOAI_DK_DATA = ['Ngày', 'Tuần', 'Tháng'];

    if (queryStudentDebt.isLoading) return "đang tải dữ liệu";
    if (queryStudentDebt.isError) return "không có dữ liệu";

    return (
        <>
            <MyFieldset title="Danh sách học sinh đăng ký suất ăn">
                <MySelect
                    mb={20}
                    label="Chọn loại đăng ký"
                    value={filterLoaiDangKy}
                    onChange={setFilterLoaiDangKy}
                    w={300}
                    data={LOAI_DK_DATA.map(option => ({ value: option, label: option }))}
                    clearable
                    placeholder="Chọn loại đăng ký"
                />
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    columns={columns}
                    data={filteredData}
                    renderTopToolbarCustomActions={() => (
                        <>
                            <AQButtonCreateByImportFile
                                setImportedData={setFileData}
                                onSubmit={() => console.log("data: ")}
                                form={form_multiple}
                            />
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dmTHPB"
                                data={filteredData}
                                exportConfig={exportConfig}
                            />
                            <Button color="red" leftSection={<IconTrash />}>Xoá</Button>
                        </>
                    )}
                    renderRowActions={({ row }) => (
                        !row.original.daThanhToan ? (
                            <MyCenterFull>
                                <F_mmlu9n2jq1_Delete id={row.original.id!} contextData={row.original.maHocSinh!} />
                            </MyCenterFull>
                        ) : null
                    )}
                />
            </MyFieldset>
        </>
    );
}

