/**
 * @deprecated Hàm này không xài nữa
 * Vui lòng dùng `utils_text.getNormalizedTextFromHtml` từ `utils-v2` thay thế.
 */
export function utils_text_getNormalizedTextFromHtml(html?: string): string {
    const noHtml = (html ?? "").replace(/<[^>]+>/g, "");
    return noHtml.trim().toLowerCase();
};