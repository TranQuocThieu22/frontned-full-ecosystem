'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteListOfTopic from './F5_6_1_3DeleteListOfTopic';
import { I5_6_1_3CommitteeScoringResultsSummary } from "./F5_6_1_3ReadCommitteeScoringResultsSummary";
import FeatUpdateListOfTopic from './F5_6_1_3UpdateListOfTopic';

export interface I5_6_1_3ListOfTopic {
    id?: number //STT
    code?: string //Mã đề tài
    topicName?: string //Tên đề tài
    leaderName?: string //Chủ nhiệm
    point?: string //Điểm trung bình
    rank?: string //Xếp loại
}

export default function F5_6_1_3UpdateCommitteeScoringResultsSummary({ values }: { values: I5_6_1_3CommitteeScoringResultsSummary }) {
    const form = useForm<I5_6_1_3CommitteeScoringResultsSummary>({
        initialValues: {
            ...values,
        },
    })
    const query = useQuery<I5_6_1_3ListOfTopic[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                code: "DT00001",
                topicName: "Đổi mới phương pháp giáo dục",
                leaderName: "Nguyễn Văn A",
                point: "80",
                rank: "Giỏi",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_6_1_3ListOfTopic>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
        },
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leaderName",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "point",
        },
        {
            header: "Xếp loại",
            accessorKey: "rank",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Trưởng ban kiểm phiếu" placeholder="Chọn thành viên" data={[]} />
                <MyTextInput label="Hội đồng" defaultValue="Chọn quyết định hội đồng" />
            </MyFlexRow>
            <MyNumberInput label="Số thành viên" />
            <MyFileInput label="File biên bản" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>

                            <FeatUpdateListOfTopic values={row.original} />
                            <FeatDeleteListOfTopic id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyActionIconUpdate>

    )
}