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
import FeatDeleteListOfMember from './F6_2_3_1DeleteListOfMember';
import FeatDeleteListOfTopic from './F6_2_3_1DeleteListOfTopics';
import { IReviewCommitteeMembersOutline } from "./F6_2_3_1ReadReviewCommitteeMembersOutline";
import FeatUpdateListOfMember from './F6_2_3_1UpdateListOfMember';
import FeatUpdateListOfTopic from './F6_2_3_1UpdateListOfTopics';
export interface IListOfMember {
    id?: number;
    code?: string; // Mã giảng viên
    name?: string; //Họ tên
    position?: string // Chức vụ hội đồng
}
export interface IListOfTopic {
    id?: number;
    code?: string; //Mã đề tài
    topicName?: string; //Tên đề tài
    groupName?: string; //Tên nhóm
    leaderName?: string//Truỏng nhóm
    telephone?: string //Số điện thoại
    email?: string //Email
}

export default function F6_2_3_1CreateReviewCommitteeMembersOutline() {
    const form = useForm<IReviewCommitteeMembersOutline>({
        initialValues: {
            code: "",
            date: "",
            decisionName: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            telephone: "",
            email: ""
        }
    })
    const query = useQuery<IListOfMember[]>({
        queryKey: ["F6_2_3_1CreateListOfMember"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<IListOfMember>[]>(
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
    const query1 = useQuery<IListOfTopic[]>({
        queryKey: ["F6_2_3_1CreateListTopic"],
        queryFn: async () => data1
    })
    const columns1 = useMemo<MRT_ColumnDef<IListOfTopic>[]>(
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
        ]
        , []
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
                    <h2>Danh sách thành viên hội đồng xét duyệt đề cương/ Thuyết minh</h2>
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
                        )
                    }} />
            </Fieldset>
            <Fieldset legend="">
                <Flex justify="space-between" align="center" mb="sm">
                    <h2>Đề tài </h2>
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
            <MyFileInput label="File quyết định" />
        </MyButtonCreate>
    )
}

const data: IListOfMember[] = [
    {
        code: "GV00001",
        name: "Nguyễn Văn B",
        position: "Chủ tịch",
    }
]

const data1: IListOfTopic[] = [
    {
        code: "GV0001",
        topicName: "Đổi mới giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn B"
    }
]