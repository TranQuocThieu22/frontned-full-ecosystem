'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";


export default function F_SubjectGroupDelete({ values }: { values: any }) {
    const contentDelete = "Khóa";
    return <CustomActionIconDelete
        contextData={values.code}
        onSubmit={() => baseAxios.post("/COESubjectGroup/Delete", { id: values.id })}>

    </CustomActionIconDelete>
}

