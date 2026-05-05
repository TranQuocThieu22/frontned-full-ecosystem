'use client'
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Center, Group, Paper, SimpleGrid, Tabs, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function FReadThongTinHocVienKhoaThi() {
    const router = useRouter()
    return (
        <Paper p={'xl'} radius={'xl'}>
            <MyFlexColumn>
                <Title>II. Thông tin học viên</Title>
                <Tabs defaultValue="sinh-vien-cua-truong">
                    <Tabs.List>
                        <Tabs.Tab value="sinh-vien-cua-truong" >
                            Sinh viên của trường
                        </Tabs.Tab>
                        <Tabs.Tab value="hoc-vien-tu-do" >
                            Học viên tự do
                        </Tabs.Tab>

                    </Tabs.List>

                    <Tabs.Panel value="sinh-vien-cua-truong" pt={'md'}>
                        <SimpleGrid cols={2}>
                            <MyTextInput label="MSSV" />
                            <MyTextInput label="Họ tên" />
                            <MyDateInput label="Ngày sinh" />
                            <MyTextInput label="Số điện thoại" />
                            <MyTextInput label="Email" />
                        </SimpleGrid>
                        <MyFileInput mt={'md'} label="Tải hồ sơ" description="Chọn file định dạng JPG, PNG, PDF" placeholder="Biên lai chuyển khoản học phí" />
                        <Center mt={'md'}>
                            <Group>
                                <Button size="md" radius={'md'} onClick={() => notifications.show({ message: "Đăng ký thành công" })}>Đăng ký</Button>
                                <Button size="md" variant="outline" radius={'md'} onClick={() => router.back()}>Quay lại</Button>
                            </Group>
                        </Center>
                    </Tabs.Panel>

                    <Tabs.Panel value="hoc-vien-tu-do" pt={'md'}>
                        <SimpleGrid cols={2}>
                            <MyTextInput label="MSSV" disabled value={'207pm65483'} />
                            <MyTextInput label="Họ tên" />
                            <MyDateInput label="Ngày sinh" />
                            <MyTextInput label="Số điện thoại" />
                            <MyTextInput label="Email" />
                        </SimpleGrid>
                        <MyFileInput mt={'md'} label="Tải hồ sơ" description="Chọn file định dạng JPG, PNG, PDF" placeholder="Biên lai chuyển khoản học phí" />
                        <Center mt={'md'}>
                            <Group>
                                <Button size="md" radius={'md'} onClick={() => notifications.show({ message: "Đăng ký thành công" })}>Đăng ký</Button>
                                <Button size="md" variant="outline" radius={'md'} onClick={() => router.back()}>Quay lại</Button>
                            </Group>
                        </Center>
                    </Tabs.Panel>
                </Tabs>
            </MyFlexColumn>

        </Paper>
    )
}
