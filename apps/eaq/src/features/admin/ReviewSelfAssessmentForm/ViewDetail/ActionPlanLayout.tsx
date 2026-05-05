"use client";

import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Text } from "@mantine/core";
import { memo, useMemo } from "react";
import { SECTION_CONTENT } from "../Constants/selfAssessmentTitle";
import LoadingSkeleton from "../../TrackingProgressSeftAssessment/ComponentShared/LoadingSkeleton";
import SelfAccessmentCommentTable from "./Comment/CommentTable";

interface Props {
    phaseId?: number;
    taskDetailId?: number;
}

function ActionPlanLayout({ phaseId, taskDetailId }: Props) {

    const Q_SelfAssessment = useCustomReactQuery({
        queryKey: ["Self_Assessment_Type4_List", phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            eaqTaskDetailId: taskDetailId,
            selfAssessmentType: SelfAssessmentTypeEnum.ActionPlan,
        })
    });

    const columns = useMemo<CustomColumnDef<any>[]>(() => [
        { header: "Mục tiêu", accessorKey: "target", size: 200 },
        { header: "Nội dung chi tiết", accessorKey: "detail", size: 350 },
        { header: "Đơn vị; Người thực hiện", accessorKey: "unit" },
        {
            header: "Thời gian thực hiện hoặc hoàn thành",
            accessorKey: "actionTime",
        },
        { header: "Ghi chú", accessorKey: "note", size: 120 },
    ], []);

    return (
        <>
            <Text mt="md" fw={500} data-assessment>
                {SECTION_CONTENT.ACTION_PLAN.title}
            </Text>
            <Text mb="xs" size="sm">
                {SECTION_CONTENT.ACTION_PLAN.description}
            </Text>
            <CustomFieldset mt="xs" title="Nội dung báo cáo hiện tại">
                {Q_SelfAssessment.isLoading
                    ? <LoadingSkeleton />
                    : <CustomDataTable
                        data={Q_SelfAssessment.data?.[0]?.eaqActions || []}
                        columns={columns}
                    />
                }
            </CustomFieldset>
            <CustomFieldset mt={10} title="Danh sách nhận xét">
                <SelfAccessmentCommentTable openQuery={true} eaqSelfAssessmentId={Q_SelfAssessment.data?.[0]?.id} eaqSelfAssessmentType={4} />
            </CustomFieldset>
        </>
    );
}

export default memo(ActionPlanLayout);
