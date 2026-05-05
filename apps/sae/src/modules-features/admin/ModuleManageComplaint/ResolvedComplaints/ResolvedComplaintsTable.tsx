'use client';

import { service_eventComplaint } from "@/api/services/service_eventComplaint";
import { ENUM_EVENT_COMPLAINT_STATUS } from "@/constants/enum/global";
import { eventComplaintEnumColor, eventComplaintEnumIcon, eventComplaintEnumLabel } from "@/enum/EnumEventComplaintStatus";
import { EventComplaint } from "@/interfaces/eventComplaint";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";

export default function ResolvedComplaintsTable() {

  const Q_EventComplaint = useCustomReactQuery({
    queryKey: ["getEventComplaint"],
    axiosFn: () => service_eventComplaint.getEventComplaint({
      status: 3
    }),
  })

  const columns = useMemo<CustomColumnDef<EventComplaint>[]>(() => [
    {
      header: "Mã sinh viên",
      accessorKey: "studentCode",
    },
    {
      header: "Tên sinh viên",
      accessorKey: "studentName",
    },
    {
      header: "Khoa",
      accessorKey: "facultyName",
    },
    {
      header: "Mã điều",
      accessorKey: "standardCode",
    },
    {
      header: "Tên điều",
      accessorKey: "standardName",
    },
    {
      header: "Mã hoạt động",
      accessorKey: "eventCode",
    },
    {
      header: "Tên hoạt động",
      accessorKey: "eventName",
      type: "html",
      size: 700
    },
    {
      header: "Điểm cũ",
      accessorKey: "point",
    },
    {
      header: "Điểm cần khiếu nại",
      accessorKey: "complaintPoint",
    },

    {
      header: "File minh chứng",
      accessorKey: "path",
      type: "viewFile"
    },
    {
      header: "Điểm mới",
      accessorKey: "newPoint",
    },
    {
      header: "Ghi chú",
      accessorKey: "note",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
      accessorFn(originalRow) {
        return <CustomEnumBadge
          value={originalRow.status}
          enumLabel={eventComplaintEnumLabel}
          enumColor={eventComplaintEnumColor}
          enumIcon={eventComplaintEnumIcon}
        />
      },
    },
  ], []);

  return (
    <CustomFieldset title={`Khiếu nại đã xử lý`}>
      <CustomDataTable
        pinningRightColumns={['status']}
        isLoading={Q_EventComplaint.isLoading}
        isError={Q_EventComplaint.isError}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        data={Q_EventComplaint.data || []}
      // renderRowActions={({ row }) => (
      //   <CustomCenterFull>
      //     <ResolvedComplaintsButtonUpdate
      //       data={row.original} />
      //   </CustomCenterFull>
      // )}
      />
    </CustomFieldset>
  );
}
