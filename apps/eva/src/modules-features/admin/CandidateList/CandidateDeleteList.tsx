import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function CandidateDeleteList({ values, onDeleteCandidates }: { values: any[], onDeleteCandidates: (codes: string[]) => void }) {
    const codesToDelete = values.map((item: any) => item.code);
    const handleSubmit = () => {
        onDeleteCandidates(codesToDelete);
    };
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={codesToDelete.join(", ")}
            onSubmit={handleSubmit}
        />
    )
}