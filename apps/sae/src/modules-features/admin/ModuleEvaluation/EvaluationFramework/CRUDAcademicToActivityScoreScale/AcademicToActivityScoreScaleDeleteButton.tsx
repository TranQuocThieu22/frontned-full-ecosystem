import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function AcademicToActivityScoreScaleDeleteButton({ id, code }: { id: number, code: number }) {
    return (
        <CustomActionIconDelete contextData={code.toString()} onSubmit={() => { }}></CustomActionIconDelete >
    );
}
