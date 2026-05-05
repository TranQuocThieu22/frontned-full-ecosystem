import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';


interface I {
    id?: number;
    maChuongTrinh?: string; // Mã học viên
    maBacHe?: string; // Họ tên học viên
    nameCt?: string; // Giới tính
    nameBh?: string// Ngày sinh
   
    soHocKyKeHoach?: number;
  
}

export default function F_sofaqgcmfh_Update({ values }: { values: any }) {
    const danhSachLop = useQuery<I[]>({
        queryKey: [`F_sofaqgcmfh_Update`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return sampleData
        },
    })
    const disc = useDisclosure()

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [

            {
                header: "Mã chương trình",
                accessorKey: "maChuongTrinh" // Matches the "hoTen" property in I
            },
            {
                header: "Mã bậc hệ",
                accessorKey: "maBacHe" // Matches the "gioiTinh" property in I
            },
          
            {
                header: "Tên chương trình",
                accessorKey: "nameCt" // Matches the "soDienThoai" property in I
            },
            {
                header: "Tên bậc hệ",
                accessorKey: "nameBh" // Matches the "email" property in I
            },
            

           
        ],
        []
    );

    const [fileData, setFileData] = useState<any[]>([]);


    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])
    if (danhSachLop.isLoading) return "Đang tải dữ liệu..."
    if (danhSachLop.isError) return "Không có dữ liệu..."
    return (
        <Group>
            
            <MyActionIconUpdate modalSize={'xl'} form={form_multiple} onSubmit={() => { }} >
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={danhSachLop.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Button onClick={() => {
                        notifications.show({
                            message: "Chọn thành công",
                            color: "green"
                        })
                        disc[1].close()
                    }}>Chọn</Button>
                            </>
                        )
                    }}
                    // renderRowActions={({ row }) => {
                    //     return (
                    //         <MyCenterFull>
                    //             {/* <F8_1UpdateThongTinDsHocVien lecturerAndExpertValues={row.original} /> */}
                    //             {/* <F_sofaqgcmfh_Update values={row.original} /> */}
                    //             <F_sofaqgcmfh_Delete id={row.original.id!} />

                    //         </MyCenterFull>
                    //     );
                    // }}
                />
         </MyActionIconUpdate>

            

        </Group>
    )
}
const sampleData: I[] = [
    {
        id: 1,

    
    
      
        maChuongTrinh:"IT", // Mã học viên
        maBacHe:"CDCQ", // Họ tên học viên
        nameCt:"Công nghệ thông tin", // Giới tính
        nameBh: "Cao đẳng chính quy",// Ngày sinh
       
        soHocKyKeHoach:7,
    },
    
];
