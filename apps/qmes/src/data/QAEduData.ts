import { Category, QACircular } from "./Interfaces/IQAEduViewModel";
import { organizationAndAdministration } from "./OrganizationAndAdministrationData";
import { lecturer } from "./LecturerData";
import { infrastructure } from "./InfrastructureData";
import { finance } from "./financeData";
import { enrollment } from "./enrollmentData";
import { research } from "./researchData";

const qaCategories: Category[] = [organizationAndAdministration, lecturer, infrastructure, finance, enrollment, research];

export function countAllCriteria(categories: Category[]): number {
  return categories.reduce((total, category) => total + category.criteria.length, 0);
}

export const circular_01_2024: QACircular = {
  id: 1,
  name: "Thông tư 01/2024/TT-BGDĐT",
  issueDate: new Date("2024-01-15"),
  qaCategories: qaCategories,
  totalCriteria: countAllCriteria(qaCategories),  // số tiêu chí
  totalCriteriaPass: 7 /// t lười, suiiiiiiii
};

export const qaCirculars: QACircular[] = [ circular_01_2024 ];
