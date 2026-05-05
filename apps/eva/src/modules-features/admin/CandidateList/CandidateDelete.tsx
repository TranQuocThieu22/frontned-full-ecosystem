import { MyActionIconDelete } from 'aq-fe-framework/components';

export default function CandidateDelete({ code, onDeleteCandidate }: { code: string, onDeleteCandidate: (code: string) => void }) {
    const handleSubmit = () => {
        onDeleteCandidate(code);
    };

    return (
        <MyActionIconDelete contextData={code} onSubmit={handleSubmit} />
    )
}