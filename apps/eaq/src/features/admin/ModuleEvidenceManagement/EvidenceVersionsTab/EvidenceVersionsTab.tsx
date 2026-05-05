"use client";

import { Anchor, Checkbox, Text } from "@mantine/core";

import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvidenceVersionsCreate from "./EvidenceVersionsCreate";
import EvidenceVersionsUpdate from "./EvidenceVersionsUpdate";
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { IDepartment } from "@/shared/interfaces/department/IDepartment";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";


interface EvidenceVersionsTabProps {
  evidenceId?: number;
  editMode?: boolean;
  versions: IEnvidenceVersion[];
  setVersions: (versions: IEnvidenceVersion[]) => void;
  listUnit: IDepartment[];
}

export default function EvidenceVersionsTab({
  evidenceId,
  editMode = true,
  versions,
  setVersions,
  listUnit,
}: Readonly<EvidenceVersionsTabProps>) {

  const columns = useMemo<MRT_ColumnDef<IEnvidenceVersion>[]>(
    () => [
      {
        header: "ID File",
        accessorKey: "code",
        size: 120,
      },
      {
        header: "Tên file",
        accessorKey: "attachFileName",
        size: 300,
      },

      {
        header: "File đính kèm",
        accessorKey: "attachFilePath",
        size: 120,
        accessorFn: (row) => {
          return (
            <CustomCenterFull>
              <CustomButtonViewFileAPI filePath={row.attachFilePath} />
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
            <Anchor href={row.link ?? ""} target="_blank">
              <Text truncate maw={200}>
                {row.link ?? ""}
              </Text>
            </Anchor>
          );
        },
      },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "versionNumberIssueDate",
        size: 200,
      },
      {
        header: "Đơn vị ban hành/ cấp",
        accessorKey: "department",
        size: 200,

      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "validDate",
        size: 130,
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(new Date(cell.getValue<string>())),
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "expiredDate",
        size: 130,
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(new Date(cell.getValue<string>())),
      },
      {
        header: "Ghi chú phiên bản",
        accessorKey: "attachFileDescription",
        size: 250,
      },
      {
        header: "Hiện hành",
        accessorKey: "isCurrent",
        size: 100,
        accessorFn: (row) => (
          <Checkbox checked={row.isCurrent ?? false} readOnly />
        ),
      },
    ],
    []
  );

  const handleAdd = (newVersion: IEnvidenceVersion) => {
    setVersions([
      ...versions,
      { ...newVersion, eaqEvidenceId: evidenceId, statusAction: "isCreate" },
    ]);
  };

  const handleUpdate = (updated: IEnvidenceVersion) => {
    setVersions(
      versions.map((v) =>
        v.code === updated.code
          ? {
            ...updated,
            statusAction:
              v.statusAction === "isCreate" ? "isCreate" : "isUpdate",
          }
          : v
      )
    );
  };

  const handleDelete = (code?: string) => {
    setVersions(
      versions
        .filter((v) => {
          if (v.code === code) {
            return v.statusAction !== "isCreate";
          }
          return true;
        })
        .map((v) => (v.code === code ? { ...v, statusAction: "isDelete" } : v))
    );
  };

  const handleDeleteList = (codes: (string | undefined)[]) => {
    setVersions(
      versions
        .filter(
          (v) => !(codes.includes(v.code) && v.statusAction === "isCreate")
        )
        .map((v) =>
          codes.includes(v.code) ? { ...v, statusAction: "isDelete" } : v
        )
    );
  };

  return (
    <CustomDataTable
      columns={columns}
      enableRowSelection={true}
      data={versions.filter((v) => v.statusAction !== "isDelete")}
      {...(editMode && {
        renderTopToolbarCustomActions: ({ table }) => (
          <>
            <EvidenceVersionsCreate
              onAddAction={handleAdd}
              existingVersions={versions}
            />
            <CustomButtonDeleteList
              onSubmit={() => {
                const codes = table
                  .getSelectedRowModel()
                  .flatRows.map((item) => item.original.code);
                handleDeleteList(codes);
                table.resetRowSelection();
              }}
              count={table.getSelectedRowModel().flatRows.length}
            />
          </>
        ),
        renderRowActions: ({ row }) => (
          <CustomCenterFull>
            <EvidenceVersionsUpdate
              values={row.original}
              onUpdateAction={handleUpdate}
              existingVersions={versions}
            />
            <CustomActionIconDelete
              onSubmit={() => handleDelete(row.original.code!)}
              contextData={row.original.code!}
            />
          </CustomCenterFull>
        ),
      })}
    />
  );
}
