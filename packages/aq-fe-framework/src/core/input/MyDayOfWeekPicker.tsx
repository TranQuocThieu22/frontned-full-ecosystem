import { MyFlexRow } from "@/components/Layouts/FlexRow/MyFlexRow";
import { daysOfWeekEnum } from "@/shared/consts/daysOfWeekEnum";
import { Badge, Group } from "@mantine/core";


interface CoreDayOfWeekPickerProps {
    value?: number[];
    onChange?: (val: number[]) => void;
}

const days: { label: string; value: number }[] = Object.entries(daysOfWeekEnum)
    .filter(([key]) => isNaN(Number(key)))
    .map(([label, value]) => ({ label, value: value as number }));

export function MyDayOfWeekPicker({ value = [], onChange }: CoreDayOfWeekPickerProps) {
    const toggle = (val: number) => {
        if (!onChange) return;

        const newValue = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val].sort((a, b) => a - b); // Sắp xếp tăng dần

        onChange(newValue);
    };

    return (
        <MyFlexRow align={'center'}>
            <Group gap="xs">
                {days.map((d) => (
                    <Badge
                        key={d.value}
                        variant={value.includes(d.value) ? "filled" : "outline"}
                        color="blue"
                        radius="sm"
                        size="lg"
                        onClick={() => toggle(d.value)}
                        style={{ cursor: onChange ? "pointer" : "default", userSelect: "none" }}
                    >
                        {d.label}
                    </Badge>
                ))}
            </Group>
        </MyFlexRow>
    );
};
