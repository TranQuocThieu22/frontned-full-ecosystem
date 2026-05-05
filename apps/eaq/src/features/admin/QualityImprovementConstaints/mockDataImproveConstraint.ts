import {IImprovementConstaints} from "@/shared/interfaces/qualityImprovementConstraints/IImprovementConstaints";

export const mockDataImproveConstraint: IImprovementConstaints[] = [
  {
    id: 1,
    standard: {
      id: 1,
      code: "TC01",
    },
    criteria: {
      id: 1,
      code: "TC1.1",
      name: "Tầm nhìn; sứ mạng; mục tiêu của nhà trường được xây dựng rõ ràng; phù hợp",
    },
    weaknessCode: "HC1.1.01",
    weaknessName:
      "Hạn chế về việc tuyên truyền; phổ biến tầm nhìn; sứ mạng đến toàn thể giảng viên, nhân viên và người học",
    hostingOrganization: "Phòng Đào tạo",
    affiliatedPersonel: "Nguyễn Phước Thành",
  },
  {
    id: 2,
    standard: {
      id: 1,
      code: "TC01",
    },
    criteria: {
      id: 2,
      code: "TC1.1",
      name: "Tầm nhìn; sứ mạng; mục tiêu của nhà trường được xây dựng rõ ràng; phù hợp",
    },
    weaknessCode: "HC1.1.01",
    weaknessName:
      "Hạn chế về việc tuyên truyền; phổ biến tầm nhìn; sứ mạng đến toàn thể giảng viên, nhân viên và người học",
    hostingOrganization: "Phòng Tuyển sinh",
    affiliatedPersonel: "TL Ngọc Lâm",
  },
  {
    id: 3,
    standard: {
      id: 2,
      code: "TC02",
    },
    criteria: {
      id: 3,
      code: "TC2.3",
      name: "Đội ngũ giảng viên, nghiên cứu viên",
    },
    weaknessCode: "HC2.3.01",
    weaknessName:
      "Đội ngũ giảng viên chưa thật sự khai thác tiềm năng ứng dụng công nghệ mới vào giảng dạy và nghiên cứu",
    hostingOrganization: "Phòng Khoa học và Công nghệ",
    affiliatedPersonel: "Trọng Quốc Cường",
  },
];
