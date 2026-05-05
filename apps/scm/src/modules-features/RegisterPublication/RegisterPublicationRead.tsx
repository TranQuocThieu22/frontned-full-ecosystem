'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PublicationCreateModal from "./RegisterPublicationCreate/PublicationCreateModal";
import RegisterPublicationDelete from "./RegisterPublicationDelete";
import RegisterPublicationDeleteList from "./RegisterPublicationDeleteList";
import PublicationUpdateModal from "./RegisterPublicationUpdate/PublicationUpdateModal";

export interface IRegisterPublicationRead {
    id: number;
    code: string; // Mã công bố
    publicationTitle: string; // Tên công trình
    mainAuthor: string; // Tác giả chính (Mã SV/CB)
    coAuthor: string; // Đồng tác giả (Mã SV/CB, vai trò, thứ tự, affiliation)
    journalName: string; // Tên tạp chí
    issn: string; // ISSN
    publishYear: string; // Năm xuất bản
    page: string; // Số trang
    scopusScore: number; // Chỉ số trích dẫn (Scopus)
    url: string; // Liên kết toàn văn (DOI/URL)
    scientificField: string; // Lĩnh vực khoa học chính
    file: string; // File minh chứng
    status: string; // Trạng thái công bố
    summary: string; // Tóm tắt
}

export default function RegisterPublicationRead() {
    const columns = useMemo<MRT_ColumnDef<IRegisterPublicationRead>[]>(() => [
        { header: "Mã công bố", accessorKey: "code" },
        { header: "Tên công trình", accessorKey: "publicationTitle", size: 300 },
        { header: "Tác giả chính (Mã SV/CB)", accessorKey: "mainAuthor" },
        { header: "Đồng tác giả (Mã SV/CB, vai trò, thứ tự, affiliation)", accessorKey: "coAuthor", size: 300 },
        { header: "Tên tạp chí", accessorKey: "journalName", size: 300 },
        { header: "ISSN", accessorKey: "issn", size: 150 },
        { header: "Năm xuất bản", accessorKey: "publishYear" },
        { header: "Số trang", accessorKey: "page" },
        { header: "Chỉ số trích dẫn (Scopus)", accessorKey: "scopusScore" },
        { header: "Liên kết toàn văn (DOI/URL)", accessorKey: "url", size: 250 },
        { header: "Lĩnh vực khoa học chính", accessorKey: "scientificField", size: 200 },
        { header: "File minh chứng", accessorKey: "file" },
        { header: "Trạng thái công bố", accessorKey: "status" },
    ], []);

    return (
        <MyFieldset
            title="Danh sách công bố"
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
                            <PublicationCreateModal />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <RegisterPublicationDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <PublicationUpdateModal values={row.original} />
                            <RegisterPublicationDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

const mockData: IRegisterPublicationRead[] = [
    {
        id: 1,
        code: "BB2024-001",
        publicationTitle: "A Novel Algorithm for Image Recognition using Deep Learning",
        mainAuthor: "CB001",
        coAuthor: "SV005, Học viện X",
        journalName: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
        issn: "0162-8828",
        publishYear: "2024",
        page: "120-135",
        scopusScore: 15,
        url: "https://doi.org/10.1109/TPAMI.2024.1234567",
        scientificField: "Trí tuệ Nhân tạo",
        file: "file_baibao_1.pdf",
        status: "Đã gửi duyệt",
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 2,
        code: "BB2024-002",
        publicationTitle: "Optimizing Network Performance in 5G Communications",
        mainAuthor: "CB002",
        coAuthor: "",
        journalName: "Journal of Network and Computer Applications",
        issn: "1084-8045",
        publishYear: "2024",
        page: "80-95",
        scopusScore: 8,
        url: "https://www.sciencedirect.com/science/article/pii/S108480454200012X",
        scientificField: "Mạng máy tính",
        file: "file_baibao_2.pdf",
        status: "Đã gửi duyệt",
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 3,
        code: "BB2024-003",
        publicationTitle: "Enhanced Cybersecurity Measures for IoT Devices",
        mainAuthor: "CB003",
        coAuthor: "CB004, Học viện X",
        journalName: "Computers & Security",
        issn: "0167-4048",
        publishYear: "2023",
        page: "200-215",
        scopusScore: 22,
        url: "https://doi.org/10.1016/j.cose.2023.103214",
        scientificField: "An toàn thông tin",
        file: "file_baibao_3.pdf",
        status: "Đã gửi duyệt",
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 4,
        code: "BB2024-004",
        publicationTitle: "Impact of Blockchain on Supply Chain Transparency",
        mainAuthor: "CB005",
        coAuthor: "",
        journalName: "Supply Chain Management: An International Journal",
        issn: "1359-8546",
        publishYear: "2024",
        page: "45-60",
        scopusScore: 10,
        url: "https://doi.org/10.1108/SCM-05-2023-0187",
        scientificField: "Kinh tế học",
        file: "file_baibao_4.pdf",
        status: "Đã gửi duyệt",
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
    {
        id: 5,
        code: "BB2024-005",
        publicationTitle: "Sustainable Energy Solutions for Urban Areas",
        mainAuthor: "CB001",
        coAuthor: "",
        journalName: "Renewable and Sustainable Energy Reviews",
        issn: "1364-0321",
        publishYear: "2024",
        page: "300-320",
        scopusScore: 30,
        url: "https://doi.org/10.1016/j.rser.2024.113256",
        scientificField: "Kỹ thuật năng lượng",
        file: "file_baibao_5.pdf",
        status: "Đã gửi duyệt",
        summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu. Sách trình bày toàn diện về kinh tế vi mô..."
    },
];
