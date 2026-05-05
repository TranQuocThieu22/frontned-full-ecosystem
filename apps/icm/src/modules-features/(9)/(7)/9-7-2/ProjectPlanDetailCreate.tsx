
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { I_ProjectPlanDetailTable } from "./ProjectPlanDetailTable";
export default function ProjectPlanDetailCreate() {
    const form = useForm<I_ProjectPlanDetailTable>({
        initialValues: {
            code: "",
            projectCode: "",
            name: "",
            manager: ""
        }
    })
    return (
        <MyButtonCreate modalSize={"50%"} objectName="giai đoạn" form={form} onSubmit={() => { }}>

            <MyTextInput label="Dự án" {...form.getInputProps("project")}/>

            <MyTextInput label="Mã giai đoạn" {...form.getInputProps("code")} />

            <MyTextInput label="Tên giai đoạn" {...form.getInputProps("name")} />

            <MySelect data={["Tô Ngọc Lan"]} label="Phụ trách" {...form.getInputProps("manager")} />

            <MyDateInput label="Thời gian bắt đầu" {...form.getInputProps("startDate")} />

            <MyDateInput label="Thời gian kết thúc" {...form.getInputProps("endDate")} />


        </MyButtonCreate>
    )
}