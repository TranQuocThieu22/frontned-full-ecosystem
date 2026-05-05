
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { MyActionIconModal, MyFlexColumn, MyFlexRow, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { sampleData } from "./F5_2_2Read";
import { IF5_2_2 } from "./interface/F5_2_2ViewModel";

export function F5_2_2ViewDetailButton({ values }: { values: IF5_2_2 }) {
    const form = useForm<IF5_2_2>({
        initialValues: {
            ...values,
        }
    });
    const dis = useDisclosure();
    const selectData = sampleData.map(item => ({
        value: item.registeredStaffCode,
        label: `${item.registeredStaffCode} - ${item.registeredStaffName}`,
    }));

    const fieldData = sampleData.map(item => ({
        value: item.field,
        label: item.field,
    }));
    return (
        <MyActionIconModal
            icon={<IconEye />}
            modalSize={"60%"}
            title="Chi tiết đề xuất"
            onSubmit={() => { }} disclosure={dis}
        >
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


        </MyActionIconModal >
    )
}