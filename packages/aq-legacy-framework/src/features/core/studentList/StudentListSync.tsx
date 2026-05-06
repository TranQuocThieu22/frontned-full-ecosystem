import { AQDataSynchronizationService } from '@aq-fe/aq-legacy-framework/shared/APIs/AQDataSynchronizationService'
import { CustomButtonModalSync } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomButtonModalSync";

export default function StudentListSync() {
    return (
        <CustomButtonModalSync axiosFn={() => AQDataSynchronizationService.AQDataStudentFull()} />

    )
}