import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { TimeClusterDetails } from "@/shared/interfaces/timeClusterDetails";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Fieldset, Grid, ScrollArea, Text } from "@mantine/core";
import { TimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { MyFlexRow } from "aq-fe-framework/components";
import { MyDayOfWeekPicker } from "aq-fe-framework/core";
import { utils_time_extractHourMinute } from "aq-fe-framework/utils";
import { useState } from "react";
import { ITimeCluster } from "../interfaces";
import CoreSessionSchedulePicker, { ISessionSchedule } from "./CoreSessionSchedulePicker";

interface I extends BaseEntity {
    timeClusterDetails?: TimeClusterDetails[],
    timeTypeId?: number
}

export default function F_timeCluster_CreateUpdate({
    timeClusterValues
}: {
    timeClusterValues?: ITimeCluster
}) {
    const form = useForm<I>({})
    const daysOfWeekState = useState<number[]>([])
    const sessionPicker = useState<ISessionSchedule[]>()
    const periodConfig = useState<{ startHour: string, minuteNumber: number }[]>([
        { startHour: "2025-02-11T07:00:00", minuteNumber: 45 },
        { startHour: "2025-02-11T07:50:00", minuteNumber: 45 },
        { startHour: "2025-02-11T08:40:00", minuteNumber: 45 },
        { startHour: "2025-02-11T09:30:00", minuteNumber: 45 },
        { startHour: "2025-02-11T10:20:00", minuteNumber: 45 },
        { startHour: "2025-02-11T11:10:00", minuteNumber: 45 },
    ])
    return (
        <CustomButtonCreateUpdate
            isUpdate={!!timeClusterValues}
            modalProps={{
                size: "80%",
                title: "Tạo cụm thời gian mới"
            }}
            form={form}
            onSubmit={() => {
                console.log(sessionPicker[0]);

            }}>
            <Grid>
                <Grid.Col span={4}>
                    <MyTextInput label="Mã cụm thời gian" />
                </Grid.Col>
                <Grid.Col span={8}>
                    <MyTextInput label="Tên cụm thời gian" />
                </Grid.Col>
            </Grid>
            <Fieldset legend="Danh sách thứ">
                <MyDayOfWeekPicker
                    value={daysOfWeekState[0]}
                    onChange={daysOfWeekState[1]}
                />
            </Fieldset>

            <Fieldset legend="Danh sách buổi" >
                <Grid>
                    <Grid.Col span={2}>
                        {periodConfig[0].map((item, idx) => (
                            <MyFlexRow key={idx} mb={5}>
                                <Text>Tiết {idx + 1}</Text>
                                <TimePicker readOnly variant="filled" value={utils_time_extractHourMinute(item.startHour)} />
                            </MyFlexRow>
                        ))}
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <ScrollArea.Autosize mah={"60vh"} >
                            <CoreSessionSchedulePicker
                                dayOfWeekPickerValue={daysOfWeekState[0]}
                                periodConfig={periodConfig[0]}
                                sessionScheduleState={sessionPicker}
                            />
                        </ScrollArea.Autosize>
                    </Grid.Col>
                </Grid>
            </Fieldset>

        </CustomButtonCreateUpdate>
    )
}
