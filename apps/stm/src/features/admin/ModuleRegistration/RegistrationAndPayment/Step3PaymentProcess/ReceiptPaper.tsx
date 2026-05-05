import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Box, Divider, Text } from "@mantine/core";
import { utils_currency_formatWithSuffix, utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";

interface ReceiptPaperProps {
    centerName?: string
    centerAddress?: string
    websiteMail?: string
    denominator?: string,
    symbol?: string
    fullName?: string
    userAddress?: string
    totalPrice?: number
    dateOfSigning?: string
    reason?: string,
    paymentMethod?: string
    signature?: string
}

export default function ReceiptPaper({
    centerName = "TRUNG TÂM ANH NGỮ ĐH SƯ PHẠM",
    centerAddress = "Địa chỉ: 29 Lê Quý Đôn, Quận 3, Thành Phố Hồ Chí Minh",
    websiteMail = "www.anhngusuphap.com",
    denominator = "01 - 05/BLP",
    symbol = "AA/2012P",
    fullName = "Tô Ngọc Nhi",
    dateOfSigning,
    userAddress,
    totalPrice = 1240000,
    reason = "ToNgocNhi-LTW2401-KTLTB",
    paymentMethod = "Tiền mặt",
    signature
}: ReceiptPaperProps) {
    const dateOfSigningFormatState = useState('')

    useEffect(() => {
        const splitDate = utils_date_dateToDDMMYYYString(new Date(dateOfSigning!)).split("/")
        dateOfSigningFormatState[1](`Ngày ${splitDate[0]!} tháng ${splitDate[1]} năm ${splitDate[2]}`)
    }, [])
    return (
        <Box p="lg" w={800} mx="auto" style={{ border: "1px dashed gray" }}>
            <MyFlexRow justify={"space-between"}>
                <Box>
                    <Text fw={700} size="lg">
                        {centerName}
                    </Text>
                    <Text >{centerAddress}</Text>
                    <Text >Website: {websiteMail}</Text>
                </Box>

                <Box>
                    <Text >
                        Mẫu số: {denominator}
                    </Text>
                    <Text >
                        Ký hiệu: {symbol}
                    </Text>
                </Box>
            </MyFlexRow>

            <Divider my="sm" />

            <Text ta="center" fw={700} size="xl">
                BIÊN LAI THU HỌC PHÍ
            </Text>
            <Text ta="center">Liên 1: Lưu</Text>

            <Box mt="md" pl="sm">
                <Text>
                    <strong>Họ tên người nộp tiền:</strong>{fullName}
                </Text>
                <Text>
                    <strong>Địa chỉ:</strong> {userAddress}
                </Text>
                <Text>
                    <strong>Lý do thu:</strong> {reason}
                </Text>
                <Text>
                    <strong>Số tiền:</strong>{" "}
                    <Text component="span" c="green" fw={700}>
                        {utils_currency_formatWithSuffix(totalPrice, " VNĐ")}
                    </Text>
                </Text>
                <Text>
                    <strong>Hình thức thanh toán:</strong> {paymentMethod}
                </Text>
            </Box>

            <MyFlexEnd>
                <MyFlexColumn p="apart" mt="xl" px="sm">
                    <Text>
                        {dateOfSigningFormatState[0]}
                    </Text>
                    <Text ta="center">
                        <strong>Người thu tiền</strong>
                        <br />
                        {signature}
                        (Ký và ghi rõ họ tên)
                    </Text>
                </MyFlexColumn>
            </MyFlexEnd>

            <Text mt="xl" fz="sm" fs="italic" c="dimmed">
                * Ghi chú: Đề nghị Sinh viên giữ biên lai cẩn thận và xuất trình khi nhà trường yêu cầu.
            </Text>
        </Box>
    );
}
