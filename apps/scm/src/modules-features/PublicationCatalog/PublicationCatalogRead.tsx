'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PublicationCatalogDelete from "./PublicationCatalogDelete";
import PublicationUpdateModal from "./PublicationCatalogUpdate/PublicationUpdateModal";

export interface IPublicationCatalogRead {
    id: number;
    code: string;                // Mã công bố
    publicationTitle: string;    // Tên công trình
    publicationType: string;     // Loại công bố
    mainAuthor: string;          // Tác giả chính
    coAuthor: string;            // Đồng tác giả
    journalName: string;         // Tên tạp chí/NXB
    issn: string;                // ISSN/ISBN
    publishYear: string;         // Năm xuất bản
    url: string;                 // Liên kết toàn văn
    scopusScore?: number;         // Chỉ số trích dẫn (Scopus)
    scientificField: string;     // Lĩnh vực khoa học chính
    hours: number;               // Số giờ quy đổi
    score: number;               // Số điểm quy đổi
    summary: string;
}

export default function PublicationCatalogRead() {

    const columns = useMemo<MRT_ColumnDef<IPublicationCatalogRead>[]>(() => [
        { header: "Mã công bố", accessorKey: "code" },
        { header: "Tên công trình", accessorKey: "publicationTitle", size: 300 },
        { header: "Loại công bố", accessorKey: "publicationType", size: 200 },
        { header: "Tác giả chính", accessorKey: "mainAuthor" },
        { header: "Đồng tác giả", accessorKey: "coAuthor" },
        { header: "Tên tạp chí/NXB", accessorKey: "journalName", size: 300 },
        { header: "ISSN/ISBN", accessorKey: "issn", size: 150 },
        { header: "Năm xuất bản", accessorKey: "publishYear" },
        { header: "Liên kết toàn văn", accessorKey: "url", size: 250 },
        {
            header: "Chỉ số trích dẫn (Scopus)",
            accessorKey: "scopusScore",
        },
        { header: "Lĩnh vực khoa học chính", accessorKey: "scientificField", size: 200 },
        {
            header: "Số giờ quy đổi", accessorKey: "hours", Cell: ({ cell }) => {
                const value = cell.getValue<number>();
                return value != null ? value.toFixed(1) : "";
            },
        },
        { header: "Số điểm quy đổi", accessorKey: "score" },
    ], []);


    return (
        <MyFieldset
            title="Danh sách danh mục công bố"
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
                            <MyButton crudType="export" />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <PublicationUpdateModal values={row.original} />
                            <PublicationCatalogDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


const mockData: IPublicationCatalogRead[] = [
    {
        id: 1,
        code: "BB2023-001",
        publicationTitle: "Evolutionary Algorithms for Optimization Problems",
        publicationType: "Bài báo tạp chí quốc tế uy tín",
        mainAuthor: "TS. Nguyễn Văn A",
        coAuthor: "ThS. Lê Thị B",
        journalName: "IEEE Transactions on Evolutionary Computation",
        issn: "1089-778X",
        publishYear: "2023",
        url: "https://doi.org/10.1109/TEVC.2023.1234567",
        scopusScore: 25,
        scientificField: "Khoa học Máy tính, Trí tuệ Nhân tạo",
        hours: 2.0,
        score: 10,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 2,
        code: "SACH2022-001",
        publicationTitle: "Kinh tế Vi mô và Ứng dụng",
        publicationType: "Sách chuyên khảo",
        mainAuthor: "TS. Lê Thị C",
        coAuthor: "",
        journalName: "Nhà xuất bản Thống kê",
        issn: "978-604-xxxx-x",
        publishYear: "2022",
        url: "https://bookstore.example.com/kinh-te-vi-mo",
        scopusScore: 0,
        scientificField: "Kinh tế học",
        hours: 3.0,
        score: 15,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 3,
        code: "BANG2023-001",
        publicationTitle: "Hệ thống phát hiện xâm nhập mạng dùng AI",
        publicationType: "Bằng độc quyền sáng chế",
        mainAuthor: "ThS. Trần Văn D",
        coAuthor: "KS. Phạm Thị E",
        journalName: "",
        issn: "VN2023.00123",
        publishYear: "",
        url: "http://ipvietnam.gov.vn/bangsangche/VN2023.00123",
        scopusScore: undefined,
        scientificField: "An toàn thông tin, Trí tuệ Nhân tạo",
        hours: 5.0,
        score: 25,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 4,
        code: "BB2023-002",
        publicationTitle: "Phân tích dữ liệu lớn trong y tế cộng đồng",
        publicationType: "Bài báo tạp chí quốc tế khác",
        mainAuthor: "SV. Nguyễn Duy X",
        coAuthor: "TS Nguyễn Văn A",
        journalName: "Journal of Health Informatics",
        issn: "1234-9876",
        publishYear: "2023",
        url: "https://www.pubmed.ncbi.nlm.nih.gov/articles/PMIDXXXXXX",
        scopusScore: 12,
        scientificField: "Y học, Khoa học Máy tính",
        hours: 1.5,
        score: 8,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 5,
        code: "GT2023-001",
        publicationTitle: "Cơ sở dữ liệu Quản hệ",
        publicationType: "Giáo trình/Bài giảng điện tử",
        mainAuthor: "TS. Đỗ Thị Y",
        coAuthor: "",
        journalName: "Nhà xuất bản Đại học Quốc gia Hà Nội",
        issn: "978-604-xxxx-x",
        publishYear: "2023",
        url: "http://elearning.hanoi.edu.vn/csdl_qlh",
        scopusScore: 0,
        scientificField: "Khoa học Máy tính",
        hours: 2.0,
        score: 10,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 6,
        code: "BC2024-001",
        publicationTitle: "Báo cáo tổng quan về 6G và các công nghệ tiềm năng",
        publicationType: "Báo cáo tại hội nghị, hội thảo quốc tế",
        mainAuthor: "PGS. Hà Văn Z",
        coAuthor: "TS. Đào Thị K",
        journalName: "Kỷ yếu Hội nghị Quốc tế về Viễn thông",
        issn: "978-1-6654-xxxx-x",
        publishYear: "2024",
        url: "https://ieeexplore.ieee.org/document/11223344",
        scopusScore: 8,
        scientificField: "Kỹ thuật Viễn thông",
        hours: 1.2,
        score: 6,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 7,
        code: "SACH2024-001",
        publicationTitle: "Marketing Số trong kỷ nguyên 4.0",
        publicationType: "Sách tham khảo",
        mainAuthor: "TS. Bùi Văn L",
        coAuthor: "TS. Cao Thị M",
        journalName: "Nhà xuất bản Lao động Xã hội",
        issn: "978-604-xxxx-x",
        publishYear: "2024",
        url: "https://bookstore.example.com/marketing-so",
        scopusScore: 0,
        scientificField: "Quản trị kinh doanh, Kinh tế học",
        hours: 2.5,
        score: 12,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 8,
        code: "BB2023-003",
        publicationTitle: "Nghiên cứu về vật liệu Graphene cho cảm biến khí",
        publicationType: "Bài báo tạp chí quốc tế khác",
        mainAuthor: "TS. Phạm Ngọc N",
        coAuthor: "",
        journalName: "Journal of Nanomaterials",
        issn: "1687-4110",
        publishYear: "2023",
        url: "https://doi.org/10.1155/2023/5432109",
        scopusScore: 18,
        scientificField: "Vật liệu học, Hóa học",
        hours: 1.5,
        score: 8,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 9,
        code: "BANG2024-002",
        publicationTitle: "Thiết bị sạc không dây đa năng",
        publicationType: "Bằng độc quyền giải pháp hữu ích",
        mainAuthor: "KS. Lê Quang P",
        coAuthor: "ThS. Hoàng Thị Q",
        journalName: "Cục Sở hữu Trí tuệ Việt Nam",
        issn: "VN2024.00456",
        publishYear: "",
        url: "http://ipvietnam.gov.vn/bangsangche/VN2024.00456",
        scopusScore: undefined,
        scientificField: "Kỹ thuật Điện tử",
        hours: 4.0,
        score: 20,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 10,
        code: "BB2024-004",
        publicationTitle: "Ứng dụng AI trong chẩn đoán hình ảnh y tế",
        publicationType: "Bài báo tạp chí quốc tế uy tín",
        mainAuthor: "GS. Vũ Thị R",
        coAuthor: "TS. Phan Văn S",
        journalName: "IEEE Journal of Biomedical and Health Informatics",
        issn: "2168-2194",
        publishYear: "2024",
        url: "https://doi.org/10.1109/JBHI.2024.9876543",
        scopusScore: 30,
        scientificField: "Y học, Trí tuệ Nhân tạo",
        hours: 2.0,
        score: 10,
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    }
];
