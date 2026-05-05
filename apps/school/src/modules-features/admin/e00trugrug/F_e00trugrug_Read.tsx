'use client'

import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyCenterFull, MyDataTable, MyFieldset, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_e00trugrug_Delete_Datarow from "./F_e00trugrug_Delete";
import F_e00trugrug_Save from "./F_e00trugrug_Save";
import { NumberFormatter } from "@mantine/core";

interface Ie00trugrug_ReadDanhSachSuKien {
    maSuKien: string;
    tenSuKien: string;
    ngayToChuc: Date;
    gioBatDau: string;
    thoiGian: string;
    ngayBatDauDangKy: Date;
    ngayKetThucDangKy: Date;
    trangThai: string;
    lePhi: number;
    diaDiem: string;
    ghiChuDiaDiem: string;
}

const mockDanhSachSuKien: Ie00trugrug_ReadDanhSachSuKien[] = [
    {
        maSuKien: 'SK0001',
        tenSuKien: 'Sự kiện 1',
        ngayToChuc: new Date(),
        gioBatDau: '08:00',
        thoiGian: '1h',
        ngayBatDauDangKy: new Date(),
        ngayKetThucDangKy: new Date(),
        trangThai: 'Đang diễn ra',
        lePhi: 100000,
        diaDiem: 'Đại học Bách Khoa',
        ghiChuDiaDiem: 'Đây là địa điểm của sự kiện',
    },
    {
        maSuKien: 'SK0002',
        tenSuKien: 'Sự kiện 2',
        ngayToChuc: new Date(), 
        gioBatDau: '09:00',
        thoiGian: '5h',
        ngayBatDauDangKy: new Date(),
        ngayKetThucDangKy: new Date(),
        trangThai: 'Đang diễn ra',
        lePhi: 150000,
        diaDiem: 'Đại học Kinh Tế',
        ghiChuDiaDiem: 'Đây là địa điểm của sự kiện',
    },
];

export default function F_e00trugrug_Read() {
    //===initiate===
    const [importData, setImportData] = useState(false);

    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    //===pseudo code===
    const danhSachSuKienQuery = useQuery<Ie00trugrug_ReadDanhSachSuKien[]>({
        queryKey: ['Fe00trugrug_ReadDanhSachSuKien'],
        queryFn: async () => mockDanhSachSuKien,
    });

    //===function===
    const exportConfig = {
        fields: [
            { fieldName: 'maSuKien', header: 'Mã sự kiện' },
            { fieldName: 'tenSuKien', header: 'Tên sự kiện' },
            { fieldName: 'ngayToChuc', header: 'Ngày tổ chức' },
            { fieldName: 'gioBatDau', header: 'Giờ bắt đầu' },
            { fieldName: 'thoiGian', header: 'Thời gian' },
            { fieldName: 'ngayBatDauDangKy', header: 'Ngày bắt đầu đăng ký' },
            { fieldName: 'ngayKetThucDangKy', header: 'Ngày kết thúc đăng ký' },
            { fieldName: 'trangThai', header: 'Trạng thái' },
            { fieldName: 'lePhi', header: 'Lệ phí' },
            { fieldName: 'diaDiem', header: 'Địa điểm' },
            { fieldName: 'ghiChuDiaDiem', header: 'Ghi chú địa điểm' },
        ],
    };

    //===component===
    const danhSachSuKienColumns = useMemo<MRT_ColumnDef<Ie00trugrug_ReadDanhSachSuKien>[]>(()=>[
            { accessorKey: 'maSuKien', header: 'Mã sự kiện' },
            { accessorKey: 'tenSuKien', header: 'Tên sự kiện' },
            { header: 'Ngày tổ chức', accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayToChuc!)), },
            { accessorKey: 'gioBatDau', header: 'Giờ bắt đầu' },
            { accessorKey: 'thoiGian', header: 'Thời gian' },
            { header: 'Ngày bắt đầu đăng ký', accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayBatDauDangKy!)), },
            { header: 'Ngày kết thúc đăng ký', accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayKetThucDangKy!)), },
            { accessorKey: 'trangThai', header: 'Trạng thái' },
            { accessorFn:(row) => <NumberFormatter
                thousandSeparator="."
                decimalSeparator=","
                value={row.lePhi}
            />, header: 'Lệ phí' },
            { accessorFn: (row) => <MyTextInput defaultValue={row.diaDiem!} onChange={() => { }}/>, header: 'Địa điểm' },
            { accessorFn: (row) => <MyTextArea defaultValue={row.ghiChuDiaDiem!} onChange={() => { }}/>, header: 'Ghi chú địa điểm' },
    ],[]);

    //===query stage condition===
    if (danhSachSuKienQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (danhSachSuKienQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    return(
        <MyFieldset title="Danh sách sự kiện">
                <MyDataTable
                    enableRowSelection={true}
                    columns={danhSachSuKienColumns}
                    data={danhSachSuKienQuery.data!}
                    renderTopToolbarCustomActions={() => 
                        <>
                            <F_e00trugrug_Save/>
                            <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form}
                            onSubmit={() => { console.log(form.values) }}/>
                            <AQButtonExportData 
                            data={danhSachSuKienQuery.data!}
                            exportConfig={exportConfig}
                            objectName="danhSachSuKien"/>
                            <MyButton crudType="delete">Xóa</MyButton>

                        </>
                    }
                    renderRowActions={({row}) => (
                        <MyCenterFull>
                            <F_e00trugrug_Delete_Datarow id={row.original.maSuKien}/>
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
    )
}