'use client'
import { service_studentsActivityParticipation } from "@/api/services/service_studentsActivityParticipation";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function YouthUnionButtonDelete({ id, name }: { id: number, name: string }) {
    return <CustomActionIconDelete
        contextData={name}
        onSubmit={async () => {
            return await service_studentsActivityParticipation.delete(id)
        }} />
}
