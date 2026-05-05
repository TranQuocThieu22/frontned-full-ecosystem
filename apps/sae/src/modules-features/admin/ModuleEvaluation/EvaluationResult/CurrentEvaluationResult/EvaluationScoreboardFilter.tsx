import { service_faculty } from '@/api/services/service_faculty'
import TextInputDebounceSearch from '@/modules-features/admin/ModuleEvaluation/EvaluationResult/CurrentEvaluationResult/TextInputDebounceSearch'
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect'
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset'
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery'
import { Paper, Group, Stack, Text } from '@mantine/core'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
interface Props {
  setDataFilter: Dispatch<SetStateAction<IFilter>>
}
export default function EvaluationScoreboardFilter({ setDataFilter }: Props) {
  const queryFaculty = useCustomReactQuery({
    queryKey: ["faculty"],
    axiosFn: () => service_faculty.getAll(),
    options: {
      refetchOnWindowFocus: false,
    }
  })
  const facultyOptions = useMemo(() => {
    return queryFaculty.data?.map((item) => ({
      value: String(item.id),
      label: String(item.name),
      facultyCode: String(item.code),
    })) || []
  }, [queryFaculty.data])
  return (
    <Paper p={10} mb={10}>
      <CustomFieldset title="Bộ lọc nâng cao">
        <Group grow>
          <CustomSelect
            isLoading={queryFaculty.isLoading}
            clearable
            isError={queryFaculty.isError}
            data={facultyOptions}
            label="Khoa"
            placeholder="Chọn khoa"
            defaultValue=""
            renderOption={(item) => {
              const comboboxItem = (item.option as any);
              return (
                <Stack gap="0">
                  <Text>{comboboxItem.label}</Text>
                  <Text fw="bold">{comboboxItem.facultyCode}</Text>
                </Stack>
              );
            }}
            onChange={(value) => {
              setDataFilter((prev) => ({
                ...prev,
                facultyId: value ? Number(value) : undefined,
              }));
            }}
          />
          <TextInputDebounceSearch
            isLoading={queryFaculty.isLoading}
            defaultValue=""
            delay={1000}
            label="Sinh viên"
            placeholder="Nhập mã hoặc tên sinh viên"
            onEndDebounce={(value) => {
              setDataFilter((prev) => ({
                ...prev,
                name: value,
              }));
            }}
          />
        </Group>
      </CustomFieldset>
    </Paper>
  )
}

interface IFilter {
  pageIndex: number,
  pageSize: number,
  facultyId?: number,
  name?: string,
  activityPlanId?: number,
}
