import { Box, Flex, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconCalendar, IconCalendarEvent, IconListLetters } from "@tabler/icons-react";

interface F_iynoujfptk_HeaderInfoProps {
  totalOngoingCourseSection: number | undefined;
  totalRequiringAttendance: number | undefined;
  totalTeachingSessions: number | undefined;
}


const renderStatBox = (icon: React.ReactNode, title: string, value: number | undefined) => (
  <Paper withBorder p={{ base: 'xs', sm: 'md' }} radius="xl">
    <Flex justify="space-between" align="center">
      <Group ml={{ base: 'xs', sm: 'md' }} align="start" gap="xs">
        <Box>
          {icon}
        </Box>
        <Text
          mt={3}
          fw={500}
          tt="uppercase"
          fz={{ base: 'xs', sm: 'sm' }}
          c="dimmed"
          truncate
        >
          {title}
        </Text>
      </Group>
      <Group mr={{ base: 'xs', sm: 'md' }} align="center" justify="center">
        <Text
          fw={700}
          fz={{ base: 'xl', sm: '2rem', md: '3rem' }}
          lh="xs"
          variant="gradient"
          gradient={{ from: 'blue', to: 'teal', deg: 150 }}
        >
          {value}
        </Text>
      </Group>
    </Flex>
  </Paper>
);
export default function F_thfkexfuki_generalInfor({ data }: { data: F_iynoujfptk_HeaderInfoProps }) {
  return (
    <SimpleGrid
      cols={{ base: 1, md: 2, lg: 2, xl: 3 }}
      spacing={{ base: 'xs', sm: 'md' }}
      verticalSpacing={{ base: 'xs', sm: 'md' }}
    >
      {renderStatBox(
        <IconListLetters opacity="0.3" style={{ width: '100%', height: '100%' }} stroke={1.5} />,
        "Khoá học đang dạy",
        data?.totalOngoingCourseSection
      )}
      {renderStatBox(
        <IconCalendarEvent opacity="0.3" style={{ width: '100%', height: '100%' }} stroke={1.5} />,
        "Buổi cần điểm danh",
        data?.totalRequiringAttendance
      )}
      {renderStatBox(
        <IconCalendar opacity="0.3" style={{ width: '100%', height: '100%' }} stroke={1.5} />,
        "Số buổi cần dạy",
        data?.totalTeachingSessions
      )}
    </SimpleGrid>




  )
}

