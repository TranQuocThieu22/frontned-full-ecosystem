'use client';

import { academicYearService } from '@aq-fe/aq-legacy-framework/shared/APIs/academicYearService';
import { CustomButtonCreateUpdate } from '@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { AcademicYear } from '@aq-fe/aq-legacy-framework/shared/interfaces/AcademicYear';
import { Checkbox, Grid, Group, SimpleGrid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, UseFormReturnType } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import { useEffect } from 'react';

export function AcademicYearsUpdate({
    values,
}: {
    values: AcademicYear;
}) {
    const toUTCDatePreserveDay = (year: number, month: number, day: number) =>
        new Date(Date.UTC(year, month, day));

    const toUTCISOStringPreserveDay = (date: Date) =>
        new Date(Date.UTC(
            date.getFullYear(), // local year
            date.getMonth(),    // local month
            date.getDate()      // local day
        )).toISOString();
    const currentYear = new Date().getFullYear();

    const form = useForm<AcademicYear>({
        initialValues: {
            code: values.code ?? currentYear.toString(),
            name: values.name ?? '',
            note: values.note ?? '',
            isCurrent: values.isCurrent ?? false,
            academicYearStart: values.academicYearStart
                ? toUTCDatePreserveDay(
                    new Date(values.academicYearStart).getFullYear(),
                    new Date(values.academicYearStart).getMonth(),
                    new Date(values.academicYearStart).getDate()
                )
                : toUTCDatePreserveDay(Number(values.code) ?? currentYear, 7, 1), // Aug 1

            academicYearEnd: values.academicYearEnd
                ? toUTCDatePreserveDay(
                    new Date(values.academicYearEnd).getFullYear(),
                    new Date(values.academicYearEnd).getMonth(),
                    new Date(values.academicYearEnd).getDate()
                )
                : toUTCDatePreserveDay((Number(values.code) ?? currentYear) + 1, 4, 31), // May 31 next year

            administrativeYearStart: values.administrativeYearStart
                ? toUTCDatePreserveDay(
                    new Date(values.administrativeYearStart).getFullYear(),
                    new Date(values.administrativeYearStart).getMonth(),
                    new Date(values.administrativeYearStart).getDate()
                )
                : toUTCDatePreserveDay(Number(values.code) ?? currentYear, 0, 1), // Jan 1

            administrativeYearEnd: values.administrativeYearEnd
                ? toUTCDatePreserveDay(
                    new Date(values.administrativeYearEnd).getFullYear(),
                    new Date(values.administrativeYearEnd).getMonth(),
                    new Date(values.administrativeYearEnd).getDate()
                )
                : toUTCDatePreserveDay(Number(values.code) ?? currentYear, 11, 31), // Dec 31

            concurrencyStamp: values.concurrencyStamp,
        },

        validate: {
            code: (value) => {
                if (!value || isNaN(Number(value))) return 'Mã năm học không hợp lệ';
                const year = Number(value);
                if (year < 1900 || year > 2100) return 'Năm học phải trong khoảng 1900-2100';
                return undefined;
            },

            academicYearStart: (value, values) => {
                if (!value) return 'Ngày bắt đầu năm học không được để trống';
                const start = new Date(value);
                if (start < values.administrativeYearStart! || start > values.administrativeYearEnd!) {
                    return 'Ngày bắt đầu NH phải nằm trong năm hành chính';
                }
                return undefined;
            },

            academicYearEnd: (value, values) => {
                if (!value) return 'Ngày kết thúc năm học không được để trống';
                const end = new Date(value);
                if (end <= values.academicYearStart!) {
                    return 'Ngày kết thúc NH phải lớn hơn ngày bắt đầu NH';
                }
                // Academic year end can span to next year, so no check vs administrativeYearEnd
                return undefined;
            },
        },
    });

    // Update administrative dates when code changes
    useEffect(() => {
        const year = parseInt(String(form.values.code), 10);
        if (!isNaN(year)) {
            form.setFieldValue('administrativeYearStart', new Date(year, 0, 1));
            form.setFieldValue('administrativeYearEnd', new Date(year, 11, 31));

            // If academicYearStart/End are empty, reset defaults
            if (!form.values.academicYearStart) {
                form.setFieldValue('academicYearStart', new Date(year, 7, 1));
            }
            if (!form.values.academicYearEnd) {
                form.setFieldValue('academicYearEnd', new Date(year + 1, 4, 31));
            }
        }
    }, [form.values.code]);

    // Keep concurrencyStamp in sync
    useEffect(() => {
        if (form.values.concurrencyStamp !== values.concurrencyStamp) {
            form.setFieldValue('concurrencyStamp', values.concurrencyStamp);
        }
    }, [values.concurrencyStamp]);

    return (
        <CustomButtonCreateUpdate
            isUpdate
            modalProps={{
                size: '60%'

            }}
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={(value: AcademicYear) => {
                const formattedValues: any = {
                    ...values,
                    id: values.id,
                    name: value.name,
                    isCurrent: value.isCurrent,
                    academicYearStart: value.academicYearStart
                        ? toUTCISOStringPreserveDay(new Date(value.academicYearStart))
                        : null,

                    academicYearEnd: value.academicYearEnd
                        ? toUTCISOStringPreserveDay(new Date(value.academicYearEnd))
                        : null,

                    administrativeYearStart: value.administrativeYearStart
                        ? toUTCISOStringPreserveDay(new Date(value.administrativeYearStart))
                        : null,

                    administrativeYearEnd: value.administrativeYearEnd
                        ? toUTCISOStringPreserveDay(new Date(value.administrativeYearEnd))
                        : null,
                    note: value.note

                };

                return academicYearService.update(formattedValues);
            }}

        >
            <SimpleGrid cols={2}>
                <CustomTextInput
                    readOnly
                    withAsterisk
                    flex={1}
                    label="Mã Năm học"
                    {...form.getInputProps('code')}
                />
                <DateInput
                    withAsterisk
                    flex={1}
                    placeholder="Chọn ngày bắt đầu năm học"
                    label="Ngày bắt đầu năm học"
                    rightSection={<IconCalendar />}
                    {...form.getInputProps('academicYearStart')}
                    minDate={form.values.administrativeYearStart}
                    maxDate={form.values.administrativeYearEnd}
                />
                <DateInput
                    flex={1}
                    label="Ngày bắt đầu hành chính"
                    value={form.values.administrativeYearStart}
                    onChange={(value) => {
                        form.setFieldValue('administrativeYearStart', new Date(value || ''))
                    }}
                    clearable={false}

                />
                <CustomTextInput
                    withAsterisk
                    flex={1}
                    label="Tên năm học"
                    {...form.getInputProps('name')}
                />
                <DateInput
                    withAsterisk
                    flex={1}
                    label="Ngày kết thúc năm học"
                    placeholder="Chọn ngày kết thúc năm học"
                    rightSection={<IconCalendar />}
                    {...form.getInputProps('academicYearEnd')}
                    minDate={form.values.academicYearStart}
                />
                <DateInput
                    flex={1}
                    label="Ngày kết thúc hành chính"
                    value={form.values.administrativeYearEnd}
                    onChange={(value) => {
                        form.setFieldValue('administrativeYearEnd', new Date(value || ''))
                    }}
                    clearable={false}

                />
            </SimpleGrid>
            <CustomTextArea label="Ghi chú" flex={1} {...form.getInputProps('note')} />
            <Checkbox
                label="Hiện hành"
                {...form.getInputProps('isCurrent', { type: 'checkbox' })}
            />
        </CustomButtonCreateUpdate >
    );
}
