// src/modules-features/admin/672qaiu0sa/F_672qaiu0sa_Read.tsx
'use client';

import { AQButtonExportData, MyDataTable, MyFieldset, MySelect, MyButton, AQButtonCreateByImportFile } from "aq-fe-framework/components";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export interface F_672qaiu0sa_Read {
    id: number;
    maHocSinh: string;
    hoLot: string;
    ten: string;
    ngaySinh: string;
    gioiTinh: string;
    nhomMau: string;
    chieuCao: number;
    canNang: number;
    bmi: number;
    thiLuc: string;
    thinhLuc: string;
    timMach: number;
    hoHap: number;
    ketLuanSoBo: string;
    ngayKham: string;
    tienSuBenhLy: string;
    ketLuanYTe: string;
    ghiChuKetLuan: string;
}

// Mock data for students with medical examination info
const mockData: F_672qaiu0sa_Read[] = [
    {
        id: 1,
        maHocSinh: 'HS000001',
        hoLot: 'Tô Ngọc',
        ten: 'Lâm',
        ngaySinh: '01/01/2000',
        gioiTinh: 'Nam',
        nhomMau: 'O',
        chieuCao: 150,
        canNang: 40,
        bmi: 17.8,
        thiLuc: '10/10',
        thinhLuc: '10/10',
        timMach: 85,
        hoHap: 120,
        ketLuanSoBo: 'Sức khỏe tốt',
        ngayKham: '15/02/2025',
        tienSuBenhLy: 'Dị ứng nước',
        ketLuanYTe: 'Khỏe mạnh',
        ghiChuKetLuan: 'Khám định kỳ điều trị phản ứng da với nước'
    }
];

export default function F_672qaiu0sa_Read() {
    const [selectedClass, setSelectedClass] = useState<string | null>("11A6");
    const [tableData, setTableData] = useState<F_672qaiu0sa_Read[]>(mockData);
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Query for class data
    const classQuery = useQuery({
        queryKey: ['F_672qaiu0sa_ClassQuery'],
        queryFn: async () => [
            { value: '11A6', label: '11A6' },
            { value: '11A7', label: '11A7' },
            { value: '12A1', label: '12A1' },
            { value: '12A2', label: '12A2' },
        ]
    });

    // Export config
    const exportConfig = {
        fields: [
            { fieldName: "maHocSinh", header: "Mã học sinh" },
            { fieldName: "hoLot", header: "Họ lót" },
            { fieldName: "ten", header: "Tên" },
            { fieldName: "ngaySinh", header: "Ngày sinh" },
            { fieldName: "gioiTinh", header: "Giới tính" },
            { fieldName: "nhomMau", header: "Nhóm máu" },
            { fieldName: "chieuCao", header: "Chiều cao" },
            { fieldName: "canNang", header: "Cân nặng" },
            { fieldName: "bmi", header: "BMI" },
            { fieldName: "thiLuc", header: "Thị lực" },
            { fieldName: "thinhLuc", header: "Thính lực" },
            { fieldName: "timMach", header: "Tim mạch" },
            { fieldName: "hoHap", header: "Hô hấp" },
            { fieldName: "ketLuanSoBo", header: "Kết luận sơ bộ" },
            { fieldName: "ngayKham", header: "Ngày khám" },
            { fieldName: "tienSuBenhLy", header: "Tiền sử bệnh lý" },
            { fieldName: "ketLuanYTe", header: "Kết luận y tế" },
            { fieldName: "ghiChuKetLuan", header: "Ghi chú kết luận y tế" },
        ]
    };

    // Empty render function to enable editing - required by MyDataTable
    const renderRowActions = () => <></>;

    // Column table
    const ketLuanYTeColumns = useMemo<MRT_ColumnDef<F_672qaiu0sa_Read>[]>(() => [
        {
            accessorKey: 'maHocSinh',
            header: 'Mã học sinh',
            enableEditing: false,
        },
        {
            accessorKey: 'hoLot',
            header: 'Họ lót',
            enableEditing: false,
        },
        {
            accessorKey: 'ten',
            header: 'Tên',
            enableEditing: false,
        },
        {
            accessorKey: 'ngaySinh',
            header: 'Ngày sinh',
            enableEditing: false,
        },
        {
            accessorKey: 'gioiTinh',
            header: 'Giới tính',
            enableEditing: false,
        },
        {
            accessorKey: 'nhomMau',
            header: 'Nhóm máu',
            enableEditing: false,
        },
        {
            accessorKey: 'chieuCao',
            header: 'Chiều cao',
            enableEditing: false,
        },
        {
            accessorKey: 'canNang',
            header: 'Cân nặng',
            enableEditing: false,
        },
        {
            accessorKey: 'bmi',
            header: 'BMI',
            enableEditing: false,
        },
        {
            accessorKey: 'thiLuc',
            header: 'Thị lực',
            enableEditing: false,
        },
        {
            accessorKey: 'thinhLuc',
            header: 'Thính lực',
            enableEditing: false,
        },
        {
            accessorKey: 'timMach',
            header: 'Tim mạch',
            enableEditing: false,
        },
        {
            accessorKey: 'hoHap',
            header: 'Hô hấp',
            enableEditing: false,
        },
        {
            accessorKey: 'ketLuanSoBo',
            header: 'Kết luận sơ bộ',
            enableEditing: false,
        },
        {
            accessorKey: 'ngayKham',
            header: 'Ngày khám',
            enableEditing: false,
        },
        {
            accessorKey: 'tienSuBenhLy',
            header: 'Tiền sử bệnh lý',
            enableEditing: false,
        },
        {
            accessorKey: 'ketLuanYTe',
            header: 'Kết luận y tế',
            enableEditing: true,
        },
        {
            accessorKey: 'ghiChuKetLuan',
            header: 'Ghi chú kết luận y tế',
            enableEditing: true,
        },
    ], []);

    if (classQuery.isLoading) return "Đang tải...";
    if (classQuery.isError) return "Có lỗi xảy ra!";

    return(
        <>
        <Group ml={20} mb={20}>
            <MySelect
                label="Chọn lớp"
                data={classQuery.data || []}
                value={selectedClass}
                onChange={setSelectedClass}
                w={200}
            />

        </Group>
            <MyFieldset title="Danh sách học sinh khám">


                <MyDataTable
                    columns={ketLuanYTeColumns}
                    data={tableData}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    enableEditing={true}
                    editDisplayMode="cell"
                    enableClickToCopy={false}
                    renderRowActions={renderRowActions}
                    renderTopToolbarCustomActions={()=>
                        <>
                            <MyButton crudType="save"/>
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={tableData}
                                objectName={'Danh sách kết luận y tế'}
                            />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    }
                />
            </MyFieldset>
        </>
    );
}