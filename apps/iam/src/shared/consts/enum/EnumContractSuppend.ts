import { IconCircleDashedX, IconClockPause, TablerIcon } from "@tabler/icons-react";

export enum EnumContractSuppend {
  pause = 1,
  end = 2,
}

export const EnumLabelContractSuppend: Record<EnumContractSuppend, string> = {
  [EnumContractSuppend.pause]: "Tạm dừng",
  [EnumContractSuppend.end]: "Đình chỉ hợp đồng",
};

export const EnumColorContractSuppend: Record<EnumContractSuppend, string> = {
  [EnumContractSuppend.pause]: "yellow",
  [EnumContractSuppend.end]: "red",
};

export const EnumIconContractSuppend: Record<EnumContractSuppend, TablerIcon> = {
  [EnumContractSuppend.pause]: IconClockPause,
  [EnumContractSuppend.end]: IconCircleDashedX,
};
