import { service_EAQAction } from "@/shared/APIs/service_EAQAction";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function Form04ActionPlanDeleteActionPlan({
  id,
  code,
}: {
  id: number;
  code: string;
}) {
  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={() => {
        service_EAQAction.delete(id);
      }}
    />
  );
}
