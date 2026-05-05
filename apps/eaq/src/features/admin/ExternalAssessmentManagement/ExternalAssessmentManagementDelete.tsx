import { service_EAQExternalAssessment } from "@/shared/APIs/service_EAQExternalAssessment";
import { IExternalAssessment } from "@/shared/interfaces/externalAssessment/IExternalAssessment";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface props {
  data: IExternalAssessment,
  loading?: boolean
};

export default function ExternalAssessmentManagementDelete({
  data,
  loading
}: props) {
  return <CustomActionIconDelete
    onSubmit={() => service_EAQExternalAssessment.delete(data.id ?? 0)}
    contextData={String(data.code) + " - " + String(data.name)}
    buttonProps={{
      loading: loading
    }}
  />;
}
