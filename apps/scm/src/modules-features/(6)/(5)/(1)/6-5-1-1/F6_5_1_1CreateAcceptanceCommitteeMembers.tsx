'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
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
import FeatDeleteListOfMember from './F6_5_1_1DeleteListOfMember';
import FeatDeleteListOfTopic from './F6_5_1_1DeleteListOfTopic';
import { I6_5_1_1AcceptanceCommitteeMembers } from "./F6_5_1_1ReadAcceptanceCommitteeMembers";
import FeatUpdateListOfMember from './F6_5_1_1UpdateListOfMember';
import FeatUpdateListOfTopic from './F6_5_1_1UpdateListOfTopic';
export interface I6_5_1_1ListOfMember {
    id?: number,
    code?: string,
    name?: string,
    position?: string,
}
export interface I6_5_1_1ListOfTopic {
    id?: number,
    topicCode?: string,
    topicName?: string,
    groupName?: string,
    leaderName?: string
}
export default function F6_5_1_1CreateAcceptanceCommitteeMembers() {
    const form = useForm<I6_5_1_1AcceptanceCommitteeMembers>({
        initialValues: {
            decisionNumber: "",
            decisionDate: "",
            decisionName: "",
            topicName: "",
            groupName: "",
            leaderName: ""
        }
    })
    const query = useQuery<I6_5_1_1ListOfMember[]>({
        queryKey: ["F6_3_1_1CreateListOfMember"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_5_1_1ListOfMember>[]>(
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
                    <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            }
        ],
        []
    )
    const query1 = useQuery<I6_5_1_1ListOfTopic[]>({
        queryKey: ["F6_3_1_1CreateListTopic"],
        queryFn: async () => data1
    })
    const columns1 = useMemo<MRT_ColumnDef<I6_5_1_1ListOfTopic>[]>(
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
        <MyButtonCreate objectName="Quyết định Thành lập hội đồng nghiệm thu đề tài Nhóm nghiên cứu cấp Trường" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MyTextInput label="Số quyết định" style={{ width: "50%" }} />
                <MyDateInput label="Ngày quyết định" style={{ width: "50%" }} />
            </Flex>
            <MyTextInput label="Tên quyết định" />
            <Fieldset legend="">
                <Flex justify="space-between" align="center" mb="sm">
                    <h3>Danh sách thành viên hội đồng </h3>
                    <Button>Thêm</Button>
                </Flex>
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <FeatUpdateListOfMember values={row.original} />
                                <FeatDeleteListOfMember id={row.original.id!} />
                            </MyCenterFull>
                        );
                    }}
                />
            </Fieldset>
            <Fieldset legend="">
                <Flex justify="space-between" align="center" mb="sm">
                    <h3>Danh sách đề tài Nhóm nghiên cứu yêu cầu nghiệm thư</h3>
                    <Button>Thêm</Button>
                </Flex>
                <MyDataTable
                    columns={columns1}
                    data={query1.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <FeatUpdateListOfTopic values={row.original} />
                                <FeatDeleteListOfTopic id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }} />
            </Fieldset>
            <MyFileInput label='File quyết định' />
        </MyButtonCreate>
    )
}

const data: I6_5_1_1ListOfMember[] = [
    {
        code: "GV00001",
        name: "Nguyễn Văn B",
        position: "Chủ tịch",

    },
];
const data1: I6_5_1_1ListOfTopic[] = [
    {
        topicCode: "GV0001",
        topicName: "Đổi mới giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn B"
    }
]