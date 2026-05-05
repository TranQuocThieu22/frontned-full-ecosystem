'use client';

import { service_EAQRequirement } from '@/shared/APIs/service_EAQRequirement';
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id: number;
    context: string;
}
export default function StandardStructure_DeleteRequirement({
    id,
    context,
}: Props) {
    return (
        <CustomActionIconDelete
            contextData={context}
            onSubmit={() => {
                return service_EAQRequirement.delete(id);
            }}
        />
    );
}
