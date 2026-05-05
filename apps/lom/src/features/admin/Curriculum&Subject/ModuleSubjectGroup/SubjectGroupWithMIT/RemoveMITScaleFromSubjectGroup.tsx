'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function RemoveMITScaleFromSubjectGroup({ values }: { values: any }) {
    return <CustomActionIconDelete
        contextData={`liên kết MIT của nhóm môn học mã: ${values.code}`}
        onSubmit={async () => {
            return await baseAxios.post("/COESubjectGroup/Update", {
                ...values,
                coemitScaleId: null
            })
        }}></CustomActionIconDelete>
}

