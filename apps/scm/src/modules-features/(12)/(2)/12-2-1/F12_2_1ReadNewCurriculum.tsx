'use client'
import { useQuery } from "@tanstack/react-query";
import {
    MyButton,
    MyButtonViewPDF,
    MyCenterFull,
    MyDataTable,
    MyFieldset,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F12_2_1CreateNewCurriculum from "./F12_2_1CreateNewCurriculum";
import F12_2_1DeleteNewCurriculum from "./F12_2_1DeleteNewCurriculum";
import F12_2_UpdateNewCurriculum from "./F12_2_UpdateNewCurriculum";
import { mockDataRead } from "./mockData";

export interface IF12_2_1ReadNewCurriculum {
    suggestionCode?: string; //Tên mã đề xuất
    curriculumVietnameseName?: string; //Tên giáo trình tiếng Việt
    curriculumEnglishName?: string; //Tên giáo trình tiếng Anh
    fieldOfStudy?: {
        fieldName: string; //Tên lĩnh vực học
        fieldMajor: string; //Lĩnh vực học và chuyên ngành
    };  //Lĩnh vực
    majorApplied?: string[]; // Chuyên ngành áp dụng
    curriculumDescription?: string; //Mô tả giáo trình
    authors?: {
        authorName: string; // Tên tác giả
        authorID: string; // ID tác giả
    }[]; // Danh sách tác giả, chủ biên đề xuất
    informationOfAuthor?: {
        emailOfAuthor?: string;
        phoneNumberOfAuthor?: string;
    }[]; //Thông tin liên hệ của tác giả, chủ biên đề xuất
    expectedEditorialsMembers?: {
        memberName: string; // Tên thành viên biên tập
        memberID: string; // ID thành viên biên tập
        chapterAssigned?: string; // Chương được phân công (nếu có)
    }[]; // Danh sách thành viên biên tập dự kiến
    applicationOfCurriculum?: string; //Mục đích của giáo trình
    targetOfCurriculum?: string; //Đối tượng sử dụng giáo trình
    expectedChapters?: number; //Các chương dự kiến
    expectedPages?: number; //Số trang dự kiến
    expectedCompletionMonth?: string; //Tháng hoàn thành dự kiến
    needOfUsage?: needOfUsageEnum; //Nhu cầu sử dụng
    fileAttachment?: string; //File đính kèm
    suggestionResult?: string;//Kết quả Kiểm tra sơ bộ
    suggestionStatus?: string; //Trạng thái đề xuất
    suggestionDate?: string; //Ngày đề xuất
    suggestedBy?: string; //Người đề xuất
    dateOfProposal?: string; //Ngày kiểm tra
    criticsBy?: string; //Người kiểm tra
    announcementCheck?: boolean; //Đã gửi thông báo
    suggestionCritics?: string; //Nhận xét Kiểm tra Sơ bộ

}

export interface IF12_2_1ReadNewCurriculumTable {
    code: string;
    name: string;
    department: string;
    role: string;
    email: string;
    phoneNumber: string;
}

export const mockDataCurriculumTable: IF12_2_1ReadNewCurriculumTable[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        role: "Chủ biên",
        email: "tongocbao@gmail.com",
        phoneNumber: "0123456789",
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        role: "Thành viên",
        email: "tolanh@gmail.com",
        phoneNumber: "0123456788",
    },
];

export const roleOptions = [
    { value: "Trưởng ban", label: "Trưởng ban" },
    { value: "Thành viên", label: "Thành viên" },
    { value: "Chủ biên", label: "Chủ biên" },
]

export enum stateOfSuggestionEnum {
    "Đang biên soạn" = "Đang biên soạn",
    "Đã gửi bản thảo" = "Đã gửi bản thảo",
    "Đang chờ phê duyệt" = "Đang chờ phê duyệt",
    "Yêu cầu chỉnh sửa(sau sơ bộ)" = "Yêu cầu chỉnh sửa(sau sơ bộ)",
    "Yêu cầu chỉnh sửa(sau thẩm định)" = "Yêu cầu chỉnh sửa(sau thẩm định)",
    "Đã sơ duyệt" = "Đã sơ duyệt",
    "Đã phê duyệt" = "Đã phê duyệt",
    "Đã thẩm định" = "Đã thẩm định",
    "Chờ thẩm định" = "Chờ thẩm định",
    "Đã hoàn thành" = "Đã hoàn thành",
    "Đã Từ chối" = "Đã Từ chối(sơ bộ)",
    "Đã hủy" = "Đã hủy",
}

export enum needOfUsageEnum {
    "PV môn học hiện có" = "Phục vụ môn học hiện có",
    "Thay thế" = "Thay thế giáo trình cũ",
    "Mở môn" = "Mở môn học mới",
    "TLTK" = "Tài liệu tham khảo chuyên sâu",
    "ĐTLK" = "Phục vụ đào tạo liên kết/quốc tế",
    "NCKH" = "Phục vụ nghiên cứu khoa học",
}

