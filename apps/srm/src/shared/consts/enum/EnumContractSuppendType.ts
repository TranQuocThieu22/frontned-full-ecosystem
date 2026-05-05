import { IconCircleDashedX, IconClockPause, TablerIcon } from "@tabler/icons-react";

export enum EnumContractSuppendType {
    pause = 1,
    end = 2,
}

export const EnumLabelContractSuppendType: Record<EnumContractSuppendType, string> = {
    [EnumContractSuppendType.pause]: "Tạm dừng",
    [EnumContractSuppendType.end]: "Đình chỉ hợp đồng",
};

export const EnumColorContractSuppendType: Record<EnumContractSuppendType, string> = {
    [EnumContractSuppendType.pause]: "yellow",
    [EnumContractSuppendType.end]: "red",
};

export const EnumIconContractSuppendType: Record<EnumContractSuppendType, TablerIcon> = {
    [EnumContractSuppendType.pause]: IconClockPause,
    [EnumContractSuppendType.end]: IconCircleDashedX,
};
