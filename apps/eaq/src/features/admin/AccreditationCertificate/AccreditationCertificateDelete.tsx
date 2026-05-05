import { ICertification } from "@/shared/interfaces/certification/ICertification";
import { service_EAQCertification } from "@/shared/APIs/service_EAQCertification";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  data: ICertification
  loading?: boolean
}
export default function AccreditationCertificateDelete({ data, loading }: Props) {
  return <CustomActionIconDelete
    onSubmit={() => service_EAQCertification.delete(data.id ?? 0)}
    contextData={String(data.code)}
    buttonProps={{
      loading: loading
    }}
  />;
}
