import { AQDataSynchronizationService } from '@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService';
import CustomButtonModalSync from '@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync';

interface CourseSectionSyncButtonProps {
    activityPlanCode?: number,
    loading: boolean
}

export default function CourseSectionSyncButton({ loading, activityPlanCode }: CourseSectionSyncButtonProps) {
    return (
        <CustomButtonModalSync
            buttonProps={{
                loading: loading
            }}  
            axiosFn={() => AQDataSynchronizationService.AQDataCourseSection({ params: { semester: activityPlanCode } })}
        />
    )
}
