import { useMemo } from "react";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { Event } from "@/interfaces/event";
import { EnumLabelRegisterType, EnumRegisterType } from "@/enum/EnumEventRegisterType";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { hierarchicalNameFilter } from "@/utils/activityPlanFilters";
import { ActivityPlanRowNumber } from "@/components/ActivityPlan/shared/ActivityPlanRowNumber";
import { ActivityPlanNameCell } from "@/components/ActivityPlan/shared/ActivityPlanNameCell";
import { Status } from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/PlanningApproval/Status";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

interface UseActivityPlanColumnsOptions {
    additionalColumns?: CustomColumnDef<ActivityPlan>[];
    excludeColumns?: string[];
    customColumnOverrides?: Partial<Record<string, CustomColumnDef<ActivityPlan>>>;
}

export const useActivityPlanColumns = (
    options: UseActivityPlanColumnsOptions = {}
): CustomColumnDef<ActivityPlan>[] => {
    const { additionalColumns = [], excludeColumns = [], customColumnOverrides = {} } = options;

    return useMemo(() => {
        const baseColumns: CustomColumnDef<ActivityPlan>[] = [
            {
                id: "customRowNumber",
                header: "STT",
                size: 60,
                Cell: ({ row }) => <ActivityPlanRowNumber row={row} />,
                enableSorting: false,
                enableColumnFilter: false,
            },
            {
                header: "Điều",
                accessorKey: "standardCode",
                size: 50,
                filterFn: hierarchicalNameFilter,
            },
            {
                header: "Mã hoạt dộng ngoại khóa",
                accessorKey: "code",
                filterFn: hierarchicalNameFilter,
            },
            {
                header: "Hoạt động ngoại khóa",
                accessorKey: "name",
                size: 400,
                Cell: ({ row }) => <ActivityPlanNameCell row={row.original} />,
                filterFn: hierarchicalNameFilter,
            },
            {
                header: "Đơn vị tổ chức",
                accessorKey: "hostName",
            },
            {
                header: "Đơn vị ghi nhận",
                accessorKey: "reviewedName",
                size: 190,
            },
            {
                header: "Đơn vị công nhận",
                accessorKey: "completedName",
                size: 210,
            },
            {
                header: "Địa điểm tổ chức",
                accessorKey: "location",
                size: 200,
            },
            {
                header: "Số lượt tham gia tối đa",
                accessorKey: "quantity",
            },
            {
                header: "Điểm tối thiểu",
                accessorKey: "minPoint",
                size: 160,
            },
            {
                header: "Điểm tối đa",
                accessorKey: "maxPoint",
                size: 160,
            },
            {
                header: "Đối tượng đăng ký",
                accessorKey: "registerType",
                accessorFn: (row) => {
                    const event = row as Event;
                    return EnumLabelRegisterType[event.registerType as EnumRegisterType];
                },
            },
            {
                header: "Ngày bắt đầu",
                accessorKey: "startDate",
                accessorFn: (row) => {
                    if (!row.startDate || row.events) return "";
                    return dateUtils.toDDMMYYYY(new Date(row.startDate));
                },
            },
            {
                header: "Ngày kết thúc",
                accessorKey: "endDate",
                accessorFn: (row) => {
                    if (!row.endDate || row.events) return "";
                    return dateUtils.toDDMMYYYY(new Date(row.endDate));
                },
            },
            {
                header: "Trạng thái duyệt",
                accessorKey: "approvalStatus",
                size: 200,
                Cell: ({ row }) => {
                    if (row.original.events) return null;
                    return <Status status={row.original.approvalStatus || 0} />;
                },
            },
        ];

        // Apply custom overrides
        const columnsWithOverrides = baseColumns.map((col) => {
            const override = customColumnOverrides[col.accessorKey as string];
            return override ? { ...col, ...override } : col;
        });

        // Filter out excluded columns
        const filteredColumns = columnsWithOverrides.filter(
            (col) => !excludeColumns.includes(col.accessorKey as string)
        );

        // Add additional columns at the end
        return [...filteredColumns, ...additionalColumns];
    }, [additionalColumns, excludeColumns, customColumnOverrides]);
};
