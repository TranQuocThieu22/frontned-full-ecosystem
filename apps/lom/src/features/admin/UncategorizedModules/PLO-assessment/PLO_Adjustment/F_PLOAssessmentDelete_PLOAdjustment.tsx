'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";


export default function F_PLOAssessmentDelete_PLOAdjustment({ id, code }: { id: number, code: string }) {

    return <CustomActionIconDelete contextData={code} onSubmit={async () => await baseAxios.post("/COEPLO/Delete", { id: id })}></CustomActionIconDelete>
}

