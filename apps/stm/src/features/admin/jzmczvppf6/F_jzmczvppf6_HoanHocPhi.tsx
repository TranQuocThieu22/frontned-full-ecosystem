'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCreditCardRefund, IconPrinter } from "@tabler/icons-react";
import { MyButton, MyFlexRow, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { IStudentInfo } from "./F_jzmczvppf6_ThanhToan";


export default function F_jzmczvppf6_HoanHocPhi({ values }: { values: IStudentInfo }) {
    const disc = useDisclosure()


    return (
        <MyButtonModal
            disclosure={disc}
            label="Hoàn học phí"
            title="Chi tiết hoàn tiền"
            modalSize="100%"
            leftSection={<IconCreditCardRefund/>}
        >
            <MyFlexRow gap={"xl"}>
                <Text fw={500}>Mã học viên: <Text span>{values.maHocVien}</Text></Text>
                <Text fw={500}>Họ tên: <Text span>{values.hoTen}</Text></Text>
            </MyFlexRow>
            <MyFlexRow gap={"xl"}>
                <Text fw={500}>Ngày sinh: <Text span>{utils_date_dateToDDMMYYYString(new Date(values.ngaySinh))}</Text></Text>
                <Text fw={500}>Giới tính: <Text span>{values.gioiTinh}</Text></Text>
            </MyFlexRow>
            <MyFlexRow gap={"xl"}>
                <Text fw={500}>Phải thu: <Text c="green" fw={500} span>{values.phaiThu.toLocaleString("vi-VN")}</Text></Text>
                <Text fw={500}>Đã thu: <Text c="green" fw={500} span>{values.daThu.toLocaleString("vi-VN")}</Text></Text>
                <Text fw={500}>Miễn giảm: <Text c="red" fw={500} span>{values.mienGiam.toLocaleString("vi-VN")}</Text></Text>
                <Text fw={500}>Còn nợ: <Text c="red" fw={500} span>-{values.conNo.toLocaleString("vi-VN")}</Text></Text>
                <Text fw={500}>Chờ phân bổ: <Text c="green" fw={500} span>{values.choPhanBo.toLocaleString("vi-VN")}</Text></Text>
            </MyFlexRow>
            <MyNumberInput label="Số tiền thu" hideControls />
            <MyTextInput label="Nội dung hoàn" />
            <MyFlexRow justify="flex-end">
                <MyButton crudType="save" bg="green">Lưu</MyButton>
                <MyButton crudType="save" leftSection={<IconPrinter />} bg="green">Lưu và In hoàn</MyButton>
            </MyFlexRow>
        </MyButtonModal>
    )
}
