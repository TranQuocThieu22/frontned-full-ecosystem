import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
interface Document extends BaseEntity {
  path?: string;
  orderBy?: number;
  documentType?: number;
  promulgateDate?: string;
  decisionCode?: string;
  departmentName?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  conclusion?: string | null;
  note?: string | null;
  documentAttributeId?: number;
  documentAttributeName?: string;
  isCycleCheck?: boolean;
  meetingDate?: string | null;
  fileDetail?: string | null;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  modifiedWhen?: string;
  modifiedBy?: number;
  modifiedFullName?: string;
}
