'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Checkbox, Flex, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I6_3_1_3SummaryOfScoringResults } from "./F6_3_1_3ReadSummaryOfScoringResults";


export interface I6_3_1_3ListOfTopic {
    id?: number,
    code?: string,
    topicName?: string,
    groupName?: string,
    leaderName?: string,
    point?: number
}
export default function F6_3_1_3CreateSummaryOfScoringResults() {
    const form = useForm<I6_3_1_3SummaryOfScoringResults>({
        initialValues: {
            decisionNumber: "",
            topicCode: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            point: 0
        }
    })
    const query = useQuery<I6_3_1_3ListOfTopic[]>({
        queryKey: ["F6_3_1_3CreateSummaryOfScoringResults"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_1_3ListOfTopic>[]>(
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
                header: "trưởng nhóm",
                accessorKey: "leaderName"
            },
            {
                header: "Điểm trung bình",
                accessorKey: "point"
            },
            {
                header: "Duyệt",
                accessorFn: () =>
                    <Checkbox />


            }
        ],
        []
    )
    return (
        <MyButtonCreate objectName="Tổng hợp kết quả đánh giá hội đồng xét duyệt đề tài" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}

            >
                <MySelect label="Trưởng ban kiểm phiếu" data={['Chọn thành viên hội đồng xét duyệt đề tài nhóm n']} style={{ width: "50%" }} />
                <MySelect label="Hội đồng" data={['Chọn quyết định hội đồng xét duyệt đề tài nhóm nghiên cứu']} style={{ width: "50%" }} />
            </Flex>

            <TextInput label="Số thành viên ban kiểm" />
            <MyFileInput label="File biên bản" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <h3>Sửa/ Xóa</h3>
                        </MyCenterFull>
                    )
                }} />
        </MyButtonCreate>
    )
}

const data: I6_3_1_3ListOfTopic[] = [
    {
        code: "DT00001",
        topicName: "Đổi mới phương pháp giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        point: 80
    },

];