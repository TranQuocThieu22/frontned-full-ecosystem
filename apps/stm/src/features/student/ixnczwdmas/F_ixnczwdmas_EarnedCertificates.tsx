import MyTitleDateStatus from "@/components/DataDisplay/TitleDateStatus/MyTitleDateStatus";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { certificateService, type GetCertificatesByStudentIdResponse } from "@/shared/APIs/certificateService";
import { useS_ixnczwdmas } from "./useS_ixnczwdmas";


export default function F_ixnczwdmas_EarnedCertificates() {
    const authenticate_store = useAuthenticateStore()
    const getCertificatesByStudentId_query = useCustomReactQuery({
        queryKey: ["Certificate_GetCertificatesByStudentId", authenticate_store.state?.userId],
        axiosFn: () => certificateService.getCertificatesByStudentId({
            params: `?studentId=${authenticate_store.state?.userId}`,
        }),
    });
    const store = useS_ixnczwdmas()
    return (
        <MyFieldset title="Chứng chỉ đã đạt được">
            <MyFlexColumn>
                {(getCertificatesByStudentId_query.data ?? []).map((item: GetCertificatesByStudentIdResponse, idx: number) => (
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



