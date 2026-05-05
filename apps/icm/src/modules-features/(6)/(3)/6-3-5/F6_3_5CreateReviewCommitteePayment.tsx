'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteListOfMember from './F6_3_5DeleteListOfMember';
import { I6_3_5ReviewCommitteePayment } from "./F6_3_5ReadReviewCommitteePayment";
import FeatUpdateListOfMember from './F6_3_5UpdateListOfMember';

export interface I6_3_5ListOfMember {
    id?: number,
    code?: string,
    name?: string,
    position?: string,
    renumeration?: number;
}
export default function F6_3_5CreateReviewCommitteePayment() {
    const form = useForm<I6_3_5ReviewCommitteePayment>({
        initialValues: {
            decisionNumber: "",
            chairPerson: "",
            totalAmount: 0
        }
    })
    const query = useQuery<I6_3_5ListOfMember[]>({
        queryKey: ["F6_3_5CreateReviewCommitteePayment"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_5ListOfMember>[]>(
        () => [
            {
                header: "Mã thành viên",
                accessorKey: "code"
            },
            {
                header: "Họ và tên",
                accessorKey: "name"
            },
            {
                header: "Chức vụ",
                accessorKey: "position"
            },
        ],
        []
    )
    return (
        <MyButtonCreate objectName="Thanh toán thù lao hội đồng nhóm nghiên cứu" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MySelect label="Hội đồng" data={['Chọn quyết định hội đồng nghiệm thu đề tài']} />
            <TextInput label="Tổng thù lao chi trả" defaultValue="500000000" />
            <MyFileInput label="File biên bản" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <FeatUpdateListOfMember values={row.original} />
                            <FeatDeleteListOfMember id={row.original.id!} />
                        </MyCenterFull>
                    )
                }} />
        </MyButtonCreate>
    )
}

const data: I6_3_5ListOfMember[] = [
    {
        code: "GV00001",
        name: "Nguyễn Văn A",
        position: "Chủ tịch",
        renumeration: 50000000
    },

];