import { service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  id: number;
  code: string;
  resetRowSelection: Function
}

export default function PhaseDeleteButton({
  id,
  code,
  resetRowSelection
}: Props) {
  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={() => {
        resetRowSelection();
        return service_EAQPhase.delete(id)
      }}
    />
  );
}
