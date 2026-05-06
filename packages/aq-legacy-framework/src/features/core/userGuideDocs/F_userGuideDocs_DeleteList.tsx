import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomButtonDeleteList } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonDeleteList";
import { BaseEntity } from "@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity";
import { Document } from "@aq-fe/aq-legacy-framework/shared/interfaces/Document";

export default function F_userGuideDocs_DeleteList({ data }: { data: Document[] }) {
  return (
    <CustomButtonDeleteList
      contextData={data.map((data: Document) => `${data.code}`).join(", ")}
      onSubmit={() => {
        return documentService.deleteList(data.map((item) => ({ id: item.id }) as BaseEntity));
      }}
    />
  );
}
