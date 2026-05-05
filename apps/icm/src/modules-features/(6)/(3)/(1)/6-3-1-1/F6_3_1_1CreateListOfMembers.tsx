'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Button, Fieldset, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteResearchGroupTopicList from './F6_3_1_1DeleteResearchGroupTopicList';
import FeatDeleteReviewCommitteeMemberList from './F6_3_1_1DeleteReviewCommitteeMemberList';
import { I6_3_1_1ListOfMembers } from "./F6_3_1_1ReadListOfMembers";
import FeatUpdateResearchGroupTopicList from './F6_3_1_1UpdateResearchGroupTopicList';
import FeatUpdateReviewCommitteeMemberList from './F6_3_1_1UpdateReviewCommitteeMemberList';
export interface I6_3_1_1ListOfMember {
    id?: number,
    code?: string,
    name?: string,
    position?: string,
}
export interface I6_3_1_1ListOfTopic {
    id?: number,
    topicCode?: string,
    topicName?: string,
    groupName?: string,
    leaderName?: string
}
export default function F6_3_1_1CreateListOfMembers() {
    const form = useForm<I6_3_1_1ListOfMembers>({
        initialValues: {
            decisionNumber: "",
            decisionDate: "",
            decisionName: "",
            topicName: "",
            groupName: "",
            leaderName: ""
        }
    })
    const query = useQuery<I6_3_1_1ListOfMember[]>({
        queryKey: ["F6_3_1_1CreateListOfMember"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_1_1ListOfMember>[]>(
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
                header: "Chức vụ hội đồng",
                accessorKey: "position"
            },
            {
                header: "Lý lịch",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            }
        ],
        []
    )
    const query1 = useQuery<I6_3_1_1ListOfTopic[]>({
        queryKey: ["F6_3_1_1CreateListTopic"],
        queryFn: async () => data1
    })
    const columns1 = useMemo<MRT_ColumnDef<I6_3_1_1ListOfTopic>[]>(
        () => [
            {
                header: "Mã đề tài",
                accessorKey: "topicCode"
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
            }
        ],
        []
    )
    return (
        <MyButtonCreate objectName="Quyết định Thành lập hội đồng xét duyệt đề tài cấp Trường" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MyTextInput label="Số quyết định" />
                <MyDateInput label="Ngày quyết định" />
            </Flex>
            <MyTextInput label="Tên quyết định" />
            <Fieldset legend="">
                <Flex justify="space-between" align="center" mb="sm">
                    <h2>Danh sách thành viên hội đồng xét duyệt</h2>
                    <Button>Thêm</Button>
                </Flex>
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <FeatUpdateReviewCommitteeMemberList values={row.original} />
                                <FeatDeleteReviewCommitteeMemberList id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }} />
            </Fieldset>
            <Fieldset legend="">
                <Flex justify="space-between" align="center" mb="sm">
                    <h2>Danh sách đề tài Nhóm nghiên cứu</h2>
                    <Button>Thêm</Button>
                </Flex>
                <MyDataTable
                    columns={columns1}
                    data={query1.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <FeatUpdateResearchGroupTopicList values={row.original} />
                                <FeatDeleteResearchGroupTopicList id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }} />
            </Fieldset>
            <MyFileInput label="File quyết định" />
        </MyButtonCreate>
    )
}

const data: I6_3_1_1ListOfMember[] = [
    {
        code: "GV00001",
        name: "Nguyễn Văn B",
        position: "Chủ tịch",

    },
];
const data1: I6_3_1_1ListOfTopic[] = [
    {
        topicCode: "GV0001",
        topicName: "Đổi mới giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn B"
    }
]