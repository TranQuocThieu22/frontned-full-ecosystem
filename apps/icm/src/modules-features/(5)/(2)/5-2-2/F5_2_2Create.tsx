'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"; // Giả định bạn có một FileInput custom
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { MyFlexColumn, MyFlexRow, MyTextArea } from "aq-fe-framework/components";
import { sampleData } from "./F5_2_2Read";
import { IF5_2_2 } from "./interface/F5_2_2ViewModel";

export default function F5_2_2Create() {
    const form = useForm<IF5_2_2>({
        initialValues: {
            id: 0,
            proposalCode: "",
            projectName: "",
            proposalFile: "",
            field: "",
            objectives: "",
            expectedTotalBudget: "",
            requirementsResults: "",
            application: "",
            durationMonths: 0,
            registeredStaffCode: "",
            registeredStaffName: "",
            registeredUnit: "",
            projectStatus: "",
        },
        validate: {
            proposalCode: (value) => (value.trim().length > 0 ? null : 'Mã đề xuất không được để trống'),
            projectName: (value) => (value.trim().length > 0 ? null : 'Tên đề tài không được để trống'),
            field: (value) => (value.trim().length > 0 ? null : 'Lĩnh vực không được để trống'),
            objectives: (value) => (value.trim().length > 0 ? null : 'Mục tiêu không được để trống'),
            expectedTotalBudget: (value) => (value.trim().length > 0 ? null : 'Tổng kinh phí dự kiến không được để trống'),
            requirementsResults: (value) => (value.trim().length > 0 ? null : 'Yêu cầu đối với kết quả không được để trống'),
            application: (value) => (value.trim().length > 0 ? null : 'Dự kiến phương án ứng dụng không được để trống'),
            durationMonths: (value) => (value <= 0 ? 'Thời gian thực hiện phải là số dương' : null),
            registeredStaffCode: (value) => (value.trim().length > 0 ? null : 'Mã viên chức đăng ký không được để trống'),
            registeredStaffName: (value) => (value.trim().length > 0 ? null : 'Tên viên chức đăng ký không được để trống'),
            registeredUnit: (value) => (value.trim().length > 0 ? null : 'Đơn vị đăng ký không được để trống'),
        },
    });
    const selectData = sampleData.map(item => ({
        value: item.registeredStaffCode,
        label: `${item.registeredStaffCode} - ${item.registeredStaffName}`,
    }));

    const fieldData = sampleData.map(item => ({
        value: item.field,
        label: item.field,
    }));
    return (
        <MyButtonCreate form={form} onSubmit={() => { }} modalSize={"80%"}>
            <MyFlexRow>
                <MyTextInput flex={1} label="Tên đề tài" {...form.getInputProps("projectName")} />

                <MyTextInput flex={1} label="Tổng kinh phí dự kiến" {...form.getInputProps("expectedTotalBudget")} />
            </MyFlexRow>
            <MyFlexRow>
                <MyTextArea flex={1.5} label="Mục tiêu" {...form.getInputProps("objectives")} />
                <MyFlexColumn gap={"sx"} flex={1.5}>
                    <MyTextInput label="Thời gian thực hiện (tháng)" {...form.getInputProps("durationMonths")} />
                    <MySelect data={fieldData} label="Lĩnh vực" {...form.getInputProps("field")} />
                </MyFlexColumn>
            </MyFlexRow>
            <MyFlexRow>
                <MyTextArea minRows={6.5} flex={1} label="Dự kiến phương án ứng dụng" {...form.getInputProps("application")} />
                <MyFlexColumn gap={"sx"} flex={1}>
                    <MySelect label="Viên chức đăng ký" data={selectData} {...form.getInputProps("registeredStaffCode")} />
                    <MyTextInput label="Đơn vị đăng ký" {...form.getInputProps("registeredUnit")} />
                    <MyFileInput label="File phiếu đề xuất" {...form.getInputProps("proposalFile")} />
                </MyFlexColumn>
            </MyFlexRow>
            <MyTextArea flex={1} label="Yêu cầu đối với kết quả" {...form.getInputProps("requirementsResults")} />

        </MyButtonCreate>
    );
}
