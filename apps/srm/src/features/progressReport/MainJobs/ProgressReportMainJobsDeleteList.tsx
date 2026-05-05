"use client";

import { contractService } from "@/shared/APIs/contractService";
import { SRMMainTask } from "@/shared/interfaces/SRMMainTask";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_TableInstance } from "mantine-react-table";
import { useProgressReportStore } from "../useProgressReportStore";

export default function ProgressReportMainJobsDeleteList({ table }: { table: MRT_TableInstance<SRMMainTask> }) {
    const store = useProgressReportStore();
    const queryClient = useQueryClient();
    const selectedRows = table.getSelectedRowModel().flatRows.map((r) => r.original);

    return (
        <CustomButtonDeleteList
            count={selectedRows.length}
            onSubmit={() => {
                const historyReportId = store.state.historyReportId;
                if (!historyReportId) return Promise.reject(new Error("Vui lòng mở báo cáo tiến độ trước khi xóa."));
                return Promise.all(
                    selectedRows.map((row) =>
                        contractService.insertOrUpdateMainTaskContract({
                            id: row.id!,
                            srmContractReportHistoryId: historyReportId,
                            isEnabled: false,
                        })
                    )
                ).then(() => {
                    queryClient.invalidateQueries({ queryKey: ["historyReports"] });
                });
            }}
            onSuccess={() => table.resetRowSelection()}
        />
    );
}
