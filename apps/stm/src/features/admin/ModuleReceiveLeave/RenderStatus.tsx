import { Badge } from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconClock,
  IconHelpCircle,
  IconX,
} from "@tabler/icons-react";

interface RenderStatusProps {
  value: string;
  successes?: string[];
  failures?: string[];
  inProgress?: string[];
  canceled?: string[];
}

export function RenderStatus({
  value,
  successes = [],
  failures = [],
  inProgress = [],
  canceled = [],
}: RenderStatusProps) {
  const getColor = () => {
    if (successes.includes(value)) return "green";     // trạng thái tốt
    if (failures.includes(value)) return "red";        // trạng thái tiêu cực
    if (inProgress.includes(value)) return "blue";     // đang diễn ra
    if (canceled.includes(value)) return "gray";       // bị hủy
    return "default";
  };

  const getIcon = () => {
    if (successes.includes(value)) return <IconCheck size={16} />;
    if (failures.includes(value)) return <IconX size={16} />;
    if (inProgress.includes(value)) return <IconClock size={16} />;
    if (canceled.includes(value)) return <IconBan size={16} />;
    return <IconHelpCircle size={16} />;
  };

  return (
    <Badge
      w="100%"
      h={25}
      leftSection={getIcon()}
      variant="light"
      color={getColor()}
      radius="md"
      fw={700}
    >
      {value}
    </Badge>
  );
}
