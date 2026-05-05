import { Event } from "@/interfaces/event";
import { Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface EventDetailModalProps {
  disclosure: ReturnType<typeof useDisclosure>;
  event: Event | null;
}

export function EventDetailModal({ disclosure, event }: EventDetailModalProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${dateUtils.toHHmm(date)} - ${dateUtils.toDDMMYYYY(dateString)}`;
  };

  return (
    <Modal
      opened={disclosure[0]}
      onClose={disclosure[1].close}
      title="Chi tiết hoạt động"
      size="md"
      centered
    >
      {event && (
        <Stack gap="md">
          <Stack gap={4}>
            <Text size="sm" fw={500}>
              Tên hoạt động
            </Text>
            <CustomHtmlWrapper html={event.name || "Không có tên"} />
          </Stack>

          <Stack gap={4}>
            <Text size="sm" fw={500}>
              Thời gian bắt đầu
            </Text>
            <Text size="sm">
              {event.startDate ? formatDateTime(event.startDate) : "Không xác định"}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="sm" fw={500}>
              Thời gian kết thúc
            </Text>
            <Text size="sm">
              {event.endDate ? formatDateTime(event.endDate) : "Không xác định"}
            </Text>
          </Stack>
        </Stack>
      )}
    </Modal>
  );
}
