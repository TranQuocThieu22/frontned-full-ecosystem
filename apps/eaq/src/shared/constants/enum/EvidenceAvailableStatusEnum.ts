import {IconHourglass, IconX, TablerIcon} from "@tabler/icons-react";

export enum EvidenceAvailableStatusEnum {
  AVAILABLE = 1,
  EXPIRED = 2,
}

export const EvidenceAvailableStatusEnumLabel: Record<EvidenceAvailableStatusEnum, string> = {
  [EvidenceAvailableStatusEnum.AVAILABLE]: "Còn hạn",
  [EvidenceAvailableStatusEnum.EXPIRED]: "Hết hạn",
};

export const EvidenceAvailableStatusEnumColor: Record<EvidenceAvailableStatusEnum, string> = {
  [EvidenceAvailableStatusEnum.AVAILABLE]: "green",
  [EvidenceAvailableStatusEnum.EXPIRED]: "red",
};

export const EvidenceAvailableStatusEnumIcon: Record<EvidenceAvailableStatusEnum, TablerIcon> = {
  [EvidenceAvailableStatusEnum.AVAILABLE]: IconHourglass,
  [EvidenceAvailableStatusEnum.EXPIRED]: IconX,
};