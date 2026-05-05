import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { I_ProjectPlanDetailTable } from "./ProjectPlanDetailTable";

export default function ProjectPlanDetailUpdate({ values }: { values: I_ProjectPlanDetailTable }) {
    const form = useForm({
        initialValues: values
    })
    return (
        <MyActionIconUpdate modalSize={"50%"} title="Chi tiết giai đoạn" form={form} onSubmit={() => { }}>

            <MyTextInput label="Dự án" readOnly  variant="unstyled" value={values.code + ", " + values.name} />

            <MyTextInput label="Mã giai đoạn" {...form.getInputProps("code")} />

            <MyTextInput label="Tên giai đoạn" {...form.getInputProps("name")} />

            <MySelect data={["Tô Ngọc Lan"]} label="Phụ trách" {...form.getInputProps("manager")} />

            <MyDateInput label="Thời gian bắt đầu" {...form.getInputProps("startDate")} />

            <MyDateInput label="Thời gian kết thúc" {...form.getInputProps("endDate")} />


        </MyActionIconUpdate>
    )
}