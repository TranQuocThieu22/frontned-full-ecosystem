import { service_commonNotification } from "@/api/services/service_commonNotification";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function SendNotificationDeleteListButton({ values }: { values: any }) {
  return (
    <CustomButtonDeleteList
      contextData={values.map((item: any) => item.code).join(", ")}
      onSubmit={() => service_commonNotification.deleteList(values)}
    />
  );
}
