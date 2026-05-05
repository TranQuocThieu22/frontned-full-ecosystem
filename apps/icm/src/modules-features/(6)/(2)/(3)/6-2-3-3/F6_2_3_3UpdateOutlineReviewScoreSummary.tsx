'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyCenterFull from "@/components/CenterFull/MyCenterFull"
import MySelect from "@/components/Combobox/Select/MySelect"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow"
import { ActionIcon, Button, Checkbox, Flex } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import { IOutlineReviewScoreSummary } from "./F6_2_3_ReadOutlineReviewScoreSummary"

export interface IListOfTopic {
    topicName?: string //Tên đề tài
    groupName?: string //Tên nhóm nghiên cứu
    leaderName?: string //Trưởng nhóm
    point?: number //Điểm trung bình   
}

export default function UpdateOutlineReviewScoreSummary({ values }: { values: IOutlineReviewScoreSummary }) {
    const form = useForm<IOutlineReviewScoreSummary>({
        initialValues: {
            id: 0,
            decisionNumber: "",  // Số quyết định hội đồng xét duyệt đề cương
            code: "", // Mã đề tài
            topicName: "",  // Tên đề tài
            groupName: "", // Tên nhóm nghiên cứu
            leaderName: "", // Trưởng nhóm
            point: 0 // Điểm trung bình
        }
    })
    const query = useQuery<IListOfTopic[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                topicName: "Nghiên cứu ứng dụng AI trong giáo dục",
                groupName: "Nhóm AI Giáo Dục",
                leaderName: "Nguyễn Văn A",
                point: 9.2,
            },
            {
                topicName: "Phát triển Blockchain trong y tế",
                groupName: "Nhóm Blockchain",
                leaderName: "Trần Thị B",
                point: 8.8,
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<IListOfTopic>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Tên nhóm nghiên cứu",
            accessorKey: "groupName",
        },
        {
            header: "Trưởng nhóm",
            accessorKey: "leaderName",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "point",
            Cell: ({ cell }) => `${cell.getValue<number>().toFixed(2)}`, // Hiển thị điểm trung bình với 2 chữ số thập phân
        },
        {
            header: "Thực hiện",
            accessorFn: () =>
                <Checkbox />
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}>
                <MySelect label="Trưởng ban kiểm phiếu" placeholder="Chọn thành viên" data={[]} style={{ width: "50%" }} />
                <MySelect label="Hội đồng" placeholder="Chọn quyết định hội đồng xét duyệt đề cương" data={[]} style={{ width: "50%" }} />
            </Flex>
            <MyNumberInput label="Số thành viên hiện diện" />
            <MyFileInput label="File biên bản" />

            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <MyFlexRow>
                                <Button>
                                    Thêm
                                </Button>
                                <ActionIcon >
                                    <IconEdit />
                                </ActionIcon>
                                <ActionIcon><IconTrash /></ActionIcon>
                            </MyFlexRow>


                        </MyCenterFull>
                    );
                }}
            />
        </MyActionIconUpdate>
    )
}