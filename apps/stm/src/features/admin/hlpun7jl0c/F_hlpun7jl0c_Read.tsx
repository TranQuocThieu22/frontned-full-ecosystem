'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { timeTypeService } from "@/shared/APIs/timeTypeService";
import { TimeType } from "@/shared/interfaces/timeType";
import { TimeTypeDetail } from "@/shared/interfaces/timeTypeDetail";
import { utils_date_dateToTime } from "@/utils/date";
import { Checkbox, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

export default function F_hlpun7jl0c_Read() {
    const TimeType_Get_Query = useCustomReactQuery({
        queryKey: ["timeType", 1],
        axiosFn: () => timeTypeService.get({ params: "?cols=timeTypeDetails&id=1" }),
    });
    const TimeType_Update = useCustomReactMutation({
        axiosFn: (body: Partial<TimeType>) =>
            timeTypeService.update(body),
        mutationType: "update",
    });
    const timeTypeState = useState<TimeTypeDetail[]>()
    const editedTimeType = useState<Record<string, TimeTypeDetail>>({})

    function handleSave() {
        TimeType_Update.mutate({
            ...TimeType_Get_Query.data,
            timeTypeDetails: Object.values(editedTimeType[0])
        })

    }

    const columns = useMemo<MRT_ColumnDef<TimeTypeDetail>[]>(() => [
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
