import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { IComment } from "@/shared/interfaces/comment/IComment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IconEye } from "@tabler/icons-react";
import { commentGroupEnum } from "@/shared/constants/enum/CommentGroupEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function ExternalAssessmentEvaluate({ data }: { data: ITaskDetail }) {
  const disclosure = useDisclosure();

  const CommentQuery = useCustomReactQuery({
    queryKey: ["CommentQueryContainer", data?.id],
    axiosFn: async () => {
      const response = await service_EAQComment.getCommentsByTaskDetailIds({
        eaqTaskDetailIds: [data.id ?? 0],
        isExternal: true,
      });
      return response;
    },
    options: {
      enabled: disclosure[0],
    },
  });

  const columns = useMemo<MRT_ColumnDef<IComment>[]>(
    () => [
      {
        header: "Nhóm nội dung",
        accessorKey: "selfAssessmentType",
        accessorFn: (row: IComment) => {
          if (!row.selfAssessmentType) return "";
          return commentGroupEnum[row.selfAssessmentType];
        },
      },
      { header: "Nội dung đề cập", accessorKey: "content", size: 300 },
      {
        header: "Nhận xét và yêu cầu hiệu chính",
        accessorKey: "commentDetail",
        size: 300,
      },
    ],
    []
  );

  return (
    <CustomButtonModal
      modalProps={{
        size: "70%",
        title: "Danh sách nhận xét",
      }}
      actionIconProps={{
        actionType: 'view',
        toolTipProps: { label: "Xem nhận xét" },
      }}
      disclosure={disclosure}
      isActionIcon
    >
      <CustomDataTable
        data={CommentQuery.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
      />
    </CustomButtonModal>
  );
}
