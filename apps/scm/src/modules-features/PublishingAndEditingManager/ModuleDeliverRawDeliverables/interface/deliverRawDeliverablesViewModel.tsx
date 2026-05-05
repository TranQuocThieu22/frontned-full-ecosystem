export interface IdeliverRawDeliverables {
    id: number;
     lessonCode: string; 
    lessonName: string; 
    chiefCompiler: string; // Trưởng ban biên soạn (trước là Trưởng đơn biên)
    rawProductFileName: string; // Tên file Sản phẩm thô
    actualSubmissionDate: string; // Ngày giao nộp thực tế (YYYY-MM-DD)
    submissionNotes: string; 
    submissionStatus: string;
}