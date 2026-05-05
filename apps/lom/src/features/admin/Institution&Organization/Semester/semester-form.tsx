'use client';

import { Button, Checkbox, Group, Loader, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { DateInput } from "@mantine/dates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SemesterInfoViewModel } from "./semester-table";

export interface SemesterDTO {
    id: number;
    code?: string | null;
    name?: string | null;
    note?: string | null;
    isEnabled?: boolean;
    concurrencyStamp?: string;
    hierarchyId?: number | null;
    facultyId?: number | null;
    academicYearId?: number | null;
    startDate?: Date | null;
    endDate?: Date | null;
    isCurrent?: boolean;
    semester?: number | null;
    totalWeek?: number | null;
    aqModuleId?: number | null;
}

export interface AcademicYearInfoViewModel {
    numberOfSemester?: number | null;
    isCurrent?: boolean | null;
    note?: string | null;
    administrativeYearStart?: Date | null;
    administrativeYearEnd?: Date | null;
    academicYearStart?: Date | null;
    academicYearEnd?: Date | null;
    activityPlans?: any;
    id: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled: boolean;
    modifiedWhen?: Date | null;
    modifiedBy?: number | null;
    modifiedFullName?: string | null;
}

export default function SemesterForm({ semesterData, formHandler }: { semesterData: SemesterInfoViewModel, formHandler: any }) {
    const queryClient = useQueryClient();
    const form = useForm<SemesterDTO>({
        initialValues: {
            ...semesterData,
            code: semesterData.code ?? '',
            name: semesterData.name ?? '',
            note: semesterData.note ?? '',
        },
        validate: {
            code: (value) => (!value ? 'Mã học kỳ không được để trống' : null),
            name: (value) => (!value ? 'Tên học kỳ không được để trống' : null),
            academicYearId: (value) => (value === null ? 'Năm học không được để trống' : null),
            startDate: (value) => {
                if (value === null) return 'Ngày bắt đầu không được để trống';
                return null;
            },
            endDate: (value) => {
                if (value === null) return "Ngày kết thúc không được để trống";
                const startDateOnly = new Date(form.values.startDate!).setHours(0, 0, 0, 0);
                const endDateOnly = new Date(form.values.endDate!).setHours(0, 0, 0, 0);
                if (startDateOnly && (endDateOnly < startDateOnly)) return "Ngày kết thúc không hợp lệ";
                return null;
            },
        }
    });

    const academicYearsQuery = useQuery<SemesterInfoViewModel[]>({
        queryKey: ["academicYears"],
        queryFn: async () => {
            let response = await baseAxios.get(`/AcademicYear/AcademicGetAll`)
            return response.data.data
        },
        select: (data) => data.filter(ay => ay.id !== 0),
        refetchOnWindowFocus: false,
    });

    const semesterCreateOrUpdateMutation = useMutation({
        mutationFn: async (semesterData: SemesterDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/ActivityPlan/Create' : '/ActivityPlan/Update', semesterData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["Semesters"] });
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    useEffect(() => {
        // Automatically calculate number of weeks when startDate or endDate changes
        if (form.values.startDate && form.values.endDate) {
            const start = new Date(form.values.startDate);
            const end = new Date(form.values.endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
            form.setFieldValue('totalWeek', diffWeeks);
        }
    }, [form.values.startDate, form.values.endDate]);

    const handleOnSubmitForm = async () => {
        form.setFieldValue('semester', parseInt(form.getValues().code!));
        semesterCreateOrUpdateMutation.mutate({ ...form.getValues() });
    };

    return (
        <>
            <form onSubmit={form.onSubmit((values) => {
                handleOnSubmitForm();
            })}>
                <Stack gap={12}>
                    <TextInput
                        disabled={form.values.id !== 0}
                        label="Mã học kỳ"
                        placeholder="Nhập mã học kỳ"
                        withAsterisk
                        {...form.getInputProps('code')}
                    />
                    <TextInput
                        label="Tên học kỳ"
                        placeholder="Nhập tên học kỳ"
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <Select
                        clearable
                        searchable
                        withAsterisk
                        nothingFoundMessage="Không tìm thấy năm học"
                        placeholder='Chọn năm học'
                        label='Năm học'
                        data={academicYearsQuery.data?.map(ay => ({ label: ay.name || '', value: ay.id.toString() })) ?? []}
                        disabled={academicYearsQuery.isFetching}
                        rightSection={academicYearsQuery.isFetching ? <Loader size="xs" /> : null}
                        {...form.getInputProps('academicYearId')}
                        value={form.values.academicYearId?.toString() ?? ""}
                        onChange={(value) => form.setFieldValue("academicYearId", value === null ? null : parseInt(value))}
                    />
                    <Group gap={12} grow>
                        <DateInput
                            w={"50%"}
                            label="Ngày bắt đầu"
                            placeholder="Chọn ngày bắt đầu"
                            withAsterisk
                            {...form.getInputProps('startDate')}
                        />
                        <DateInput
                            w={"50%"}
                            label="Ngày kết thúc"
                            placeholder="Chọn ngày kết thúc"
                            withAsterisk
                            {...form.getInputProps('endDate')}
                        />
                    </Group>
                    <Textarea
                        label="Ghi chú"
                        placeholder="Nhập ghi chú"
                        minRows={4}
                        {...form.getInputProps('note')}
                    />
                    <Checkbox
                        defaultChecked={form.values.isCurrent}
                        label="Học kỳ hiện hành"
                        {...form.getInputProps('isCurrent')}
                    />
                </Stack>
                <Button mt={32} w={"100%"} type="submit">Lưu</Button>
            </form>
        </>
    );
}