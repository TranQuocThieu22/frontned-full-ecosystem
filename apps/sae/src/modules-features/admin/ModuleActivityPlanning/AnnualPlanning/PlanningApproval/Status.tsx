import { Badge } from "@mantine/core";
import {
    IconChecks,
    IconHourglass,
    IconQuestionMark,
    IconReplace,
    IconX
} from "@tabler/icons-react";

export function Status({ status }: { status: number }) {
  switch (status) {
    case 1:
      return (
        <>
          <Badge
            w={"100%"}
            leftSection={<IconHourglass />}
            variant="light"
            color="gray"
            radius="xs"
          >
            Chờ duyệt
          </Badge>
        </>
      );
    case 2:
      return (
        <>
          <Badge
            w={"100%"}
            leftSection={<IconReplace />}
            variant="light"
            color="orange"
            radius="xs"
          >
            Yêu cầu hiệu chỉnh
          </Badge>
        </>
      );
    case 3:
      return (
        <>
          <Badge
            w={"100%"}
            leftSection={<IconChecks />}
            variant="light"
            color="green"
            radius="xs"
          >
            Duyệt
          </Badge>
        </>
      );
    case 4:
      return (
        <>
          <Badge
            w={"100%"}
            leftSection={<IconX />}
            variant="light"
            color="red"
            radius="xs"
          >
            Không duyệt
          </Badge>
        </>
      );

    default:
      return (
        <>
          <Badge
            w={"100%"}
            leftSection={<IconQuestionMark />}
            variant="light"
            color="gray"
            radius="xs"
          >
            Không rõ trạng thái
          </Badge>
        </>
      );
  }
}
