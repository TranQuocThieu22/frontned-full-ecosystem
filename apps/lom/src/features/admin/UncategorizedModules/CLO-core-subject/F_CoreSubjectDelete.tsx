import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IGradeSubjectInfoViewModel } from "../../Curriculum&Subject/ModuleGradeSubject/ConfigAMRI/Interfaces/Interfaces";

export default function F_CoreSubjectDelete({ data }: { data: IGradeSubjectInfoViewModel }) {
    const disc = useDisclosure()
    const loadingState = useState<boolean>(false)
    async function handleSubmit() {
        const res = await baseAxios.post("/COEGradeSubject/update", {
            id: data.id,
            code: data.code,
            name: data.name,
            concurrencyStamp: data.concurrencyStamp,
            isEnabled: true,
            coeGradeId: data.coeGradeId,
            coeSubjectId: data.coeSubjectId,
            coeSemesterId: data.coeSemesterId,
            coeSubjectGroupId: data.coeSubjectGroupId,
            order: data.order,
            armiValue: data.armiValue,
            isCore: false,
        })
        return res
    }
    return (
        <CustomActionIconDelete
            contextData={data.code}
            loading={loadingState[0]}
            onSubmit={handleSubmit}
        />
    )
}
