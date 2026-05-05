import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  id?: number,
  code?: string
  clearSelection: Function
}

export default function EvidenceDeleteButton({ id, code, clearSelection }: Props) {
  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={
        !id
          ? () => { }
          : async () => await service_EAQEvidence.delete(id)
      }
      onSuccess={() => clearSelection()}
    />
  )
}
