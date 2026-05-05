import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
  values: IEvidence[],
  resetRowSelection: Function
}

export default function EvidenceDeleteListButton({
  values,
  resetRowSelection
}: Props) {
  return (
    <CustomButtonDeleteList
      count={values.length}
      onSubmit={async () => {
        await service_EAQEvidence.deleteList(values)
      }}
      onSuccess={() => resetRowSelection()}
    />
  )
}
