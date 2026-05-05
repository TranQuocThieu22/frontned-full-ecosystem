import { SRMNotificationTopic } from "@/shared/interfaces/SRMNotificationTopic";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Props {
    data: SRMNotificationTopic[];
}

export default function NotificationTopicTable({ data }: Props) {
    const columns = useMemo<MRT_ColumnDef<SRMNotificationTopic>[]>(() => [
        {
            header: "Mã đăng ký",
            accessorKey: "srmTopic.code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "srmTopic.registerName",
            size: columnSizeObject.name
        },
        {
            header: 'Lĩnh vực',
            accessorKey: 'srmTopic.srmArea.name'
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leaderName",
            accessorFn: (row) => row.srmTopic?.srmTopicMembers?.find(item => item.srmTitle?.isLeader == true)?.user?.fullName
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "srmTopic.duration",
        },
        {
            header: "Từ tháng/ năm",
            accessorKey: "fromDate",
            Cell: ({ row }) => {
                return dateUtils.toMMYYYY(row.original.srmTopic?.fromDate)
            },
        },
        {
            header: "Đến tháng/ năm",
            accessorKey: "toDate",
            Cell: ({ row }) => {
                return dateUtils.toMMYYYY(row.original.srmTopic?.toDate)
            },
        },
        {
            header: "Kết luận của hội đồng",
            accessorKey: "srmEvaluationTopic.srmConclusion.name",
        },
        {
            header: "Kiến nghị",
            accessorKey: "srmEvaluationTopic.recommendation",
            size: columnSizeObject.description
        },
    ], [])
    return (
        <CustomDataTable
            columns={columns}
            data={data || []}
            enableRowSelection={false}
            enableRowNumbers
        />
    );
}
