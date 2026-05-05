export const textUtils = {
    splitFullName(fullName?: string): { lastName: string; firstName: string } {
        // Remove extra spaces and split by one or more spaces
        if (!fullName) return { lastName: "", firstName: "" }
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) {
            return { lastName: "", firstName: parts[0]! };
        }
        const lastName = parts.slice(0, -1).join(" ");
        const firstName = parts[parts.length - 1]!;
        return { lastName, firstName };
    },
    getNormalizedTextFromHtml(html?: string): string {
        const noHtml = (html ?? "").replace(/<[^>]+>/g, "");
        return noHtml.trim().toLowerCase();
    },
    formatRecordNameResponse(code?: string, name?: string): string {
        if (!code && !name) return "không xác định";
        if (code && name) return `${code} - ${name}`;
        return code ?? name ?? "không xác định";
    },

    isNullOrEmpty(value?: string | null) {
        return value === null || value === undefined || value?.length === 0;
    }
}