"use client";

import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { Anchor, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvidenceVersionCreateButton from "./EvidenceVersionCreateButton";
import EvidenceVersionUpdate from "./EvidenceVersionUpdateModal";
import EvidenceVersionView from "./EvidenceVersionView";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFile } from "@aq-fe/core-ui/shared/components/button/CustomButtonViewFile";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface EvidenceVersionTableProps {
  evidenceId?: number;
  readOnly?: boolean;
  versions: IEnvidenceVersion[];
  setVersions: (versions: IEnvidenceVersion[]) => void;
}

export default function EvidenceVersionTable({
  evidenceId,
  readOnly,
  versions,
  setVersions,
}: Readonly<EvidenceVersionTableProps>) {

  const evidenceVersionColumns = useMemo<MRT_ColumnDef<IEnvidenceVersion>[]>(
    () => [
      {
        header: "ID File",
        accessorKey: "code",
        accessorFn(row) {
          return row.code ?? "";
        },
      },
      {
        header: "Tên file",
        accessorKey: "attachFileName",
        size: columnSizeObject.name,
      },
      {
        header: "File đính kèm",
        accessorKey: "attachFilePath",
        accessorFn: (row) => {
          if (row.attachFileViewModel) {
            return (
              <CustomCenterFull>
                <CustomButtonViewFile file={row.attachFileViewModel} />
              </CustomCenterFull>
            );
          }
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
        header: "Đơn vị ban hành / cấp",
        accessorKey: "department",
        size: 200,
      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "validDate",
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(cell.getValue<string>()),
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "expiredDate",
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(cell.getValue<string>()),
      },
      {
        header: "Ghi chú phiên bản",
        accessorKey: "attachFileDescription",
        size: columnSizeObject.name,
      },
      {
        header: "Hiện hành",
        accessorKey: "isCurrent",
        accessorFn: (row) => (
          <CustomThemeIconSquareCheck checked={row.isCurrent ?? false} />
        ),
      },
    ],
    [versions]
  );

  const handleAdd = (newVersion: IEnvidenceVersion) => {
    setVersions([
      ...versions,
      { ...newVersion, eaqEvidenceId: evidenceId, statusAction: "isCreate" },
    ]);
  };

  const handleUpdate = (updated: IEnvidenceVersion) => {
    setVersions(
      versions.map((version) =>
        version.code === updated.code
          ? {
            ...updated,
            statusAction:
              version.statusAction === "isCreate" ? "isCreate" : "isUpdate",
          }
          : version
      )
    );
  };

  const handleDelete = (code?: string) => {
    setVersions(
      versions.filter((version) => {
        if (version.code === code) {
          return version.statusAction !== "isCreate";
        }
        return true;
      })
        .map((version) => (version.code === code ? { ...version, statusAction: "isDelete" } : version))
    );
  };

  const handleDeleteList = (codes: (string | undefined)[]) => {
    setVersions(
      versions.filter(
        (version) => !(codes.includes(version.code) && version.statusAction === "isCreate")
      )
        .map((version) =>
          codes.includes(version.code) ? { ...version, statusAction: "isDelete" } : version
        )
    );
  };

  return (
    <CustomDataTable
      enableRowSelection={true}
      columns={evidenceVersionColumns}
      data={versions.filter((version) => version.statusAction !== "isDelete")}
      getRowId={(row) => row.index}
      {...(!readOnly && {
        renderTopToolbarCustomActions: ({ table }) => (
          <>
            <EvidenceVersionCreateButton onAdd={handleAdd} />
            <CustomButtonDeleteList
              count={table.getSelectedRowModel().flatRows.length}
              onSubmit={() => {
                const codes = table.getSelectedRowModel().flatRows.map((item) => item.original.code);

                handleDeleteList(codes);
                table.resetRowSelection();
              }}
            />
          </>
        ),
        renderRowActions: ({ row }) => (
          <CustomCenterFull>
            <EvidenceVersionView
              values={row.original}
            />
            <EvidenceVersionUpdate
              values={row.original}
              onUpdate={handleUpdate}
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
