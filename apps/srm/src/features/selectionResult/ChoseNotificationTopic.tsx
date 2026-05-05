import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomDataTableStagedChanges, StagedChange } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTableStagedChanges";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Props {
    initTopicId?: number[];
    onStagedChange: (value: StagedChange) => void;
    readOnly?: boolean
}

export default function ChoseNotificationTopic({
    onStagedChange,
    initTopicId,
    readOnly = false
}: Props) {
    const academicYearStore = useAcademicYearStore();
    const evaluationCommitteeQuery = useCustomReactQuery({
        queryKey: ['evaluationCommittee_NotificationTopicList', academicYearStore.state.academicYear?.id],
        axiosFn: () => evaluationCommitteeService.getSRMEvaluationTopicPass({
            AcademicYearId: academicYearStore.state.academicYear?.id ?? 0,
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
        }
    })
    const columns = useMemo<MRT_ColumnDef<SRMTopic>[]>(() => [
        {
            header: "Mã đăng ký",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "registerName",
            size: columnSizeObject.name
        },
        {
            header: 'Lĩnh vực',
            accessorKey: 'srmArea.name'
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leaderName",
            accessorFn: (row) => row.srmTopicMembers?.find(item => item.srmTitle?.isLeader == true)?.user?.fullName
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "duration",
        },
        {
            header: "Từ tháng/ năm",
            accessorKey: "fromDate",
            Cell: ({ row }) => {
                return dateUtils.toMMYYYY(row.original.fromDate)
            },
        },
        {
            header: "Đến tháng/ năm",
            accessorKey: "toDate",
            Cell: ({ row }) => {
                return dateUtils.toMMYYYY(row.original.toDate)
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
        <CustomDataTableStagedChanges
            isLoading={evaluationCommitteeQuery.isLoading}
            isError={evaluationCommitteeQuery.isError}
            columns={columns}
            data={evaluationCommitteeQuery.data || []}
            initIds={initTopicId}
            onStagedChange={onStagedChange}
            readOnly={readOnly}
        />
    );
}
