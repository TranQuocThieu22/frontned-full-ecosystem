import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export function F_organizationPolicyDocs_DeleteList({
  values,
}: {
  values: any;
}) {
  return (
    <CustomButtonDeleteList
      contextData={values.map((item: any) => item.decisionCode).join(",")}
      onSubmit={() => {
        return documentService.deleteList(values);
      }}
    />
  );
}
