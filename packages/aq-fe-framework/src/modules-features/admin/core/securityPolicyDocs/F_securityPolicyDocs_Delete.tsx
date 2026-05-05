import { documentService } from "@/APIs/documentService";
import { MyActionIconDelete } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export function F_securityPolicyDocs_Delete({
  id,
  contextData,
}: {
  id: number;
  contextData: string;
}) {
  return (
    <MyActionIconDelete
      contextData={contextData}
      onSubmit={() => documentService.delete(id)}

    // onSubmit={() => baseAxios.post("/Document/delete", { id: id })}
    />
  );
}
