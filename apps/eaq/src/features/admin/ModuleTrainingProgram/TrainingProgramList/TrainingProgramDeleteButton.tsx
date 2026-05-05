
'use client';

import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";


export default function TrainingProgramListDeleteButton({ data, resetRowSelection, isLoading }: { data: ITrainingProgram, resetRowSelection: Function, isLoading: boolean }) {
    return (
        <CustomActionIconDelete
            buttonProps={{
                loading: isLoading
            }}
            contextData={data.code}
            onSubmit={async () => {
                resetRowSelection();
                return await service_EAQTrainingProgram.delete(data.id ?? 0);
            }} />
    )
}
