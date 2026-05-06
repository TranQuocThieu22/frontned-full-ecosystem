import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomButtonDeleteList } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonDeleteList";

export function F_workflowProcessDocs_DeleteList({
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