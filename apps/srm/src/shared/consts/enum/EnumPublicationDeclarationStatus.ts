import { IconCheck, IconClock, IconPencil, IconX, TablerIcon } from "@tabler/icons-react";

export enum EnumPublicationDeclarationStatus {
  Pending = 1,
  Approved = 2,
  RequireAdjustment = 3,
  Rejected = 4,
}

export const EnumLabelPublicationDeclarationStatus: Record<EnumPublicationDeclarationStatus, string> = {
  [EnumPublicationDeclarationStatus.Pending]: "Chờ duyệt",
  [EnumPublicationDeclarationStatus.Approved]: "Đã duyệt",
  [EnumPublicationDeclarationStatus.RequireAdjustment]: "Yêu cầu hiệu chỉnh",
  [EnumPublicationDeclarationStatus.Rejected]: "Không duyệt",
};

export const EnumColorPublicationDeclarationStatus: Record<EnumPublicationDeclarationStatus, string> = {
    [EnumPublicationDeclarationStatus.Pending]: "gray",
    [EnumPublicationDeclarationStatus.Approved]: "green",
    [EnumPublicationDeclarationStatus.RequireAdjustment]: "yellow",
    [EnumPublicationDeclarationStatus.Rejected]: "red",
};

export const EnumIconPublicationDeclarationStatus: Record<EnumPublicationDeclarationStatus, TablerIcon> = {
    [EnumPublicationDeclarationStatus.Pending]: IconClock,                 // Chờ duyệt
    [EnumPublicationDeclarationStatus.Approved]: IconCheck,               // Đã duyệt
    [EnumPublicationDeclarationStatus.RequireAdjustment]: IconPencil,     // Yêu cầu hiệu chỉnh
    [EnumPublicationDeclarationStatus.Rejected]: IconX                 // Không duyệt
};