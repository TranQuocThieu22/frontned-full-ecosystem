"use client"
import { F_workflowProcessDocs } from '@/modules-features/admin/core/workflowProcessDocs/F_workflowProcessDocs'
import { documentTypesObject } from '@/shared/consts/documentTypesObject'

export default function Page() {
    return (
        <F_workflowProcessDocs WorkflowTypeId={documentTypesObject.Workflow} />
    )
}
