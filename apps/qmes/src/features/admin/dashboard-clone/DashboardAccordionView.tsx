'use client';

import { useMemo, useState } from 'react';
import { Grid, Stack } from '@mantine/core';
import { mockData } from '@/data/mockData';
import { FilterBar } from '@/features/admin/dashboard-clone/FilterBar';
import {
  aggregateByCategory,
  matchSearch,
  matchStatus,
} from '@/features/admin/dashboard-clone/utils';
import { FilterStatus } from '@/features/admin/dashboard-clone/types';
import { CategoryAccordion } from '@/features/admin/dashboard-clone/CategoryAccordion';
import SummaryCard from '@/features/admin/dashboard-clone/SummaryCard';
import StatsCard from './StatsCard';

type MantineColor = 'indigo' | 'blue' | 'cyan' | 'teal' | 'grape' | 'orange';

const COLOR_BY_CODE: Record<number, MantineColor> = {
  1: 'indigo',
  2: 'blue',
  3: 'cyan',
  4: 'teal',
  5: 'grape',
  6: 'orange',
  7: 'indigo',
  8: 'blue',
  9: 'cyan',
};

const LABEL_BY_CODE: Record<number, string> = {
  1: 'Chương trình đào tạo',
  2: 'Phương pháp giảng dạy',
  3: 'Nghiên cứu khoa học',
  4: 'Cơ sở vật chất',
  5: 'Chuyển đổi số',
  6: 'Hợp tác quốc tế',
  7: 'Quản lý & điều hành',
  8: 'HSSV & hỗ trợ',
  9: 'Khác',
};

export default function DashboardAccordionView() {
  const tiles = useMemo(() => aggregateByCategory(mockData), []);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<FilterStatus>('all');

  // 👉 state quản lý Accordion đang mở
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(
    () => tiles.filter(t => matchSearch(t, search) && matchStatus(t, status)),
    [tiles, search, status]
  );

  return (
    <Stack gap="xs">
      <SummaryCard />
      <Grid gutter="lg" align="stretch">
        {tiles.map(({ code, title, achieved, total, Icon }) => {
          const percent = total > 0 ? Math.round((achieved / total) * 100) : 0;
          const displayTitle = LABEL_BY_CODE[code] ?? title;
          const color = COLOR_BY_CODE[code] ?? 'indigo';

          return (
            <Grid.Col
              key={code}
              span={{ base: 12, md: 6, lg: 4 }}
              style={{ minWidth: 0 }}
            >
              <StatsCard
                title={displayTitle}
                valueText={`${achieved}/${total}`}
                percent={percent}
                color={color}
                Icon={Icon}
                interactive
                onClick={() => setActive(String(code))}
                selected={active === String(code)}
              />
            </Grid.Col>
          );
        })}
      </Grid>

      <FilterBar
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <CategoryAccordion
        tiles={filtered.length ? filtered : tiles}
        active={active}
        onChange={setActive}
      />
    </Stack>
  );
}
