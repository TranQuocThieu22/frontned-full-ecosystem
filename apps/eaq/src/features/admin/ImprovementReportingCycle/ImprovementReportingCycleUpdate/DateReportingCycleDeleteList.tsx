import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    table: any
    clearSelection: Function
}

export default function DateReportingCycleDeleteList({ table, clearSelection }: Props) {
    const selectedRow = table.getSelectedRowModel().flatRows;
    return (
        <CustomButtonDeleteList
            count={selectedRow.length}
            onSubmit={() => {
                const dataToDelete = selectedRow?.map((i: any) => ({ id: i.id, isEnabled: false }))
                return service_EAQAnalysis.deleteListEAQTaskDetailReport(dataToDelete)
            }}
            onSuccess={() => {
                clearSelection();
            }}
        />
    )
}
