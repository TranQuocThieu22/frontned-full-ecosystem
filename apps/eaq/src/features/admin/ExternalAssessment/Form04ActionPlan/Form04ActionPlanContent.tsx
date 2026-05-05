"use client";

import { IAction } from "@/shared/interfaces/action/IAction";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { CreateUpdateCommentButton } from "../ShareExternalAssessmentEvaluate";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";

interface Form04ActionPlanContentProps {
  actionPlan?: IAction[];
  eaqSelfAssessmentId?: number;
  taskDetailId: number;
}

export default function Form04ActionPlanContent({
  actionPlan,
  eaqSelfAssessmentId,
  taskDetailId,
}: Form04ActionPlanContentProps) {
  const columns = useMemo<MRT_ColumnDef<IAction>[]>(
    () => [
      {
        header: "Mục tiêu",
        accessorKey: "target",
      },
      {
        header: "Nội dung chi tiết",
        accessorKey: "detail",
        size: columnSizeObject.description,
      },
      {
        header: "Đơn vị; Người thực hiện",
        accessorKey: "unit",
      },
      {
        header: "Thời gian thực hiện hoặc hoàn thành",
        accessorKey: "actionTime",
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
      },
    ],
    []
  );

  return (
    <CustomDataTable
      columns={columns}
      enableRowSelection={true}
      enableMultiRowSelection={false}
      data={actionPlan ?? []}
      mantineTableContainerProps={{
        style: { minHeight: "322px", maxHeight: "322px", overflowY: "auto" },
      }}
      renderTopToolbarCustomActions={({ table }) => {
        const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original);
        const isDisabled = !selectedRows[0] || !eaqSelfAssessmentId;

        // NOTE: Chỉ render button create thật khi có row được select,
        // tránh việc button create không khởi tạo với initialContent
        if (isDisabled) {
          return (
            <CustomButton actionType="create" disabled>Thêm nhận xét</CustomButton>
          );
        }

        return (
          <CreateUpdateCommentButton
            eaqSelfAssessmentId={eaqSelfAssessmentId ?? 0}
            selfAssessmentType={4}
            taskDetailId={taskDetailId}
            initialContent={selectedRows[0]?.target}
          />
        );
      }}
    />
  );
}
