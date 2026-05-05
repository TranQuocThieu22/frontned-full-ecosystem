import { contractService } from "@/shared/APIs/contractService";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Button } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { IconUpload } from "@tabler/icons-react";
import { useProgressReportStore } from "./useProgressReportStore";

export default function ProgressReportReportSubmitted({ disc }: { disc?: UseDisclosureReturnValue }) {
    const store = useProgressReportStore()
    const mutation = useCustomReactMutation({
        axiosFn: () => contractService.reportSubmitted({
            SRMContractReportHistoryId: store.state.historyReportId!
        }),
        successNotification: "Nộp báo cáo thành công",
        options: {
            onSuccess: () => {
                disc?.[1].close()
            }
        }
    })
    return (
        <Button leftSection={<IconUpload />} color="cyan" onClick={() => mutation.mutate()} loading={mutation.isPending}>Nộp báo cáo</Button>
    )
}
