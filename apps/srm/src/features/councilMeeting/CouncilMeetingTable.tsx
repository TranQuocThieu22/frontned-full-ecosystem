'use client'
import { topicService } from "@/shared/APIs/topicService";
import { EnumEvaluationCommitteeType } from "@/shared/consts/enum/EnumEvaluationCommitteeType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Badge } from "@mantine/core";
import { useMemo } from "react";
import CouncilMeetingUpdate from "./CouncilMeetingUpdate";

export default function CouncilMeetingTable() {
    const columns = useMemo<CustomColumnDef<SRMEvaluationTopic>[]>(() => [
        {
            header: "Mã hội đồng",
            accessorKey: "srmEvaluationCommittee.code",
        },
        {
            header: "Tên hội đồng",
            accessorKey: "srmEvaluationCommittee.name",
            size: 250
        },
        {
            header: "Ngày họp",
            accessorKey: "meetingDate",
            type: "ddMMyyyy",
        },
        {
            header: "Mã đăng ký",
            accessorKey: "srmTopic.code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "srmTopic.registerName",
            size: 250
        },
        {
            header: "Lĩnh vực",
            accessorKey: "srmTopic.srmArea.name",
        },
        {
            header: "Chủ nhiệm",
            accessorFn(row) {
                return row?.srmTopic?.srmTopicMembers?.map(item => item?.user?.fullName).join(", ")
            }
        },
        {
            header: "Kết luận của hội đồng",
            accessorKey: "srmConclusion.name",
            Cell: ({ row }) => {
                return (
                    <Badge
                        w="100%"
                        variant="light"
                        color={row.original.srmConclusion?.color || "gray"}
                        radius="sm"
                    >
                        {row.original.srmConclusion?.name}
                    </Badge>
                );
            },
        },
        {
            header: "Kiến nghị",
            accessorKey: "recommendation",
            size: 250
        },
        {
            header: "File hồ sơ hội đồng",
            accessorKey: "attachmentPath",
            type: "viewFile"
        },
    ], [])

    const academicYearStore = useAcademicYearStore();

    const councilMeetingQuery = useCustomReactQuery({
        queryKey: ['councilMeetingQuery', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return topicService.getEvaluationTopic({ type: EnumEvaluationCommitteeType?.EvaluationCommittee, academicYearId: academicYearStore?.state?.academicYear?.id ?? 0 })
        },
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    })

    return (
        <CustomFieldset
            title="Danh sách đăng ký tuyển chọn"
        >
            <CustomDataTableAPI
                pinningRightColumns={['srmConclusion.name']}
                columns={columns}
                exportProps={{
                    fileName: "Danh sách họp hội đồng tư vấn tuyển chọn nhiệm vụ",
                }}
                enableRowSelection={true}
                enableRowNumbers={false}
                query={councilMeetingQuery}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <CouncilMeetingUpdate initValues={row.original} />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    );
}