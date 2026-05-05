import { commentGroupEnum } from "@/shared/constants/enum/CommentGroupEnum";
import { IComment } from "@/shared/interfaces/comment/IComment";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function SelfAssessmentForm04Evaluate({
  data,
}: {
  data: ITaskDetail;
}) {
  const disc = useDisclosure();

  const CommentQuery = useCustomReactQuery({
    queryKey: ["CommentQueryContainer", data?.id],
    axiosFn: async () => {
      const response = await service_EAQComment.getCommentsByTaskDetailIds({
        eaqTaskDetailIds: [data.id ?? 0],
        // isExternal: true,
      });
      return response;
    },
    options: { enabled: disc[0] },
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
    [CommentQuery.data]
  );

  return (
    <>
      <CustomButton variant="transparent" onClick={disc[1].open}>
        Xem nhận xét
      </CustomButton>
      <Modal
        opened={disc[0]}
        title="Danh sách nhận xét"
        onClose={disc[1].close}
        size="70%"
      >
        <CustomDataTable
          data={CommentQuery?.data || []}
          enableRowSelection={true}
          enableRowNumbers={true}
          columns={columns}
        />
      </Modal>
    </>
  );
}
