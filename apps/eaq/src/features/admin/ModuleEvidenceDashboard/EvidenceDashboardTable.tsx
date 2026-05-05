"use client";

import { useMemo, useEffect, useState } from "react";
import { IEvidenceDashboardListItem } from "@/shared/interfaces/evidence/IEvidenceDashboard";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable, PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { Badge } from "@mantine/core";
import { useEvidenceDashboardStore } from "./useEvidenceDashboardStore";
import EvidenceActionViewOrUpdate from "@/shared/components/evidence/EvidenceActionViewOrUpdate";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function EvidenceDashboardTable() {
  const store = useEvidenceDashboardStore((s) => s);
  const departmentId = store.state.selectedDepartmentId;
  const activeView = store.state.activeView;
  const refreshKey = store.state.refreshKey;

  const typeMap: Record<string, number | null> = {
    empty: 1,
    expired: 2,
    unused: 3,
    all: null,
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: queryData, isLoading, refetch, dataCount } = useCustomReactQuery({
    queryKey: ["service_EAQEvidenceDashboard_getData", activeView, departmentId, pagination.pageIndex, pagination.pageSize],
    axiosFn: () =>
      service_EAQEvidence.getData({
        type: typeMap[activeView] as any,
        departmentId,
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      }),
  });

  const { data: allEvidenceData } = useCustomReactQuery({
    queryKey: ["EvidenceManagementTable_GetAllEvidences"],
    axiosFn: () => service_EAQEvidence.GetAllEvidences(),
  });
  const data = (queryData as any) || {};

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [activeView, departmentId]);

  useEffect(() => {
    refetch();
  }, [refreshKey, activeView, refetch]);

  const tableData = useMemo(() => {
    const list = (data?.evidenceList as any[]) || [];
    return list.map((item: any) => ({
      ...item,
      // Pass the raw numeric status or derive it from the activeView if missing
      status: item.status !== undefined
        ? item.status
        : (typeMap[activeView] !== null ? typeMap[activeView] : 0),
    }));
  }, [activeView, data]);

  const columns = useMemo<CustomColumnDef<IEvidenceDashboardListItem>[]>(
    () => [
      {
        header: "Mã minh chứng",
        accessorKey: "code",
        size: 150,
      },
      {
        header: "Tên minh chứng",
        accessorKey: "name",
        size: 300,
      },
      {
        header: "Loại minh chứng",
        accessorKey: "evidenceType.name",
        size: 200,
      },
      {
        header: "Đơn vị phụ trách",
        accessorKey: "departmentName",
        size: 200,
      },
      {
        header: "Hiệu lực",
        accessorKey: "currentVersion.expiredDate",
        type: 'ddMMyyyy',
        size: 200,
      },
      {
        header: "Trạng thái",
        accessorFn: (row) => {
          const status = String(row.status);
          if (status === String(typeMap.empty)) return "Trống";
          if (status === String(typeMap.expired)) return "Hết hạn";
          if (status === String(typeMap.unused)) return "Chưa sử dụng";
          return "Hợp lệ";
        },
        id: "status",
        size: 150,
        Cell: ({ cell }) => {
          const label = cell.getValue<string>();
          const color =
            label === "Trống"
              ? "red"
              : label === "Hết hạn"
                ? "orange"
                : label === "Chưa sử dụng"
                  ? "#4169E1"
                  : "gray";
          return (
            <CustomCenterFull>
              <Badge color={color} w={120} fw={700}>
                {label}
              </Badge>
            </CustomCenterFull>
          );
        },
      },
    ],
    []
  );

  return (
    <CustomDataTable
      isLoading={isLoading}
      isError={false}
      columns={columns}
      data={tableData}
      rowCount={dataCount}
      onPaginationChange={setPagination}
      pagination={pagination}
      enableRowSelection={false}
      renderRowActions={({ row }) => {
        const evidenceData: IEvidence = {
          ...row.original,
          eaqEvidenceCurrentVersion: row.original.currentVersion as any,
        } as IEvidence;

        return (
          <CustomCenterFull>
            <EvidenceActionViewOrUpdate
              editMode={false}
              listEvidence={allEvidenceData || []}
              values={evidenceData}
            />
          </CustomCenterFull>
        );
      }}
    />
  );
}
