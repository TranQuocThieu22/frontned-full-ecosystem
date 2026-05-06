export function getFinalLinkVieo(url: string): string {
    try {
        const parsedUrl = new URL(url);

        // Kiểm tra nếu là link YouTube
        if (
            parsedUrl.hostname.includes("youtube.com") ||
            parsedUrl.hostname.includes("youtu.be")
        ) {
            let videoId = "";

            if (parsedUrl.hostname === "youtu.be") {
                // Ví dụ: https://youtu.be/AnMhdn0wJ4I
                videoId = parsedUrl.pathname.slice(1);
            } else if (parsedUrl.searchParams.has("v")) {
                // Ví dụ: https://www.youtube.com/watch?v=AnMhdn0wJ4I
                videoId = parsedUrl.searchParams.get("v") || "";
            }

            // Nếu có videoId thì trả về link embed
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // Nếu không phải YouTube hoặc không lấy được ID thì trả lại URL gốc
        return url;
    } catch (e) {
        console.warn("Invalid URL passed to getFinalLink:", url);
        return url;
    }
}