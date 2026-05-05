'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';

interface hoSo {
    id?: number; // STT
    maHoSo?: string; // Mã hồ sơ
    tenHoSo?: string; // Tên hồ sơ
    
}

export default function F_hoSoUpdate({data}:{data:hoSo}) {
    const form = useForm<hoSo>({
        initialValues:data
    });
// Sử dụng useQuery để lấy dữ liệu
const query = useQuery<hoSo[]>({
    queryKey: ["hoSo"], // Khóa cache dữ liệu
    queryFn: async () => [
        {  maHoSo:'GBTT', 
        tenHoSo:'Giấy báo trúng tuyển' }
    ],
});

const [importData, setImportData] = useState(false);

const form_multiple = useForm<any>({
    initialValues: {
        importedData: []
    },
})
// Định nghĩa các cột của bảng
const columns = useMemo<MRT_ColumnDef<hoSo>[]>(
    () => [
        {
            header: "Mã hồ sơ", // Tên cột
            accessorKey: "maHoSo",
        },
        {
            header: "Tên hồ sơ", // Tên cột
            accessorKey: "tenHoSo",
        },
    ],
    []
);

// Xử lý trạng thái tải dữ liệu
if (query.isLoading) return "Đang tải dữ liệu...";
if (query.isError) return "Không có dữ liệu...";

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}  modalSize={'80%'}>
            <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns} // Cột
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                   
                    <Button>Chọn</Button>
                </>

            }
        />
        </MyActionIconUpdate>
        
    );
}
