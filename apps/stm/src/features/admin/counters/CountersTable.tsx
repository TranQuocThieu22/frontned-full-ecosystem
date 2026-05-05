'use client'
import CountersCreateUpdate from './CountersCreateUpdate';
import { Counter, BusinessType, ObjectType } from './interfaces';
import { CustomColumnDef, CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { Group, Center } from '@mantine/core';
import { useMemo, useState } from 'react';

const mockData: Counter[] = [
  {
    id: 1,
    code: 'MHV',
    name: 'Mã học viên',
    businessType: '2',
    objectType: '1',
  },
  {
    id: 2,
    code: 'BĐT',
    name: 'Bộ đếm tiền',
    businessType: '1',
    objectType: '2',
  },
];

export default function CountersTable() {
  const [data] = useState<Counter[]>(mockData);

  const columns = useMemo<CustomColumnDef<Counter>[]>(() => [
    { header: 'Mã bộ đếm', accessorKey: 'code' },
    { header: 'Tên bộ đếm', accessorKey: 'name' },
    {
      header: 'Loại nghiệp vụ',
      accessorFn: (row) =>
        row.businessType
          ? BusinessType[row.businessType as unknown as keyof typeof BusinessType]
          : '',
    },
    {
      header: 'Loại đối tượng',
      accessorFn: (row) =>
        row.objectType
          ? ObjectType[row.objectType as unknown as keyof typeof ObjectType]
          : '',
    },
  ], []);

  return (
    <CustomDataTable
      enableRowSelection
      enableRowNumbers
      columns={columns}
      data={data}
      renderTopToolbarCustomActions={() => (
        <Group>
          <CountersCreateUpdate />
        </Group>
      )}
      renderRowActions={({ row }) => (
        <Center>
          <CountersCreateUpdate values={row.original} />
        </Center>
      )}
    />
  );
}

