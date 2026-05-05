'use client'

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { ENUM_GENDER } from "@/constants/enum/global";
import { Grid, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarWeek, IconUpload } from "@tabler/icons-react";
import { MyDateInput, MyFileInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";

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
    decisionDate?: string;
    decisionName?: string;
    note?: string;
    modifiedWhen?: string;
    modifiedFullName?: string;
}

export default function F_d1o6p6letg_Reserve() {
    const disclosure = useDisclosure();

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
            decisionDate: "2024-06-10",
            decisionName: "Quyết định rút",
            note: "Ghi chú mẫu",
            modifiedWhen: "2024-06-11T10:00:00Z",
            modifiedFullName: "Admin"
        }
    })

    return (
        <>
            <MyButtonCreate
                label="Hoãn thi"
                disclosure={disclosure}
                form={form}
                crudType='create'
                title={"Chi tiết hoãn thi"}
                onSubmit={() => { }}
                modalSize={'xl'}
                leftSection={undefined}
                bg="red"
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
                    <Text> {form.values.exam?.name}</Text>
                </Group>
                <MyDateInput
                    rightSection={<IconCalendarWeek />}
                    label="Ngày quyết định"
                />
                <MyTextInput
                    label="Tên quyết định"
                />
                <MyTextArea
                    label="Ghi chú"
                />
                <MyFileInput
                    leftSection={<IconUpload />}
                    label="Minh chứng"
                />
            </MyButtonCreate >
        </>
    )
}