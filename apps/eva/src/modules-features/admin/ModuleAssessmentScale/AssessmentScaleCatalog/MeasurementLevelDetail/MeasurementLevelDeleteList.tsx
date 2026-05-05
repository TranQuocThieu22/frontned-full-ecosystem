import { MyButtonDeleteList } from "aq-fe-framework/components";
import { IMeasurementLevelInfoViewModel } from "./interfaces/InfoInterfaces";

export default function MeasurementLevelDeleteList({ values }: { values: IMeasurementLevelInfoViewModel[] }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map(item => item.maMucDo).join(", ")}
            onSubmit={() => { }}
        />
    )
}
