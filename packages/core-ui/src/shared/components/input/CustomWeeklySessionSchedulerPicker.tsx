import { daysOfWeekEnum } from "@aq-fe/core-ui/shared/consts/enum/daysOfWeekEnum";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import {
    Button,
    Center,
    Divider,
    Group,
    NumberInput,
    Paper,
    ScrollArea,
    Text
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { CustomFlexColumn } from "../layout/CustomFlexColumn";
import { CustomDayOfWeekPicker } from "./CustomDayOfWeekPicker";

export interface CustomWeeklySession {
    dayOfWeek: number;       // Thứ (1 = Monday, 7 = Sunday)
    startPeriod: number;     // Tiết bắt đầu
    numberOfPeriods: number; // Số tiết
    durationMinutes: number; // Số phút
}

export interface CustomWeeklySessionSchedulerProps {
    value?: CustomWeeklySession[];
    onChange?: (val: CustomWeeklySession[]) => void;
}

export function CustomWeeklySessionSchedulerPicker({
    value = [],
    onChange,
}: CustomWeeklySessionSchedulerProps) {
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    const handleAddSession = (dayOfWeek: number) => {
        const newSession: CustomWeeklySession = {
            dayOfWeek,
            startPeriod: 1,
            numberOfPeriods: 1,
            durationMinutes: 90,
        };
        onChange?.([...value, newSession]);
    };

    const handleRemove = (index: number) => {
        const newData = [...value];
        newData.splice(index, 1);
        onChange?.(newData);
    };

    const handleUpdate = (
        index: number,
        key: keyof CustomWeeklySession,
        val: number
    ) => {
        const newData = [...value];
        newData[index]![key] = val;
        onChange?.(newData);
    };

    const grouped = value.reduce<Record<number, CustomWeeklySession[]>>((acc, curr) => {
        acc[curr.dayOfWeek] = acc[curr.dayOfWeek] || [];
        acc[curr.dayOfWeek]?.push(curr);
        return acc;
    }, {});

    const getLabel = (day: number) =>
        daysOfWeekEnum[day] || `Day ${day}`;

    return (
        <Paper w={'100%'} p={'md'}>
            <CustomFlexColumn>
                <Center>
                    <CustomDayOfWeekPicker
                        value={selectedDays}
                        onChange={(days) => {
                            const sorted = [...days].sort((a, b) => a - b);
                            setSelectedDays(sorted);
                        }}
                    />
                </Center>

                <Divider my="xs" />

                <Center>
                    <ScrollArea.Autosize h={'40vh'}>
                        <CustomFlexColumn w={{ base: "100%", sm: "70%" }}>
                            {selectedDays.map((dayOfWeek) => (
                                <Paper
                                    w={'100%'}
                                    p={'md'}
                                    bg={colorsObject.mantineBackgroundBlueLight}
                                    key={dayOfWeek}
                                >
                                    <Group gap="apart">
                                        <Text w={'70px'} fw={500}>
                                            {getLabel(dayOfWeek)}
                                        </Text>
                                        <Button
                                            color="teal.5"
                                            leftSection={<IconPlus size={14} />}
                                            onClick={() => handleAddSession(dayOfWeek)}
                                        >
                                            Thêm buổi
                                        </Button>
                                    </Group>
                                    <Divider my="sm" />

                                    {grouped[dayOfWeek]?.map((item, indexInDay) => {
                                        const globalIndex = value.findIndex(
                                            (v) => v === item
                                        );

                                        return (
                                            <Group
                                                key={globalIndex}
                                                mt="xs"
                                                gap="xs"
                                                align="flex-end"
                                            >
                                                <NumberInput
                                                    label="Tiết bắt đầu"
                                                    value={item.startPeriod}
                                                    onChange={(val) =>
                                                        handleUpdate(
                                                            globalIndex,
                                                            "startPeriod",
                                                            val as number
                                                        )
                                                    }
                                                />
                                                <NumberInput
                                                    label="Số tiết"
                                                    value={item.numberOfPeriods}
                                                    onChange={(val) =>
                                                        handleUpdate(
                                                            globalIndex,
                                                            "numberOfPeriods",
                                                            val as number
                                                        )
                                                    }
                                                />
                                                <NumberInput
                                                    label="Số phút  "
                                                    readOnly
                                                    variant="filled"
                                                    value={item.durationMinutes}
                                                />
                                                <Button
                                                    variant="light"
                                                    color="red"
                                                    onClick={() => handleRemove(globalIndex)}
                                                    leftSection={<IconTrash size={14} />}
                                                >
                                                    Xóa buổi
                                                </Button>
                                            </Group>
                                        );
                                    })}
                                </Paper>
                            ))}
                        </CustomFlexColumn>
                    </ScrollArea.Autosize>
                </Center>
            </CustomFlexColumn>
        </Paper>
    );
};
