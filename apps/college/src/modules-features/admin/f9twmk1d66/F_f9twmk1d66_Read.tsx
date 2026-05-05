'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button } from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_f9twmk1d66_Delete from "./F_7f9twmk1d66_Delete";
import F_f9twmk1d66_Create from "./F_f9twmk1d66_Create";
import F_f9twmk1d66_Update from "./F_f9twmk1d66_Update";

interface I {
    id?: number;
    maLoaiThuVL?: string;
    tenLoaiThuVL?: string;
    donViTinh?: string;
    donGia?: number;
    maNhomThuVL?: string;
    maBoDem?: string;
    macDinh?: boolean;
    khongThu?: boolean;
    coThue?: boolean;
    ghiChu?: string;
}


// Mockup data
export const I_f9twmk1d66_dataDonViTinh = [
    { value: "DV1", label: 'Buổi' },
    { value: "DV2", label: 'Ngày' },
    { value: "DV3", label: 'Tuần' },
    { value: "DV4", label: 'Tháng' },
]

export const I_f9twmk1d66_dataBoDem = [
    { value: "BD01", label: 'VL1' },
    { value: "BD02", label: 'VL2' },
    { value: "BD03", label: 'VL3' },
]

export const I_f9twmk1d66_dataNhomTVL = [
    { value: "THU01", label: "Dịch vụ phòng máy" },
    { value: "THU02", label: "Dịch vụ in ấn" },
    { value: "THU03", label: "Dịch vụ vận chuyển" },
    { value: "THU04", label: "Dịch vụ ký túc xá" },
]

export default function F_f9twmk1d66_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const query = useQuery<I[]>({
        queryKey: [`ListOfReasons`],
        queryFn: async () => [
            {
                id: 1,
                maLoaiThuVL: "LT01",
                tenLoaiThuVL: "Thi tiếng anh đầu vào",
                donViTinh: "DV1",
                donGia: 5000000,
                maNhomThuVL: "THU01",
                maBoDem: "BD01",
                macDinh: true,
                khongThu: false,
                coThue: true,
                ghiChu: "Thi tiếng anh đầu vào"
            },
            {
                id: 2,
                maLoaiThuVL: "LT02",
                tenLoaiThuVL: "Phí tài liệu",
                donViTinh: "DV2",
                donGia: 200000,
                maNhomThuVL: "THU02",
                maBoDem: "BD02",
                macDinh: false,
                khongThu: true,
                coThue: false,
                ghiChu: "Phí tài liệu học tập"
            },
            {
                id: 3,
                maLoaiThuVL: "LT03",
                tenLoaiThuVL: "Phí ký túc xá",
                donViTinh: "DV1",
                donGia: 1000000,
                maNhomThuVL: "THU03",
                maBoDem: "BD03",
                macDinh: true,
                khongThu: false,
                coThue: false,
                ghiChu: "Phí ở ký túc xá theo tháng"
            },
            {
                id: 4,
                maLoaiThuVL: "LT04",
                tenLoaiThuVL: "Phí bảo hiểm y tế",
                donViTinh: "DV3",
                donGia: 700000,
                maNhomThuVL: "THU04",
                maBoDem: "BD03",
                macDinh: true,
                khongThu: false,
                coThue: false,
                ghiChu: "Bảo hiểm y tế bắt buộc"
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã loại thu VL",
            accessorKey: "maLoaiThuVL",
        },
        {
            header: "Tên loại thu VL",
            accessorKey: "tenLoaiThuVL",
        },
        {
            header: "Đơn vị tính",
            accessorKey: "donViTinh",
            accessorFn: (row) => {
                return I_f9twmk1d66_dataDonViTinh.find(x => x.value === row.donViTinh)?.label;
            }
        },
        {
            header: "Đơn giá",
            accessorKey: "donGia",
            accessorFn: (row) => {
                return row.donGia?.toLocaleString('vi-VN');
            }
        },
        {
            header: "Nhóm thu VL",
            accessorKey: "maNhomThuVL",
            accessorFn: (row) => {
                return I_f9twmk1d66_dataNhomTVL.find(x => x.value === row.maNhomThuVL)?.label;
            }
        },
        {
            header: "Bộ đếm",
            accessorKey: "maBoDem",
            accessorFn: (row) => {
                return I_f9twmk1d66_dataBoDem.find(x => x.value === row.maBoDem)?.label;
            }
        },
        {
            header: "Mặc định",
            accessorKey: "macDinh",
            accessorFn: (row) => {
                return <MyCheckbox readOnly checked={row.macDinh} />
            }
        },
        {
            header: "Không thu",
            accessorKey: "khongThu",
            accessorFn: (row) => {
                return <MyCheckbox readOnly checked={row.khongThu} />
            }
        },
        {
            header: "Có thuế",
            accessorKey: "coThue",
            accessorFn: (row) => {
                return <MyCheckbox readOnly checked={row.coThue} />
            }
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "maLoaiThuVL", header: "Mã loại thu VL" },
            { fieldName: "tenLoaiThuVL", header: "Tên loại thu VL" },
            { fieldName: "donViTinh", header: "Đơn vị tính" },
            { fieldName: "donGia", header: "Đơn giá" },
            { fieldName: "maNhomThuVL", header: "Nhóm thu VL" },
            { fieldName: "maBoDem", header: "Bộ đếm" },
            { fieldName: "macDinh", header: "Mặc định" },
            { fieldName: "khongThu", header: "Không thu" },
            { fieldName: "coThue", header: "Có thuế" },
            { fieldName: "ghiChu", header: "Ghi chú" },
        ]
    }

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_f9twmk1d66_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsLoaiThuVangLai"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                </>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_f9twmk1d66_Delete id={row.original.id!} />
                        <F_f9twmk1d66_Update doituong={row.original} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
