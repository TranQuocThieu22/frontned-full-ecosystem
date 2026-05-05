import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function EvidenceManagementDelete({ id, code, resetRowSelection }: { id: number; code: string, resetRowSelection: Function }) {
  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={() => {
        resetRowSelection();
        return service_EAQEvidence.delete(id)
      }}
    />
  )
}
