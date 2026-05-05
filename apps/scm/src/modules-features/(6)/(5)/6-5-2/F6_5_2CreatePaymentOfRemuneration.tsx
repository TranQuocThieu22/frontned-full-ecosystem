'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Checkbox, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteMemberList from './F6_5_2DeleteMemberList';
import { I6_5_2PaymentOfRemuneration } from "./F6_5_2ReadPaymentOfRemuneration";
import FeatUpdateMemberList from './F6_5_2UpdateMemberList';
export interface I6_5_2ListOfMember {
    id?: number,
    code?: string,
    name?: string,
    position?: string,
    renumeration?: number;
}
export default function F6_5_2CreatePaymentOfRemuneration() {
    const form = useForm<I6_5_2PaymentOfRemuneration>({
        initialValues: {
            decisionNumber: "",
            chairPerson: "",
            totalAmount: 0
        }
    })
    const query = useQuery<I6_5_2ListOfMember[]>({
        queryKey: ["F6_5_2CreatePaymentOfRemuneration"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_5_2ListOfMember>[]>(
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
            {
                header: "Thù lao",
                accessorKey: "renumeration"
            },
            {
                header: "Đã nhận",
                accessorFn: () =>
                    <Checkbox />


            }
        ],
        []
    )
    return (
        <MyButtonCreate objectName="Thanh toán thù lao hội đồng nhóm nghiên cứu" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Hội đồng" data={['Chọn quyết định hội đồng nghiệm thu đề tài']} style={{ width: "50%" }} />
                <TextInput label="Tổng thù lao chi trả" defaultValue="500000000" style={{ width: "50%" }} />
            </MyFlexRow>

            <MyFileInput label="File biên bản" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <FeatUpdateMemberList values={row.original} />
                            <FeatDeleteMemberList id={row.original.id!} />
                        </MyCenterFull>
                    )
                }} />
        </MyButtonCreate>
    )
}

const data: I6_5_2ListOfMember[] = [
    {
        code: "GV00001",
        name: "Nguyễn Văn A",
        position: "Chủ tịch",
        renumeration: 50000000
    },

];