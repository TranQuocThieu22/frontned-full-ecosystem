import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    data?: any
    clearSelection: Function
    disabled?: boolean
}

export function DateReportingCycleDelete({ data, clearSelection, disabled }: Props) {
    return (
        <CustomActionIconDelete
            contextData={`Lần báo cáo "${data?.order}"`}
            buttonProps={{
                disabled: disabled
            }}
            onSubmit={() => {
                return service_EAQAnalysis.deleteListEAQTaskDetailReport([{ id: data.id, isEnabled: false }])
            }}
            onSuccess={() => {
                clearSelection();
            }}
        />
    )
}
