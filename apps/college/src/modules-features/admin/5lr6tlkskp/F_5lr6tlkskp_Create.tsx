import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from "react";


interface I {
    stt: number;          // Số thứ tự
    maPhong: string;      // Mã phòng
    tenPhong: string;     // Tên phòng
    tinhChat: string;     // Tính chất phòng (VD: Lý thuyết, Thực hành)
    day: string;          // Dãy phòng
    sucChuaHoc: number;   // Sức chứa học
    sucChuaThi: number;   // Sức chứa thi

}

export default function F_5lr6tlkskp_Create() {

    const listRoom = useQuery<I[]>({
        queryKey: ["F_5lr6tlkskp_Create"], queryFn: async () => {
            return sampleData
        }
    })
    const disc = useDisclosure()

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [

        { accessorKey: "maPhong", header: "Mã phòng" },
        { accessorKey: "tenPhong", header: "Tên phòng" },
        { accessorKey: "day", header: "Dãy" },
        { accessorKey: "tinhChat", header: "Tính chất phòng" },

        { accessorKey: "sucChuaHoc", header: "Sức chứa học" },
        { accessorKey: "sucChuaThi", header: "Sức chứa thi" },
    ], []);
    const sampleData = [
        {
            id: 1,
            stt: 1,          // Số thứ tự
            maPhong: "A1",      // Mã phòng
            tenPhong: "Phòng 1",     // Tên phòng
            tinhChat: "Lý thuyết",     // Tính chất phòng (VD: Lý thuyết, Thực hành)
            day: "1",          // Dãy phòng
            sucChuaHoc: 10,   // Sức chứa học
            sucChuaThi: 10,   // Sức chứa thi
        },
        {
            id: 2,
            stt: 2,          // Số thứ tự
            maPhong: "A2",      // Mã phòng
            tenPhong: "Phòng 2",     // Tên phòng
            tinhChat: "Lý thuyết",     // Tính chất phòng (VD: Lý thuyết, Thực hành)
            day: "1",          // Dãy phòng
            sucChuaHoc: 10,   // Sức chứa học
            sucChuaThi: 10,   // Sức chứa thi   
        }
    ]

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        }
    });
    useEffect(() => {
        form_multiple.setFieldValue('importedData', fileData);
    }, [fileData]);


    return (
        <MyButtonModal title="Danh sách phòng" label='Chọn' modalSize={'90%'} onSubmit={() => { }} color="green" disclosure={disc}>

            <MyDataTable columns={columns} data={listRoom.data ?? []}
                exportAble

                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button color="green">Chọn</Button>
                    </Group>
                )} />

        </MyButtonModal>
    )

}

