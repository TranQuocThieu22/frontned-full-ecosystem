'use client'
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I } from './F5_3_6Read';
export interface I5_3_6ListOfMember {
    id?: string //STT
    code?: string //Mã thành viên
    name?: string //Họ tên
    position?: string //Chức vụ
    remuneration?: number //Thù lao
}

export default function CreateListOfRenumeration() {
    const form = useForm<I>({
        initialValues: {
            id: 0,
            soQuyetDinh: "",
            chuTich: "",
            tongTien: 0,
            fileThanhToanSrc: "",
        }
    })
    const query = useQuery<I5_3_6ListOfMember[]>({
        queryKey: [`ListOfMember`],
        queryFn: async () => [
            {
                id: "1",
                code: "MEM001",
                name: "Nguyễn Văn A",
                position: "Trưởng ban",
                remuneration: 5000000,
            },
            {
                id: "2",
                code: "MEM002",
                name: "Trần Thị B",
                position: "Thành viên",
                remuneration: 3000000,
            },
            {
                id: "3",
                code: "MEM003",
                name: "Lê Văn C",
                position: "Thành viên",
                remuneration: 3000000,
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_3_6ListOfMember>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
        },
        {
            header: "Mã thành viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Chức vụ",
            accessorKey: "position",
        },
        {
            header: "Thù lao",
            accessorKey: "remuneration",
            Cell: ({ cell }) => {
                const remuneration = cell.getValue<number>();
                return remuneration ? remuneration.toLocaleString("vi-VN") + " VND" : "0 VND";
            },
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <MyButtonCreate objectName="Thanh toán thù lao" onSubmit={() => { }} modalSize={"100%"} form={form} >
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}>
                <MySelect label="Hội đồng" data={[]} placeholder="Chọn quyết định hội đồng xét duyệt đề cương" />
                <MyTextInput label="Tổng thù lao chi trả" placeholder="..." />
            </Flex>
            <MyFileInput label="File biên bản" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <MyActionIcon crudType="update" />
                            <MyActionIcon crudType="delete" />
                        </MyCenterFull>
                    );
                }}
            />
        </MyButtonCreate>
    );

}