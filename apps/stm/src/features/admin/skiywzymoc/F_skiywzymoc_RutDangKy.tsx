'use client'
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarWeek, IconUpload } from '@tabler/icons-react';

const mockStudent = {
    maHocVien: "HV02589",
    hoTen: "Tô Ngọc Bảo",
    ngaySinh: "2000-01-01",
    gioiTinh: "Nam",
    khoaHoc: "LTW24-Lập trình web 2024-Khóa 1",
    ngayQuyetDinh: null,
    tenQuyetDinh: "",
    ghiChu: "",
    minhChung: null
};

export default function F_skiywzymoc_Rut_dang_ky() {
    const disclosure = useDisclosure(false);

    return (
        <MyButtonModal
            disclosure={disclosure}
            title="Chi tiết rút đăng ký"
            label="Rút đăng ký"
            bg="red"
            modalSize="60%"
        >
            <Stack>
                <SimpleGrid cols={2}>
                    <Text><Text fw={500} span>Mã học viên:  </Text>{mockStudent.maHocVien}</Text>
                    <Text><Text fw={500} span>Họ tên: </Text> {mockStudent.hoTen}</Text>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                    <Text><Text fw={500} span>Ngày sinh: </Text> {mockStudent.ngaySinh}</Text>
                    <Text><Text fw={500} span>Giới tính: </Text> {mockStudent.gioiTinh}</Text>
                </SimpleGrid>
                <Text><Text fw={500} span>Khóa học: </Text> {mockStudent.khoaHoc}</Text>
                <MyDateInput rightSection={<IconCalendarWeek />} label="Ngày quyết định" name="ngayQuyetDinh" defaultValue={mockStudent.ngayQuyetDinh} />
                <MyTextInput label="Tên quyết định" name="tenQuyetDinh" defaultValue={mockStudent.tenQuyetDinh} />
                <MyTextArea label="Ghi chú" name="ghiChu" defaultValue={mockStudent.ghiChu} />
                <MyFileInput leftSection={<IconUpload />} label="Minh chứng" name="minhChung" />
                <Flex justify="flex-end">
                    <MyButton >Lưu</MyButton>
                </Flex>
            </Stack>
        </MyButtonModal>
    );
}