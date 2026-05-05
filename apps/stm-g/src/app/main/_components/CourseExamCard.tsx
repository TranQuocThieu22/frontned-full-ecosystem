import { Anchor, Badge, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import { IconCalendarEventFilled } from '@tabler/icons-react';
import { utils_currency_formatWithSuffix, utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import { ReactNode } from 'react';

export interface CourseExamCardProps {
  children?: ReactNode,
  image: string | null,
  title: string
  description?: string,
  href: string,
  buttonLabel?: string,
  fee: number,
  openingDate: Date,
}

export default function CourseExamCard({
  children,
  image,
  title,
  description,
  href,
  buttonLabel = "Xem chi tiết",
  fee = 5100000,
  openingDate = new Date()
}: CourseExamCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>

      <Card.Section pos="relative">
        <Image
          src={image}
          h={200}
          fit="cover"
          fallbackSrc="/placeholder.svg"
          alt="Norway"
        />
        <Badge
          pos="absolute"
          size="lg"
          bottom={16}
          right={16}
          color="blue"
          variant="filled"
        >
          Học phí: {utils_currency_formatWithSuffix(fee, 'VNĐ')}
        </Badge>
      </Card.Section>

      <Text fw={500} size='lg' mt='sm' lineClamp={2}>{title}</Text>

      {description && (
        <Text size="md" c="dimmed" lineClamp={2}>
          {description}
        </Text>
      )}

      {openingDate && (
        <Flex direction="column" gap={5} mt={10}>
          <Group >
            <IconCalendarEventFilled size={16} />
            <Text size="md">Khai giảng ngày: {utils_date_dateToDDMMYYYString(openingDate)}</Text>
          </Group>
        </Flex>
      )}

      {children}

      <Flex style={{ flex: 1 }} />

      <Anchor href={href} inherit underline='never' mt="auto">
        <Button fullWidth mt='md'>
          {buttonLabel}
        </Button>
      </Anchor>

    </Card >
  );
}