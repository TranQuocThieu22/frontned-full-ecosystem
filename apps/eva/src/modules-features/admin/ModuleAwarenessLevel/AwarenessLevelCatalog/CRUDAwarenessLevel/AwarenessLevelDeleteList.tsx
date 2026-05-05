import { MyButtonDeleteList } from "aq-fe-framework/components";
import { AwarenessLevelInfoViewModel } from "./Interfaces/InfoInterfaces";

export default function AwarenessLevelDeleteList({ values }: { values: AwarenessLevelInfoViewModel[] }) {
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
