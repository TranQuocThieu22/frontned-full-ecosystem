import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";


export default function EvidenceDeleteList({
  data,
  resetRowSelection,
}: {
  data: ITaskDetailEvidence[];
  resetRowSelection: Function;
}) {
  return (
    <CustomButtonDeleteList
      count={data.length}
      onSubmit={() => {
        resetRowSelection();
        return service_EAQAnalysis.deleteListTaskDetailEvidenceAnalysis(
          data.map((item) => ({ id: item.id } as BaseEntity))
        );
      }}
    />
  );
}
