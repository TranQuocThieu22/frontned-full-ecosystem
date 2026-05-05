import { EnumEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { IEvaluationTopicMembers } from "@/shared/interfaces/SRMEvaluationTopic";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface CouncilMeetingExportMemberProps {
    topicMembers: IEvaluationTopicMembers[],
    members: SRMTopicMember[],
    criteriaSet: SRMCriteria[],
    conclusions: SRMConclusion[],
}

export default function CouncilMeetingExportMember({ members, criteriaSet, topicMembers, conclusions }: CouncilMeetingExportMemberProps) {
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã thành viên" },
            { fieldName: "name", header: "Họ tên" },
            { fieldName: "role", header: "Vai trò" },
            ...criteriaSet.map(c => ({ fieldName: c.name || "", header: c.name || "" })),
            { fieldName: "conclusion", header: "Kết luận" },
        ],
    };

    const values = members.map(item => {
        // Tìm thông tin đánh giá của thành viên này
        const memberEvaluation = topicMembers?.find(m => m.srmEvaluationMemberId === item.id);

        // Tạo object cho các tiêu chí đánh giá
        const criteriaResults: Record<string, string> = {};
        criteriaSet.forEach(criteria => {
            const criteriaEvaluation = memberEvaluation?.srmEvaluationTopicMemberCriterias?.find(cc => cc.srmCriteriaId === criteria.id);

            // Xử lý export dựa trên evaluationType
            let resultValue = "";

            switch (criteria.evaluationType) {
                case EnumEvaluationType.Score:
                    // Hiển thị điểm số
                    resultValue = criteriaEvaluation?.point?.toString() || "0";
                    break;

                case EnumEvaluationType.YesNo:
                    // Hiển thị Đạt/Không đạt
                    resultValue = criteriaEvaluation?.isResult ? "Đạt" : "Không đạt";
                    break;

                case EnumEvaluationType.Text:
                    // Hiển thị comment/text
                    resultValue = criteriaEvaluation?.comment || "";
                    break;

                default:
                    // Fallback về Yes/No nếu không xác định được type
                    resultValue = criteriaEvaluation?.isResult ? "Đạt" : "Không đạt";
                    break;
            }

            criteriaResults[criteria.name || ""] = resultValue;
        });

        return {
            code: item?.code || "",
            name: item?.user?.fullName || "",
            role: item?.srmTitle?.name || "",
            ...criteriaResults,
            conclusion: conclusions?.find(c => c.id === memberEvaluation?.srmConclusionId)?.name || "",
        }
    })

    return (
        <AQButtonExportData
            objectName="Danh sách thành viên hội đồng tư vấn"
            data={values || []}
            exportConfig={exportConfig}
        />
    );
}