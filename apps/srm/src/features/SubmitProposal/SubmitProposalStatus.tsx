import { Badge } from "@mantine/core";
import { IconAlertTriangle, IconChecks, IconClock, IconEdit, IconQuestionMark, IconX } from "@tabler/icons-react";

const statusIcons = {
  pending: <IconClock />,
  editing: <IconEdit />,
  warning: <IconAlertTriangle />,
  success: <IconChecks />,
  danger: <IconX />,
};

const statusColors = {
  pending: "blue",
  editing: "lime",
  warning: "orange",
  success: "green",
  danger: "red",
};

interface SubmitProposalStatusProps {
  statusType: string;
  statusLabel: string;
  statusIcon?: React.ReactNode;
  statusColor?: string;
}

export default function SubmitProposalStatus({ statusType, statusLabel, statusIcon, statusColor }: SubmitProposalStatusProps) {
  if (!statusType || !statusLabel) {
    return (
      <Badge
        w={"100%"}
        leftSection={<IconQuestionMark />}
        variant="light"
        color="blue"
        radius="xs"
      >
        Không xác định
      </Badge>
    );
  }

  return (
    <Badge
      w={"100%"}
      leftSection={statusIcon || statusIcons[statusType as keyof typeof statusIcons]}
      variant="light"
      color={statusColor || statusColors[statusType as keyof typeof statusColors]}
      radius="xs"
    >
      {statusLabel}
    </Badge>
  );
}