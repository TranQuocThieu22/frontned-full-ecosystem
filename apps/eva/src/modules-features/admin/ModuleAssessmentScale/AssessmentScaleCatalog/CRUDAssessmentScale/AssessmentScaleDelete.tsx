import { MyActionIconDelete } from "aq-fe-framework/components";

export default function AssessmentScaleDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => { }}></MyActionIconDelete >
    );
}