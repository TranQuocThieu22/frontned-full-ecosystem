"use client";

import { useMemo } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { IEvidenceType } from "@/shared/interfaces/evidence/IEvidenceType";
import { service_EAQEvidenceType } from "@/shared/APIs/service_EAQEvidenceType";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import EvidenceTypeCreateOrUpdate from "./EvidenceTypeCreateOrUpdate";
import EvidenceTypeDelete from "./EvidenceTypeDelete";
import EvidenceTypeDeleteList from "./EvidenceTypeDeleteList";
import { useEvidenceTypeStore } from "./useEvidenceTypeStore";

export default function EvidenceTypeTable() {
  const searchKey = useEvidenceTypeStore((s) => s.state.searchKey);

  const EvidenceType_GetAll = useCustomReactQuery({
    queryKey: ["EvidenceTypeTable_GetAll"],
    axiosFn: () => service_EAQEvidenceType.getAll(),
  });

  const columns = useMemo<MRT_ColumnDef<IEvidenceType>[]>(
    () => [
      {
        header: "Mã loại minh chứng",
        accessorKey: "code",
        size: 150,
      },
      {
        header: "Tên loại minh chứng",
        accessorKey: "name",
        size: 300,
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
        size: 400,
      },
      {
        header: "Đơn vị ban hành",
        accessorKey: "department.name",
        size: 200,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    const allData = EvidenceType_GetAll.data || [];
    if (!searchKey) return allData;
    const lowerKey = searchKey.toLowerCase();
    return allData.filter(
      (item) =>
        item.code?.toLowerCase().includes(lowerKey) ||
        item.name?.toLowerCase().includes(lowerKey) ||
        item.note?.toLowerCase().includes(lowerKey)
    );
  }, [EvidenceType_GetAll.data, searchKey]);

  return (
    <CustomFieldset title="Danh sách loại minh chứng">
      <CustomDataTable
        isLoading={EvidenceType_GetAll.isLoading}
        isError={EvidenceType_GetAll.isError}
        columns={columns}
        data={filteredData}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) ||
            [];

          return (
            <>
              <EvidenceTypeCreateOrUpdate isCreate />

              <EvidenceTypeDeleteList
                selectedItems={selectedRows}
                onSubmit={async () => {
                  await service_EAQEvidenceType.deleteList(selectedRows);
                  table.resetRowSelection();
                }}
              />
            </>
          );
        }}
        renderRowActions={({ row, table }) => {
          return (
            <CustomCenterFull>
              <EvidenceTypeCreateOrUpdate
                values={row.original}
              />
              <EvidenceTypeDelete
                id={row.original.id!}
                code={row.original.code!}
                resetRowSelection={table.resetRowSelection}
              />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
