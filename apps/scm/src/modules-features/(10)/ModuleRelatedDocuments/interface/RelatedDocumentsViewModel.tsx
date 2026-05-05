export interface IRelatedDocuments {
    id: number;
    ipCode: string; // Mã IP
    ipName: string; // Tên IP
    documentType: string; // Loại tài liệu
    proofFile: string; // File minh chứng
    uploadDate: string; // Ngày tải lên
    uploaderName: string; // Người tải lên
    shortDescription: string; // Mô tả ngắn
}