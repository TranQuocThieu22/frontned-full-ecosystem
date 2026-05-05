'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteListOfTopics from './F6_5_1_3DeleteListOfTopic';
import { I6_5_1_3CommitteeScoringSummary } from "./F6_5_1_3ReadcommitteeScoringSummary";
import FeatUpdateListOfTopics from './F6_5_1_3UpdateListOfTopics';
export interface I6_5_1_3ListOfTopic {
    id?: number,
    code?: string,
    topicName?: string,
    leaderName?: string,
    point?: number;
    comment?: string;
}
export default function F6_5_1_3CreatecommitteeScoringSummary() {
    const form = useForm<I6_5_1_3CommitteeScoringSummary>({
        initialValues: {
            id: 0,
            decisionNumber: "",
            code: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            point: 0,
            comment: ""
        }
    })
    const query = useQuery<I6_5_1_3ListOfTopic[]>({
        queryKey: ["F6_5_1_3CreatecommitteeScoringSummary"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_5_1_3ListOfTopic>[]>(
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
                header: "Chủ nhiệm",
                accessorKey: "leaderName"
            },
            {
                header: "Điểm trung bình",
                accessorKey: "point"
            },
            {
                header: "Đánh giá",
                accessorKey: "comment"
            },
        ],
        []
    )
    return (
        <MyButtonCreate objectName="Tổng hợp kết quả đánh giá hội đồng nghiên cứu đề tài Nhóm nghiên cứu" form={form} onSubmit={() => { }} modalSize={"100%"}>

            <MyFlexRow>
                <MySelect label="Đề tài" data={['Chọn thành viên hội đồng nghiệm thu']} style={{ width: "50%" }} />
                <MySelect label="Hội đồng" data={['Chọn quyết định hội đồng nghiệm thu']} style={{ width: "50%" }} />
            </MyFlexRow>
            <MyTextInput label="Số thành viên ban kiểm phiếu" />
            <MyFileInput label="File quyết định" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <FeatUpdateListOfTopics value={row.original} />
                            <FeatDeleteListOfTopics id={row.original.id!} />
                        </MyCenterFull>
                    )
                }} />

        </MyButtonCreate>
    )
}

const data: I6_5_1_3ListOfTopic[] = [
    {
        code: "DT00001",
        topicName: "Đổi mới phương pháp giáo dục",
        leaderName: "Nguyễn Văn A",
        point: 80,
        comment: "Giỏi"
    },

];