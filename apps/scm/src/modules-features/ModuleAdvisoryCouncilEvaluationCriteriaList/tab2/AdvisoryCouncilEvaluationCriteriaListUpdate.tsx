import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyCheckbox, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { appliedCouncilLabel, IAdvisoryCouncilEvaluationCriteriaListViewModel } from "../interfaces/AdvisoryCouncilEvaluationCriteriaListViewModel";

export default function AdvisoryCouncilEvaluationCriteriaListUpdate({values}:{values:IAdvisoryCouncilEvaluationCriteriaListViewModel}) {
    const councilRoleOptions = Object.entries(appliedCouncilLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }));
    const form= useForm<IAdvisoryCouncilEvaluationCriteriaListViewModel>({
    initialValues: values,
        validate: {},
    });
    return(
        <MyActionIconUpdate
        title="Chi tiết Hội đồng tư vấn"
        onSubmit={() => { }}
        form={form} 
        modalSize={"80%"}
        >
            <Grid>
            <Grid.Col span={6}>
                <MyTextInput label="Mã tiêu chí" flex={1} {...form.getInputProps('criteriaID')} />
                <MyTextInput label="Nội dung tiêu chí" flex={1} {...form.getInputProps('criteriaDescription')} />
                <MySelect label="Loại đối tượng" flex={1} {...form.getInputProps('appliedCouncil')} data={councilRoleOptions.flat()}/>
            </Grid.Col>
            <Grid.Col span={6}>
                <MyCheckbox label="Không sử dụng" flex={1} {...form.getInputProps('checkbox', { type: 'checkbox' })} />
                <MyTextArea label="Ghi chú" flex={1} {...form.getInputProps('note')} />
            </Grid.Col>
        </Grid>
        </MyActionIconUpdate>
    )
}