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

export default function HomeroomTeacherMonitoringStudentLayout() {
  const [classSelect, setClassSelect] = useState<number | null>(null);
  const activityPlanStore = useS_Shared_ActivityPlan();

  const queryClass = useCustomReactQuery({
    queryKey: ["query_classActivityPlan_findbyLecturer", activityPlanStore.state.ActivityPlan?.id],
    axiosFn: () =>
      service_classActivityPlan.findByLecturer({
        activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
        cols: "Class",
      }),
    options: {
      enabled: !!activityPlanStore.state.ActivityPlan?.id,
      select: (data) => {
        // remove duplicates by classId + activityPlanId
        return Array.from(
          new Map(
            data.map((item) => [
              `${item.classId}-${item.activityPlanId}`, // composite key
              item,
            ])
          ).values()
        );
      },
    },
  });

  const queryStudentTrackingByLecturer = useCustomReactQuery({
    queryKey: ["queryStudentTrackingByLecturer", classSelect],
    axiosFn: () =>
      service_ranking.getStudentTrackingByLecturer({
        classid: classSelect || 0,
      }),
    options: {
      enabled: !!classSelect,
    },
  });

  useEffect(() => {
    if (queryClass.data && queryClass.data.length > 0) {
      setClassSelect(queryClass.data[0]?.classId ?? null);
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

  // renderQueryState({
  //   isLoading: queryClass.isLoading,
  //   isError: queryClass.isError,
  // });

  return (
    <Stack gap={"md"}>
      {queryClass.data && queryClass.data?.length > 0 ? (
        <>
          <CustomSelect
            w="400px"
            data={[
              ...(queryClass.data?.map((item, index) => ({
                value: (item.class?.id ?? index).toString(),
                label: item.class?.name ?? "",
              })) ?? []),
            ]}
            onChange={(value) => {
              setClassSelect(value ? parseInt(value) : null);
            }}
            value={classSelect !== null ? String(classSelect) : ""} // Default to 'Tất cả'
            defaultValue=""
            label="Chọn lớp:"
            clearable={false}
          />
          {renderQueryState({
            isLoading: queryStudentTrackingByLecturer.isLoading,
            isError: queryStudentTrackingByLecturer.isError,
            isEmpty: !!classSelect && !queryStudentTrackingByLecturer.data,
          })}
          {queryStudentTrackingByLecturer.data && (
            <Stack gap="xs">
              <StudentJoinActivityChartRanking data={queryStudentTrackingByLecturer.data} />
              <StudentJoinActivityChartRegister data={queryStudentTrackingByLecturer.data} />
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
