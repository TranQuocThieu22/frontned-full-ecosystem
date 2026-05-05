import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useQueryClient } from "@tanstack/react-query";

export default function ReminderCreateReportDeleteList({ data }: { data: SRMContractReportHistory[] }) {
    const queryClient = useQueryClient()
    const academicYearStore = useAcademicYearStore()
    return (
        <CustomButtonDeleteList
            contextData={data.map((data: SRMContractReportHistory) => `${dateUtils.toDDMMYYYY(data.reportDate)}`).join(", ")}
            onSubmit={() => {
                contractService.deleteSRMContractReportHistorys(data.map((item) => item.id!))
                queryClient.invalidateQueries({ queryKey: ['contractQuery', academicYearStore?.state?.academicYear?.id] })
            }}
        />
    );
}