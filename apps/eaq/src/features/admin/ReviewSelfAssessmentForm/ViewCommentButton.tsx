import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { IComment } from "@/shared/interfaces/comment/IComment";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBubbleText } from "@tabler/icons-react";
import { useState } from "react";
import { useCommentColumns } from "./Hooks/useCommentColumns";

interface ICommentGroup extends IComment {
  eaqSelfAssessment: ISelfAssessment;
}

export default function ViewCommentButton({
  data,
}: {
  data: ITaskDetail;
}) {
  const disc = useDisclosure();
  const [selfAssessment, setSelfAssessment] = useState<ISelfAssessment[]>([]);
  const [comments, setComments] = useState<ICommentGroup[]>([]);

  const { } = useCustomReactQuery({
    queryKey: ["Q_SelfAssessment", data.id],
    axiosFn: async () => {
      const response =
        await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
          eaqPhaseId: data?.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1,
          eaqTaskDetailId: data.id ?? 0,
        });
      setSelfAssessment(response.data.data);
      return response;
    },
    options: {
      enabled: !!disc[0],
    },
  });

  const { } = useCustomReactQuery({
    queryKey: ["Q_Comment", data.id, selfAssessment],
    axiosFn: async () => {
      const responses = await Promise.all(
        selfAssessment.map(async (item) => {
          return await service_EAQComment.findbySelfAssessmentId(item.id ?? 0);
        })
      );
      const flattenedData = responses.flatMap((response) => {
        return response.data.data.map((item) => ({
          ...item,
          eaqSelfAssessment: selfAssessment.find(
            (selfAssessment) => selfAssessment.id === item.eaqSelfAssessmentId
          )!,
        }));
      });
      setComments(flattenedData);
      // ensure a defined AxiosResponse is returned (return an empty-shaped response if none)
      return responses[0] ?? ({ data: { data: [] } } as any);
    },
    options: {
      enabled: !!disc[0],
    },
  });

  const columns = useCommentColumns();

  return (
    <>
      <Center>
        <CustomButton
          variant="light"
          leftSection={<IconBubbleText />}
          onClick={disc[1].open}
        >
          Xem nhận xét
        </CustomButton>
      </Center>
      <Modal
        opened={disc[0]}
        title="Danh sách nhận xét"
        onClose={disc[1].close}
        size="70%"
      >
        <CustomDataTable
          data={comments || []}
          enableRowSelection={true}
          enableRowNumbers={true}
          columns={columns}
        />
      </Modal>
    </>
  );
}
