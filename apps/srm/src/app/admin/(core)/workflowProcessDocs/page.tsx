"use client"

import { documentTypesObject } from "@/shared/consts/object/documentTypesObject"
import { F_workflowProcessDocs } from "@aq-fe/core-ui/features/core/workflowProcessDocs/F_workflowProcessDocs"

export default function Page() {
    return (
        <F_workflowProcessDocs WorkflowTypeId={documentTypesObject.Workflow} />
    )
}
