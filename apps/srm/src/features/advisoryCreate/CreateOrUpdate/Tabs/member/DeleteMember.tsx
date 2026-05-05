import { CustomActionIconDelete } from '@aq-fe/core-ui/shared/components/button/CustomActionIconDelete'
import { SRMEvaluationMember } from '../../../../../shared/interfaces/SRMEvaluationMember'

interface Props {
    handleRemoveMembers: (members: SRMEvaluationMember[]) => void
    currentData: SRMEvaluationMember
}

export default function DeleteMember({ handleRemoveMembers, currentData }: Props) {
    return (
        <CustomActionIconDelete
            // loading={loading}
            contextData={currentData.user?.code || currentData.user?.fullName || ""}
            onSubmit={() => {
                handleRemoveMembers([currentData])
            }}
        />
    )
}
