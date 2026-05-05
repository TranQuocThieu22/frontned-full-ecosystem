import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList'
import { SRMEvaluationTopic } from '../../../../../shared/interfaces/SRMEvaluationTopic'

interface Props {
    handleRemoveTopic: (topics: SRMEvaluationTopic[]) => void
    currentDatas: SRMEvaluationTopic[]
    clearSelection: () => void
}

export default function DeleteListEvaluationTopic({ handleRemoveTopic, currentDatas, clearSelection }: Props) {
    return (
        <CustomButtonDeleteList
            // loading={loading}
            contextData={currentDatas.map((item) => item.srmTopic?.code || item.srmTopic?.registerName || "").join(", ")}
            onSubmit={() => {
                handleRemoveTopic(currentDatas)
                clearSelection();
            }}
        />
    )
}
