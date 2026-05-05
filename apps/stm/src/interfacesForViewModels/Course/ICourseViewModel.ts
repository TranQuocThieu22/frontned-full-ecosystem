import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ICourseTimeClusterViewModel } from "../CourseTimeCluster/ICourseTimeClusterViewModel";

export interface ICourseViewModel extends ISimpleViewModel {
    status?: number | null;
    programId?: number | null;
    startDateRegistration?: Date | null;
    endDateRegistration?: Date | null;
    testDate?: Date | null;
    studyDate?: Date | null;
    endDate?: Date | null;
    // price?: number | null;
    branchId?: number | null;
    skillCenterId?: number | null;
    image?: string | null,
    description?: string | null,
    fileDetail?: {
        fileName?: string | null,
        fileExtension?: string | null,
        fileBase64String?: string | null
    },
    courseTimeClusters?: ICourseTimeClusterViewModel[] | null;
}