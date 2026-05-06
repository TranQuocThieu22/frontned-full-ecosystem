import { F_workflowProcessDocs_Read } from "./F_workflowProcessDocs_Read";

export function F_workflowProcessDocs({
  WorkflowTypeId,
}: {
  WorkflowTypeId: number;
}) {
  return (
    <>
      {/* <CustomFlexEnd>
                <F_workflowProcessDocs_Create WorkflowTypeId={WorkflowTypeId} />
            </CustomFlexEnd>
            <Space /> */}
      <F_workflowProcessDocs_Read WorkflowTypeId={WorkflowTypeId} />
    </>
  );
}
