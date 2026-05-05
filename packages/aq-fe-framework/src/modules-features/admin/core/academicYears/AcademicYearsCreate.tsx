'use client';
import { academicYearService } from "@/APIs/academicYearService";
import { MyTextArea } from "@/components";
import { MyButtonCreate } from "@/components/Button/ButtonCRUD/MyButtonCreate";
import { MyTextInput } from "@/core";
import { IAcademicYear } from "@/interfaces/IAcademicYear";
import { Checkbox, Grid, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function AcademicYearsCreate() {
    const currentYear = new Date().getFullYear();
    const queryClient = useQueryClient()
    // Helpers
    const toUTCDatePreserveDay = (year: number, month: number, day: number) =>
        new Date(Date.UTC(year, month, day));

    const toUTCISOStringPreserveDay = (date: Date) =>
        new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        )).toISOString();

    const form = useForm<IAcademicYear>({
        mode: "controlled",
        initialValues: {
            code: currentYear.toString(),
            name: "",
            academicYearStart: toUTCDatePreserveDay(currentYear, 7, 1),        // Aug 1 UTC
            academicYearEnd: toUTCDatePreserveDay(currentYear + 1, 4, 31),     // May 31 next year UTC
            administrativeYearStart: toUTCDatePreserveDay(currentYear, 0, 1),  // Jan 1 UTC
            administrativeYearEnd: toUTCDatePreserveDay(currentYear, 11, 31),  // Dec 31 UTC
            isEnabled: true,
            isCurrent: false,
            note: "",
        },
        validate: {
            name: (value) =>
                value?.trim().length === 0 ? "Tên năm học không được để trống" : undefined,

            code: (value) => {
                if (!value) return "Mã năm học không được để trống";
                if (isNaN(Number(value))) return "Mã năm học phải là số";
                if (Number(value) < 1900 || Number(value) > 2100)
                    return "Năm học phải trong khoảng 1900-2100";
                return undefined;
            },

            academicYearStart: (value, values) => {
                if (!value) return "Ngày bắt đầu năm học không được để trống";
                if (
                    value < values.administrativeYearStart! ||
                    value > values.administrativeYearEnd!
                ) {
                    return "Ngày bắt đầu NH phải nằm trong năm hành chính";
                }
                return undefined;
            },

            academicYearEnd: (value, values) => {
                if (!value) return "Ngày kết thúc năm học không được để trống";
                if (value <= values.academicYearStart!) {
                    return "Ngày kết thúc NH phải lớn hơn ngày bắt đầu NH";
                }
                return undefined;
            },
        },
    });

    // Auto-update administrative year dates when code changes
    useEffect(() => {
        const year = parseInt(String(form.values.code), 10);
        if (!isNaN(year)) {
            form.setFieldValue("administrativeYearStart", toUTCDatePreserveDay(year, 0, 1));
            form.setFieldValue("administrativeYearEnd", toUTCDatePreserveDay(year, 11, 31));

            // Reset defaults if academic year dates are empty
            if (!form.values.academicYearStart) {
                form.setFieldValue("academicYearStart", toUTCDatePreserveDay(year, 7, 1));
            }
            if (!form.values.academicYearEnd) {
                form.setFieldValue("academicYearEnd", toUTCDatePreserveDay(year + 1, 4, 31));
            }
        }
    }, [form.values.code]);

    return (
        <MyButtonCreate
            label="Thêm"
            modalSize={"60%"}
            form={form}
            title="Chi tiết năm học"
            onSubmit={(value: IAcademicYear) => {
                const payload: any = {
                    ...value,
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
                };
                console.log("Create payload:", payload);
                academicYearService.create(payload);
                queryClient.invalidateQueries()

            }}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }} py={0}>
                    <Group pb={10}>
                        <MyTextInput
                            withAsterisk
                            label="Mã Năm học"
                            flex={1}
                            {...form.getInputProps("code")}
                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput
                            withAsterisk
                            label="Ngày bắt đầu năm học"
                            flex={1}
                            rightSection={<IconCalendar />}
                            {...form.getInputProps("academicYearStart")}
                            minDate={form.values.administrativeYearStart}
                            maxDate={form.values.administrativeYearEnd}
                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput
                            label="Ngày bắt đầu hành chính"
                            flex={1}
                            value={form.values.administrativeYearStart}
                            onChange={(value) => {
                                form.setFieldValue('administrativeYearStart', new Date(value || ''))
                            }}
                            clearable={false}

                        />
                    </Group>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }} py={0}>
                    <Group pb={10}>
                        <MyTextInput
                            withAsterisk
                            label="Tên năm học"
                            flex={1}
                            {...form.getInputProps("name")}
                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput
                            withAsterisk
                            label="Ngày kết thúc năm học"
                            flex={1}
                            rightSection={<IconCalendar />}
                            {...form.getInputProps("academicYearEnd")}
                            minDate={form.values.academicYearStart}
                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput
                            label="Ngày kết thúc hành chính"
                            flex={1}
                            value={form.values.administrativeYearEnd}
                            onChange={(value) => {
                                form.setFieldValue('administrativeYearEnd', new Date(value || ''))
                            }}
                            clearable={false}
                        />
                    </Group>
                </Grid.Col>

                <Grid.Col span={12} py={0}>
                    <Group pb={10}>
                        <MyTextArea label="Ghi chú" flex={1} {...form.getInputProps("note")} />
                    </Group>
                </Grid.Col>

                <Grid.Col span={12} py={0}>
                    <Group pb={10}>
                        <Checkbox
                            label="Hiện hành"
                            {...form.getInputProps("isCurrent", { type: "checkbox" })}
                        />
                    </Group>
                </Grid.Col>
            </Grid>
        </MyButtonCreate>
    );
}
