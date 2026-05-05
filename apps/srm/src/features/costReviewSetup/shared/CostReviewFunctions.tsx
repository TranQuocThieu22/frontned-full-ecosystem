import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { Text } from "@mantine/core";

// Function create key for council member and evaluation topic
export function keyValueOf(id?: number | string) {
    return `${id}`;
}

// Helper to minimize list message
export const formatListMessage = (arr: string[], color: string) => {
    if (arr.length === 0) return null;

    const displayCount = 10;
    const visibleItems = arr.slice(0, displayCount);
    const hiddenCount = arr.length - displayCount;

    return (
        <Text fw={700} c={color} span>
            {visibleItems.join(", ")}
            {hiddenCount > 0 && ` ... và ${hiddenCount} viên chức khác`}
        </Text>
    );
};

export const cleanEvaluationCommittee = (evaluationCommittee: SRMEvaluationCommittee): SRMEvaluationCommittee => {
    const requirements = evaluationCommittee.srmEvaluationMembers?.map(({ srmTitle, user, ...rest }) => rest) ?? [];
    const evidences = evaluationCommittee.srmEvaluationTopics?.map(({ srmTopic, srmConclusion, recommendation, ...rest }) => rest) ?? [];

    // Bỏ academicYear object, chỉ giữ academicYearId
    delete evaluationCommittee.academicYear;

    return { ...evaluationCommittee, srmEvaluationMembers: requirements, srmEvaluationTopics: evidences, };
}