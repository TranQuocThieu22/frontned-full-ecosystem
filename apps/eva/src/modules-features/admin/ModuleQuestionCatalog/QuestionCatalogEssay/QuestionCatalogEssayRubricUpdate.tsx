import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";
import { QuestionCatalogEssayRubricCriterionInfoViewModel, QuestionCatalogEssayRubricViewModel } from "./interfaces/QuestionCatalogEssayViewModel";

interface Props {
    values: QuestionCatalogEssayRubricCriterionInfoViewModel
}

export default function QuestionCatalogEssayRubricUpdate({ values }: Props) {
    const form = useForm<QuestionCatalogEssayRubricViewModel>({
        initialValues: {
            ...values,
        }
    })
    return (
        <CustomButtonCreateUpdate
            isUpdate
            form={form} onSubmit={(values) => { }}>
            <MyTextInput label="Mã tiêu chí" {...form.getInputProps("code")} />
            <MyTextInput label="Tên tiêu chí" {...form.getInputProps("name")} />
        </CustomButtonCreateUpdate>
    )
}