import { contractService } from "@/shared/APIs/contractService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { useProgressReportStore } from "../useProgressReportStore";

export default function ProgressReportMainJobsDelete({ id, code }: {
    code: string
    id: number
}) {
    const store = useProgressReportStore()
    return (
        <CustomActionIconDelete
            contextData={code}
            onSubmit={() => contractService.insertOrUpdateMainTaskContract({
                id: id,
                srmContractReportHistoryId: store.state.historyReportId,
                isEnabled: false
            })} />
    )
}
