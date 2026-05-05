import { AQDataSynchronizationService } from '@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService'
import { CustomButtonModalSync } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";

export default function StudentListSync() {
    return (
        <CustomButtonModalSync axiosFn={() => AQDataSynchronizationService.AQDataStudentFull()} />

    )
}