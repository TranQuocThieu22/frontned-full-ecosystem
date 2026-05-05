import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Grid, GridCol } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyCheckbox, MySelect, MyTextArea } from "aq-fe-framework/components";
import { IAdvisoryCouncilEvaluationCriteriaListViewModel, appliedCouncilEnum, appliedCouncilLabel } from "../interfaces/AdvisoryCouncilEvaluationCriteriaListViewModel";

export default function AdvisoryCouncilEvaluationCriteriaListCreate() {
    const councilRoleOptions = Object.entries(appliedCouncilLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }));
    const form= useForm<IAdvisoryCouncilEvaluationCriteriaListViewModel>({
        initialValues: {
            criteriaID:"",
            criteriaDescription:"",
            appliedCouncil: Object.values(appliedCouncilEnum)[0]  , // Default to the first option
            checkbox:false,
            note:"",
        },
        validate: {},
    })
    return(
        <MyButtonCreate
        title="Chi tiết tiêu chí Hội đồng tư vấn"
        onSubmit={() => {}}
        form={form}
        modalSize={"80%"}
        >
        <Grid>
            <GridCol span={6}>
                <MyTextInput label="Mã tiêu chí" flex={1} {...form.getInputProps('criteriaID')} />
                <MyTextInput label="Nội dung tiêu chí" flex={1} {...form.getInputProps('criteriaDescription')} />
                <MySelect label="Loại đối tượng" flex={1} {...form.getInputProps('appliedCouncil')} data={councilRoleOptions.flat()}/>
            </GridCol>
            <GridCol span={6}>
                <MyCheckbox label="Không sử dụng" flex={1} {...form.getInputProps('checkbox', { type: 'checkbox' })} />
                <MyTextArea label="Ghi chú" flex={1} {...form.getInputProps('note')} />
            </GridCol>
        </Grid>
        </MyButtonCreate>
    )
}