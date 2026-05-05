import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';


import { ActionIcon } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';

export default function F3_2PrintScientifictProfile({ id }: { id: number }) {
    return (
        <ActionIcon color="orange" onClick={() => generateDocx()}><IconPrinter /></ActionIcon>
    )
}



const dataGen = {
    hoVaTen: "Nguyễn Văn A",
    gioiTinh: "Nam",
    namSinh: "01/01/1990",
    noiSinh: "Hà Nội",
    queQuan: "Hà Nội",
    danToc: "Kinh",
    HVCaoNhat: "Tiến sĩ",
    namNuocNhanHV: "2015, Việt Nam",
    chucDanhKHCaoNhat: "Phó giáo sư",
    namBN: "2020",
    chucVu: "Giảng viên",
    donViCongTac: "Trường Đại học ABC",
    choORiengHoacDiaChiLienLac: "123 Đường ABC, Hà Nội",
    CQ: "0123456789",
    NR: "0987654321",
    DD: "0912345678",
    fax: "024-12345678",
    email: "nguyenvana@example.com",
    CMND: "123456789",
    ngayCap: "01/01/2010",
    noiCap: "Công an Hà Nội",
    heDaoTao: "Chính quy",
    noiDaoTao: "Trường Đại học XYZ",
    nganhHoc: "Công nghệ thông tin",
    nuocDaoTao: "Việt Nam",
    namTN: "2012",
    bangDH2: "Không",
    namTN2: "",
    TSChuyenNganh: "Mạng máy tính",
    namCB: "2016",
    noiDaoTaoTS: "Trường Đại học DEF",
    TSChuyenNganhh: "Hệ thống thông tin",
    namCB2: "2020",
    noiDaoTaoTS2: "Trường Đại học GHI",
    tenLuanAn: "Nghiên cứu về an toàn thông tin",
    NN1: "Tiếng Anh",
    NN2: "Tiếng Pháp",
    NN3: "Tiếng Trung",
    MDSD1: "Khá",
    MDSD2: "Trung bình",
    MDSD3: "Cơ bản",
    quaTrinhCongTac: [
        {
            thoiGian: "2012 - 2015",
            noiCongTac: "Công ty ABC",
            congViecDamNhiem: "Lập trình viên",
        },
        {
            thoiGian: "2015 - 2020",
            noiCongTac: "Trường Đại học ABC",
            congViecDamNhiem: "Giảng viên",
        }
    ],
    quaTrinhNghienCuuKhoaHoc: [
        {
            tenDeTai: "Nghiên cứu về mạng máy tính",
            namBatDau: "2017",
            namHoanThanh: "2018",
            capDeTai: "Cấp Bộ",
            trachNhiem: "Thành viên",
        },
        {
            tenDeTai: "An toàn thông tin trong mạng",
            namBatDau: "2019",
            namHoanThanh: "2021",
            capDeTai: "Cấp Trường",
            trachNhiem: "Chủ nhiệm",
        }
    ],
    congTrinhKhoaHoc: [
        {
            tenCongTrinh: "Báo cáo về an toàn thông tin",
            namCongBo: "2022",
            tenTapChi: "Tạp chí Khoa học Công nghệ",
        },
        {
            tenCongTrinh: "Nghiên cứu mạng máy tính",
            namCongBo: "2023",
            tenTapChi: "Tạp chí Công nghệ Thông tin",
        }
    ],
};


const generateDocx = async () => {
    // Đọc tệp mẫu
    const response = await fetch('/docs/DOCX3_Ly_Lich_Khoa_hoc_cua_bo.docx');
    const arrayBuffer = await response.arrayBuffer();

    // Tạo PizZip từ nội dung mẫu
    const zip = new PizZip(arrayBuffer);

    // Tạo Docxtemplater từ PizZip
    const doc = new Docxtemplater(zip);

    // Dữ liệu để thay thế

    doc.render(dataGen);

    // Xuất kết quả thành DOCX
    const buffer = doc.getZip().generate({ type: 'blob' });

    // Tải xuống tệp DOCX
    saveAs(buffer, 'output.docx');

};