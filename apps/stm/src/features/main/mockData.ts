import { CourseInfo, PromoCodeDetail, PromoCodes, Registration } from "./interfaces";

export const PROMO_CODE_DETAILS: PromoCodeDetail[] = [
  {
    code: PromoCodes.DISCOUNT_CODE10,
    description: "Giảm 10% học phí",
    discountPercent: 10
  },
  {
    code: PromoCodes.DISCOUNT_CODE15,
    description: "Giảm 15% học phí",
    discountPercent: 15
  },
  {
    code: PromoCodes.DISCOUNT_CODE20,
    description: "Giảm 20% học phí",
    discountPercent: 20
  },
  {
    code: PromoCodes.DISCOUNT_CODE25,
    description: "Giảm 25% học phí",
    discountPercent: 25
  }
];

export const MOCK_COURSES: CourseInfo[] = [
  {
    id: "1",
    courseCode: "WEB2024-01",
    courseName: "Lập trình Web Full-stack",
    lessonCount: 30,
    tuitionFee: 4500000,
    startDate: new Date("2024-08-15"),
    schedule: "19h-21h (Thứ 2, 4, 6)",
    campus: "Quận 1, TP. HCM",
    description: "Khóa học lập trình web full-stack cung cấp kiến thức từ frontend đến backend",
    instructor: "Nguyễn Văn A",
    examDate: new Date("2024-10-01"),
    availablePromoCodes: [PromoCodes.DISCOUNT_CODE10, PromoCodes.DISCOUNT_CODE15, PromoCodes.DISCOUNT_CODE20, PromoCodes.DISCOUNT_CODE25],
    autoApplyDiscount: false
  },
  {
    id: "2",
    courseCode: "JAVA2024-01",
    courseName: "Lập trình Java cơ bản",
    lessonCount: 24,
    tuitionFee: 3800000,
    startDate: new Date("2024-09-01"),
    schedule: "18h-20h (Thứ 3, 5, 7)",
    campus: "Quận 3, TP. HCM",
    description: "Khóa học lập trình Java cơ bản cho người mới bắt đầu",
    instructor: "Trần Thị B",
    examDate: new Date("2024-10-01"),
    availablePromoCodes: [PromoCodes.DISCOUNT_CODE10, PromoCodes.DISCOUNT_CODE15, PromoCodes.DISCOUNT_CODE20, PromoCodes.DISCOUNT_CODE25],
    autoApplyDiscount: true
  },
];

export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: "1",
    courseId: "1",
    registrationDate: new Date("2024-07-20"),
    serviceType: "both",
    totalPrice: 4800000,
    finalPrice: 3675000,
  },
  {
    id: "2",
    courseId: "2",
    registrationDate: new Date("2024-07-15"),
    serviceType: "tuition",
    totalPrice: 5200000,
    finalPrice: 3900000,
  }
];