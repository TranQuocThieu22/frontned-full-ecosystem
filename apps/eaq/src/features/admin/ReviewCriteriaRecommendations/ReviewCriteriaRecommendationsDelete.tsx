import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function ReviewCriteriaRecommendationsDelete({
  data,
}: {
  data: ILimitation;
}) {
  return (
    <CustomActionIconDelete
      contextData={data?.code}
      onSubmit={() => service_EAQLimitation.delete(data.id ?? 0)}
    />
  );
}
