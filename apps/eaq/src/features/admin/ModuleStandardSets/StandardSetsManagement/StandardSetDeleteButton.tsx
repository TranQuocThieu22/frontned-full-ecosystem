import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  id?: number | null;
  code: string;
  isLoading: boolean;
}

export default function StandardSetDeleteButton({ id, code, isLoading }: Props) {
  return (
    <CustomActionIconDelete
      buttonProps={{
        loading: isLoading
      }}
      onSubmit={id ? () => service_EAQStandardSet.delete(id) : () => { }}
      contextData={code}
    />
  );
}
