import { Badge } from "@mantine/core";
import {
  IconCheck,
  IconClipboardCheck,
  IconClockPlay,
  IconClockPlus,
  IconEdit,
  IconFileOff,
  IconPlayerPause,
  IconQuestionMark,
  IconReportMoney
} from "@tabler/icons-react";

export enum EnumTopicStatus {
  "Đang thực hiện" = 1,
  "Điều chỉnh" = 2,
  "Gia hạn" = 3,
  "Tạm dừng" = 4,
  "Đình chỉ hợp đồng" = 5,
  "Chờ nghiệm thu" = 6,
  "Đã nghiệm thu" = 7,
  "Đã thanh lý" = 8
}

const statusIcons = {
  1: <IconClockPlay size={16} />,          // Đang thực hiện
  2: <IconEdit size={16} />,               // Điều chỉnh
  3: <IconClockPlus size={16} />,          // Gia hạn
  4: <IconPlayerPause size={16} />,        // Tạm dừng
  5: <IconFileOff size={16} />,            // Đình chỉ hợp đồng
  6: <IconClipboardCheck size={16} />,     // Chờ nghiệm thu
  7: <IconCheck size={16} />,              // Đã nghiệm thu
  8: <IconReportMoney size={16} />         // Đã thanh lý
};

const statusColors = {
  1: "blue",     
  2: "cyan",     
  3: "orange",   
  4: "yellow",   
  5: "red",      
  6: "indigo",   
  7: "green",    
  8: "gray",     
};

interface TopicStatusProps {
  status: number;
  customLabel?: string;
  customIcon?: React.ReactNode;
  customColor?: string;
}

export default function TopicStatus({ status, customLabel, customIcon, customColor }: TopicStatusProps) {
  
  // Nếu status không hợp lệ hoặc không phải là một số
  if (!status || isNaN(status) || !EnumTopicStatus[status]) {
    return (
      <Badge
        w={"100%"}
        leftSection={<IconQuestionMark size={16} />}
        variant="light"
        color="gray"
        radius="xs"
      >
        Không xác định
      </Badge>
    );
  }

  const statusLabel = customLabel || EnumTopicStatus[status];
  const statusIcon = customIcon || statusIcons[status as keyof typeof statusIcons];
  const statusColor = customColor || statusColors[status as keyof typeof statusColors];

  return (
    <Badge
      w={"100%"}
      leftSection={statusIcon}
      variant="light"
      color={statusColor}
      radius="xs"
    >
      {statusLabel}
    </Badge>
  );
}