import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"

export default function F_EducationFormatDelete({ values }: { values: any }) {
    return <CustomActionIconDelete
        contextData={values.code}
        onSubmit={() => baseAxios.post("/COETrainingSystem/delete", { id: values.id })} />
}
