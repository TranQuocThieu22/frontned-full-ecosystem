import { documentService } from "@/APIs/documentService";
import { MyActionIconDelete } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export function F_formTemplateDocs_Delete({
  id,
  contextData,
}: {
  id: number;
  contextData: string;
}) {
  return (
    <MyActionIconDelete
      contextData={contextData}
      // onSubmit={async () =>
      //   await baseAxios.post("/Document/delete", { id: id })
      // }
      onSubmit={() => documentService.delete(id)}
    />
  );
}
