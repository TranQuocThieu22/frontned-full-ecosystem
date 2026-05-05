'use client';

import { service_EAQCriteria } from '@/shared/APIs/service_EAQCriteria';
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id: number;
    context: string;
}
export default function StandardStructure_DeleteCriteria({
    id,
    context,
}: Props) {
    return (
        <CustomActionIconDelete
            contextData={context}
            onSubmit={() => {
                return service_EAQCriteria.delete(id);
            }}
        />
    );
}
