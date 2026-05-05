"use client";
import { ITaskDetailRequirement } from "@/shared/interfaces/requirement/ITaskDetailRequirement";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CriteriaAnalysisTab({
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
        size: 280,
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
      <CustomDataTable
        columns={columns}
        data={values?.eaqTaskDetailRequirements ?? []}
        enableRowSelection
      />
    </CustomFieldset>
  );
}
