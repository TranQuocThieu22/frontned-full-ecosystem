import { mockData } from '@/data/mockData';
import { aggregateByCategory } from '@/features/admin/dashboard-clone/utils';
import { Badge, Card, Grid, Group, Select, Stack, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useMemo } from 'react';

const SummaryCard = () => {
  const tiles = useMemo(() => aggregateByCategory(mockData), []);

  const totalAll = tiles.reduce((acc, t) => acc + t.total, 0);
  const totalAchieved = tiles.reduce((acc, t) => acc + t.achieved, 0);
  return (
    <Card radius="md" shadow="sm" p="md" mb={'sm'}>
      <Grid align="center">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Group gap="sm" align="center">
            <Badge
              size="xl"
              radius="sm"
              variant="gradient"
              gradient={{ from: 'blue.5', to: 'indigo.5', deg: 45 }}
              leftSection={<IconCheck size={16} />}
            >
              ĐÃ ĐẠT {totalAchieved}/{totalAll} TIÊU CHÍ KIỂM ĐỊNH
            </Badge>
          </Group>
        </Grid.Col>

        {/* Bên phải */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap={4}>
            <Select
              label="Bộ Tiêu chuẩn đo lường"
              // placeholder="Thông tư 01/2024/TT-BGDĐT"
              data={['Thông tư 01/2024/TT-BGDĐT']}
              value={'Thông tư 01/2024/TT-BGDĐT'}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
export default SummaryCard;
