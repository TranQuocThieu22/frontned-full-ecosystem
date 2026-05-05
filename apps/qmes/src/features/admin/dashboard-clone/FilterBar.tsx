'use client';

import { Card, Group, SegmentedControl, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import type { FilterStatus } from './types';

type Props = {
  search: string;
  status: FilterStatus;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: FilterStatus) => void;
};

export function FilterBar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <Card>
      <Group gap="sm">
        <TextInput
          value={search}
          onChange={e => onSearchChange(e.currentTarget.value)}
          placeholder="Tìm kiếm theo nhóm/tiêu chí…"
          leftSection={<IconSearch size={16} />}
          style={{ flex: '1 1 320px' }}
        />
        <SegmentedControl
          value={status}
          onChange={v => onStatusChange(v as FilterStatus)}
          data={[
            { label: 'Tất cả', value: 'all' },
            { label: 'Hoàn thành', value: 'done' },
            { label: 'Chưa hoàn thành', value: 'todo' },
          ]}
          color="indigo"
        />
      </Group>
    </Card>
  );
}
