'use client';

import {AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyDataTable, MyFieldset} from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_v1yki871z9_Delete from "./F_v1yki871z9_Delete";
import F_v1yki871z9_Create from "./F_v1yki871z9_Create";
import F_v1yki871z9_Update from "./F_v1yki871z9_Update";
import { utils_converter_getLabelByValue } from "@/utils/converter";

export interface F_v1yki871z9_Read {
    id: number;
    maBoDem: string; // mã bộ đếm
    tenBoDem: string; // tên bộ đếm
    loaiNghiepVu: string; // loại nghiệp vụ
    loaiDoiTuong: string; // loại đối tượng
    chuKyLapLai: string; // Chu kỳ lập lại
    tienTo: string; // Tiền tố
    hauTo: string; // Hậu tố
    chieuDai: string; // Chiều dài
    coDungSo0: boolean; // Có dùng số 0
}

export default function F_v1yki871z9_Read() {
    const [importData, setImportData] = useState(false);
    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // Query table
    const danhMucBoDemQuery = useQuery({
        queryKey: ['F_v1yki871z9_ReadQuery'],
        queryFn: async () => mockData
    });

    //export config
    const exportConfig = {
        fields:[
            {
                fieldName: "maBoDem", 
                header: "Mã bộ đếm"
            },
            {
                fieldName: "tenBoDem", 
                header: "Tên bộ đếm"
            },
            {
                fieldName: "loaiNghiepVu", 
                header: "Loại nghiệp vụ"
            },
            {
                fieldName: "loaiDoiTuong", 
                header: "Loại đối tượng"
            },
        ]
    }

    // column table
    const danhMucBoDemColumns = useMemo<MRT_ColumnDef<F_v1yki871z9_Read>[]>(() => [    
        {
            accessorKey: 'maBoDem',
            header: 'Mã bộ đếm',
        },
        {
            accessorKey: 'tenBoDem',
            header: 'Tên bộ đếm',
        },
        {
            accessorFn: (row) => utils_converter_getLabelByValue(loaiNghiepVuSelectData, row.loaiNghiepVu),
            header: 'Loại nghiệp vụ',
        },
        {
            accessorKey: 'loaiDoiTuong',
            header: 'Loại đối tượng',
        },
    ], []);

    if (danhMucBoDemQuery.isLoading) return "Đang tải...";
    if (danhMucBoDemQuery.isError) return "Có lỗi xảy ra!";

    return(
        <>
            <MyFieldset title="Danh mục bộ đếm">
            <MyDataTable
                columns={danhMucBoDemColumns}
                data={danhMucBoDemQuery.data!}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={()=>
                <>
                    <F_v1yki871z9_Create/>
                    <AQButtonCreateByImportFile 
                        setImportedData={setImportData}
                        form={form}
                        onSubmit={() => console.log(form.values) }

                    />
                    <AQButtonExportData
                        exportConfig={exportConfig}
                        data={danhMucBoDemQuery.data!}
                        objectName={'Danh sách bộ đếm'}
                    />
                     <MyButton crudType='delete'>Xóa</MyButton>
                </>
                }
                renderRowActions={({ row }) => 
                <>
                    <F_v1yki871z9_Update data={row.original}/>
                    <F_v1yki871z9_Delete id={row.original.maBoDem}/>
                </>
                }
            />
            </MyFieldset>
        </>
    );


    
}

const mockData: F_v1yki871z9_Read[] = [
    {
        id: 1,
        maBoDem: 'HSTS',
        tenBoDem: 'Mã hồ sơ thí sinh',
        loaiNghiepVu: '3',
        loaiDoiTuong: 'Toàn trường',
        chuKyLapLai: "Lặp lại",
        tienTo: "",
        hauTo: "",
        chieuDai: "",
        coDungSo0: true
    }
]


export enum loaiNghiepVuSelectData {
    "Mã minh chứng" = 1,
    "Mã báo cáo tự đánh giá" = 2,
    "Hồ sơ thí sinh" = 3
}

export const chuKyLapLaiSelectData = [
    { value: "Không lặp lại", label: "Không lặp lại" },
    { value: "Lặp lại", label: "Lặp lại" }
]
export const loaiDoiTuongSelectData = [
    { value: "Toàn đơn vị", label: "Toàn đơn vị" },
    { value: "Toàn trường", label: "Toàn trường" }
]