import { service_timeType } from "@/api/services/service_timeType";
import { ITimeType } from "@/interfaces/timeType";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { UseQueryResult } from "@tanstack/react-query";
import { useMyReactMutation } from "aq-fe-framework/hooks";
import { useRef } from "react";

export default function F_timeType_UpdateTimeType({
    isChangeRef,
    timeTypeQuery
}: {
    isChangeRef: ReturnType<typeof useRef<boolean>>,
    timeTypeQuery: UseQueryResult<ITimeType, Error>
}) {
    const updateTimeTypeMutation = useMyReactMutation({
        axiosFn: (values: ITimeType) => service_timeType.update(values)
    })
    const validateTable = (): boolean => {
        const timeTypeDetail = timeTypeQuery.data?.timeTypeDetails
        if (!Array.isArray(timeTypeDetail) || timeTypeDetail.length === 0) return true;
        for (let i = 0; i < timeTypeDetail.length - 1; i++) {
            const currentSession = timeTypeDetail[i];
            const nextSession = timeTypeDetail[i + 1];

            if (!currentSession || !nextSession || !currentSession.startHour || !nextSession.startHour) {
                console.warn(`Dữ liệu không hợp lệ tại index ${i}`);
                continue;
            }

            const currentEndTime = new Date(currentSession.startHour);
            currentEndTime.setMinutes(currentEndTime.getMinutes() + (currentSession.minuteNumber || 0));

            const nextStartTime = new Date(nextSession.startHour);

            if (isNaN(currentEndTime.getTime()) || isNaN(nextStartTime.getTime())) {
                console.warn(`Thời gian không hợp lệ tại index ${i}`);
                continue;
            }

            if (nextStartTime < currentEndTime) {
                notifications.show({
                    message: `Lỗi: Tiết ${currentSession.name} kết thúc lúc 
                            ${currentEndTime.getHours() + ":" + currentEndTime.getMinutes()} 
                            nhưng tiết ${nextSession.name} bắt đầu lúc 
                            ${nextStartTime.getHours() + ":" + nextStartTime.getMinutes()}`,
                    color: "red"
                })
                return false;
            }
        }
        return true;
    };

    const handleSave = async () => {
        if (validateTable() == false) return
        if (!isChangeRef.current) {
            notifications.show(
                {
                    message: "không có thay đổi nào",
                    color: "yellow"
                }
            );
            return;
        }
        updateTimeTypeMutation.mutate(timeTypeQuery.data!, {
            onSuccess: () => {
                notifications.show({
                    message: "Cập nhật thành công!"
                })
                timeTypeQuery.refetch()
                isChangeRef.current = false
            }
        })
    }

    return (
        <Button
            // disabled={!isChangeRef.current} 
            onClick={handleSave}>
            Lưu
        </Button>
    )
}