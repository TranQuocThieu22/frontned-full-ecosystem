'use client';

import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id: number;
    context: string;
}
export default function StandardStructure_DeleteStandard({
    id,
    context,
}: Props) {
    return (
        <CustomActionIconDelete
            contextData={context}
            onSubmit={() => {
                return service_EAQStandard.delete(id)
            }}
        />
    );
}
