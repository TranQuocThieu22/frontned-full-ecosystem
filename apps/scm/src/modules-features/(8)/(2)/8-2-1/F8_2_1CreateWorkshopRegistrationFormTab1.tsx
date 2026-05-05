'use client'

import { useForm } from "@mantine/form"

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MySelect from "@/components/Combobox/Select/MySelect"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import F8_2_1CreateWorkshopRegistrationFormTab2 from "./F8_2_1CreateWorkshopRegistrationFormTab2"
import { IWorkshopRegistrationForm } from "./F8_2_1ReadWorkshopRegistrationForm"

export default function F8_2_1CreateWorkshopRegistrationFormTab1() {
    const form = useForm<IWorkshopRegistrationForm>({
        initialValues: {
            id: 0,
            workshopName: "",
            hostUnit: "",
            organizingUnit: "",
            coordinatingUnit: "",
            numberOfDelegates: 0,
            content: "",
            time: "",
        }
    })
    return (
        <MyButtonCreate objectName="Phiếu đăng ký tổ chức hội thảo (tab 1)" onSubmit={() => { }} modalSize={"100%"} form={form}  >
            <MyTextInput label="Tên hội thảo (VN)" />
            <MyTextInput label="Tên hội thảo" />
            <MyTextInput label="Nội dung" />
            <MyTextInput label="Thời gian dự kiến" />
            <MyTextInput label="Số lượng đại biểu" />
            <MySelect label="Nội dung" placeholder="Đơn vị chủ trì" data={[]} />
            <MyTextInput label="Đơn vị chủ trì" />
            <MyTextInput label="Số lượng tổc chức" />
            <MyTextInput label="Đơn vị phối hợp" />
            <MyTextArea label="Thành phần tham dự" />
            <MyFileInput label="Đính kèm phiếu đăng ký tổ chức hội thảo" />
            <MyFileInput label="Đính kèm kế hoạch và kinh phí dự đoán" />
            <F8_2_1CreateWorkshopRegistrationFormTab2 />
        </MyButtonCreate>
    )
}