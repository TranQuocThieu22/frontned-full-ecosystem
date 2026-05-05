"use client";

import { service_classActivityPlan } from "@/api/services/service_classActivityPlan";
import { service_ranking } from "@/api/services/service_ranking";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import StudentJoinActivityChartRanking from "./StudentJoinActivityChartRanking";
import StudentJoinActivityChartRegister from "./StudentJoinActivityChartRegister";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function AdvisorMonitoringStudentLayout() {
  const [classSelect, setClassSelect] = useState<number | null>(null);

  const activityPlanStore = useS_Shared_ActivityPlan();

  const queryClass = useCustomReactQuery({
    queryKey: [
      "AdvisorMonitoringStudentLayout_findBySubLecturer",
      activityPlanStore.state.ActivityPlan?.id,
    ],
    axiosFn: () => {
      return service_classActivityPlan.findBySubLecturer({
        activityPlanId: activityPlanStore.state.ActivityPlan?.id,
      });
    },
    options: {
      enabled: !!activityPlanStore.state.ActivityPlan?.id,
      select: (data) => {
        return Array.from(
          new Map(
            data.map((item) => [
              `${item.aqClassId}-${item.id}`, // composite key
              item,
            ])
          ).values()
        );
      },
    },
  });

  const queryStudentTrackingBySubLecturer = useCustomReactQuery({
    queryKey: ["queryStudentTrackingBySubLecturer", classSelect],
    axiosFn: () =>
      service_ranking.getStudentTrackingBySubLecturer({
        classid: classSelect || 0,
      }),
    options: {
      enabled: !!classSelect,
    },
  });

  useEffect(() => {
    if (queryClass.data && queryClass.data.length > 0) {
      setClassSelect(queryClass.data[0]?.id ?? null);
    }
  }, [queryClass.data]);

  const renderQueryState = ({
    isLoading,
    isError,
    isEmpty,
  }: {
    isLoading?: boolean;
    isError?: boolean;
    isEmpty?: boolean;
  }) => {
    return (
      (isLoading || isError || isEmpty) && (
        <Text fz="sm" fs="italic" fw={500} c="dimmed" mt={10}>
          {isLoading
            ? "Đang tải dữ liệu..."
            : isError
              ? "Có lỗi xảy ra!"
              : isEmpty
                ? "Không có dữ liệu!"
                : ""}
        </Text>
      )
    );
  };

  return (
    <Stack gap="md">
      {queryClass.data && queryClass.data?.length > 0 ? (
        <>
          <CustomSelect
            w="400px"
            data={
              queryClass.data?.map((item, index) => ({
                value: (item?.id ?? index).toString(),
                label: item?.name ?? "",
              })) ?? []
            }
            onChange={(value) => {
              setClassSelect(value ? parseInt(value) : null);
            }}
            value={classSelect ? String(classSelect) : null}
            label="Chọn lớp:"
            clearable={false}
          />
          {renderQueryState({
            isLoading: queryStudentTrackingBySubLecturer.isLoading,
            isError: queryStudentTrackingBySubLecturer.isError,
            isEmpty: !!classSelect && !queryStudentTrackingBySubLecturer.data,
          })}
          {queryStudentTrackingBySubLecturer.data && (
            <Stack gap="xs">
              <StudentJoinActivityChartRanking data={queryStudentTrackingBySubLecturer.data} />
              <StudentJoinActivityChartRegister data={queryStudentTrackingBySubLecturer.data} />
            </Stack>
          )}
        </>
      ) : (
        renderQueryState({
          isLoading: queryClass.isLoading,
          isError: queryClass.isError,
          isEmpty: queryClass.data?.length === 0,
        })
      )}
    </Stack>
  );
}
