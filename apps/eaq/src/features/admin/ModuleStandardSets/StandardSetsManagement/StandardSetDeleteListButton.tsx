import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
  values: IStandardSet[];
  resetRowSelection: () => void;
  isLoading: boolean;
}

export default function StandardSetDeleteListButton({
  values,
  resetRowSelection,
  isLoading
}: Props) {
  return (
    <CustomButtonDeleteList
      loading={isLoading}
      count={values.length}
      buttonProps={
        {
          disabled: values.length === 0
        }
      }
      onSubmit={() => service_EAQStandardSet.deleteList(values)}
      onSuccess={() => resetRowSelection()}
    />
  );
}
