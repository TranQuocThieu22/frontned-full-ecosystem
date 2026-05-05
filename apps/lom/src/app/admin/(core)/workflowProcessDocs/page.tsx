"use client"

import { object_documentTypes } from "@/constants/object/object_documentTypes"
import { F_workflowProcessDocs } from "@aq-fe/core-ui/features/core/workflowProcessDocs/F_workflowProcessDocs"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"

export default function Page() {
    return (
        <CustomPageContent>
            <F_workflowProcessDocs WorkflowTypeId={object_documentTypes.Workflow} />
        </CustomPageContent>
    )
}
