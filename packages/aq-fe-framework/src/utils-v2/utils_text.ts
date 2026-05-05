export const utils_text = {
    splitFullName(fullName: string): { lastName: string; firstName: string } {
        // Remove extra spaces and split by one or more spaces
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) {
            return { lastName: "", firstName: parts[0] };
        }
        const lastName = parts.slice(0, -1).join(" ");
        const firstName = parts[parts.length - 1];
        return { lastName, firstName };
    },
    getNormalizedTextFromHtml(html?: string): string {
        const noHtml = (html ?? "").replace(/<[^>]+>/g, "");
        return noHtml.trim().toLowerCase();
    },

}