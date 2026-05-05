import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";


export default function CriteriasDeleteListButton({ codes, onDelete }: { codes?: string[], onDelete: (codes: string[]) => void }) {

    return (
        codes && <>
            <CustomButtonDeleteList
                contextData={codes.join(', ')}
                onSubmit={() => onDelete(codes)}
            />
        </>
    );
}