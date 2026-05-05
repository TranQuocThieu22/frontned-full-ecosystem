import MyKeyLabel from "@/components/DataDisplay/KeyLabel/MyKeyLabel";
import { Center, Group, Image, List, Paper, Text, Title } from "@mantine/core";

export default function FReadThongTinKhoaThi() {
    return (
        <Paper p={'xl'} radius={'xl'}>
            <Title>I. Thông tin khóa thi</Title>
            <Center >
                <Group gap={'2vw'}>
                    <List>
                        <List.Item c={'red'} ><Group gap={5}><Text fw={'bold'}>Mã đăng ký học (mã chuyển tiền):</Text> <Text>LNH1224NJ01</Text></Group></List.Item>
                        <List.Item><MyKeyLabel keyLabel="Tên lớp" label="IELTS SƠ CẤP 2 1246" /></List.Item>
                        <List.Item><MyKeyLabel keyLabel="Tiết học" label="30" /></List.Item>
                        <List.Item><MyKeyLabel keyLabel="Ngày khai giảng" label="16/12/2024" /></List.Item>
                        <List.Item><MyKeyLabel keyLabel="Học phí" label="5,100,000" /></List.Item>
                        <List.Item><MyKeyLabel keyLabel="Hình thức học " label="Trực tiếp" /></List.Item>
                        <List.Item><MyKeyLabel keyLabel="Cơ sở học" label="Sài Gòn Campus" /></List.Item>
                    </List>
                    <Image
                        alt="none"
                        radius="md"
                        src="https://api.hutech.edu.vn/file-publish/dang-ky-thnnkn/khoa-hoc.jpg?v=634"
                    />
                </Group>
            </Center>

        </Paper>
    )
}
