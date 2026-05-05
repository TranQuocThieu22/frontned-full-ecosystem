'use client'
import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function StudentsActivityRegistrationButtonDeleteList({ id, name }: { id: number, name: string }) {
    return <CustomActionIconDelete contextData={name} onSubmit={async () => await service_studentsActivityRegistration.delete(id)}></CustomActionIconDelete>
}
