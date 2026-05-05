import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  value: ILimitation;
  table: MRT_TableInstance<ILimitation>;
  isLoading: boolean
}

export default function RestrictByCriteriaDeleteButton({ table, value, isLoading }: Props) {

  return (
    <CustomActionIconDelete
      buttonProps={{
        loading: isLoading
      }}
      contextData={value.code}
      onSubmit={() => service_EAQLimitation.delete(value.id ?? -1)}
      onSuccess={() => table.resetRowSelection()}
    />
  )
}
