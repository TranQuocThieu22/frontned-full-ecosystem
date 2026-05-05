import { daysOfWeekEnum } from "@aq-fe/core-ui/shared/consts/enum/daysOfWeekEnum";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Accordion, AccordionControlProps, Button, Center, Grid, Space, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MyFlexEnd, MyNumberInput } from "aq-fe-framework/components";
import { MyButton } from "aq-fe-framework/core";
import { useState } from "react";

export interface ISessionSchedule {
    dayOfWeek?: number;
    classPeriodStart?: number;
    classPeriodEnd?: number;
    endTime?: string;
    startTime?: string;
    duration?: number;
}

interface IPeriodConfig {
    startHour: string;
    minuteNumber: number
}

interface CoreSessionSchedulePickerProps {
    dayOfWeekPickerValue?: number[]
    periodConfig: IPeriodConfig[];
    sessionScheduleState: ReturnType<typeof useState<ISessionSchedule[]>>
}

export default function CoreSessionSchedulePicker({
    periodConfig = [],
    dayOfWeekPickerValue,
    sessionScheduleState
}: CoreSessionSchedulePickerProps) {
    const periodConfigState = useState([])
    return (
        <Accordion>
            {dayOfWeekPickerValue?.map((item, idx) => (
                <Accordion.Item
                    key={idx}
                    bg={colorsObject.mantineBackgroundSecondary}
                    value={item.toString()} style={{
                        borderRadius: "10px"
                    }}>
                    <AccordionControl>
                        <Text fw={"600"}> {daysOfWeekEnum[item]}</Text>
                    </AccordionControl>
                    <Accordion.Panel style={{
                        borderRadius: "10px",
                    }}>
                        <Grid>
                            <Grid.Col span={3.5}>
                                <MyNumberInput label="Tiết bắt đầu" />
                            </Grid.Col>
                            <Grid.Col span={3.5}>
                                <MyNumberInput label="Số tiết" />
                            </Grid.Col>
                            <Grid.Col span={3.5}>
                                <MyNumberInput
                                    readOnly
                                    value={4}
                                    label="Số phút"
                                    styles={{ input: { background: "var(--mantine-color-gray-light)" } }}
                                />
                            </Grid.Col>
                            <Grid.Col span={1.5} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <MyFlexEnd w={'100%'}>
                                    <MyButton
                                        fullWidth
                                        color={'red'}
                                        actionType="delete" />
                                </MyFlexEnd>
                            </Grid.Col>
                        </Grid>
                        <Space />
                        <Center>
                            <Button leftSection={<IconPlus />}>Thêm buổi</Button>
                        </Center>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}

        </Accordion >
    )
}



function AccordionControl(props: AccordionControlProps) {
    return (
        <Center bg={colorsObject.mantineBackgroundBlueLight} style={{
            border: "1px solid gray",
            borderRadius: "10px"
        }}>
            <Accordion.Control {...props} />
        </Center>
    );
}