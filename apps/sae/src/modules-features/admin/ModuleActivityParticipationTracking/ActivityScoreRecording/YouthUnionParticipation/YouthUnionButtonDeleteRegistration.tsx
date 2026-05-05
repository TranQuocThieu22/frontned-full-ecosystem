'use client'
import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import { IYouthUnionParticipationRegistrationData } from "./interfaces/IYouthUnionParticipationViewModel";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";


export default function YouthUnionButtonDeleteRegistration({ registration }: { registration: IYouthUnionParticipationRegistrationData }) {
    return <CustomButtonDeleteList

        onSubmit={async () => {
            return await service_studentsActivityRegistration.delete(registration.id!)
        }} />
}
