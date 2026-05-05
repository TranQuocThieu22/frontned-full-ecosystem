import { service_EAQExternalAssessment } from "@/shared/APIs/service_EAQExternalAssessment";
import { IExternalAssessment } from "@/shared/interfaces/externalAssessment/IExternalAssessment";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface props {
    table: MRT_TableInstance<IExternalAssessment>,
    loading?: boolean
};

export default function ExternalAssessmentManagementDeleteList(
    { table, loading }:
        props
) {
    const selectedRow = table.getSelectedRowModel().flatRows;
    return (
        <CustomButtonDeleteList
            count={selectedRow.length}
            onSubmit={() => service_EAQExternalAssessment.deleteList(selectedRow.flatMap((item) => item.original)).then(() => table.resetRowSelection())}
            loading={loading}
        />
    )
}
