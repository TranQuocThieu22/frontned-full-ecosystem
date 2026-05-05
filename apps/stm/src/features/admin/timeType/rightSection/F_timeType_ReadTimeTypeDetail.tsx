import { timeTypeService } from "@/shared/APIs/timeTypeService";
import { Group, NumberInput } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useRef } from "react";
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
import { TimePicker } from '@mantine/dates';
import { IconClock } from "@tabler/icons-react";
import { utils_reactQuery_updateListItemInQuery, utils_time_extractHourMinute } from "aq-fe-framework/utils";
import useS12_7 from "../useS_timeType";
import F_timeType_UpdateTimeType from "./F_timeType_UpdateTimeType";
import { TimeTypeDetail } from "@/shared/interfaces/timeTypeDetail";

export default function F_timeType_ReadTimeTypeDetail() {
    const store = useS12_7()
    const queryClient = useQueryClient()
    const isChangeRef = useRef(false);
    const timeTypeQuery = useMyReactQuery({
        queryKey: [`timeTypeQuery`, store.state.timeTypeId],
        axiosFn: () => timeTypeService.get({
            params: `?cols=TimeTypeDetails&id=` + store.state.timeTypeId
        }),
        options: {
            enabled: store.state.timeTypeId != 0,
            refetchOnWindowFocus: false,
            staleTime: Infinity
        }
    })


    const updateTimeObjectView = (id: number, updatedField: Partial<TimeTypeDetail>) => {
        utils_reactQuery_updateListItemInQuery({
            queryClient,
            queryKey: [`timeTypeQuery`, store.state.timeTypeId],
            listKey: "timeTypeDetails",
            itemId: id,
            updatedFields: updatedField
        })
        isChangeRef.current = true;
    };


    const columns = useMemo<MRT_ColumnDef<TimeTypeDetail>[]>(() => [
        {
            header: "Thời gian bắt đầu",
            accessorKey: "startHour",
            accessorFn: (row) => {
                return (
                    <TimePicker
                        rightSection={<IconClock />}
                        value={utils_time_extractHourMinute(row.startHour?.toString())}
                        onChange={(e) => {
                            if (!e) return;
                            const [hours, minutes] = e.split(":").map(Number);
                            const newDate = new Date(row.startHour!);

                            if (!hours || !minutes) return;
                            
                            newDate.setUTCHours(hours);
                            newDate.setUTCMinutes(minutes);
                            updateTimeObjectView(row.id!, { startHour: newDate.toISOString() });
                        }}
                    />
                )
            }
        },
        {
            header: "Số phút",
            accessorKey: "minuteNumber",
            accessorFn: (row) =>
                <NumberInput
                    max={500}
                    value={row.minuteNumber || 0}
                    onChange={(e) => {
                        updateTimeObjectView(row.id!, { minuteNumber: Number(e) })
                    }}
                />
        },
    ], [timeTypeQuery.data]);

    return (
        <MyFieldset title="Chi tiết loại thời gian">
            <MyDataTable
                columns={columns}
                data={timeTypeQuery.data?.timeTypeDetails || []}
                isLoading={timeTypeQuery.isLoading}
                isError={timeTypeQuery.isError}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_timeType_UpdateTimeType
                            timeTypeQuery={timeTypeQuery}
                            isChangeRef={isChangeRef}
                        />
                    </Group>
                )}
            />
        </MyFieldset>
    )
}