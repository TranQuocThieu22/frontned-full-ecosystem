import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import CustomButtonModalSync from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";

export default function SemesterStudentSync({ semester }: { semester?: number }) {
    return (
        <CustomButtonModalSync
            buttonProps={{ disabled: semester == undefined }}
            axiosFn={() => AQDataSynchronizationService.AQDataStudent({
                params: { semester: semester }
            })} />
    )
}
