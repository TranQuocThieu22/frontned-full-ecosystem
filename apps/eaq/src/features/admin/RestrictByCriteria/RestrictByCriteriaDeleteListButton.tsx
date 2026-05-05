import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
  values: ILimitation[];
  table: MRT_TableInstance<ILimitation>;
  isLoading: boolean
}

export default function RestrictByCriteriaDeleteListButton({ table, values, isLoading: isFetching }: Props) {

  return (
    <CustomButtonDeleteList
      loading={isFetching}
      count={values.length}
      buttonProps={{
        disabled: values?.length === 0
      }}
      onSubmit={() => service_EAQLimitation.deleteList(values)}
      onSuccess={() => table.resetRowSelection()}
    />
  )
}
