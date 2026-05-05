import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';

export function utils_file_fileToAQDocumentType(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    // Đọc tệp dưới dạng Base64
    fileReader.onloadend = () => {
      const fileName = file.name; // Tên tệp
      const fileExtension = file.name.split(".").pop(); // Phần mở rộng tệp
      const fileBase64String = fileReader.result as string; // Base64 string của tệp

      resolve({
        fileName,
        fileExtension,
        fileBase64String: fileBase64String.split(",")[1], // Chỉ lấy phần base64 sau dấu phẩy
      });
    };

    fileReader.onerror = reject;

    // Đọc tệp dưới dạng Data URL (Base64)
    fileReader.readAsDataURL(file);
  });
}
export async function utils_file_docxtemplaterDownload({
  data,
  filePath,
  fileName
}: {
  data: any,
  filePath: string,
  fileName?: string
}) {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();

  // Tạo PizZip từ nội dung mẫu
  const zip = new PizZip(arrayBuffer);

  // Tạo Docxtemplater từ PizZip
  const doc = new Docxtemplater(zip);

  // Dữ liệu để thay thế

  doc.render(data);
  // Xuất kết quả thành DOCX
  const buffer = doc.getZip().generate({ type: 'base64' });

  // Tải xuống tệp DOCX
  saveAs(buffer, fileName || 'output.docx');
}