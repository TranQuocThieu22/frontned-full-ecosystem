'use client'

import { U0DateToDDMMYYYString } from "@/utils/date";
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButtonModal, MyButtonViewPDF, MyCenterFull, MyCheckbox, MyDataTable, MyFieldset } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Iwmstx3k39c_DanhSachThongBaoDaGui {
    loaiThongBao: string;
    maHocSinh: string;
    hoTen: string;
    noiDung: string;
    fileDinhKem: string;
    zalo: boolean;
    email: boolean;
    sms: boolean;
    ngayGui: Date;
}

const mockDanhSachThongBaoDaGui: Iwmstx3k39c_DanhSachThongBaoDaGui[] = [
    {
        loaiThongBao: 'Cảnh cáo sức khỏe',
        maHocSinh: 'HS0000001',
        hoTen: 'Tô Ngọc Lâm',
        noiDung: 'Có dấu hiệu dị ứng với nước',
        fileDinhKem: '',
        zalo: true,
        email: true,
        sms: true,
        ngayGui: new Date(2025, 2, 15)
    }
]

export default function F_wmstx3k39c_ReadNotifi() {
    //===initiate===
    const disclosure = useDisclosure();

    //===pseudo code===
    const ketQuaGhiNhanQuery = useQuery<Iwmstx3k39c_DanhSachThongBaoDaGui[]>({
        queryKey: ['Fwmstx3k39c_ReadDanhSachThongBaoDaGui'],
        queryFn: async () => mockDanhSachThongBaoDaGui,
    });

    //===function===
    const exportConfig = {
        fields: [
            { fieldName: 'loaiThongBao', header: 'Loại thông báo' },
            { fieldName: 'maHocSinh', header: 'Mã học sinh' },
            { fieldName: 'hoTen', header: 'Họ tên' },
            { fieldName: 'noiDung', header: 'Nội dung' },
            { fieldName: 'fileDinhKem', header: 'File đính kèm' },
            { fieldName: 'zalo', header: 'Zalo' },
            { fieldName: 'email', header: 'Email' },
            { fieldName: 'sms', header: 'SMS' },
            { fieldName: 'ngayGui', header: 'Ngày gửi' },
        ]
    }

    //===component===
    const ketQuaGhiNhanColumns = useMemo<MRT_ColumnDef<Iwmstx3k39c_DanhSachThongBaoDaGui>[]>(()=>[
            { accessorKey: 'loaiThongBao', header: 'Loại thông báo' },
            { accessorKey: 'maHocSinh', header: 'Mã học sinh' },
            { accessorKey: 'hoTen', header: 'Họ tên' },
            { accessorKey: 'noiDung', header: 'Nội dung' },
            {accessorFn: (row) => <MyCenterFull><MyButtonViewPDF/></MyCenterFull>, header: 'File đính kèm' },
            { accessorFn:(row) => <MyCheckbox checked={row.zalo} onChange={() => {}}/>, header: 'Zalo' },
            { accessorFn:(row) => <MyCheckbox checked={row.email} onChange={() => {}}/>, header: 'Email' },
            { accessorFn:(row) => <MyCheckbox checked={row.sms} onChange={() => {}}/>, header: 'SMS' },
            { accessorFn:(row) => U0DateToDDMMYYYString(new Date(row.ngayGui!)), header: 'Ngày gửi' },
    ],[]);

    return (
        <MyButtonModal disclosure={disclosure} modalSize={"80%"} label="Xem chi tiết" color="violet" >
            <MyFieldset title="Danh sách thông báo đã gửi">
                <MyDataTable
                    enableRowSelection={true}
                    columns={ketQuaGhiNhanColumns}
                    data={ketQuaGhiNhanQuery.data!}
                    renderTopToolbarCustomActions={() => 
                        <>
                            <AQButtonExportData
                            data={ketQuaGhiNhanQuery.data!}
                            exportConfig={exportConfig}
                            objectName="danhSachThongBaoDaGui"/>
                        </>
                    }
                />
            </MyFieldset>
        </MyButtonModal>
    )
}