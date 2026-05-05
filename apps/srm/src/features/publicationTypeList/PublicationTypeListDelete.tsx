import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function PublicationTypeListDelete({ id, code }: { id: number, code: string }) {
  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={() => {
        return publicationTypeService.delete(id);
      }} />
  );
}