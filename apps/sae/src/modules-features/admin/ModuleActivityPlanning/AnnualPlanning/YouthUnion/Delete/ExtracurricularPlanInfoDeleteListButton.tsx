import { service_event } from "@/api/services/service_event";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function ExtracurricularPlanInfoDeleteListButton({
  values,
  loading
}: {
  values: any;
  loading?: boolean
}) {
  return (
    <CustomButtonDeleteList
      loading={loading}

      contextData={values.map((item: any) => item.code).join(", ")}
      onSubmit={() => service_event.deleteList(values)}
    />
  );
}
