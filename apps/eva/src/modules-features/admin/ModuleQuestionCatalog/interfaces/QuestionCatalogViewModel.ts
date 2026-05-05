export interface IQuestionCatalogInfoViewModel {
    maCauHoi: string; //Mã câu hỏi
    noiDungCauHoi?: string; //Nội dung câu hỏi
    loaiCauHoi?: string; //Loại câu hỏi
    soDapAn?: number; //Số đáp án
    maChuong?: string; //Mã chương
    chuongChuDe?: string; //Chương chủ đề
    doKho?: string; //Độ khó
    mucDoNhanThuc?: string; //Mức độ nhận thức
    clo?: string; //CLO
    trangThai?: string; //Trạng thái
}

export interface IQuestionCatalogMCQSingleViewModel {
    text?: string;
    isCorrect?: boolean;
    weight?: string;
    analysis?: string;
}

export interface IQuestionCatalogMCQMultipleViewModel {
    text?: string;
    isCorrect?: boolean;
    weight?: string;
    analysis?: string;
}

export interface IOptionFillInViewModel {
    choice: string;
    weight: string;
    analysis: string;
}