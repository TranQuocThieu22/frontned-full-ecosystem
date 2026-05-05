import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

export default function CostReviewMeetingExportButton({ data }: { data: SRMEvaluationTopic[] }) {
    const exportConfig = {
        fields: [
            { fieldName: "srmTopicCode", header: "Mã đăng ký" },
            { fieldName: "srmTopicName", header: "Tên đề tài" },
            { fieldName: "srmTopicLeader", header: "Chủ nhiệm đề tài" },
            { fieldName: "srmEvaluationCommitteeCode", header: "Mã tổ thẩm định" },
            { fieldName: "srmEvaluationCommitteeName", header: "Tên tổ thẩm định" },
            { fieldName: "meetingDateStr", header: "Ngày họp" },
            { fieldName: "srmConclusionName", header: "Kết luận của tổ thẩm định" },
            { fieldName: "recommendation", header: "Kiến nghị" }
        ],
    };

    const values = data.map(item => {
        return {
            srmTopicCode: item.srmTopic?.code || "",
            srmTopicName: item.srmTopic?.registerName || "",
            srmTopicLeader: item.srmTopic?.srmTopicMembers
                ?.filter((item) => item.srmTitle?.isLeader === true)
                .map((item) => item.user?.fullName)
                .join(", "),
            srmEvaluationCommitteeCode: item.srmEvaluationCommittee?.code || "",
            srmEvaluationCommitteeName: item.srmEvaluationCommittee?.name || "",
            meetingDateStr: dateUtils.toDDMMYYYY(item?.meetingDate),
            srmConclusionName: item.srmConclusion?.name || "",
            recommendation: item.recommendation || "",
        } as Record<string, string>;
    })

    return (
        <AQButtonExportData
            objectName="Danh sách đăng ký tuyển chọn"
            data={values || []}
            exportConfig={exportConfig}
        />
    );
}