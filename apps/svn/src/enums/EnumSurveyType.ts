export enum EnumSurveyType {
    FreeSurvey = 0, // 00. Khảo sát tự do
    StudentEvaluateLecturerSubject = 1,
    StudentEvaluateCurriculum = 6,
    StudentEvaluateUniversity = 7,
    StaffEvaluateUniversity = 8,
    LecturerEvaluateStudent = 17,
    LearnerEvaluateCLOSubject = 22,
    LearnerEvaluatePLOCurriculum = 23,
    EmployerEvaluatePLOCurriculum = 24
}

export const EnumSurveyTypeLabel: Record<EnumSurveyType, string> = {
    [EnumSurveyType.FreeSurvey]: "00. Khảo sát tự do",
    [EnumSurveyType.StudentEvaluateLecturerSubject]: "01. Sinh viên đánh giá CBGD & Môn học",
    [EnumSurveyType.StudentEvaluateCurriculum]: "06. Sinh viên đánh giá CTĐT",
    [EnumSurveyType.StudentEvaluateUniversity]: "07. Sinh viên đánh giá trường",
    [EnumSurveyType.StaffEvaluateUniversity]: "08. CBCNV đánh giá trường",
    [EnumSurveyType.LecturerEvaluateStudent]: "17. GV-MH đánh giá SV",
    [EnumSurveyType.LearnerEvaluateCLOSubject]: "22. Người học đánh giá CLO Môn học (xử lý riêng)",
    [EnumSurveyType.LearnerEvaluatePLOCurriculum]: "23. Người học đánh giá PLO CTĐT (xử lý riêng)",
    [EnumSurveyType.EmployerEvaluatePLOCurriculum]: "24. Nhà tuyển dụng đánh giá PLO CTĐT (xử lý riêng)",
};