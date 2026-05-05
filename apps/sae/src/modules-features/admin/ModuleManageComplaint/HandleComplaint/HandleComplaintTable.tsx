'use client';

import { service_eventComplaint } from "@/api/services/service_eventComplaint";
import { ENUM_EVENT_COMPLAINT_STATUS } from "@/constants/enum/global";
import { EventComplaint } from "@/interfaces/eventComplaint";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import HandleComplaintButtonUpdate from "./HandleComplaintButtonUpdate";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { eventComplaintEnumLabel, eventComplaintEnumColor, eventComplaintEnumIcon } from "@/enum/EnumEventComplaintStatus";

export default function HandleComplaintTable() {
    const query_Eventcomplaint_GetAll = useCustomReactQuery({
        queryKey: ["getEventComplaint"],
        axiosFn: () => service_eventComplaint.getEventComplaint(),
    });

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
            size: 150,
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Tên điều",
            accessorKey: "standardName",
        },
        {
            header: "Mã hoạt động",
            accessorKey: "eventCode",
            mantineTableBodyCellProps: {
                align: 'center',
            },
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
            size: 150,
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Điểm cần khiếu nại",
            accessorKey: "complaintPoint",
            size: 150,
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "File",
            accessorKey: "path",
            enableSorting: false,
            mantineTableBodyCellProps: {
                align: 'center',
            },
            type: "viewFile"
        },
        {
            header: "Điểm mới",
            accessorKey: "newPoint",
            size: 150,
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            accessorFn: (row) => {
                return <CustomEnumBadge
                    value={row.status}
                    enumLabel={eventComplaintEnumLabel}
                    enumColor={eventComplaintEnumColor}
                    enumIcon={eventComplaintEnumIcon}
                />
            },
        },
    ], [query_Eventcomplaint_GetAll?.data]);

    return (
        <CustomFieldset title={`Xử lý khiếu nại`}>
            <CustomDataTable
                isLoading={query_Eventcomplaint_GetAll.isLoading}
                isError={query_Eventcomplaint_GetAll.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={query_Eventcomplaint_GetAll.data?.filter(item => item.status! !== 3) || []}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <HandleComplaintButtonUpdate
                            values={row.original} />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    )
}
