import { Anchor, Badge, Button, Card, Divider, Flex, Group, Image, Text } from '@mantine/core';
import { IconCalendarEvent, IconCalendarEventFilled, IconClock, IconMapPin } from '@tabler/icons-react';
import { utils_currency_formatWithSuffix, utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import { ReactNode } from 'react';

export interface CourseDetailCardProps {
  children?: ReactNode,
  code: string,
  name: string,
  image: string,
  openingDate: Date,
  schedule: string,
  lessons: number,
  fee: number,
  learningFacility: string,
  href?: string,
  buttonLabel?: string,
}

export default function CourseDetailCard({
  children,
  image,
  code,
  name,
  openingDate,
  schedule,
  lessons,
  fee,
  learningFacility,
  href,
  buttonLabel = "Đăng ký"
}: CourseDetailCardProps) {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Card.Section
      // pos="relative"
      >
        <Image
          src={image}
          // h={200}
          // w="100%"
          // fit="cover"
          fallbackSrc="/placeholder.svg"
          alt="Norway"
        />
      </Card.Section>

      <Group mt={12}>
        <Text fw={700} fz='md' w={'100%'}>{name}</Text>
      </Group>

      <Divider my={4} />

      <Text fw={500} size="sm" lineClamp={2}>Mã khóa học: {code}</Text>

      <Flex direction="column" gap={4} mt={"sm"}>

        <Group >
          <IconCalendarEventFilled />
          <Text size="sm">Khai giảng ngày: {utils_date_dateToDDMMYYYString(openingDate)}</Text>
        </Group>

        <Group >
          <IconClock />
          <Text size="sm">Lịch học: {schedule}</Text>
        </Group>

        <Group>
          <IconCalendarEvent />
          <Text size="sm">Số tiết: {lessons}</Text>
        </Group>

        <Group >
          <IconMapPin />
          <Text size="sm">Cơ sở học: {learningFacility}</Text>
        </Group>

        <Group>
          <Badge
            mt={12}
            size="lg"
            bottom={16}
            right={16}
            color="pink"
            variant="light"
          >
            Học phí: {utils_currency_formatWithSuffix(fee, 'VNĐ')}
          </Badge>
        </Group>
      </Flex>

      {children}

      <Flex style={{ flex: 1 }} />

      <Anchor href={href} inherit underline='never'>
        <Button fullWidth mt='md' variant="filled" color="blue.7">
          {buttonLabel}
        </Button>
      </Anchor>

    </Card>
  );
}
