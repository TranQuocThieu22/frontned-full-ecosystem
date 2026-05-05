import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export function F_formTemplateDocs_Delete({
  id,
  contextData,
}: {
  id: number;
  contextData: string;
}) {
  return (
    <CustomActionIconDelete
      contextData={contextData}
      // onSubmit={async () =>
      //   await baseAxios.post("/Document/delete", { id: id })
      // }
      onSubmit={() => documentService.delete(id)}
    />
  );
}
