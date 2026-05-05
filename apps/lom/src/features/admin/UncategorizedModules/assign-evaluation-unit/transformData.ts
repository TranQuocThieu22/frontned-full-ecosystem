export function mapToGradeSubject(item: any): any {
  const {
    id,
    activityPlanId,
    order,
    courseSectionQuantity,
    teachingUnitId,
    measureUnitId,
    collectUnitId,
    coeSubjectGroupId,
    coeGradeId,
    coeSubjectId,
    coeSubject = {},
  } = item;

  return {
    id,
    code: coeSubject.code,
    name: coeSubject.name,
    numberCredit: coeSubject.numberCredit,
    activityPlanId,
    teachingUnitId: teachingUnitId ?? null,
    measureUnitId: measureUnitId ?? null,
    collectUnitId: collectUnitId ?? null,
    coeSubjectGroupId: coeSubjectGroupId ?? null,
    coeGradeId: coeGradeId ?? null,
    coeSubjectId: coeSubjectId ?? null,
    isCore: true,
    order,
    courseSectionQuantity: courseSectionQuantity ?? null,
  };
}
