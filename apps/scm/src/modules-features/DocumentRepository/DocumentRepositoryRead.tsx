'use client'
import { ActionIcon } from "@mantine/core";
import { IconDownload, IconEye } from "@tabler/icons-react";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DocumentRepositoryCreate from "./DocumentRepositoryCreate";
import DocumentRepositoryDelete from "./DocumentRepositoryDelete";
import DocumentRepositoryDeleteList from "./DocumentRepositoryDeleteList";
import DocumentRepositoryUpdate from "./DocumentRepositoryUpdate";

export interface IDocumentRepositoryRead {
    id: number;
    code: string;
    documentName: string;
    documentType: string;
    documentSize: string;
    uploadDate: string;
    uploader: string;
    publicationCode: string;
    publicationTitle: string;
    publicationType: string;
    mainAuthor: string;
    coAuthor: string;
    journalName: string;
    issn: string;
    publishYear: number;
    url: string;
    scopusScore: number;
    scientificField: string;
    description?: string;
}

export default function DocumentRepositoryRead() {

    const columns = useMemo<MRT_ColumnDef<IDocumentRepositoryRead>[]>(() => [
        { header: "Mã tài liệu", accessorKey: "code" },
        {
            header: "Tên tài liệu", accessorKey: "documentName",
            size: 300
        },
        { header: "Loại tài liệu", accessorKey: "documentType" },
        { header: "Kích thước", accessorKey: "documentSize" },
        { header: "Ngày tải", accessorKey: "uploadDate" },
        { header: "Người tải", accessorKey: "uploader" },
        { header: "Mã công bố", accessorKey: "publicationCode" },
        { header: "Tên công bố", accessorKey: "publicationTitle", size: 300 },
        { header: "Loại công bố", accessorKey: "publicationType", size: 200 },
        { header: "Tác giả chính", accessorKey: "mainAuthor" },
        { header: "Đồng tác giả", accessorKey: "coAuthor" },
        { header: "Tên tạp chí/NXB", accessorKey: "journalName", size: 300 },
        { header: "ISSN/ISBN", accessorKey: "issn", size: 150 },
        { header: "Năm xuất bản", accessorKey: "publishYear" },
        { header: "Liên kết toàn văn", accessorKey: "url" },
        { header: "Chỉ số trích dẫn (Scopus)", accessorKey: "scopusScore" },
        { header: "Lĩnh vực Khoa học", accessorKey: "scientificField" },
    ], []);


    return (
        <MyFieldset
            title="Danh sách tài liệu công bố"
        >
            <MyDataTable
                enableRowSelection
                columns={columns}
                data={mockData || []}
                initialState={{
                    columnSizing: {
                        'mrt-row-actions': 200,
                    }
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <DocumentRepositoryCreate />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <DocumentRepositoryDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ActionIcon variant="light" >
                                <IconEye size={18} stroke={2} />
                            </ActionIcon>
                            <ActionIcon color="green" variant="light" >
                                <IconDownload size={18} stroke={2} />
                            </ActionIcon>
                            <DocumentRepositoryUpdate values={row.original} />
                            <DocumentRepositoryDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


const mockData: IDocumentRepositoryRead[] = [
    {
        id: 1,
        code: "FILE001",
        documentName: "Bản toàn văn - Bài báo AI.pdf",
        documentType: "Bản toàn văn",
        documentSize: "2.5 MB",
        uploadDate: "2025-06-25",
        uploader: "CB001",
        publicationCode: "BB2024-001",
        publicationTitle: "A Novel Algorithm for Image Recognition using Deep Learning",
        publicationType: "Bài báo tạp chí quốc tế uy tín",
        mainAuthor: "TS. Nguyễn Văn A",
        coAuthor: "SV. Nguyễn Duy K",
        journalName: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
        issn: "0162-8828",
        publishYear: 2024,
        url: "https://doi.org/10.1109/TPAMI.2024.1234567",
        scopusScore: 15,
        scientificField: "Trí tuệ Nhân tạo"
    },
    {
        id: 2,
        code: "FILE002",
        documentName: "Scan Bằng Độc quyền Sáng chế.jpg",
        documentType: "Minh chứng bằng cấp",
        documentSize: "1.2 MB",
        uploadDate: "2025-06-26",
        uploader: "CB006",
        publicationCode: "SC2025-001",
        publicationTitle: "Giải pháp hữu ích về thiết bị lọc nước thông minh",
        publicationType: "Bằng độc quyền giải pháp hữu ích",
        mainAuthor: "ThS. Lê Thị B",
        coAuthor: "",
        journalName: "Cục Sở hữu Trí tuệ Việt Nam",
        issn: "",
        publishYear: 2025,
        url: "http://ipvietnam.gov.vn/bangsangche/VN.2023.00123",
        scopusScore: 0,
        scientificField: "Kỹ thuật môi trường"
    },
    {
        id: 3,
        code: "FILE003",
        documentName: "Ảnh bìa và mục lục tạp chí.png",
        documentType: "Minh chứng bằng cấp",
        documentSize: "0.8 MB",
        uploadDate: "2025-06-25",
        uploader: "CB001",
        publicationCode: "BB2024-001",
        publicationTitle: "A Novel Algorithm for Image Recognition using Deep Learning",
        publicationType: "Bài báo tạp chí quốc tế uy tín",
        mainAuthor: "TS. Nguyễn Văn A",
        coAuthor: "SV. Nguyễn Duy K",
        journalName: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
        issn: "0162-8828",
        publishYear: 2024,
        url: "https://doi.org/10.1109/TPAMI.2024.1234567",
        scopusScore: 15,
        scientificField: "Trí tuệ Nhân tạo"
    },
    {
        id: 4,
        code: "FILE004",
        documentName: "Biên bản nghiệm thu đề tài ABC.pdf",
        documentType: "Liên kết từ NCKH",
        documentSize: "3.1 MB",
        uploadDate: "2025-06-27",
        uploader: "CBT_KNCN",
        publicationCode: "BB2024-002",
        publicationTitle: "Optimizing Network Performance in 5G Communications",
        publicationType: "Bài báo tạp chí quốc tế khác",
        mainAuthor: "TS. Trần Văn C",
        coAuthor: "ThS. Nguyễn Thị D",
        journalName: "Journal of Network and Computer Applications",
        issn: "1084-8045",
        publishYear: 2024,
        url: "https://www.sciencedirect.com/science/article/pii/S108480452400012X",
        scopusScore: 8,
        scientificField: "Mạng máy tính"
    },
    {
        id: 5,
        code: "FILE005",
        documentName: "Quyết định xuất bản Giáo trình.pdf",
        documentType: "Minh chứng xuất bản",
        documentSize: "0.5 MB",
        uploadDate: "2025-06-26",
        uploader: "CB003",
        publicationCode: "SACH2025-001",
        publicationTitle: "Giáo trình Lập trình Python nâng cao",
        publicationType: "Giáo trình/Bài giảng điện tử",
        mainAuthor: "TS. Trần Văn C",
        coAuthor: "",
        journalName: "Nhà xuất bản Giáo dục",
        issn: "",
        publishYear: 2025,
        url: "",
        scopusScore: 10,
        scientificField: "Khoa học Máy tính"
    },
    {
        id: 6,
        code: "FILE006",
        documentName: "Bản toàn văn – Phân tích hiệu suất AES.pdf",
        documentType: "Bản toàn văn",
        documentSize: "1.5 MB",
        uploadDate: "2025-06-27",
        uploader: "SV005",
        publicationCode: "BB2024-007",
        publicationTitle: "Phân tích hiệu suất thuật toán mã hóa AES trên nền tảng IoT",
        publicationType: "Bài báo cáo tạp chí trong nước",
        mainAuthor: "SV. Nguyễn Duy X",
        coAuthor: "TS. Nguyễn Văn A",
        journalName: "Tạp chí Khoa học và Công nghệ Thông tin",
        issn: "0866-708X",
        publishYear: 2024,
        url: "http://example.com/aes_iot_paper",
        scopusScore: 5,
        scientificField: "An toàn thông tin"
    },
    {
        id: 7,
        code: "FILE007",
        documentName: "Kỷ yếu Hội nghị AI Robotics.pdf",
        documentType: "Tài liệu hội nghị",
        documentSize: "4.0 MB",
        uploadDate: "2025-06-27",
        uploader: "PGS. Đỗ Thị Y",
        publicationCode: "BC2025-001",
        publicationTitle: "Báo cáo tại hội nghị Quốc tế về AI và Robotics",
        publicationType: "Báo cáo tại hội nghị hội thảo quốc tế",
        mainAuthor: "PGS. Đỗ Thị Y",
        coAuthor: "",
        journalName: "IEEE Xplore",
        issn: "",
        publishYear: 2025,
        url: "https://ieeexplore.ieee.org/document/9876543",
        scopusScore: 6,
        scientificField: "Trí tuệ Nhân tạo, Robotics"
    },
    {
        id: 8,
        code: "FILE008",
        documentName: "Sách chuyên khảo Vật liệu Nano.pdf",
        documentType: "Bản toàn văn",
        documentSize: "8.0 MB",
        uploadDate: "2025-06-27",
        uploader: "TS. Hoàng Thị H",
        publicationCode: "BB2024-008",
        publicationTitle: "Nghiên cứu về vật liệu Composite tiên tiến",
        publicationType: "Bài báo tạp chí quốc tế khác",
        mainAuthor: "PGS. Hoàng Thị H",
        coAuthor: "GS. Phạm Văn K",
        journalName: "Elsevier",
        issn: "",
        publishYear: 2024,
        url: "https://www.sciencedirect.com/book/xxxx",
        scopusScore: 8,
        scientificField: "Vật liệu học"
    }
];

