import { service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import { IPhase } from '@/shared/interfaces/Phase/IPhase';
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function PhaseDeleteListButton({
  values,
  resetRowSelection,
}: {
  values: IPhase[];
  resetRowSelection: Function;
}) {
  return (
    <CustomButtonDeleteList
      count={values.length}
      onSubmit={() => {
        resetRowSelection();
        return service_EAQPhase.deleteList(values);
      }}
    />
  );
}
