"use client";

import { ITaskDetailRequirement } from "@/shared/interfaces/requirement/ITaskDetailRequirement";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function TaskDetailReadRequirementTable({
  values,
}: {
  values?: ITaskDetail;
}) {
  const columns = useMemo<MRT_ColumnDef<ITaskDetailRequirement>[]>(
    () => [
      {
        header: "Mã yêu cầu",
        size: 180,
        accessorFn(row) {
          return row.eaqRequirement?.code;
        },
      },
      {
        header: "Yêu cầu",
        size: 380,
        accessorFn(row) {
          return row.eaqRequirement?.name;
        },
      },
      {
        header: "Các câu hỏi đặt ra (Mốc chuẩn tham chiếu)",
        accessorKey: "collectionQuestion",
        size: 380,
      },
      {
        header: "Cần thu thập",
        accessorKey: "collectionNeed",
        size: 380,
      },
      {
        header: "Nơi thu thập",
        size: 380,
        accessorKey: "collectionWhere",
      },
      {
        header: "Phương pháp thu thập",
        accessorKey: "collectionMethod",
        size: 300,
      },
    ],
    [values]
  );

  return (
    <CustomFieldset title="Danh sách yêu cầu">
      <CustomFlexColumn>
        <CustomDataTable
          enableRowSelection
          enableRowNumbers={false}
          data={values?.eaqTaskDetailRequirements || []}
          columns={columns}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
