import { activityServiceQT, Participations } from "@/shared/APIs/activityServiceQT";
import { CustomButtonImport } from "@aq-fe/aq-core-framework/shared/components/button/CustomButtonImport";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";

export default function ImportActivityPointImportButton({
    activityId,
    disabled
}: {
    activityId?: string
    disabled?: boolean
}) {
    const authenticateStore = useAuthenticateStore()
    return (
        <CustomButtonImport<Participations>
            buttonProps={{
                disabled
            }}
            onSubmit={(finalValues) => {
                return activityServiceQT.importActivityParticipations({
                    tenantId: authenticateStore.state.tenantId!,
                    id: activityId!,
                    body: {
                        participations: finalValues
                    }
                })
            }}
            fields={[
                {
                    fieldKey: "studentCode",
                    fieldName: "Mã sinh viên"
                },
                {
                    fieldKey: "proposedScore",
                    fieldName: "Điểm",
                    parseType: "number"
                },
            ]}
        />
    )
}
