'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";


export default function F_PLOAssessmentDelete_PIsAdjustment({ id, code }: { id: number, code: string }) {

    return <CustomActionIconDelete contextData={code} onSubmit={async () => await baseAxios.post("/COEPI/Delete", { id: id })}></CustomActionIconDelete>
}

