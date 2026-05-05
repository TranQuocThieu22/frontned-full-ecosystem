'use client'
import { Box, Card, Group, Image, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

export interface TrainingCenterCardProps {
  children?: ReactNode,
  image: string | null,
  title: string
  description?: string,
  href: string,
}

export default function TrainingCenterCard({
  children,
  image,
  title,
  description,
  href,
}: TrainingCenterCardProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      onClick={() => router.push(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        transition: 'transform 200ms ease',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <Card.Section style={{ overflow: 'hidden' }}>
        <Box
          style={{
            transition: 'transform 500ms ease',
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          <Image
            src={image}
            h={200}
            fit="cover"
            fallbackSrc="/placeholder.svg"
            alt={title}
          />
        </Box>
      </Card.Section>

      <Group justify='center' mt="md">
        <Text fw={700} size='md'>{title}</Text>
      </Group>

      {description && (
        <Text size="md" c="dimmed" lineClamp={2}>
          {description}
        </Text>
      )}

      {children}

    </Card>
  );
}