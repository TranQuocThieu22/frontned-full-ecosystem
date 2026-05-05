'use client';

import { Box, Flex, Group, Paper, Text, Title } from "@mantine/core";
import { MyNumberFormatter } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

interface CourseInfoProps {
  courseCode: string;
  courseName: string;
  lessonCount: number;
  tuitionFee: number;
  startDate: Date;
  schedule: string;
  campus: string;
}

export default function CourseInfo({
  courseCode,
  courseName,
  lessonCount,
  tuitionFee,
  startDate,
  schedule,
  campus,
}: CourseInfoProps) {
  return (
    <Paper p={'xl'} >
      <Box w="100%">

        <Group mb='lg'>
          <Title order={2}>I. Thông tin khóa học</Title>
        </Group>

        <Group justify="center">
          <Text fw={700} size="xl" c="blue" ta="center" mb="md" tt="uppercase">
            Mã khóa học: {courseCode}
          </Text>
        </Group>

        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap="xl"
          justify="space-around"
          align="flex-start"
          wrap="wrap"
        >
          <Box w={{ base: '100%', sm: 'auto' }}>
            <Flex align="center" gap="md">
              <Text fw={500} w={100} inline>Tên khóa:</Text>
              <Text fw={700}>{courseName}</Text>
            </Flex>
            <Flex align="center" gap="md" mt="md">
              <Text fw={500} w={100} inline>Số tiết:</Text>
              <Text fw={700} c="indigo">{lessonCount}</Text>
            </Flex>
          </Box>
          <Box w={{ base: '100%', sm: 'auto' }}>
            <Flex align="center" gap="md">
              <Text fw={500} w={100} inline>Học phí:</Text>
              <Text fw={700} c="red"><MyNumberFormatter value={tuitionFee} /></Text>
            </Flex>
            <Flex align="center" gap="md" mt="md">
              <Text fw={500} w={100} inline>Khai giảng ngày:</Text>
              <Text fw={700}>{utils_date_dateToDDMMYYYString(startDate)}</Text>
            </Flex>
          </Box>
          <Box w={{ base: '100%', sm: 'auto' }}>
            <Flex align="center" gap="md">
              <Text fw={500} w={100} inline>Lịch học:</Text>
              <Text fw={700} c="blue">{schedule}</Text>
            </Flex>
            <Flex align="center" gap="md">
              <Text fw={500} w={100} inline>Cơ sở học:</Text>
              <Text fw={700}>{campus}</Text>
            </Flex>
          </Box>
        </Flex>

      </Box>
    </Paper>
  )
}
