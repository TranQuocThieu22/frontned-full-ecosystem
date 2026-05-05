import {
  Badge,
  Blockquote,
  Box,
  Flex,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { Criteria } from '../FakeData/mockData (1)';
import RingProgress from './RingProgress';
import dayjs from 'dayjs';
import Scroll from './Scroll';
import { useMemo } from 'react';

function getCriteriaStatus(
  dateEnd: Date | null,
  dateComplete: Date | null,
  isPass: boolean
): string[] {
  const now = new Date();
  const result: string[] = [];
  if (!dateEnd) return ['Không có hạn kiểm định'];
  if (dateEnd < now) {
    if (dateComplete !== null) {
      if (dateComplete <= dateEnd) {
        result.push('Hoàn thành', 'Đúng hạn');
      } else {
        const diff = Math.ceil(
          (dateComplete.getTime() - dateEnd.getTime()) / (1000 * 60 * 60 * 24)
        );
        result.push('Hoàn thành', `Trễ ${diff} ngày`);
      }
    } else {
      result.push('Chưa hoàn thành', 'Đã quá hạn');
    }
  } else {
    if (!dateComplete) {
      result.push('Đang kiểm định');
    } else {
      if (dateComplete < dateEnd) {
        const diff = Math.ceil(
          (dateEnd.getTime() - dateComplete.getTime()) / (1000 * 60 * 60 * 24)
        );
        result.push('Hoàn thành', `Sớm ${diff} ngày`);
      } else if (dateComplete == dateEnd) {
        result.push('Hoàn thành', 'Đúng hạn');
      }
    }
  }
  if (isPass) {
    result.push('Đạt');
  } else {
    result.push('Không đạt');
  }
  return result;
}
function getBadgeColor(status: string) {
  if (
    status.includes('Hoàn thành') ||
    status.includes('Đạt') ||
    status.includes('Đúng hạn')
  )
    return 'teal';
  if (status.includes('Trễ')) return 'orange';
  if (
    status.includes('Chưa hoàn thành') ||
    status.includes('Đã quá hạn') ||
    status.includes('Không đạt')
  )
    return 'red';
  if (status.includes('Đang kiểm định')) return 'blue';
  return 'gray';
}
export default function CriteriaCard({ criteria }: { criteria: Criteria }) {
  const statusList = useMemo(
    () =>
      getCriteriaStatus(
        criteria.dateEnd,
        criteria.dateComplete,
        criteria.isPass
      ),
    [criteria]
  );
  return (
    <Paper w={'100%'} shadow="none" withBorder={false} p={0}>
      <Group justify='space-between'>
        <Flex direction="column">

          <Group wrap="nowrap">
            <Flex
              direction="column"
              align="center"
              style={{ minWidth: 120, flexShrink: 0 }}
            >
              <RingProgress
                progress={criteria.dateComplete === null ? criteria.criteriaProgress : 100}
              />
            </Flex>
            <Box>
              <Text>
                Thời gian kiểm định :
                <Text component="span" size="sm" c="dimmed" fw={400}>
                  {' '}
                  {dayjs(criteria.dateStart).format('DD/MM/YYYY')} -{' '}
                  {dayjs(criteria.dateEnd).format('DD/MM/YYYY')}
                </Text>
              </Text>
            </Box>
          </Group>

        </Flex>
        <Stack gap={8}>
          {statusList.map((status, index) => (
            <Badge
              key={index}
              color={getBadgeColor(status)}
              variant="outline"
              className="hover:scale-[1.02] hover:cursor-pointer"
            >
              {index === 2 ? 'Kết quả' : index === 1 ? 'Thời hạn' : 'Tiến độ'} :&nbsp;
              {status.toUpperCase()}
            </Badge>
          ))}
        </Stack>
      </Group>

      <Group>
        <Text
          component="span"
          lineClamp={2}
        >
          Đơn vị được kiểm định :{' '}
          {criteria.targetDepartment.length > 0 && (
            <>
              <Text
                component="span"
                c="dimmed"
                className="whitespace-normal break-words"
              >
                {criteria.targetDepartment.join(', ')}
              </Text>
            </>
          )}
        </Text>
      </Group>

      <ScrollArea.Autosize mah="30vh" type="hover" offsetScrollbars mt={'md'}>
        <Grid align="stretch">
          <Grid.Col span={{ base: 12, md: 8, lg: 6 }}>
            <Blockquote
              icon={null}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              radius="md"
            >
              <Spoiler
                fs="italic"
                showLabel="Xem thêm"
                hideLabel="Thu gọn"
                maxHeight={120}
              >
                <Text className="italic">{criteria.content}</Text>
              </Spoiler>
            </Blockquote>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 6 }}>
            <Flex direction="column" gap={12} style={{ height: '100%' }}>
              {criteria.targetDepartment.length > 0 && (
                <Scroll
                  array={criteria.targetDepartment}
                  title="Thống kê theo đơn vị được kiểm định :"
                />
              )}
              {criteria.targetCurriculum.length > 0 && (
                <Scroll
                  title="Chương trình áp dụng :"
                  array={criteria.targetCurriculum}
                  badgeColor="teal"
                />
              )}
              {criteria.inspectors.length > 0 && (
                <Scroll
                  title="Đơn vị triển khai kiểm định :"
                  array={criteria.inspectors}
                  badgeColor="red"
                />
              )}
            </Flex>
          </Grid.Col>
        </Grid>
      </ScrollArea.Autosize>
      <ScrollArea mt="md">
        <Table horizontalSpacing="xs" verticalSpacing={4}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tên tiêu chí</Table.Th>
              <Table.Th>Điểm đánh giá</Table.Th>
              <Table.Th>Ngưỡng đạt</Table.Th>
              <Table.Th>Kết luận</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {criteria.criteriaDetails?.map(d => (
              <Table.Tr key={d.id}>
                <Table.Td>{d.name}</Table.Td>
                <Table.Td>{d.value?.toFixed(2) ?? '-'}</Table.Td>
                <Table.Td>{d.threshold?.toFixed(2) ?? '-'}</Table.Td>
                <Table.Td>
                  <Badge
                    size="sm"
                    variant="light"
                    color={
                      d.isPass === null ? 'yellow' : d.isPass ? 'teal' : 'red'
                    }
                  >
                    {d.isPass === null ? '—' : d.isPass ? 'Đạt' : 'Chưa đạt'}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
