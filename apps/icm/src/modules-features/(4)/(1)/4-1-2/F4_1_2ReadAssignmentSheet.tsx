'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import { Switch } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface F4_1_2 {
    code: string,
    name: string,
    soGioDetai: number,
    soGioBaiBao: number,
    soGiohoithao: number,
    nhanXet: string
}
export default function F4_1_2ReadAssignmentSheet() {
    const query = useQuery({
        queryKey: ["F4_1_2ReadAssignmentSheet"],
        queryFn: () => {
            return data
        }
    })
    const columns = useMemo<MRT_ColumnDef<F4_1_2>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "code"
            },
            {
                header: "Họ và tên",
                accessorKey: "name"
            },
            {
                header: "Số giờ đề tài",
                accessorKey: "soGioDetai"
            },
            {
                header: "Số giờ bài báo",
                accessorKey: "soGioBaiBao"
            },
            {
                header: "Số giờ hội thảo",
                accessorKey: "soGiohoithao"
            },
            {
                header: "Nhận xét",
                accessorKey: "nhanXet"
            },
        ],
        []
    );
    if (query.isLoading) return "Loading..."
    if (query.isError) return "có lỗi xảy ra!"
    return (
        <MyDataTable data={query.data!} columns={columns} renderRowActions={() => <DuyetDeTai></DuyetDeTai>} />
    )
}

function DuyetDeTai() {
    const disc = useDisclosure(false)
    return (
        <MyButtonModal modalSize={'xl'} label="Duyệt" title="Phê duyệt đăng ký" disclosure={disc}>
            <Switch label={"Duyệt"} />
            <MyTextEditor label="Nhận xét" />
            <MyButton crudType="validate" onClick={() => disc[1].close()}>Duyệt</MyButton>
        </MyButtonModal>
    )
}


const data: F4_1_2[] = [
    { code: "gv001", name: "Trần Quốc Thiệu", soGioDetai: 150, soGioBaiBao: 50, soGiohoithao: 20, nhanXet: "Khả thi" }
]