import { service_classActivityPlan } from "@/api/services/service_classActivityPlan";
import { ClassActivityPlan } from "@/interfaces/classActivityPlan";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function ConfigRegistrationDeleteList({ data }: { data: ClassActivityPlan[] }) {
  const handleClearRegistrationTime = async () => {
    const updatePromises = data.map((item) =>
      service_classActivityPlan.update({
        ...item,
        startRegistration: undefined,
        endRegistration: undefined,
      })
    );

    await Promise.all(updatePromises);
    return updatePromises[0];
  };

  return (
    <CustomButtonDeleteList
      onSubmit={handleClearRegistrationTime}
      contextData={data.map((item) => item.class?.code || item.class?.name).join(", ")}
    />
  );
}
