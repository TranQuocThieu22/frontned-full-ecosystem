import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomFlexRow } from '@aq-fe/core-ui/shared/components/layout/CustomFlexRow';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface StudentsActivityParticipationCreateProps {
  eventId: number;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function StudentsActivityParticipationButtonCreate({
  eventId,
  onSuccess,
  onError
}: StudentsActivityParticipationCreateProps) {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const studentsQuery = useCustomReactQuery({
    queryKey: ["students", search],
    axiosFn: () => service_account.getStudentList({
      paging: {
        pageNumber: 1,
        pageSize: 100,
      },
      name: search,
    })
  });

  const form = useForm({
    initialValues: {
      studentId: null as number | null,
      eventId: eventId,
      point: ''
    },
    validate: {
      studentId: (value) => value === null ? 'Vui lòng chọn sinh viên' : null,
      point: (value) => {
        if (!value) return 'Vui lòng nhập điểm';
        if (isNaN(Number(value))) return 'Điểm phải là số';
        return null;
      }
    },
  });

  const studentOptions = studentsQuery.data?.map(student => ({
    value: student.id?.toString() || '',
    label: `${student.code} - ${student.fullName}`
  })) || [];

  const handleSearchChange = (val: string) => {
    setSearch(val);
  };

  const handleSubmit = form.onSubmit(async (values) => {
    if (values.studentId === null) {
      return;
    }

    try {
      setIsLoading(true);

      const payload: Partial<StudentEvent> = {
        studentId: values.studentId,
        eventId: eventId,
        point: Number(values.point)
      };

      await service_studentsActivityParticipation.create(payload);

      if (onSuccess) {
        onSuccess();
      }

      queryClient.invalidateQueries();
      utils_notification_show({ crudType: "create" });
      form.reset();
    } catch (error) {
      if (onError) onError();
      utils_notification_show({ crudType: "error", message: 'Không thể thêm sinh viên tham gia hoạt động' });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <CustomFlexRow align="end">
          <CustomSelect
            label="Sinh viên"
            data={studentOptions || []}
            value={form.values.studentId?.toString() || null}
            onChange={(value) => form.setFieldValue('studentId', value ? parseInt(value) : null)}
            error={form.errors.studentId}
            searchable
            searchValue={search}
            onSearchChange={handleSearchChange}
          />

          <TextInput
            label="Điểm"
            placeholder="Nhập điểm"
            {...form.getInputProps('point')}
          />

          <Group>
            <Button
              type="submit"
              loading={isLoading}
              leftSection={<IconPlus />}
            >
              Thêm
            </Button>
          </Group>
        </CustomFlexRow>
      </form>
    </Box>
  );
}
