'use client'

import { ENUM_GENDER } from "@/constants/enum/global";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { FileInput, Grid, Group, Text, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendarWeek, IconUpload } from "@tabler/icons-react";

interface I {
    code?: string;
    fullName?: string;
    gender?: keyof typeof ENUM_GENDER;
    dateOfBirth?: string;
    phoneNumber?: string;
    email?: string;
    exam?: {
        code?: string;
        name?: string;
        officialExamDate?: string;
    };
    branch?: string;
    status?: string;
    decisionDate?: Date;
    decisionName?: string;
    note?: string;
    modifiedWhen?: string;
    modifiedFullName?: string;
}

export default function CancelExamParticipationReserve() {
    const form = useForm<I>({
        initialValues: {
            code: "HV0001",
            fullName: "Tô Ngọc Bảo",
            gender: "Nam",
            dateOfBirth: "2000-01-01",
            phoneNumber: "0123456789",
            email: "nguyenvana@example.com",
            exam: {
                code: "EX001",
                name: "LTW24-Lập trình web 2024-Khóa 1",
                officialExamDate: "2024-06-01"
            },
            branch: "Cơ sở 1",
            status: "Đã rút",
            decisionDate: undefined,
            decisionName: "",
            note: "",
            modifiedWhen: "2024-06-11T10:00:00Z",
            modifiedFullName: "Admin"
        }
    })

    return (
        <CustomButtonCreateUpdate
            isUpdate={false}
            form={form}
            onSubmit={() => { }}
            modalProps={{ size: "xl", title: "Chi tiết hoãn thi" }}
            buttonProps={{ color: "red", children: "Hoãn thi" }}
        >
            <Grid gutter="xs">
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Text fw={500}>
                        Mã học viên: <Text span>{form.values.code}</Text>
                    </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Text fw={500}>
                        Họ tên: <Text span>{form.values.fullName}</Text>
                    </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Text fw={500}>
                        Ngày sinh: <Text span>{form.values.dateOfBirth}</Text>
                    </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Text fw={500}>
                        Giới tính: <Text span>{form.values.gender}</Text>
                    </Text>
                </Grid.Col>
            </Grid>
            <Group>
                <Text fw={500}>Khóa thi:</Text>
                <Text>{form.values.exam?.name}</Text>
            </Group>
            <DateInput
                rightSection={<IconCalendarWeek />}
                label="Ngày quyết định"
                {...form.getInputProps("decisionDate")}
            />
            <TextInput label="Tên quyết định" {...form.getInputProps("decisionName")} />
            <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            <FileInput leftSection={<IconUpload />} label="Minh chứng" />
        </CustomButtonCreateUpdate>
    )
}
