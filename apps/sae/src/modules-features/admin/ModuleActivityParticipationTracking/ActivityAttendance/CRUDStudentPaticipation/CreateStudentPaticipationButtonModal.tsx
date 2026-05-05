"use client"

import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomColumnDef, CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import { Flex, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconPlus, IconRefresh, IconUserPlus } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import DeleteStudentParticipationButtonModal from './DeleteStudentParticipationButtonModal';
import StudentExportButton from './StudentExportButton';
import UpdateStudentParticipationButtonModal from './UpdateStudentParticipationButtonModal';

export default function StudentPaticipationTableButtonModal({ eventData, reviewedByUserId, userWorkingUnitId, userRoleIds }:
  { eventData: Event, reviewedByUserId: number | null, userWorkingUnitId: number | null, userRoleIds: number[] | null }
) {
  const permissionStore = usePermissionStore();
  const currentLoginUser = useAuthenticateStore()

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const disc = useDisclosure();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const studentListQuery = useCustomReactQuery({
    queryKey: ["StudentPaticipationTableButtonModal_StudentList", debouncedSearch],
    axiosFn: () => service_account.getStudentList({
      paging: {
        pageNumber: 1,
        pageSize: 100,
      },
      name: debouncedSearch,
    })
  });

  const studentEventQuery = useCustomReactQuery({
    queryKey: ["StudentPaticipationTableButtonModal_GetBy", eventData.id],
    axiosFn: () => service_studentsActivityParticipation.getBy(
      `?eventid=${eventData.id}`
    ),
    options: {
      enabled: disc[0],
    },
  });

  const studentOptions = studentListQuery.data?.map(student => ({
    value: student.id?.toString() || '',
    label: `${student.code} - ${student.fullName}`
  })) || [];

  const form = useForm<StudentEvent>({
    initialValues: {
      studentId: undefined,
      eventId: eventData.id,
      point: 0
    },
    validate: {
      studentId: (value) => {
        if (value === undefined || value === null || value === -1) {
          return 'Vui lòng chọn sinh viên'
        }

        return null
      },
      point: (value) => {
        if (value === undefined || value === null) return null;

        const numValue = Number(value);

        if (numValue < eventData.minPoint!) {
          return `Điểm phải lớn hơn hoặc bằng điểm tối thiểu`;
        }
        if (numValue > eventData.maxPoint!) {
          return `Điểm phải nhỏ hơn hoặc bằng điểm tối đa`;
        }
        return null;
      },

    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    if (values.studentId === undefined) {
      return;
    }

    try {
      setIsLoading(true);

      await service_studentsActivityParticipation.create({
        studentId: values.studentId,
        eventId: eventData.id,
        point: Number(values.point)
      });

      queryClient.invalidateQueries();
      utils_notification_show({ crudType: "create" });
      form.reset();
    } catch (error) {
      utils_notification_show({ crudType: "error", message: 'Không thể thêm sinh viên tham gia hoạt động' });
    } finally {
      setIsLoading(false);
    }
  });

  const columns = useMemo<CustomColumnDef<StudentEvent>[]>(() => [
    {
      header: "Mã sinh viên", accessorKey: "studentCode"
    },
    {
      header: "Họ và tên", accessorKey: "studentName"
    },
    {
      header: "Mã lớp", accessorKey: "className",
    },
    {
      header: "Mã khoa", accessorKey: "facultyName",
    },
    {
      header: "Điểm", accessorKey: "point",
    },
  ], [])

  const exportConfig = {
    fields: [
      { fieldName: 'studentCode', header: 'Mã sinh viên' },
      { fieldName: 'studentName', header: 'Họ và tên' },
      { fieldName: 'className', header: 'Mã lớp' },
      { fieldName: 'facultyName', header: 'Mã khoa' },
      { fieldName: 'point', header: 'Điểm' },
    ],
  };

  return (
    <Group>
      <CustomButtonModal
        modalProps={{
          size: "80%",
          title: "Danh sách sinh viên tham gia"
        }}
        actionIconProps={{
          variant: "transparent",

        }}
        buttonProps={{
          children: <IconUserPlus />

        }}
        disclosure={disc}
      >
        {(permissionStore.state.currentPermissionPage?.isCreate) &&
          ((reviewedByUserId !== null && userWorkingUnitId !== null &&
            reviewedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
          <>
            <Flex direction="row" gap={20} align={"flex-end"}>
              <Group align="flex-start">
                <CustomSelect
                  w={300}
                  label="Sinh viên"
                  data={studentOptions || []}
                  value={form.values.studentId?.toString() || null}
                  onChange={(value) => form.setFieldValue('studentId', value ? parseInt(value) : undefined)}
                  error={form.errors.studentId}
                  limit={5}
                  searchable
                  searchValue={search}
                  onSearchChange={(value) => setSearch(value)}
                />
                <CustomNumberInput
                  label="Điểm"
                  {...form.getInputProps('point')}
                  inputContainer={(children) => (
                    <Group align="flex-start">
                      {children}
                      <CustomButton
                        onClick={() => handleSubmit()}
                        loading={isLoading}
                        leftSection={<IconPlus />} color='blue'>
                        Thêm
                      </CustomButton>
                    </Group>
                  )}
                />
              </Group>
            </Flex>
          </>
          :
          <Text c="dimmed" fz={"sm"}>Đơn vị của bạn không có quyền cập nhật điểm cho hoạt động này</Text>
        }
        <CustomFieldset title="Danh sách điểm rèn luyện quy đổi của sinh viên" >
          <CustomDataTable
            isLoading={studentEventQuery.isLoading}
            isError={studentEventQuery.isError}
            enableRowSelection={true}
            enableRowNumbers={true}
            enablePagination={true}
            columns={columns}
            data={studentEventQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
              <Group>
                {(permissionStore.state.currentPermissionPage?.isCreate) &&
                  ((reviewedByUserId !== null && userWorkingUnitId !== null &&
                    reviewedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') &&
                  <>
                    <CustomButton
                      actionType="default"
                      color="green"
                      leftSection={<IconRefresh />}
                      onClick={() => studentEventQuery.refetch()}
                      loading={studentEventQuery.isFetching}
                    >
                      Đồng bộ
                    </CustomButton>
                  </>
                }
                {permissionStore.state.currentPermissionPage?.isExport && (
                  <StudentExportButton
                    table={table}
                    loading={studentEventQuery.isLoading} />
                )}
              </Group>
            )}
            renderRowActions={({ row }) => {
              return (
                <CustomCenterFull>
                  <UpdateStudentParticipationButtonModal
                    values={row.original}
                    minPoint={eventData.minPoint!}
                    maxPoint={eventData.maxPoint!} />
                  <DeleteStudentParticipationButtonModal
                    id={row.original.id!}
                    code={row.original.studentCode!.toString()} />
                </CustomCenterFull>
              )
            }}
          />
        </CustomFieldset>
      </CustomButtonModal >
    </Group >
  )
}
