"use client";

import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { Anchor, Badge, Group, Text } from "@mantine/core";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvidenceManagementCreate from "./EvidenceManagementCreate";
import EvidenceManagementDelete from "./EvidenceManagementDelete";
import EvidenceManagementExportButton from "./EvidenceManagementExportButton";
import EvidenceManagementImportButton from "./EvidenceManagementImportButton";
import EvidenceActionViewOrUpdate from "@/shared/components/evidence/EvidenceActionViewOrUpdate";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { service_EvidenceType } from "@/shared/APIs/service_EvidenceType";

export default function EvidenceManagementTable() {
  const Evidence_GetAll = useCustomReactQuery({
    queryKey: ["EvidenceManagementTable_GetAllEvidences"],
    axiosFn: () => service_EAQEvidence.GetAllEvidences(),
  });
  const EvidenceType_GetAll = useCustomReactQuery({
    queryKey: ["EvidenceManagementTable_GetEvidenceTypeByDepartment"],
    axiosFn: () => service_EvidenceType.GetEvidenceTypeByDepartment(),
  });
  console.log(EvidenceType_GetAll);

  const columns = useMemo<MRT_ColumnDef<IEvidence>[]>(
    () => [
      {
        header: "Mã Minh chứng",
        accessorKey: "code",
        size: 150,
      },
      {
        header: "Tên Minh chứng",
        accessorKey: "name",
        size: 300,
      },
      {
        header: "Mã MC Trực thuộc",
        accessorKey: "referenceEvidence.code",
        size: 150,
      },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "eaqEvidenceCurrentVersion.versionNumberIssueDate",
        size: 200,
      },
      {
        header: "Đơn vị ban hành",
        accessorKey: "eaqEvidenceCurrentVersion.department",
        size: 200,
      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "eaqEvidenceCurrentVersion.validDate",
        size: 130,
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(new Date(cell.getValue<string>())),
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "eaqEvidenceCurrentVersion.expiredDate",
        size: 130,
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(new Date(cell.getValue<string>())),
      },
      {
        header: "Trạng thái hiệu lực",
        accessorKey: "validityStatus",
        size: 180,
        Cell: ({ row }) => {
          const effectiveTo =
            row.original.eaqEvidenceCurrentVersion?.expiredDate;

          const currentDate = new Date();
          const toDate = effectiveTo ? new Date(effectiveTo) : null;
          const isLate = !toDate || currentDate > toDate;

          return (
            <Badge
              w="100%"
              h={25}
              leftSection={
                isLate ? <IconClockX size={16} /> : <IconClockCheck size={16} />
              }
              variant="light"
              color={isLate ? "red" : "green"}
              radius="md"
              fw={700}
            >
              {isLate ? "Hết hạn" : "Còn hiệu lực"}
            </Badge>
          );
        },
      },

      {
        header: "File đính kèm",
        accessorKey: "eaqEvidenceCurrentVersion.attachFilePath",
        size: 120,
        Cell: ({ cell }) => {
          return (
            <CustomCenterFull>
              <CustomButtonViewFileAPI filePath={cell.getValue<string>()} />
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Link liên kết",
        accessorKey: "link",
        size: 120,
        accessorFn: (row) => {
          return (
            <Anchor href={row.eaqEvidenceCurrentVersion?.link} target="_blank">
              <Text truncate maw={200}>
                {row.eaqEvidenceCurrentVersion?.link}
              </Text>
            </Anchor>
          );
        },
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
        size: 600,
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách minh chứng">
      <CustomDataTable
        isLoading={Evidence_GetAll.isLoading}
        isError={Evidence_GetAll.isError}
        columns={columns}
        data={Evidence_GetAll.data || []}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) ||
            [];

          return (
            <>
              <EvidenceManagementCreate
                listEvidence={Evidence_GetAll.data || []}
              />
              <EvidenceManagementImportButton
                listEvidence={Evidence_GetAll.data || []}
              />
              <EvidenceManagementExportButton
                data={Evidence_GetAll.data || []}
              />

              <CustomButtonDeleteList
                onSubmit={() => {
                  table.resetRowSelection();
                  return service_EAQEvidence.deleteList(selectedRows);
                }}
                count={selectedRows.length}
              />
            </>
          );
        }}
        renderRowActions={({ row, table }) => {
          const filteredEvidenceList =
            Evidence_GetAll.data?.filter((e) => e.code != row.original.code) ||
            [];
          return (
            <CustomCenterFull >
              <EvidenceActionViewOrUpdate
                editMode={false}
                listEvidence={filteredEvidenceList}
                values={row.original}
              />
              <EvidenceActionViewOrUpdate
                listEvidence={filteredEvidenceList}
                values={row.original}
              />
              <EvidenceManagementDelete
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
