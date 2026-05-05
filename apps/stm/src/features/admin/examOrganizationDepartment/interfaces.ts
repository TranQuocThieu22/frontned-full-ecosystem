import { Address } from "@/shared/interfaces/address";
import { ExamAddress } from "@/shared/interfaces/examAdress";

export interface ExamOrganizationAddress extends ExamAddress {
  examId?: number;
  address?: Address | null;
}

