import { Paper, SimpleGrid } from "@mantine/core"

interface I4_1_1UserInfo {
    ma: string,
    hoTen: string,
    hocHam: string,
    hocVi: string,
    donViCongTac: string
}

export default function F4_1_1ReadUserInfo() {
    return (
        <SimpleGrid>
            <Paper p={'md'}>Mã giảng viên: {userInfo.ma}</Paper>
            <Paper p={'md'}>Họ tên giảng viên: {userInfo.hoTen}</Paper>
            <Paper p={'md'}>Học hàm/ học vị: {userInfo.hocHam}/{userInfo.hocVi}</Paper>
            <Paper p={'md'}>Đơn vị công tác: {userInfo.donViCongTac}</Paper>
        </SimpleGrid>
    )
}

const userInfo: I4_1_1UserInfo = {
    ma: "gv001",
    hoTen: "Trần Quốc Thiệu",
    hocHam: "Giáo sư",
    hocVi: "Tiến sĩ",
    donViCongTac: "Bình Thuận"
} 