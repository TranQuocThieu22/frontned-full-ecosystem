import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";
import { QuestionCatalogEssayRubricCriterionInfoViewModel } from "./interfaces/QuestionCatalogEssayViewModel";

export default function QuestionCatalogEssayRubricCreate() {
    const form = useForm<QuestionCatalogEssayRubricCriterionInfoViewModel>({
        mode: "uncontrolled"
    })
    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết tiêu chí"
            }}
            form={form} onSubmit={(values) => { }}>
            <MyTextInput label="Mã tiêu chí" {...form.getInputProps("code")} />
            <MyTextInput label="Tên tiêu chí" {...form.getInputProps("name")} />
        </CustomButtonCreateUpdate>
    )
}