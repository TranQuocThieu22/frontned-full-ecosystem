'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function F_EducationRegulationDelete({ values }: { values: any }) {
    return <CustomActionIconDelete
        contextData={values.code}
        onSubmit={() => baseAxios.post("/COERegulation/delete", { id: values.id })}>

    </CustomActionIconDelete>
}