export default function F12_2_1ReadNewCurriculum() {
    const query = useQuery<IF12_2_1ReadNewCurriculum[]>({
        queryKey: ['F12_2_1ReadNewCurriculum'],
        queryFn: async () => mockDataRead
    });
    const columns = useMemo<MRT_ColumnDef<IF12_2_1ReadNewCurriculum>[]>(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "suggestionCode",
        }
        , {
            header: "Tên giáo trình (Tiếng Việt)",
            accessorKey: "curriculumVietnameseName",
        },
        {
            header: "Tên giáo trình (Tiếng Anh)",
            accessorKey: "curriculumEnglishName",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "fieldOfStudy",
            accessorFn: (row) =>
                row.fieldOfStudy
                    ? `${row.fieldOfStudy.fieldName} - ${row.fieldOfStudy.fieldMajor}`
                    : "",
        },
        {
            header: "Chuyên ngành áp dụng",
            accessorKey: "majorApplied",
            accessorFn: (row) =>
                row.majorApplied
                    ? `${row.majorApplied.join(", ")}`
                    : "",
        },
        {
            header: "Mô tả tóm tắt Giáo trình",
            accessorKey: "curriculumDescription",
        },
        {
            header: "Tác giả/Chủ biên đề xuất",
            accessorKey: "authors",
            accessorFn: (row) =>
                row.authors && row.authors.length > 0
                    ? row.authors.map(author => `${author.authorName} (${author.authorID})`).join(", ")
                    : "Chưa có tác giả",
        },
        {
            header:"Thông tin liên hệ Chủ biên",
            accessorKey:"informationOfAuthor",
            accessorFn: (row) => 
                row.informationOfAuthor && row.informationOfAuthor.length > 0
                    ? row.informationOfAuthor.map(info => `${info.emailOfAuthor || ''} - ${info.phoneNumberOfAuthor || ''}`).join(", ")
                    : "Chưa có thông tin liên hệ",
        },
        {
            header: "Dự kiến Thành viên biên soạn",
            accessorKey: "expectedEditorialsMembers",
            accessorFn: (row) =>
                row.expectedEditorialsMembers && row.expectedEditorialsMembers.length > 0
                    ? row.expectedEditorialsMembers.map(member => `${member.memberName} (${member.memberID})${member.chapterAssigned ? ` - ${member.chapterAssigned}` : ''}`).join(", ")
                    : "Chưa có thành viên biên tập",
        },
        {
            header: "Mục tiêu của Giáo trình",
            accessorKey: "applicationOfCurriculum",
        },
        {
            header: "Đối tượng sử dụng",
            accessorKey: "targetOfCurriculum",
        },
        {
            header: "Dự kiến Số chương",
            accessorKey: "expectedChapters",
        },
        {
            header: "Dự kiến Số trang",
            accessorKey: "expectedPages",
        },
        {
            header: "Dự kiến Thời gian hoàn thành ",
            accessorKey: "expectedCompletionMonth",
        },
        {
            header: "Nhu cầu sử dụng ",
            accessorKey: "needOfUsage",
            accessorFn: (row) =>
                row.needOfUsage
                    ? Object.keys(needOfUsageEnum).find(key => needOfUsageEnum[key as keyof typeof needOfUsageEnum] === row.needOfUsage)
                    : "Chưa xác định",
        },
        {
            header: "File đính kèm (Đề cương)",
            accessorKey: "fileAttachment",
            Cell: ({ cell }) => (
                <MyButtonViewPDF />
            ),
        },
        {
            header: "Trạng thái đề xuất",
            accessorKey: "stateOfSuggestion",
            accessorFn: (row) => 
                row.suggestionStatus
                ? Object.keys(stateOfSuggestionEnum).find(key => stateOfSuggestionEnum[key as keyof typeof stateOfSuggestionEnum] === row.suggestionStatus)
                : "Chưa xác định",
        },
        {
            header: "Ngày Tạo đề xuất",
            accessorKey: "suggestionDate",
        },
        {
            header: "Người Tạo đề xuất",
            accessorKey: "suggestedBy",
        }
    ], []);
    return (
        <MyFieldset title="Danh sách đăng ký để đề xuất giáo trình">
            <MyDataTable
                isError={query.isError}
                columns={columns}
                data={query.data || []}
                renderTopToolbarCustomActions={() => (
                    <MyCenterFull>
                        <F12_2_1CreateNewCurriculum />
                        <MyButton crudType="import">Import</MyButton>
                        <MyButton crudType="export">Export</MyButton>
                        <MyButton crudType="delete">Delete</MyButton>
                    </MyCenterFull>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F12_2_UpdateNewCurriculum values={row.original} />
                        <F12_2_1DeleteNewCurriculum suggestionCode={row.original.suggestionCode || ''} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}
