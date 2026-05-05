import { service_standard } from "@/api/services/service_standard";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function EvaluationScoreButtonDeleteList({
  values,
}: {
  values: any;
}) {
  return (
    <CustomButtonDeleteList

      contextData={values.map((item: any) => item.code).join(", ")}
      onSubmit={() => service_standard.deleteList(values)}
    />
  );
}
