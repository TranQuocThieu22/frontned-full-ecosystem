import { contractService } from "@/shared/APIs/contractService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { useProgressReportStore } from "../useProgressReportStore";

export default function ProgressReportTrainingResultsDelete({ id, code }: {
    code: string
    id: number
}) {
    const store = useProgressReportStore()
    return (
        <CustomActionIconDelete
            contextData={code}
            onSubmit={() => contractService.insertOrUpdateTrainingOutcome({
                id: id,
                srmContractReportHistoryId: store.state.historyReportId,
                isEnabled: false
            })} />
    )
}
