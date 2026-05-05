'use client'

import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile,MySelect, AQButtonExportData, MyDataTable, MyDateInput, MyFieldset, MyTextInput, MyButton } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_9wxwn63rjf_Update from "./F_9wxwn63rjf_Update";


interface I9wxwn63rjf_ReadLichKhamSucKhoeTheoLop {
    maLop: string;
    khoi: string;
    siSo: number;
    ngayKham: Date;
    gioKham: string;
    diaDiem: string;
    donViKham: string;
    trangThai: string;
}

interface ISelectBoxProps {
    label: string;
    value: string;
}

const mockData: I9wxwn63rjf_ReadLichKhamSucKhoeTheoLop[] = [
    {
        maLop: '11A6',
        khoi: '11',
        siSo: 32,
        ngayKham: new Date(),
        gioKham: '07:30',
        diaDiem: 'Phòng Y tế',
        donViKham: 'Trung tâm y tế huyện',
        trangThai: '1'
    }
]

const trangThaiOptions: ISelectBoxProps[] = [
    {
        label: 'Chưa khám',
        value: '1'
    },
    {
        label: 'Khám 1 phần',
        value: '2'
    },
    {
        label: 'Đã khám',
        value: '3'
    }
]

export default function F_9wxwn63rjf_Read() {
    //===initiate===
    const [importData, setImportData] = useState(false);
    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    //===pseudo code===
    const lichKhamSucKhoeTheoLopQuery = useQuery<I9wxwn63rjf_ReadLichKhamSucKhoeTheoLop[]>({
        queryKey: ['F9wxwn63rjf_ReadLichKhamSucKhoeTheoLopQuery'],
        queryFn: async () => mockData,
    });

    const trangThaiQuery = useQuery<ISelectBoxProps[]>({
        queryKey: ['F9wxwn63rjf_ReadTrangThaiQuery'],
        queryFn: async () => trangThaiOptions,
    });
    
    //===function===
    const exportConfig = {
        fields: [
            { fieldName: 'maLop', header: 'Mã lớp' },
            { fieldName: 'khoi', header: 'Khối' },
            { fieldName: 'siSo', header: 'Sĩ số' },
            { fieldName: 'ngayKham', header: 'Ngày khám' },
            { fieldName: 'gioKham', header: 'Giờ khám' },
            { fieldName: 'diaDiem', header: 'Địa điểm' },
            { fieldName: 'donViKham', header: 'Đơn vị khám' },
            { fieldName: 'trangThai', header: 'Trạng thái' },
        ],
    };    

    const lichKhamSucKhoeTheoLopColumns = useMemo<MRT_ColumnDef<I9wxwn63rjf_ReadLichKhamSucKhoeTheoLop>[]>(()=>[
        { accessorFn: (row) => row.maLop, header: 'Mã lớp' },
        { accessorFn: (row) => row.khoi, header: 'Khối' },
        { accessorFn: (row) => row.siSo.toString(), header: 'Sĩ số' },
        { accessorFn: (row) => <MyDateInput defaultValue={(new Date(row.ngayKham))} onChange={() => {}}/>, header: 'Ngày khám' },
        { accessorFn: (row) => <MyTextInput defaultValue={row.gioKham} onChange={() => {}}/>, header: 'Giờ khám' }, //<TimePicker value={"20:00:00"} onChange={() => {}}/>
        { accessorFn: (row) => <MyTextInput defaultValue={row.diaDiem} onChange={() => {}}/>, header: 'Địa điểm' },
        { accessorFn: (row) => <MyTextInput defaultValue={row.donViKham} onChange={() => {}}/>, header: 'Đơn vị khám' },
        { accessorFn: (row) => <MySelect data={trangThaiQuery.data!} defaultValue={row.trangThai} onChange={() => {}}/>, header: 'Trạng thái' },
        
        
    ],[trangThaiQuery]);

    //===query stage condition===
    if (lichKhamSucKhoeTheoLopQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (lichKhamSucKhoeTheoLopQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    if (trangThaiQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (trangThaiQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    return(
        <>
            
            <MyFieldset title="Lịch khám sức khỏe theo lớp">
                <MyDataTable
                    enableRowSelection={true}
                    columns={lichKhamSucKhoeTheoLopColumns}
                    data={lichKhamSucKhoeTheoLopQuery.data!}
                    renderTopToolbarCustomActions={() => 
                        <>
                            <F_9wxwn63rjf_Update/>
                            <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form}
                            onSubmit={() => {  }}/>
                            <AQButtonExportData 
                            data={lichKhamSucKhoeTheoLopQuery.data!}
                            exportConfig={exportConfig}
                            objectName="lichKhamSucKhoeTheoLop"/>
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    }
                />
            </MyFieldset>
        </>
    )
}