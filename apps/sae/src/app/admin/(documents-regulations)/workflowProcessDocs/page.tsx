"use client"
import { object_documentTypes } from '@/constants/object/object_documentTypes'
import { F_workflowProcessDocs } from '@aq-fe/core-ui/features/core/workflowProcessDocs/F_workflowProcessDocs'


export default function Page() {
    return (
        <F_workflowProcessDocs WorkflowTypeId={object_documentTypes.Workflow} />
    )
}
