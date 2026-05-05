'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Fieldset, Flex, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DeleteListOfRecommend from './F6_3_6DeleteListOfRecommend';
import { I6_3_6ResearchAssignmentDecision } from "./F6_3_6ReadResearchAssignmentDecision";
import UpdateListOfRecommend from './F6_3_6UpdateListOfRecommend';

export interface I6_3_6ListOfRecommend {
    id?: number,
    code?: string,
    topicName?: string,
    groupName?: string,
    leaderName?: string,
    renumeration?: number;
}
export default function F6_3_6CreateResearchAssignmentDecision() {
    const form = useForm<I6_3_6ResearchAssignmentDecision>({
        initialValues: {
            decisionNumber: "",
            decisionDate: "",
            decisionName: "",
            totalAmount: 0
        }
    })
    const query = useQuery<I6_3_6ListOfRecommend[]>({
        queryKey: ["F6_3_6CreateResearchAssignmentDecision"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_6ListOfRecommend>[]>(
        () => [
            {
                header: "Mã đề tài",
                accessorKey: "code"
            },
            {
                header: "Tên đề tài",
                accessorKey: "topicName"
            },
            {
                header: "Tên nhóm nghiên cứu",
                accessorKey: "groupName"
            },
            {
                header: "Trưởng nhóm",
                accessorKey: "leaderName"
            },
            {
                header: "Kinh phí",
                accessorKey: "renumeration"
            },
        ],
        []
    )
    return (
        <MyButtonCreate objectName="Quyết định giao đề tài" form={form} onSubmit={() => { }} modalSize={"100%"}>

            <MyFlexRow>
                <TextInput label="Số quyết định" />
                <MyDateInput label="Ngày quyết định" />
            </MyFlexRow>
            <MyTextInput label="Tên quyết định" />
            <Fieldset>
                <Flex justify="space-between" align="center" mb="sm">
                    <h2>Danh sách đề xuất đã cập nhập thuyết minh</h2>
                    <Button>Thêm</Button>
                </Flex>
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <UpdateListOfRecommend values={row.original} />
                                <DeleteListOfRecommend id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }} />
                <MyFileInput label="File quyết định" />
            </Fieldset>

        </MyButtonCreate>
    )
}

const data: I6_3_6ListOfRecommend[] = [
    {
        code: "Dt0001",
        topicName: "Đổi mới giáo dục đại học",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn C",
        renumeration: 20000000
    },

];