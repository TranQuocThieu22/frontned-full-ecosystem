import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomActionIconDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconDelete";

export function F_userGuideDocs_Delete({
  id,
  contextData,
}: {
  id: number;
  contextData: string;
}) {
  return (
    <CustomActionIconDelete
      contextData={contextData}
      onSubmit={() => documentService.delete(id)}
    />
  );
}
