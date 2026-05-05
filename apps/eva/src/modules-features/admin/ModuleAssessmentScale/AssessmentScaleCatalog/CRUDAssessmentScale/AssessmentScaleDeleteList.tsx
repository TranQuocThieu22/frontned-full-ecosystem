import { MyButtonDeleteList } from "aq-fe-framework/components";
import { IAssessmentScaleInfoViewModel } from "./interfaces/InfoInterfaces";

export default function AssessmentScaleDeleteList({ values }: { values: IAssessmentScaleInfoViewModel[] }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map(item => item.maThangDo).join(", ")}
            onSubmit={() => { }}
        />
    )
}
