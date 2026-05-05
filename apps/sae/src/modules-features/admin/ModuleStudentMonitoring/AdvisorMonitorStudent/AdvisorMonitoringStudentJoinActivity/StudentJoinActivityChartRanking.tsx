'use client';

import { StudentTracking } from "@/interfaces/ranking";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { PieChart } from '@mantine/charts';
import { Box, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";

type CountType = 'registrationCount' | 'recordCount' | 'completedCount';

const typeStatisticSelectData = [
  { value: 'registrationCount', label: 'Đăng ký' },
  { value: 'recordCount', label: 'Ghi nhận' },
  { value: 'completedCount', label: 'Công nhận' }
];

export default function StudentJoinActivityChartRanking({ data }: { data: StudentTracking }) {
  const [selectedCountType, setSelectedCountType] = useState<CountType>('registrationCount');

  const pieChartData = (data?.rateInfo ?? []).map((item) => ({
    name: item?.rateName ?? 'Unknown',
    value: item?.[selectedCountType] ?? 0,
  }));

  const totalValue = pieChartData.reduce((acc, item) => acc + item.value, 0);

  const pieChartColorData = [
    'rgb(76, 175, 80)',
    'rgb(42, 84, 161)',
    'rgb(52, 179, 231)',
    'rgb(254, 207, 22)',
    'rgb(246, 164, 23)',
    'rgb(235, 95, 26)',
  ];

  return (<>
    <CustomFieldset title="Bảng thống kê tỷ lệ xếp loại">
      <Group pb={20}>
        <CustomSelect
          defaultValue={typeStatisticSelectData[0]?.value}
          data={typeStatisticSelectData}
          label="Chọn loại dữ liệu thống kê:"
          clearable={false}
          onChange={(value) => setSelectedCountType(value as CountType)}
        />
      </Group>
      <Group gap="xl" grow pb={50} pt={20}>
        {totalValue === 0 ? (
          <Group gap="xl" grow pb={50} pt={20} justify="center" align="center">
            <Box
              maw={300}
              mah={300}
              style={{
                width: 300,
                height: 300,
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '1rem',
              }}
            >
              Không có dữ liệu
            </Box>
          </Group>
        ) : (
          <Group gap="xl" grow pb={50} pt={20}>
            <PieChart
              data={pieChartData?.map((item, index) => ({
                ...item,
                name: item.name || 'Unknown',
                color: (pieChartColorData[index] ?? '#4caf50') as any,
              }))}
              withTooltip
              strokeWidth={0.2}
              tooltipDataSource="segment"
              size={300}
              startAngle={90}
              endAngle={-270}
            />
          </Group>
        )}
        <Stack>
          <Text fw={500}>Diễn giải:</Text>
          {pieChartData.map((item, index) => (
            <Text ml={15} key={item.name} size="sm">
              <Text
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  backgroundColor: pieChartColorData[index],
                  marginRight: 6,
                  borderRadius: '100%',
                }}
                span
              />
              {item.name}: {totalValue === 0 ? '0%' : `${((item.value / (data?.totalCount ?? 1)) * 100).toFixed(1)}%`} ({item.value})
            </Text>
          ))}
        </Stack>
      </Group>
    </CustomFieldset>
  </>
  );
}



