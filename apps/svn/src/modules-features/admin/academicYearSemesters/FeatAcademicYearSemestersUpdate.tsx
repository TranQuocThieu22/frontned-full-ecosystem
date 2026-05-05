'use client';
import { Group, Textarea } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import {
    MyActionIconUpdate,
    MyCheckbox,
    MyDateInput,
    MySelect,
    MyTextInput,
} from 'aq-fe-framework/components';
import { useEffect } from 'react';

interface ICreateUserViewModel {
    id?: number; // STT
    code?: string; // Mã năm học - học kì
    name?: string; // Tên năm học - học kì
    note?: string; // Ghi chú
    isEnabled?: boolean; // Cho phép hiện
    concurrencyStamp?: string; // ID thay đổi
    coeSchoolYearId?: number; // Mã năm học
    numberWeek?: number; // Số tuần
    isCurrent?: boolean; // Hiện hành
    startDate?: Date | undefined; // Ngày bắt đầu
    endDate?: Date | undefined; // Ngày kết thúc
    semesters?: Array<any>; // Semesters
    coeSchoolYears?: Array<any>; // Năm học
}

export default function FeatAcademicYearSemestersUpdate({
    values,
}: {
    values: ICreateUserViewModel;
}) {


    const validateDate = (message: string) => {
        return (value: any) => {
            if (!value) {
                return message;
            }
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                return message;
            }
            return null;
        };
    };

    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            ...values,
            startDate: new Date(values.startDate!),
            endDate: new Date(values.endDate!),
        },
        validate: {
            name: (value) => !value ? 'Tên không được để trống' : null,
            startDate: validateDate('Ngày bắt đầu không được để trống') as any,
            endDate: (value, values) => {
                if (!value) {
                    return 'Ngày kết thúc không được để trống';
                }

                if (new Date(value) <= new Date(values.startDate!)) {
                    return 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
                }
            },
            numberWeek: (value) => {
                if (value === undefined || value === null) {
                    return 'Số tuần không được để trống';
                }

                if (value <= 0) {
                    return 'Số tuần phải lớn hơn 0';
                }
                return null;
            },
            coeSchoolYearId: (value) => !value ? 'Năm học không được để trống' : null,
        },
    });

    useEffect(() => {
        if (form.values.startDate && form.values.endDate) {
            const start = new Date(form.values.startDate);
            const end = new Date(form.values.endDate);

            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                const diffInDays = Math.ceil(
                    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                );
                const weeks = Math.ceil(diffInDays / 7); // Chia số ngày cho 7 để lấy số tuần

                form.setFieldValue('numberWeek', weeks);
            }
        }
    }, [form.values.startDate, form.values.endDate]);



    return (
        <MyActionIconUpdate
            modalSize={'40%'}
            onSubmit={() => { }}
            form={form as unknown as UseFormReturnType<Record<string, any>>}
        >
            <MySelect
                withAsterisk
                data={mockAcademicYear.map((unit) => ({
                    value: unit.id.toString(),
                    label: unit.name,
                }))}
                label="Mã năm học"
                onChange={(value) =>
                    form.setFieldValue('coeUnitId', value ? parseInt(value) : undefined)
                }
                error={form.errors.coeUnitId}
                defaultValue={mockAcademicYear[0].id.toString()}
            />
            <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
            >
                <MyTextInput
                    disabled
                    label="Mã học kỳ"
                    withAsterisk
                    {...form.getInputProps('code')}
                    error={form.errors.code}
                />
                <MyTextInput
                    label="Tên học kỳ"
                    withAsterisk
                    {...form.getInputProps('name')}
                    error={form.errors.name}
                />
                <Group>
                    <MyDateInput
                        withAsterisk
                        label="Ngày bắt đầu"
                        {...form.getInputProps('startDate')}
                        onChange={(value) => {
                            if (value) {
                                form.setFieldValue('startDate', new Date(value));
                            }
                        }}
                        rightSection={<IconCalendar></IconCalendar>}
                        flex={1}
                    />
                </Group>
                <Group>
                    <MyDateInput
                        withAsterisk
                        label="Ngày kết thúc"
                        placeholder="DD/MM/YYYY"
                        {...form.getInputProps('endDate')}
                        onChange={(value) => {
                            if (value) {
                                form.setFieldValue('endDate', new Date(value));
                            }
                        }}
                        rightSection={<IconCalendar></IconCalendar>}
                        flex={1}
                    />
                </Group>
            </div>


            <Textarea
                label="Ghi chú"
                {...form.getInputProps('note')}
                onChange={(event) => form.setFieldValue('note', event.target.value)}
            />
            <MyCheckbox
                label="Hiện hành"
                {...form.getInputProps('isCurrent', { type: 'checkbox' })}
            />
        </MyActionIconUpdate>
    );
}

const mockAcademicYear: any[] = [{ id: 1, name: '2024' }];
