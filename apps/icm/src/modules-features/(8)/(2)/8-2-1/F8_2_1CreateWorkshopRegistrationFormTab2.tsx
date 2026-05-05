'use client'


import MySelect from "@/components/Combobox/Select/MySelect"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { Button, Modal, Radio } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"

export interface IListOfOrganizingCommittee {
    id?: number //STT
    code?: string //Mã giảng viên
    name?: string //Họ tên
    title?: string //Học hàm - Học vị
    collaborationUnit?: string //Đơn vị cộng tác
    role?: string //Vai trò
}
export default function F8_2_1CreateWorkshopRegistrationFormTab2() {
    const [opened, { open, close }] = useDisclosure(false);
    const query = useQuery<IListOfOrganizingCommittee[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                code: "GV001",
                name: "Nguyễn Văn A",
                title: "PGS.TS",
                collaborationUnit: "Phòng hợp tác quốc tế",
                role: "Trưởng ban",
            },
        ],
    });
    return (
        <>
            <Button onClick={open}>Chuyển tab</Button>
            <Modal
                opened={opened} onClose={close} title="Phiếu đăng ký tổ chức hội thảo (tab 2)">
                <MyFlexColumn>
                    <MyTextInput label="Địa điểm" />
                    <MyTextInput label="Ngôn ngữ sử dụng" />
                    <MySelect label="Hình thức tổ chức" placeholder="Trực tiếp/ Trực tuyến/ Kết hợp" data={[]} />
                    <Radio.Group
                        name="product"
                        label="Sản phẩm:"
                        withAsterisk
                    >
                        <Radio value="ht-td" label="Kỷ yếu HT/TD" />
                        <Radio value="isbn" label="Sách kỷ yếu có chỉ số ISBN" />
                        <Radio value="tap-chi" label="Tạp chí" />
                        <Radio value="none" label="Không" />
                    </Radio.Group>
                    <MyTextInput label="Tổng kinh phí" />
                    <Button>Đăng ký</Button>
                </MyFlexColumn>
            </Modal>

        </>


    )
}