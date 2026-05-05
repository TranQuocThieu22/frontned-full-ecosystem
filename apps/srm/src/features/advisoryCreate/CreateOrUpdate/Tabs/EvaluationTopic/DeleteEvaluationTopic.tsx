import { CustomActionIconDelete } from '@aq-fe/core-ui/shared/components/button/CustomActionIconDelete';
import { SRMEvaluationTopic } from '../../../../../shared/interfaces/SRMEvaluationTopic';

interface Props {
    handleRemoveTopic: (topics: SRMEvaluationTopic[]) => void
    currentData: SRMEvaluationTopic
}

export default function DeleteEvaluationTopic({ handleRemoveTopic, currentData }: Props) {

    return (
        <CustomActionIconDelete
            contextData={currentData?.srmTopic?.code}
            onSubmit={() => {
                return handleRemoveTopic([currentData])
            }}>
        </CustomActionIconDelete>
    )
}

