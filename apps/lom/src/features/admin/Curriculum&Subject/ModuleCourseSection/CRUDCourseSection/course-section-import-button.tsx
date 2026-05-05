import { ClassService } from "@/api/services/ClassService";
import { service_account } from "@/api/services/service_account";
import { COECourseSectionService } from "@/api/services/service_COECourseSection";
import { service_COESubject } from "@/api/services/service_COESubject";
import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

interface CourseSectionImportButtonProps {
    isLoading: boolean;
}

const courseSectionFields: FieldOption<COECourseSection>[] = [
    {
        fieldName: "Mã môn học",
        fieldKey: "subjectCode",
        isRequired: true
    },
    {
        fieldName: "Nhóm học",
        fieldKey: "courseSectionCode",
        isRequired: true
    },
    {
        fieldName: "Mã lớp",
        fieldKey: "classCode",
        isRequired: true
    },
    {
        fieldName: "Mã Giảng viên nhập điểm",
        fieldKey: "lecturerCode",
        isRequired: true
    },
];

export default function CourseSectionImportButton({ isLoading }: CourseSectionImportButtonProps) {

    const activityPlanStore = useS_Shared_ActivityPlan().state;

    const classQuery = useCustomReactQuery({
        queryKey: ["Classes"],
        axiosFn: () =>
            ClassService.findByActivityPlanId({
                activityPlanId: activityPlanStore.ActivityPlan?.id,
            }),
        options: {
            refetchOnWindowFocus: false,
        },
    });

    const subjectQuery = useCustomReactQuery({
        queryKey: [`Subjects`],
        axiosFn: () =>
            service_COESubject.getAll({
                cols: ["Department"],
            }),
        options: {
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
            refetchOnWindowFocus: false,
        },
    });

    const lecturerQuery = useCustomReactQuery({
        queryKey: ["Lecturers"],
        axiosFn: () => service_account.getAllLecturer(),
        options: {
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
            refetchOnWindowFocus: false
        }
    });

    return (
        <CustomButtonImport
            buttonProps={{
                loading: isLoading
            }}
            fields={courseSectionFields}
            fileName={"Mẫu import danh sách nhóm học"}
            onPrepareWorkbook={(workbook) => {
                if (subjectQuery.data && subjectQuery.data.length > 0) {
                    const gradeSubjectReferenceData: any[] = [];

                    subjectQuery.data.forEach((lecturer: Account) => {
                        gradeSubjectReferenceData.push({
                            SubjectCode: lecturer?.code ?? "",
                            SubjectName: lecturer?.name
                        });
                    });

                    const gradeSubjectReferenceConfig: IExcelColumnConfig<any>[] = [
                        { fieldKey: "SubjectCode", fieldName: "Mã môn học", isRequired: false },
                        { fieldKey: "SubjectName", fieldName: "Tên môn học", isRequired: false },
                    ];

                    excelUtils.addSheet<any>({
                        workbook: workbook,
                        sheetName: "Danh sách môn học",
                        data: gradeSubjectReferenceData,
                        config: gradeSubjectReferenceConfig,
                    });
                }

                if (classQuery.data && classQuery.data.length > 0) {
                    const classReferenceData: any[] = [];

                    classQuery.data.forEach((lecturer: Account) => {
                        classReferenceData.push({
                            classCode: lecturer?.code ?? "",
                            className: lecturer?.name
                        });
                    });

                    const classReferenceConfig: IExcelColumnConfig<any>[] = [
                        { fieldKey: "classCode", fieldName: "Mã lớp", isRequired: false },
                        { fieldKey: "className", fieldName: "Tên lớp", isRequired: false },
                    ];

                    excelUtils.addSheet<any>({
                        workbook: workbook,
                        sheetName: "Danh sách lớp học",
                        data: classReferenceData,
                        config: classReferenceConfig,
                    });
                }

                if (lecturerQuery.data && lecturerQuery.data.length > 0) {
                    const lecturerReferenceData: any[] = [];

                    lecturerQuery.data.forEach((lecturer: Account) => {
                        lecturerReferenceData.push({
                            lecturerCode: lecturer?.code ?? "",
                            lecturerFullName: lecturer?.fullName ?? "",
                            workingUnitName: lecturer?.workingUnit?.code ?? "",
                        });
                    });

                    const lecturerReferenceConfig: IExcelColumnConfig<any>[] = [
                        { fieldKey: "lecturerCode", fieldName: "Mã tài khoản", isRequired: false },
                        { fieldKey: "lecturerFullName", fieldName: "Họ tên", isRequired: false },
                        { fieldKey: "workingUnitName", fieldName: "Đơn vị", isRequired: false },
                    ];

                    excelUtils.addSheet<any>({
                        workbook: workbook,
                        sheetName: "Danh sách người dùng",
                        data: lecturerReferenceData,
                        config: lecturerReferenceConfig,
                    });
                }
            }}
            onSubmit={(finalValues: any) => {
                const aggregatedValues = new Map<string, COECourseSection>();

                (finalValues).forEach((item: COECourseSection) => {
                    const key = `${item.code}||${item.subjectCode}||${item.lecturerCode ?? ""}`;

                    const existingValue = aggregatedValues.get(key) ?? {
                        code: item.courseSectionCode,
                        subjectCode: item.subjectCode,
                        pointRecordUserCode: item.lecturerCode,
                        classCodes: [],
                    } as COECourseSection;

                    const classCode = item.classCode ?? "";
                    if (classCode !== "") {
                        existingValue.classCodes?.push(classCode);
                    }

                    aggregatedValues.set(key, existingValue);
                });

                const payload = Array.from(aggregatedValues.values()).map((item) => ({
                    ...item,
                    classCodes: item.classCodes?.filter(Boolean),
                    activityPlanId: activityPlanStore.ActivityPlan?.id
                }));

                return COECourseSectionService.import(payload);
            }}
        />
    );
}