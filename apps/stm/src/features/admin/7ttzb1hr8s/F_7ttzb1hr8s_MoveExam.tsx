'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Box, Flex, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarWeek, IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";

interface I_7ttzb1hr8s_MoveExam {
    maHocVien: string;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: string;
    khoaThi: string;
    ngayQuyetDinh: Date | null;
    tenQuyetDinh: string;
    khoaThiChuyenDen: string;
    ghiChu: string;
    minhChung: File | null;
}

export default function F_7ttzb1hr8s_MoveExam() {
    const disclosure = useDisclosure();

    // Query for student information
    const examQuery = useQuery({
        queryKey: ['F7ttzb1hr8s_exam_CreateQuery'],
        queryFn: async () => ({
            maHocVien: "HV02589",
            hoTen: "Tô Ngọc Báo",
            ngaySinh: "05/03/2000",
            gioiTinh: "Nam",
            khoaThi: "LTW - Lập trình web 2024 - khóa 1",
            ngayQuyetDinh: null,
            tenQuyetDinh: "",
            khoaThiChuyenDen: "",
            ghiChu: "",
            minhChung: null
        } as I_7ttzb1hr8s_MoveExam)
    });

    const form = useForm<I_7ttzb1hr8s_MoveExam>({
        initialValues: {
            maHocVien: "",
            hoTen: "",
            ngaySinh: "",
            gioiTinh: "",
            khoaThi: "",
            ngayQuyetDinh: null,
            tenQuyetDinh: "",
            khoaThiChuyenDen: "",
            ghiChu: "",
            minhChung: null
        },
    });

    if (examQuery.isLoading) return "Đang tải...";
    if (examQuery.isError) return "Có lỗi xảy ra!";
    if (!examQuery.data) return "Không có dữ liệu!";

    const dataSelect = ['LTW - Khóa thi lập trình web 2024 - khóa 2', 'LTW - Khóa thi lập trình web 2024 - khóa 1']

    return (
        <>
            <MyButtonCreate
                disclosure={disclosure}
                form={form}
                crudType='create'
                title={"Chi tiết chuyển khóa"}
                label="Chuyển khóa thi"
                onSubmit={() => { }}
                modalSize={'xl'}
                leftSection={undefined}
            >
                <Flex gap={200}>
                    <Box>
                        <Group>
                            <Text fw={500} size='sm'>Mã học viên:</Text>
                            <Text> {examQuery.data.maHocVien}</Text>
                        </Group>
                        <Group mt={10}>
                            <Text fw={500} size='sm'>Ngày sinh:</Text>
                            <Text> {examQuery.data.ngaySinh}</Text>
                        </Group>
                    </Box>
                    <Box>
                        <Group>
                            <Text fw={500} size='sm'>Họ tên:</Text>
                            <Text> {examQuery.data.hoTen}</Text>
                        </Group>
                        <Group mt={10}>
                            <Text fw={500} size='sm'>Giới tính:</Text>
                            <Text> {examQuery.data.gioiTinh}</Text>
                        </Group>
                    </Box>
                </Flex>
                <Group>
                    <Text fw={500} size='sm'>Khóa thi:</Text>
                    <Text> {examQuery.data.khoaThi}</Text>
                </Group>
                <MyDateInput
                    rightSection={<IconCalendarWeek />}
                    label="Ngày quyết định"
                />
                <MyTextInput
                    label="Tên quyết định"
                />
                <MySelect
                    data={dataSelect}
                    defaultValue={dataSelect[0]}
                    label="Chuyển đến khóa"
                />
                <MyTextArea
                    label="Ghi chú"
                />
                <MyFileInput
                    leftSection={<IconUpload />}
                    label="Minh chứng"
                />
            </MyButtonCreate>
        </>
    );
}