import { IF12_2_1ReadNewCurriculum } from "@/modules-features/(12)/(2)/12-2-1/F12_2_1ReadNewCurriculum";

export const mockDataRead: IF12_2_1ReadNewCurriculum[] = [
  {
    suggestionCode: "GT2025001",
    curriculumVietnameseName: "Giáo trình Nguyên lý Kế toán",
    curriculumEnglishName: "Principles of Accounting",
    fieldOfStudy: {
      fieldName: "Kinh tế",
      fieldMajor: "Kế toán",
    },
    majorApplied: ["Kế toán", "Kế toán doanh nghiệp"],
    curriculumDescription:
      "Giáo trình này cung cấp kiến thức cơ bản về nguyên lý kế toán về nguyên lý kế toán;giúp sinh viên hiểu rõ chu trình kế toán và lặp báo cáo tài chính",
    authors: [
      {
        authorName: "Nguyễn Văn A",
        authorID: "GV.12345",
      },
    ],
    informationOfAuthor: [
      {
        emailOfAuthor: "nguyenvana@edu.vn",
        phoneNumberOfAuthor: "0901234567",
      },
    ],
    expectedEditorialsMembers: [
      {
        memberName: "Trần Thị B",
        memberID: "GV.67890",
        chapterAssigned: "Chương 2",
      },
      {
        memberName: "Lê Văn C",
        memberID: "GV.11223",
        chapterAssigned: "Chương 3",
      },
    ],
    applicationOfCurriculum: "Trang bị kiến thức cơ bản;Phát triển kỹ năng phân tích; Nâng cao năng lực ứng dụng",
    targetOfCurriculum: " Sinh viên năm 2 ngành Kế toán;Học viên cao học chuyên ngành tài chính",
    expectedChapters: 10,
    expectedPages: 250,
    expectedCompletionMonth: "12 tháng",
    // needOfUsage: needOfUsageEnum["PV môn học hiện có"],
    // stateOfSuggestion: stateOfSuggestionEnum["Đang chờ phê duyệt"],
    suggestionDate: "2025-06-28 22:30:00",
    suggestedBy: "Nguyễn Văn A",
  },
  {
    suggestionCode: "GT2025002",
    curriculumVietnameseName: "Giáo trình Phân tích Dữ liệu lớn",
    curriculumEnglishName: "Big Data Analytics Textbook",
    fieldOfStudy: {
      fieldName: "Công nghệ thông tin",
      fieldMajor: "Khoa học máy tính",
    },
    majorApplied: ["Khoa học máy tính", "Mạng máy tính"],

    curriculumDescription:
      "Giáo trình giới thiệu các kỹ thuật thu thập: xử lý và phân tích dữ liệu lớn; ứng dụng trong các bài toán thực tế ",
    authors: [
      {
        authorName: "Trần Văn D",
        authorID: "GV.98765",
      },
    ],
    informationOfAuthor: [
      {
        emailOfAuthor: "tranvand@edu.vn",
        phoneNumberOfAuthor: "0912345678",
      },
    ],
    expectedEditorialsMembers: [
      {
        memberName: "Phạm Thị E",
        memberID: "GV.54321",
        chapterAssigned: "Chương 1",
      },
      {
        memberName: "Hoàng Văn F",
        memberID: "GV.99887",
        chapterAssigned: "Chương 4",
      },
    ],
    applicationOfCurriculum:
      "Giúp sinh viên nắm vững kiến thức về Big Data;Nâng cao kỹ năng thực hành phân tích dữ liệu;Chuẩn bị cho các dự án lớn",
    targetOfCurriculum: " Sinh viên cao học ngành Khoa học Dữ liệu",
    expectedChapters: 8,
    expectedPages: 200,
    expectedCompletionMonth: "9 tháng",
    // needOfUsage: needOfUsageEnum["PV môn học hiện có"],
    // stateOfSuggestion: stateOfSuggestionEnum["Đang chờ phê duyệt"],
    suggestionDate: "2025-06-27 10:00:00",
    suggestedBy: "Trần Văn D",
  },
];
export const mockDataFieldOfStudy = [
  { fieldName: "Kinh tế", fieldMajor: "Kế toán" },
  { fieldName: "Công nghệ thông tin", fieldMajor: "Khoa học máy tính" },
  { fieldName: "Khoa học xã hội", fieldMajor: "Tâm lý học" },
  { fieldName: "Kỹ thuật", fieldMajor: "Cơ khí" },
  { fieldName: "Y học", fieldMajor: "Y khoa" },
];
export const mockDataMajorApplied = [
  "Kế toán",
  "Kế toán doanh nghiệp",
  "Khoa học máy tính",
  "Mạng máy tính",
  "Tâm lý học",
  "Tâm lý học lâm sàng",
  "Cơ khí",
  "Cơ khí chế tạo",
  "Y khoa",
  "Y học cổ truyền",
];
