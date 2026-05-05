import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IReminder } from "@/shared/interfaces/reminder/IReminder";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
  eaqReportId: number
}

export default function PeriodicImprovementReportViewModal({ eaqReportId }: Props) {
  const disc = useDisclosure(false);
  const reportReminder = useCustomReactQuery({
    queryKey: ['reportReminder', eaqReportId],
    axiosFn: async () => service_EAQAnalysis.getEAQReportRemindersByEAQReportId({ eaqReportId: eaqReportId }),
    options: {
      enabled: disc[0]
    }
  })
  // Columns cho bảng "Chi tiết nhắc nhở"
  const columns = useMemo<MRT_ColumnDef<IReminder>[]>(
    () => [
      {
        header: "Ngày gửi",
        accessorKey: "sendDate",
        accessorFn: (r) =>
          r.sendDate
            ? `${dateUtils.toDDMMYYYY(new Date(r.sendDate))} ${new Date(
              r.sendDate
            )
              .toTimeString()
              .slice(0, 8)}`
            : "",
        size: 160,
      },
      { header: "Người gửi", accessorKey: "from", size: 180 },
      { header: "Người nhận", accessorKey: "to", size: 180 },
      { header: "Nội dung thông báo", accessorKey: "description", size: 300 },
    ],
    []
  );

  // const menuData = values?.reminderLogs ?? [];

  return (
    <CustomButtonModal
      disclosure={disc}
      buttonProps={{ actionType: "view", children: "Xem chi tiết" }}
      modalProps={{ title: "Chi tiết thông báo", size: "80%" }}
    >
      <Box mb={20}>
        <CustomDataTable
          columns={columns}
          isLoading={reportReminder.isLoading}
          isError={reportReminder.isError}
          data={reportReminder.data || []}
          enableRowSelection
          renderToolbarInternalActions={() => null}
        />
      </Box>
    </CustomButtonModal>
  );
}
