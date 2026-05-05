'use client'
import { MyButtonCreate } from "@aq-fe/core-ui/shared/components/button/MyButtonCreate";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyCheckbox, MyDateInput, MyNumberInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MySelect } from "aq-fe-framework/core";
import { PotentialStudent } from "./ListPotentialCustomerTable";


export default function PotentialCustomerCreateButton() {

    const form = useForm<PotentialStudent>({
        mode: "uncontrolled",
        initialValues: {
            id: 0,
            code: "",
            fullName: "",
            dateOfBirth: "",
            gender: "",
            phone: "",
            email: "",
            address: "",
            source: "",
            status: "",
            interestedProgram: "",
            note: "",
            assignedStaff: "",
            createdDate: "",
            lastUpdatedDate: "",
            isEnrolled: false
        }
    })

    return (
        <MyButtonCreate
            title="Chi tiết khách hàng tiềm năng"
            form={form}
            modalSize="70%"
            onSubmit={() => { }}
        >
            <SimpleGrid cols={2}>
                <Stack>
                    <MyTextInput
                        label="Mã KH"
                        {...form.getInputProps("code")}
                    />
                    <MyTextInput
                        label="Họ và tên"
                        {...form.getInputProps("fullName")}
                    />
                    <MyNumberInput
                        label="Số điện thoại"
                        {...form.getInputProps("phone")}
                    />
                    <MyTextInput
                        label="Địa chỉ"
                        {...form.getInputProps("address")}
                    />
                    <MySelect
                        label="Nguồn"
                        data={["Facebook Ads", "Giới thiệu từ học viên cũ", "Website", "Sự kiện trường học"]}
                        {...form.getInputProps("source")}
                    />
                    <MySelect
                        label="Trạng thái"
                        data={["Mới", "Đã liên hệ", "Đã hẹn test", "Đang học thử", "Đã ghi danh", "Không tiềm năng"]}
                        {...form.getInputProps("status")}
                    />
                    <MySelect
                        label="Chương trình quan tâm"
                        data={["Toán Khối 7", "Tiếng Anh Tổng Quát", "Rèn chữ", "Luyện thi IELTS"]}
                        {...form.getInputProps("interestedProgram")}
                    />
                </Stack>

                <Stack>
                    <MyDateInput
                        label="Ngày sinh"
                        {...form.getInputProps("dateOfBirth")}
                    />
                    <MySelect
                        label="Giới tính"
                        data={["Nam", "Nữ"]}
                        {...form.getInputProps("gender")}
                    />
                    <MyTextInput
                        label="Email"
                        {...form.getInputProps("email")}
                    />
                    <MySelect
                        label="Người phụ trách"
                        data={["Trần Văn Hùng", "Nguyễn Thị Lan"]}
                        {...form.getInputProps("assignedStaff")}
                    />
                    <MyCheckbox label="Đã ghi danh" {...form.getInputProps("isEnrolled")} />
                    <MyTextArea
                        label="Ghi chú"
                        {...form.getInputProps("note")}
                    />
                </Stack>
            </SimpleGrid>
        </MyButtonCreate>
    )
}