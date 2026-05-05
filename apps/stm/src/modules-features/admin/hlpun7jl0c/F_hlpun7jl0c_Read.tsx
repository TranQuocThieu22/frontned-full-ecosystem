'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import useM_TimeType_Update from "@/hooks/mutation-hooks/TimeType/useM_TimeType_Update";
import useQ_TimeType_Get from "@/hooks/query-hooks/TimeType/useQ_TimeType_Get";
import { ITimeTypeDetail } from "@/interfaces/timeTypeDetail";
import { utils_date_dateToTime } from "@/utils/date";
import { utils_notification_show } from "@/utils/notification";
import { Checkbox, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

export default function F_hlpun7jl0c_Read() {
    const TimeType_Get_Query = useQ_TimeType_Get({
        queryKey: "F_hlpun7jl0c_Read",
        params: "?cols=timeTypeDetails&id=1"
    })
    const TimeType_Update = useM_TimeType_Update()
    const timeTypeState = useState<ITimeTypeDetail[]>()
    const editedTimeType = useState<Record<string, ITimeTypeDetail>>({})

    function handleSave() {
        TimeType_Update.mutate({
            ...TimeType_Get_Query.data,
            timeTypeDetails: Object.values(editedTimeType[0])
        }, {
            onSuccess: () => {
                utils_notification_show({ crudType: "update" })
            }
        })

    }

    const columns = useMemo<MRT_ColumnDef<ITimeTypeDetail>[]>(() => [
        {
            header: "Thời gian bắt đầu",
            accessorKey: "startHour",
            accessorFn: (row) => {
                return utils_date_dateToTime(new Date(row.startHour!))
            }
        },
        {
            header: "Số phút",
            accessorKey: "minuteNumber"
        },
        {
            header: "Tiết bắt đầu xếp lịch thi",
            accessorKey: "isExamScheduling",
            accessorFn: (row) => {
                return (
                    <Checkbox
                        defaultChecked={row.isStartTest}
                        onChange={(e) => {
                            editedTimeType[1](prev => ({ ...prev, [row.id!]: { ...row, isStartTest: e.target.checked } }))
                        }}
                    />
                )
            }
        }
    ], [timeTypeState[0]])
    useEffect(() => {
        if (!TimeType_Get_Query.data) return
        timeTypeState[1](TimeType_Get_Query.data.timeTypeDetails)
    }, [TimeType_Get_Query.data])

    useEffect(() => {
        if (!TimeType_Get_Query.data) return
        const itemCheckDefault = TimeType_Get_Query.data.timeTypeDetails?.filter(item => item.isStartTest == true)[0]
        editedTimeType[1]({ ...editedTimeType[0], [itemCheckDefault?.id!]: itemCheckDefault })
    }, [TimeType_Get_Query.data])
    if (timeTypeState[0] == undefined) return "Đang tải..."
    return (
        <MyFieldset title="Danh sách tiết thi">
            <MyDataTable
                columns={columns}
                data={timeTypeState[0]}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <MyButton onClick={handleSave} crudType="save" />
                        <MyButton crudType="export" />
                    </Group>
                )}
            />
        </MyFieldset>
    )
}
