export enum PromoCodes {
  DISCOUNT_CODE10 = "10",
  DISCOUNT_CODE15 = "15",
  DISCOUNT_CODE20 = "20",
  DISCOUNT_CODE25 = "25"
}

export interface PromoCodeDetail {
  code: PromoCodes;
  description: string;
  discountPercent: number;
}

export interface CourseInfo {
  id: string;
  courseCode: string;
  courseName: string;
  lessonCount: number;
  tuitionFee: number;
  startDate: Date;
  schedule: string;
  campus: string;
  description?: string;
  instructor?: string;
  examDate?: Date;
  availablePromoCodes?: PromoCodes[];
  autoApplyDiscount?: boolean;
}

export interface Registration {
  id: string;
  courseId: string;
  registrationDate: Date;
  serviceType: 'both' | 'tuition' | 'exam';
  totalPrice: number;
  finalPrice: number;
}

export interface Invoice {
  id: string;
  registrationId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  amount: number;
}

export interface FeesStructure {
  tuitionFee: number;
  examFee: number;
}