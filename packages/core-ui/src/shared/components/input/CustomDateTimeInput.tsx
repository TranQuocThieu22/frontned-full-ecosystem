import { Group } from '@mantine/core';
import { DateInput, TimePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';

type DateTimeInputProps = {
    value?: string | null;          // "YYYY-MM-DD HH:mm"
    onChange?: (value: string | null) => void;
    label?: string;
};

export function CustomDateTimeInput({
    value,
    onChange,
    label,
}: DateTimeInputProps) {
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);

    // sync từ ngoài vào
    useEffect(() => {
        if (!value) {
            setDate(null);
            setTime(null);
            return;
        }

        const [d, t] = value.split(' ');
        setDate(d ?? null);
        setTime(t ?? null);
    }, [value]);

    // merge date + time
    useEffect(() => {
        if (!date || !time) {
            onChange?.(null);
            return;
        }

        onChange?.(`${date} ${time}`);
    }, [date, time]);

    return (
        <Group grow align="flex-end">
            <DateInput
                label={label}
                value={date}
                onChange={setDate}
                placeholder="DD-MM-YYYY"
            />

            <TimePicker
                value={time ?? undefined}
                onChange={(v) => setTime(v ?? null)}
                format='24h'
                clearable
            />
        </Group>
    );
}
