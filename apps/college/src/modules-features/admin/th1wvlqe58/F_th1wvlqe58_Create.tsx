import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button, Fieldset, Flex, Group, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';

interface I {
    STT?: number;              // Số thứ tự (BTT - Bảng thứ tự)
    Masinhvien?: string;     // Mã sinh viên (ví dụ: "SV001")
    Hoten?: string;           // Họ tên (ví dụ: "Tạ Ngọc Lâm")
    Ngaysinh?: string;        // Ngày sinh (ví dụ: "07/09/2000")
    Gioitinh?: string;        // Giới tính (ví dụ: "Nam")
    Malop?: string;          // Mã khối (ví dụ: "IT2001")
    Makhoa?: string;         // Mã ngành (ví dụ: "IT204")
    Mamonhoc?: string;   // Tình trạng học (ví dụ: "Đang học trung cấp")
    Tenmonhoc?: string;
    Nhomhoc?: string;         // Nhóm học (ví dụ: "01")
    NHHK?: string;          // Năm học (ví dụ: "2024-1")
    Chuyencan?: string;     // Chuyên ngành (ví dụ: "6")
    Giuaki?: string;       // Ghs chú kỳ (ví dụ: "7")
    Cuoiki?: string;       // Ghi chú lý thuyết (ví dụ: "6.5")
}



export default function F_th1wvlqe58_Create() {

    const studentListRegistration = useQuery<I[]>({
        queryKey: ["F_th1wvlqe58_Create"], queryFn: async () => {
            return sampleData
        }
    })

    const disc = useDisclosure()

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [

            {
                accessorKey: "Masinhvien",
                header: "Mã SV",
              
                enableClickToCopy: true,
            },
            {
                accessorKey: "Hoten",
                header: "Họ Tên",
             
            },
            {
                accessorKey: "Ngaysinh",
                header: "Ngày Sinh",
            
            },
            {
                accessorKey: "Gioitinh",
                header: "Giới Tính",
              
            },
            {
                accessorKey: "Malop",
                header: "Mã Lớp",
          
            },
            {
                accessorKey: "Makhoa",
                header: "Mã Khoa",
         
            },
            {
                accessorKey: "Mamonhoc",
                header: "Mã Môn Học",
            
            },
            {
                accessorKey: "Tenmonhoc",
                header: "Tên Môn Học",
                },
            {
                accessorKey: "Nhomhoc",
                header: "Nhóm Học",
              
            },
            {
                accessorKey: "NHHK",
                header: "NHHK",
            
            },
            {
                accessorKey: "Chuyencan",
                header: "Chuyên Cần",
          
            },
            {
                accessorKey: "Giuaki",
                header: "Giữa Kỳ",
              
            },
            {
                accessorKey: "Cuoiki",
                header: "Cuối Kỳ ",
              
            },], []

    )

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        }
    });
    useEffect(() => {
        form_multiple.setFieldValue('importedData', fileData);
    }, [fileData]);



    const sampleData: I[] = [
        {
            STT: 1,
            Masinhvien: "SV001",
            Hoten: "Tạ Ngọc Lâm",
            Ngaysinh: "01/01/2000",
            Gioitinh: "Nam",
            Malop: "IT2001",
            Makhoa: "IT24",
            Mamonhoc: "IT2021",
            Tenmonhoc: "Quản trị mạng",
            Nhomhoc: "01",
            NHHK: "2024-1",
            Chuyencan: "5",
            Giuaki: "8",
            Cuoiki: "6.5",
        },
        {
            STT: 2,
            Masinhvien: "SV001",
            Hoten: "Tạ Ngọc Lâm",
            Ngaysinh: "01/01/2000",
            Gioitinh: "Nam",
            Malop: "IT2001",
            Makhoa: "IT24",
            Mamonhoc: "IT2022",
            Tenmonhoc: "Cơ sở dữ liệu",
            Nhomhoc: "01",
            NHHK: "2024-1",
            Chuyencan: "",
            Giuaki: "",
            Cuoiki: "",
        },
        {
            STT: 3,
            Masinhvien: "SV001",
            Hoten: "Tạ Ngọc Lâm",
            Ngaysinh: "01/01/2000",
            Gioitinh: "Nam",
            Malop: "IT2001",
            Makhoa: "IT24",
            Mamonhoc: "IT2023",
            Tenmonhoc: "Cấu trúc dữ liệu và giải thuật",
            Nhomhoc: "01",
            NHHK: "2024-1",
            Chuyencan: "",
            Giuaki: "",
            Cuoiki: "",
        },
        {
            STT: 4,
            Masinhvien: "SV001",
            Hoten: "Tạ Ngọc Lâm",
            Ngaysinh: "01/01/2000",
            Gioitinh: "Nam",
            Malop: "IT2001",
            Makhoa: "IT24",
            Mamonhoc: "IT2024",
            Tenmonhoc: "Truyền thông số",
            Nhomhoc: "01",
            NHHK: "2024-1",
            Chuyencan: "",
            Giuaki: "",
            Cuoiki: "",
        },
    ]
    const selectData = sampleData.map((chonSinhVien) =>({
        value: chonSinhVien.Mamonhoc || ''  ,
  label: `${chonSinhVien.Masinhvien} - ${chonSinhVien.Hoten}`,
    })
)
    return (
        <Group>

            <MyButtonModal title="Danh sách kết quả đăng ký môn học trong học kỳ theo sinh viên"label='Thêm' modalSize={'90%'} onSubmit={() => {} } disclosure={disc} >
              
                <Flex align="center" gap="xs">
                    <Text size="sm">Chọn sinh viên:</Text>
                    <Select
                        size="xs"
                        radius="xl"
                        placeholder="Select placeholder"
                        data= {selectData}
                     defaultValue={selectData[0]?.value}
                    />
                </Flex>
                
                <Fieldset legend="Danh sách kết quả đăng kí của sinh viên">


                    <MyDataTable

                        enableRowSelection={true}
                        renderTopToolbarCustomActions={() => (
                            <>
                          <Button  color='green'>Chọn
                            </Button> 
                            </>
                        )}

                        columns={columns} data={studentListRegistration.data!} />
                </Fieldset>
            </MyButtonModal>


        </Group>

    )
}
