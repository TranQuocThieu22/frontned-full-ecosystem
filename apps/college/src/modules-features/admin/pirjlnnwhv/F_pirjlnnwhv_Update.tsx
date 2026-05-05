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
    maKhoa?: string; // Mã học viên
    nameKhoa?: string; // Họ tên học viên
    nameCt?: string; // Giới tính
    nameBh?: string// Ngày sinh
    nhhkVao?:string
    nhhkRa?:string
    nienKhoa?:string
    ngonNgu?:string
    chiNhanh?:string
   
   
  
}

export default function F_pirjlnnwhv_Update({ values }: { values: any }) {
    const danhSachLop = useQuery<I[]>({
        queryKey: [`F_pirjlnnwhv_Update`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return sampleData
        },
    })
    const disc = useDisclosure()

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            
            {
                header: "Mã khoá",
                accessorKey: "maKhoa" // Matches the "hoTen" property in I
            },
            {
                header: "Tên khoá",
                accessorKey: "nameKhoa" // Matches the "gioiTinh" property in I
            },
          
            {
                header: "Chương trình",
                accessorKey: "nameCt" // Matches the "soDienThoai" property in I
            },
            {
                header: "Bậc hệ",
                accessorKey: "nameBh" // Matches the "email" property in I
            },
            {
                header: "NHHK vào",
                accessorKey: "nhhkVao" // Matches the "email" property in I
            },
            {
                header: "NHHK ra",
                accessorKey: "nhhkRa" // Matches the "email" property in I
            },
            {
                header: "Niên khoá",
                accessorKey: "nienKhoa" // Matches the "email" property in I
            },
            {
                header: "Ngôn ngữ đào tạo",
                accessorKey: "ngonNgu" // Matches the "email" property in I
            },
            {
                header: "Chi nhánh",
                accessorKey: "chiNhanh" // Matches the "email" property in I
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
                    //             {/* <F_pirjlnnwhv_Update values={row.original} /> */}
                    //             <F_pirjlnnwhv_Delete id={row.original.id!} />

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

    
       
        maKhoa: "1", // Mã học viên
        nameKhoa: "IT2024-1", // Họ tên học viên
        nameCt: "Công nghệ thông tin khoá 24", // Giới tính
        nameBh: "Đại học chính quy",// Ngày sinh
        nhhkVao:"2024-1",
        nhhkRa:"2028-2",
   
        nienKhoa:"2024-2028",
        ngonNgu:"Tiếng Việt",
        chiNhanh:"Thủ Đức",
        
      
        
    },
    
];
