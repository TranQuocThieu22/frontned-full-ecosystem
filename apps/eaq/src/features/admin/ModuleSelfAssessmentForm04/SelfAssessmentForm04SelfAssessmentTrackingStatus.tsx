import {Badge} from "@mantine/core";
import {IconCheck, IconQuestionMark, IconX} from "@tabler/icons-react";

export default function SelfAssessmentForm04SelfAssessmentTrackingStatus({
  status,
}: {
  status?: number;
}) {
  switch (status) {
    case 2:
      return (
        <Badge
          variant="light"
          color="green"
          radius="md"
          w="100%"
          h={25}
          fw={700}
          leftSection={<IconCheck size={16} />}
        >
          Đạt yêu cầu
        </Badge>
      );
    case 3:
      return (
        <Badge
          variant="light"
          color="red"
          radius="md"
          w="100%"
          h={25}
          fw={700}
          leftSection={<IconX size={16} />}
        >
          Cần hiệu chỉnh
        </Badge>
      );
    case 1:
    default:
      return (
        <Badge
          variant="light"
          color="gray"
          w="100%"
          h={25}
          radius="md"
          fw={700}
          leftSection={<IconQuestionMark size={16} />}
        >
          Chưa kiểm tra
        </Badge>
      );
  }
}
