import { useDraggable } from "@dnd-kit/core";
import { ActionIcon, Box, Flex, Paper, Stack, Text, useMantineColorScheme } from "@mantine/core";
import {
  IconAbc,
  IconAlignBoxLeftStretch,
  IconAlignBoxLeftTop,
  IconChartBarPopular,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleNumber0,
  IconGradienter,
  IconHeartHandshake,
  IconLayoutNavbarInactive,
  IconMail,
  IconPageBreak,
  IconSquareCheck,
} from "@tabler/icons-react";

export interface PushSidebarProps {
  opened: boolean;
  width?: number;
  onToggle: () => void;
}

interface QuestionTypeItemProps {
  id: string;
  icon: React.ReactNode;
  title: string;
}

function DraggableQuestionType({ id, icon, title }: QuestionTypeItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `question-type-${id}`,
  });

  return (
    <Paper
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      p={12}
      radius="md"
      withBorder
      style={{
        visibility: isDragging ? "hidden" : "visible",
      }}
    >
      <Flex align="center" gap={12}>
        <Box c="blue">{icon}</Box>
        <Box flex={1}>
          <Text size="sm" fw={500}>
            {title}
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
}

export default function QuestionTypeSidebar({ opened, width = 250, onToggle }: PushSidebarProps) {
  const collapsedWidth = 40;
  const { colorScheme } = useMantineColorScheme();
  const bgColor = colorScheme === "dark" ? "dark.6" : "gray.1";

  const questionTypes = [
    {
      id: "SingleChoice",
      icon: <IconGradienter size={20} />,
      title: "Lựa chọn đơn",
    },
    {
      id: "SingleChoiceGroup",
      icon: <IconGradienter size={20} />,
      title: "Nhóm lựa chọn đơn",
    },
    {
      id: "MultiChoice",
      icon: <IconSquareCheck size={20} />,
      title: "Lựa chọn nhiều",
    },
    {
      id: "Ranking",
      icon: <IconChartBarPopular size={20} />,
      title: "Xếp hạng",
    },
    {
      id: "String",
      icon: <IconAbc size={20} />,
      title: "Chuỗi đơn",
    },
    {
      id: "Passage",
      icon: <IconAlignBoxLeftStretch size={20} />,
      title: "Đoạn văn",
    },
    {
      id: "SingleNumber",
      icon: <IconCircleNumber0 size={20} />,
      title: "Con số",
    },
    {
      id: "Email",
      icon: <IconMail size={20} />,
      title: "Email",
    },
    {
      id: "FirstPage",
      icon: <IconLayoutNavbarInactive size={20} />,
      title: "Trang mở đầu",
    },
    {
      id: "ThankYouPage",
      icon: <IconHeartHandshake size={20} />,
      title: "Trang cảm ơn",
    },
    {
      id: "BreakPage",
      icon: <IconPageBreak size={20} />,
      title: "Ngắt trang",
    },
    {
      id: "Introduction", // key
      icon: <IconAlignBoxLeftTop size={20} />,
      title: "Phần giới thiệu",
    },
  ];

  return (
    <Box
      w={opened ? width : collapsedWidth}
      bg={bgColor}
      h="65vh"
      style={{
        overflowY: opened ? "scroll" : "hidden",
        overflowX: "hidden",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      {/* Nút toggle luôn hiển thị */}
      <ActionIcon
        onClick={onToggle}
        variant="light"
        size="sm"
        radius="xl"
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          zIndex: 9,
        }}
      >
        {opened ? <IconChevronsLeft size={18} /> : <IconChevronsRight size={18} />}
      </ActionIcon>

      {/* Hiển thị nội dung khi mở */}
      {opened && (
        <Box px={20} py={16}>
          <Text fw={600} mb={10}>
            Loại câu hỏi
          </Text>

          <Stack gap={12}>
            {questionTypes.map((type, index) => (
              <DraggableQuestionType key={index} id={type.id} icon={type.icon} title={type.title} />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
