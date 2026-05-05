import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  taskDetailEvidenceId?: number | null;
  code: string;
  note?: string
}

export default function ExistingEvidenceComparisonDeleteButton({
  taskDetailEvidenceId,
  code,
  note
}: Props) {
  return (
    <CustomActionIconDelete
      modalProps={{
        title: "Xác nhận xóa nội dung cập nhập minh chứng này"
      }}
      contextData={`nội dung cập nhập minh chứng của ${code}`}
      onSubmit={taskDetailEvidenceId ? () => service_EAQEvaluationPlan.TaskDetailEvidenceCollectEvidence({
        eaqTaskDetailEvidenceId: taskDetailEvidenceId,
        eaqEvidenceId: null,
        note: note
      }) : () => { }}
    />
  );
}
