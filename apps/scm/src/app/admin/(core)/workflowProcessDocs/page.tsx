"use client"
import { const_object_documentTypes } from '@/const'
import { MyPageContent } from 'aq-fe-framework/components'
import { F_workflowProcessDocs } from 'aq-fe-framework/modules-features'


export default function Page() {
    return (
        <MyPageContent>
            <F_workflowProcessDocs WorkflowTypeId={const_object_documentTypes.Workflow} />
        </MyPageContent>
    )
}
