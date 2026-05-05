import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function AnalysisDeleteButton({ data }: { data: IAnalysis }) {
  return (
    <CustomActionIconDelete
      contextData={data?.code}
      onSubmit={() => {
        return service_EAQAnalysis.delete(data.id!);
      }}
    />
  );
}
