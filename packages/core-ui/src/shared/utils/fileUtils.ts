import { AQFileDetail } from "../interfaces/AQFileDetail";

export const fileUtils = {
    base64ToBlobUrl(base64: string, mimeType: string): string {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        return URL.createObjectURL(blob);
    },
    fileToAQDocumentType(file: File): Promise<AQFileDetail> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            // Đọc tệp dưới dạng Base64
            fileReader.onloadend = () => {
                const fileName = file.name; // Tên tệp
                const fileExtension = file.name.split(".").pop(); // Phần mở rộng tệp
                const fileBase64String = fileReader.result as string; // Base64 string của tệp

                resolve({
                    fileName,
                    fileExtension: "." + fileExtension,
                    fileBase64String: fileBase64String.split(",")[1], // Chỉ lấy phần base64 sau dấu phẩy
                });
            };

            fileReader.onerror = reject;

            // Đọc tệp dưới dạng Data URL (Base64)
            fileReader.readAsDataURL(file);
        });
    },
    AQDocumentTypeToFile(doc: AQFileDetail): File {
        if (!doc.fileBase64String || !doc.fileName) {
            throw new Error("Invalid AQFileDetail");
        }
        const mimeType = getMimeTypeFromExtension(doc.fileExtension);
        // Decode base64
        const byteCharacters = atob(doc.fileBase64String);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        // Tạo Blob
        const blob = new Blob([byteArray], { type: mimeType });

        // Trả về File
        return new File([blob], doc.fileName, { type: mimeType });
    }
}


function getMimeTypeFromExtension(ext?: string): string {
    switch (ext) {
        case ".pdf": return "application/pdf";
        case ".png": return "image/png";
        case ".jpg":
        case ".jpeg": return "image/jpeg";
        case ".docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default: return "application/octet-stream";
    }
}

export interface IExportConfig<T> {
    fields: {
        fieldName: keyof T;
        header: string;
        formatFunction?: (value: T[keyof T], row: T) => any;
    }[];

}
