import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export function F_systemUpdateDocs_Delete({
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
