import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import {
  Badge,
  Card,
  Fieldset,
  Flex,
  Group,
  Paper,
  RingProgress,
  Stack,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import { IconInfoCircle, IconThumbDownFilled, IconThumbUpFilled } from "@tabler/icons-react";

export default function ScoreConfigTableByCourseSection({ scoreConfigData, courseData }: { scoreConfigData: any[], courseData: any }) {
  console.info("🚀 ~ ScoreConfigTableByCourseSection.tsx:18 ~ scoreConfigData:", scoreConfigData)
  const theme = useMantineTheme();
  const filteredData = scoreConfigData.filter(item => item.scoreType === 1);

  if (filteredData.length === 0) {
    return (
      <Fieldset
        legend={
          <Title order={3}>{`Chi tiết điểm môn ${courseData.name}`}</Title>
        }
        style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
        <Paper p="xl" withBorder>
          <Flex align="center" justify="center" direction="column" gap="md">
            <IconInfoCircle size={48} color={theme.colors.blue[6]} />
            <Text fw={500}>Không có dữ liệu điểm cho môn học này</Text>
          </Flex>
        </Paper>
      </Fieldset>
    );
  }

  return (
    <Fieldset
      legend={
        <Title order={3}>{`Chi tiết điểm môn ${courseData.name}`}</Title>
      }
      style={{ width: '100%', margin: '0 auto' }}
      radius="md"
    >
      <Stack >
        {filteredData.map((item, index) => {
          const hasScore = item.scoreStudent !== null && item.scoreStudent !== undefined;
          const isPassing = hasScore && item.scoreStudent >= item.scoreMin;
          const statusColor = !hasScore ? "yellow" : isPassing ? "green" : "red";

          return (
            <Card key={index} shadow="sm" p="md" radius="md" withBorder>
              <Flex
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                align={{ base: 'stretch', sm: 'center' }}
                gap="md"
              >
                <Stack style={{ flex: 1 }}>
                  <Group >
                    <Badge color="blue" variant="light" size="lg">
                      Mã môn: {item.code || "N/A"}
                    </Badge>
                    <Badge color="blue" variant="light" size="lg">
                      Tên môn: {item.name || "N/A"}
                    </Badge>
                    {hasScore && (
                      <Badge
                        color={isPassing ? "green" : "red"}
                        variant="filled"
                        size="lg"
                      >
                        {isPassing ? "Đạt" : "Chưa đạt"}
                      </Badge>
                    )}
                  </Group>

                  <Title order={4}>Loại điểm: {item.name || "Chưa có tên"}</Title>

                  {item.scoreMin && (
                    <Group>
                      <Text size="sm" color="dimmed">
                        Điểm tối thiểu: {item.scoreMin}
                      </Text>
                      <Text size="sm" color="dimmed">
                        Điểm tối đa: {item.scoreMax}
                      </Text>
                    </Group>
                  )}
                </Stack>
                <Flex
                  gap="md"
                  align="center"
                  justify={{ base: 'space-between', sm: 'flex-end' }}
                  style={{ flex: 1 }}
                >
                  <Paper
                    radius="md"
                    p="md"
                    withBorder
                  >
                    <Stack align="center">
                      <Text size="xs" color="dimmed">Điểm</Text>
                      <Text
                        size="xl"
                        fw={700}
                        color={hasScore ? (isPassing ? "green" : "red") : "dimmed"}
                      >
                        {hasScore ? item.scoreStudent.toString() : "--"}
                      </Text>
                    </Stack>
                  </Paper>

                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                      {
                        value: hasScore ? Math.min(item.scoreStudent * 10, 100) : 0,
                        color: statusColor
                      }
                    ]}
                    label={
                      <MyCenterFull>
                        {hasScore
                          ? (isPassing
                            ? <IconThumbUpFilled size="1.8rem" color={theme.colors.green[6]} />
                            : <IconThumbDownFilled size="1.8rem" color={theme.colors.red[6]} />)
                          : <Text size="xs" fw={500}>N/A</Text>}
                      </MyCenterFull>
                    }
                  />
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Stack>
    </Fieldset>
  );
}