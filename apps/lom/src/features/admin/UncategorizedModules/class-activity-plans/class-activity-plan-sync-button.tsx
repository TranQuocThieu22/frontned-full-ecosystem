import { AQDataSynchronizationService } from '@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService';
import CustomButtonModalSync from '@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync';

interface ClassActivityPlanSyncButtonProps {
    activityPlanCode?: number,
    loading: boolean
}

export default function ClassActivityPlanSyncButton({ activityPlanCode, loading }: ClassActivityPlanSyncButtonProps) {
    return (
        <CustomButtonModalSync
            buttonProps={{
                loading: loading
            }}
            axiosFn={() => AQDataSynchronizationService.AQDataClassSemester({ params : { semester: activityPlanCode } })}
        />
    )
}
