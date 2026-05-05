import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function AnalysisDelete({ id, code }: { id: number; code: string }) {
  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={() => {
        return service_EAQAnalysis.delete(id);
      }}
    />
  );
}
