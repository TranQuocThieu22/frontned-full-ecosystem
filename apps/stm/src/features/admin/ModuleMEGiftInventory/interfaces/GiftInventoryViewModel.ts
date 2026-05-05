export enum EBranch {
  THU_DUC = "THU_DUC",
  BINH_THANH = "BINH_THANH",
  QUAN_1 = "QUAN_1",
  QUAN_3 = "QUAN_3",
  TAN_BINH = "TAN_BINH"
}

export interface IGiftInventoryEntry {
  id: number;
  entryTime: Date;
  entryUser: string;
  entryUserRole: string;
  branch: EBranch;
  source: string;
  entryNote: string;
  giftCode: string;
  giftName: string;
  quantity: number;
  unitPrice: number;
  detailNote: string;
}

export interface IGift {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface IGiftInventoryForm {
  branch: EBranch;
  entryUser: string;
  source: string;
  note: string;
  giftList: IGiftInventoryItem[];
}

export interface IGiftInventoryItem {
  id: number;
  giftCode: string;
  giftName: string;
  quantity: number;
  unitPrice: number;
}

export interface ISelectOption {
  value: string;
  label: string;
}
