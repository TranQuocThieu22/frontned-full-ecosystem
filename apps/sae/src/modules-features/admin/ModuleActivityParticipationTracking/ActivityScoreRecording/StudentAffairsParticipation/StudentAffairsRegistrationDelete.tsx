'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { service_studentsActivityRegistration } from "../../../../../api/services/service_studentsActivityRegistration";

export default function StudentAffairsRegistrationDelete({ id, name }: { id: number, name: string }) {
    return <CustomActionIconDelete
        contextData={name} onSubmit={async () => {
            return await service_studentsActivityRegistration.delete(id)
        }} />
}
