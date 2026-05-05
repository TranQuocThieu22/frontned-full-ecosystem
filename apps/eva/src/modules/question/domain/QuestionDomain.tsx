export interface QuestionDomain {
    id?: string
    questionCode?: string, // Mã câu hỏi
    questionContent?: string,// Nội dung câu hỏi
    questionTypeId?: string | null
    questionType?: string, // Loại câu hỏi
    numberOfAnswer?: number,// Số lượng câu trả lời
    topicId?: string | null,
    topicCode?: string, // Mã chương
    topicName?: string // Chương chủ đề
    difficultyId?: string | null
    difficulty?: string, // Độ khó
    levelOfAwarenessId?: string | null
    levelOfAwareness?: string // Mức độ nhận thức
    cloCodeId?: string | null
    cloCode?: string // CLO
    point?: number // Điểm
    state?: string // Trạng thái
}