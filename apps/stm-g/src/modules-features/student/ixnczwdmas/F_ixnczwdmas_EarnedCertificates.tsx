import MyTitleDateStatus from "@/components/DataDisplay/TitleDateStatus/MyTitleDateStatus";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useQ_Certificate_GetCertificatesByStudentId } from "@/hooks/query-hooks/Certificate/useQ_Certificate_GetCertificatesByStudentId";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { useS_ixnczwdmas } from "./useS_ixnczwdmas";


export default function F_ixnczwdmas_EarnedCertificates() {
    const authenticate_store = useStore_Authenticate()
    const getCertificatesByStudentId_query = useQ_Certificate_GetCertificatesByStudentId({
        params: "?studentId=1079"
    })
    const store = useS_ixnczwdmas()
    return (
        <MyFieldset title="Chứng chỉ đã đạt được">
            <MyFlexColumn>
                {getCertificatesByStudentId_query.data?.map((item, idx) => (
                    <MyTitleDateStatus
                        onClick={() => {
                            store.setProperty("certificateIdx", idx)
                            store.setProperty("certificateName", item.certificate)
                            store.setProperty("fullName", item.fullName)
                            store.setProperty("decisionDate", item.decisionDate)
                        }}
                        isFocus={store.state.certificateIdx == idx}
                        key={idx}
                        date={new Date(item.decisionDate!)}
                        title={item.certificate}
                    />
                ))}
            </MyFlexColumn>
        </MyFieldset>
    )
}



