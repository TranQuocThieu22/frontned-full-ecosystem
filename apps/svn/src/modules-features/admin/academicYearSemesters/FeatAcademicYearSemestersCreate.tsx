'use client';

import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';

import { IconCalendar } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import {
    MyButtonCreate,
    MyCheckbox,
    MyDateInput,
    MySelect,
    MyTextInput,
} from 'aq-fe-framework/components';
import { useEffect } from 'react';

export interface I_cw38zkpvg4_Create {
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

export default function FeatAcademicYearSemestersCreate() {
    const queryClient = useQueryClient();



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

    const form = useForm<I_cw38zkpvg4_Create>({
        initialValues: {
            code: '',
            name: '',
            note: '',
            // coeSchoolYearId: data?.semesters[0]?.coeSchoolYearId,
            numberWeek: 0,
            isCurrent: false,
            startDate: new Date(),
            endDate: new Date(2025, 11, 31),
        },
        validate: {
            code: (value) => {
                if (!value) {
                    return 'Mã không được để trống';
                }


            },
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
        <MyButtonCreate
            label="Thêm"
            modalSize={'40%'}
            title="Chi tiết Danh mục Học kì"
            onSubmit={() => { }}
            form={form}
        >
            <MySelect
                withAsterisk
                data={mockAcademicYear.map((unit) => ({
                    value: unit.id.toString(),
                    label: unit.name,
                }))}
                label="Mã năm học"

                error={form.errors.coeUnitId}
                defaultValue={mockAcademicYear[0].id.toString()}
            />
            <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
            >
                <MyTextInput

                    label="Mã học kì"
                    withAsterisk
                    {...form.getInputProps('code')}
                    error={form.errors.code}
                    maxLength={5}
                />
                <MyTextInput
                    label="Tên học kì"
                    withAsterisk
                    {...form.getInputProps('name')}
                    error={form.errors.name}
                />
                {/* <Select w={"100%"} label="Khoa quản lý:" data={["Ngoại ngữ"]} defaultValue="Ngoại ngữ" /> */}

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
                            console.log('====================================');
                            console.log(value);
                            console.log('====================================');
                            if (value) {
                                form.setFieldValue('endDate', new Date(value));
                            }
                        }}
                        rightSection={<IconCalendar></IconCalendar>}
                        flex={1}
                    />
                </Group>

            </div>

            <Textarea label="Ghi chú:" {...form.getInputProps('note')} />
            <MyCheckbox
                label="Hiện hành"
                {...form.getInputProps('isCurrent', { type: 'checkbox' })}
            />
        </MyButtonCreate>
    );
}

const mockAcademicYear: any[] = [{ id: 1, name: '2024' }];
