import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

// Main user dashboard data
export interface IUserDashboardData extends BaseEntity {
  fullName?: string;
  gender?: number;
  dateOfBirth?: string; // ISO date string
  email?: string;
  phoneNumber?: string;
  address?: string | null;
  identifier?: string | null;
  payments?: IPayment[];
  certificate?: ICertificateSection;
  course?: ICourseSection;
  exam?: IExamSection;
  lecturerReview?: ILecturerReviewSection;
}

// Payment information (currently empty array in response)
interface IPayment {

  paymentCode?: string
  paymentAmount?: number
  paymentDate?: Date
}

// Certificate section
interface ICertificateSection {
  totalCount?: number;
  certificateArchieves?: ICertificateArchive[];
}

export interface ICertificateArchive {
  certificate?: string | null;
  decisionDate?: string | null;
  certificateNumber?: string;
}

// Course section
interface ICourseSection {
  totalCount?: number;
  courses?: ICourse[];
}

export interface ICourse {
  courseName?: string;
  timeCluster?: string;
  studyDate?: Date; // ISO date string
  attendance?: string;
  status?: number;
  result?: string;
  totalPoint?: number;
  branchName?: string;
}

// Exam section
interface IExamSection {
  totalCount?: number;
  exams?: IExam[];
}

export interface IExam {
  examName?: string;
  examDate?: string; // ISO date string
  result?: string;
  totalPoint?: number | null;
  branchName?: string;
}

// Lecturer review section
interface ILecturerReviewSection {
  totalCount?: number;
  lecturerReviews?: ILecturerReview[];
}

export interface ILecturerReview {
  date: Date; // ISO date string, e.g., "2026-01-29T00:00:00"
  courseName: string;
  timeCluster: string | null;
  studyDate: string | null;
  cLass: string;
  lecturer: string | null;
  review: string;
}
