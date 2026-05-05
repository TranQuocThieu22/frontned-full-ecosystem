'use client';

import { Box, Flex, Paper, Text } from "@mantine/core";
import { MyNumberFormatter } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

interface CourseInfoProps {
  courseCode: string;
  courseName: string;
  tuitionFee: number;
  campus: string;
  examDate?: Date;
}

export default function CourseInfo({
  courseCode,
  courseName,
  tuitionFee,
  campus,
  examDate,
}: CourseInfoProps) {
  return (
    <Paper p={'xl'} mb={20}>
      <Box w="100%">
        <Flex justify="space-between" align="center" mb="lg">
          <Text fw={700} size="xl" c="dark">
            Mã khóa thi: {courseCode}
          </Text>
          <Text fw={700} size="xl" c="dark">
            Cơ sở thi: {campus}
          </Text>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fw={500} size="md">
            Tên khóa thi: {courseName}
          </Text>
          <Flex>
            <Text fw={500} size="md" mr={10}>Lệ phí:</Text>
            <Text fw={700} size="md" c="green"><MyNumberFormatter value={tuitionFee} /></Text>
          </Flex>
        </Flex>

        <Text fw={500} size="md">
          Ngày thi: {examDate ? utils_date_dateToDDMMYYYString(examDate) : 'Chưa có ngày thi'}
        </Text>
      </Box>
    </Paper>
  )
}
