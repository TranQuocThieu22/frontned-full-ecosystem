import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useQueryClient } from "@tanstack/react-query";

interface IReminderCreateReportDeleteProps {
    contractReportHistories: SRMContractReportHistory,
    loading?: boolean,
}

export default function ReminderCreateReportDelete({ contractReportHistories, loading }: IReminderCreateReportDeleteProps) {
    const queryClient = useQueryClient()
    const academicYearStore = useAcademicYearStore()

    return (
        <CustomActionIconDelete
            contextData={dateUtils.toDDMMYYYY(contractReportHistories.reportDate)}
            onSubmit={() => {
                contractService.deleteSRMContractReportHistorys([contractReportHistories?.id!])
                queryClient.invalidateQueries({ queryKey: ['contractQuery', academicYearStore?.state?.academicYear?.id] })
            }}
            actionIconProps={{
                loading: loading
            }}
        />
    );
}