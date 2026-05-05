import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Branch } from "./branch";
import { CourseTimeClusters } from "./courseTimeClusters";
import { Program } from "./program";
import { SkillCenter } from "./skillCenter";

export interface Course extends BaseEntity {
    status?: number;
    programId?: number;
    startDateRegistration?: Date;
    endDateRegistration?: Date;
    testDate?: Date;
    studyDate?: Date;
    endDate?: Date;
    price?: number;
    branchId?: number;
    skillCenterId?: number;

    skillCenter?: SkillCenter;
    branch?: Branch;
    program?: Program;

    image?: string;
    description?: string;
    fileDetail?: {
        fileName?: string;
        fileExtension?: string;
        fileBase64String?: string;
    };

    courseTimeClusters?: CourseTimeClusters[];
}
