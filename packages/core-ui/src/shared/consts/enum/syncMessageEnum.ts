export enum SyncMessageEnum {
    SystemError = "SystemError",
    BusinessError = "BusinessError",
    Warning = "Warning",
    Info = "Info",
}

export const syncMessageEnumPrefixMap: Record<SyncMessageEnum, string> = {
    [SyncMessageEnum.SystemError]: "[SystemError]:",
    [SyncMessageEnum.BusinessError]: "[BusinessError]:",
    [SyncMessageEnum.Warning]: "[Warning]:",
    [SyncMessageEnum.Info]: "[Info]:",
};

export function messageIncludesType(
    message: string,
    type: SyncMessageEnum
): boolean {
    if (!message) return false;

    return message
        .toLowerCase()
        .includes(syncMessageEnumPrefixMap[type].toLowerCase());
}

export function removeSyncMessagePrefix(
    message: string | null | undefined,
): string {
    if (!message) return "";

    const trimmed = message.trimStart();

    // Không có type → remove mọi prefix dạng [XXX]:
    const genericPrefixRegex = /^\[[^\]]+]:\s*/;
    return trimmed.replace(genericPrefixRegex, "");
}