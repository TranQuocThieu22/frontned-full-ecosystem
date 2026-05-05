import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function EvidenceDeleteButton({ data }: { data: ITaskDetailEvidence }) {
  return (
    <CustomActionIconDelete
      contextData={data?.code}
      onSubmit={() => {
        return service_EAQAnalysis.deleteListTaskDetailEvidenceAnalysis([{ id: data.id! }]);
      }}
    />
  );
}
