import { AQDataSynchronizationService } from '@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService';
import CustomButtonModalSync from '@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync';

interface ClassSyncButtonProps {
    loading: boolean
}

export default function ClassSyncButton({ loading }: ClassSyncButtonProps) {
    return (
        <CustomButtonModalSync
            buttonProps={{
                loading: loading
            }}
            axiosFn={() => AQDataSynchronizationService.AQDataClass()}
        />
    )
}
