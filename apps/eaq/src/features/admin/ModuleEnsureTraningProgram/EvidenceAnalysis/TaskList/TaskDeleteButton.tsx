import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function TaskDeleteButton({ data }: { data: ITaskDetailAnalysis }) {
  return (
    <CustomActionIconDelete
      contextData={data?.code}
      onSubmit={() => {
        return service_EAQAnalysis.deleteListTaskDetailAnalysis([{ id: data.id }]);
      }}
    />
  );
}
