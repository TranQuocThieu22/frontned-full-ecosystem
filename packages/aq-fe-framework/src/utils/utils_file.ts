import Docxtemplater from 'docxtemplater';
import saveAs from 'file-saver';
import PizZip from 'pizzip';


export interface IAQFileDetail {
  fileName?: string,
  fileExtension?: string,
  fileBase64String?: string
}

export function utils_file_fileToAQDocumentType(file: File): Promise<IAQFileDetail> {
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
}

export async function utils_file_AQDocumentTypeToFile({
  data,
  filePath,
  fileName = 'output.docx'
}: {
  data: any,
  filePath: string,
  fileName?: string
}): Promise<IAQFileDetail> {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();

  const zip = new PizZip(arrayBuffer);
  const doc = new Docxtemplater(zip);

  doc.render(data);

  const blob = doc.getZip().generate({ type: 'blob' });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string)?.split(',')[1]; // bỏ "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"
      resolve({
        fileName,
        fileExtension: 'docx',
        fileBase64String: base64String,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
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
  const buffer = doc.getZip().generate({ type: 'blob' });

  // Tải xuống tệp DOCX
  saveAs(buffer, fileName || 'output.docx');
}


export function utils_file_base64ToFile(base64: string, filename: string): File {
  const [meta, content] = base64.split(',');
  const mimeMatch = meta.match(/data:(.*);base64/);
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const binary = atob(content);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new File([bytes], filename, { type: mime });
}