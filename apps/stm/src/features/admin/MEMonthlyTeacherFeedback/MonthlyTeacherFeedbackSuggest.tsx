import { MyButtonCreate } from "@aq-fe/core-ui/shared/components/button/MyButtonCreate";
import { useForm } from "@mantine/form";
import { MyCheckbox, MyTextArea } from "aq-fe-framework/components";
import { IStudentMonthlyReportViewModel } from "./MonthlyTeacherFeedbackEvaluate";

export default function MonthlyTeacherFeedbackSuggest(values: { values: IStudentMonthlyReportViewModel }) {
    const form = useForm({
        initialValues: {
            teacherFeedbackStatus: values.values.teacherFeedbackStatus,
            teacherFeedback: values.values.teacherFeedback,
        }
    })
    return (
        <MyButtonCreate
            label="Góp ý"
            variant="transparent"
            title="Duyệt nhận xét"
            form={form}
            onSubmit={() => { }}
        >
            <MyCheckbox
                label="Đã góp ý"
                defaultChecked={values.values.teacherFeedbackStatus}
                {...form.getInputProps('teacherFeedbackStatus')}
            />
            <MyTextArea
                label="Nội dung giảng viên góp ý"
                {...form.getInputProps('teacherFeedback')}
                minRows={8}
            />
            <MyCheckbox
                label="Gửi thông báo"
            />
        </MyButtonCreate>
    );
}