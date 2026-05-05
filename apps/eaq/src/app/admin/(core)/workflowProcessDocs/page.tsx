"use client"
import { F_workflowProcessDocs } from "@aq-fe/core-ui/features/core/workflowProcessDocs/F_workflowProcessDocs"
import { documentTypesObject } from "@/shared/constants/object/DocumentTypesObject"

export default function Page() {
    return (
        <F_workflowProcessDocs WorkflowTypeId={documentTypesObject.Workflow} />
    )
}
