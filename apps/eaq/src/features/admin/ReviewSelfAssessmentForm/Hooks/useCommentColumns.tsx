import { commentGroupEnum } from "@/shared/constants/enum/CommentGroupEnum";
import { IComment } from "@/shared/interfaces/comment/IComment";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useMemo } from "react";

interface UseCommentColumnsParams {
  selfAssessmentType?: number;
}

export function useCommentColumns({ selfAssessmentType }: UseCommentColumnsParams = {}) {
  const columns = useMemo<CustomColumnDef<IComment>[]>(
    () => [
      {
        header: "Nhóm nội dung",
        accessorKey: "eaqSelfAssessment.selfAssessmentType",
        accessorFn: (row) => {
          const type = row.eaqSelfAssessment?.selfAssessmentType ?? selfAssessmentType;
          if (!type) return "";
          return commentGroupEnum[type];
        },
      },
      { header: "Nội dung đề cập", accessorKey: "content", size: 300 },
      {
        header: "Nhận xét và yêu cầu hiệu chính",
        accessorKey: "commentDetail",
        size: 300,
      },
    ],
    [selfAssessmentType]
  );

  return columns;
}
