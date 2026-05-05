import { MyFlexEnd } from "@/components";
import { Space } from "@mantine/core";
import { F_workflowProcessDocs_Create } from "./F_workflowProcessDocs_Create";
import { F_workflowProcessDocs_Read } from "./F_workflowProcessDocs_Read";

export function F_workflowProcessDocs({
    WorkflowTypeId
}: {
    WorkflowTypeId: number
}) {
    return (
        < >
            <MyFlexEnd>
                <F_workflowProcessDocs_Create WorkflowTypeId={WorkflowTypeId} />
            </MyFlexEnd>
            <Space />
            <F_workflowProcessDocs_Read WorkflowTypeId={WorkflowTypeId} />
        </>
    )
}
