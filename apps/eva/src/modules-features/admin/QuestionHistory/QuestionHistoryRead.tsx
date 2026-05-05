'use client'

import { Group, Select } from "@mantine/core";
import { MyDataTable, MyDateInput, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import QuestionDetail from "./QuestionDetail";


export default function QuestionHistoryRead() {

    const columns = useMemo<MRT_ColumnDef<Question>[]>(
        () => [
            {
                header: "Mã câu hỏi",
                accessorKey: "QuestionCode",

            },
            {
                header: "Nội dung câu hỏi",
                accessorKey: "QuestionContent",
                size: 500
            },
            {
                header: "Loại câu hỏi",
                accessorKey: "QuestionType",
                size: 230


            },
            {
                header: "Số đáp án",
                accessorKey: "NumberOfAnswers"
            },
            {
                header: "Mã chương",
                accessorKey: "ChapterCode",

            },
            {
                header: "Chương chủ đề",
                accessorKey: "ChapterSubject",
                size: 250
            },
            {
                header: "Độ khó",
                accessorKey: "Difficulty",

            },
            {
                header: "Mức độ nhận thức",
                accessorKey: "CognitiveObjective"
            },
            {
                header: "CLO",
                accessorKey: "CLO",

            },
            {
                header: "Số lần sử dụng",
                accessorKey: "UsageCount"
            },
            {
                header: "Lịch sử sử dụng",
                accessorKey: "lichSuSuDung",
                accessorFn(originalRow) {
                    return <QuestionDetail questionData={originalRow} />
                },
            },
            {
                header: "Ngày duyệt",
                accessorKey: "ngayDuyet",
                // accessorFn(originalRow) {
                //     return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                // },

            },
            {
                header: "Người duyệt",
                accessorKey: "nguoiDuyet",

            },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },

            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",

            // },

        ],
        []
    );
    // if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    // if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."
    return (
        <>
            <Group >
                <Select
                    w={450}
                    clearable={false}
                    placeholder='Chọn môn học'
                    label='Môn học'
                    data={monHocData?.map((item: any) => ({
                        value: item.id?.toString()!,
                        label: item.name! == null ? "" : item.name!
                    }))}
                    defaultValue={monHocData?.[0]?.id?.toString()}
                />
                <Select
                    clearable={false}
                    // clearable
                    placeholder='Chọn độ khó'
                    label='Độ khó'
                    data={doKho?.map((item: any) => ({
                        value: item.id?.toString()!,
                        label: item.name! == null ? "" : item.name!
                    }))}
                    defaultValue={doKho?.[0]?.id?.toString()}
                />
                <Select
                    clearable={false}
                    // clearable
                    placeholder='Chọn Mức độ nhận thức'
                    label='Nhận thức'
                    data={mucDoNhanThuc?.map((item: any) => ({
                        value: item.id?.toString()!,
                        label: item.name! == null ? "" : item.name!
                    }))}
                    defaultValue={mucDoNhanThuc?.[0]?.id?.toString()}
                />
                <Select
                    w={450}

                    clearable={false}
                    placeholder='Chọn CLO môn học'
                    label='CLO môn học'
                    data={cloMonHoc?.map((item: any) => ({
                        value: item.id?.toString()!,
                        label: item.name! == null ? "" : item.name!
                    }))}
                    defaultValue={cloMonHoc?.[0]?.id?.toString()}
                />

            </Group>
            <Group mb={10}>
                <MyDateInput defaultValue={new Date()} clearable={false} label="Từ ngày"  ></MyDateInput>
                <MyDateInput defaultValue={new Date()} clearable={false} label="Đến ngày"  ></MyDateInput>
            </Group>
            <MyFieldset title="Danh sách bộ câu hỏi">
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    exportAble
                    data={questionList}
                    initialState={{
                        columnVisibility: {
                            nguoiCapNhat: false,
                            ngayCapNhat: false,
                            ngayDuyet: false,
                            nguoiDuyet: false
                        }
                    }}

                />
            </MyFieldset>

        </>
    )
}

const loaiCauHoiData = [
    { id: 1, code: 'TRAC_NGHIEM', name: 'Trắc nghiệm' },
    { id: 2, code: 'TU_LUAN', name: 'Tự luận' },
    { id: 3, code: 'DIEN_KHUYET', name: 'Điền khuyết' },
    { id: 4, code: 'GHEP_NOI', name: 'Ghép nối' },
    { id: 5, code: 'VIET', name: 'Viết' }
];
const monHocData = [
    { id: 1, code: 'CSDL', name: 'CSDLCB - Cơ sở dữ liệu cơ bản' },

];

const mucDoNhanThuc = [
    { id: 1, code: 'C1', name: 'Ghi nhớ' },
    { id: 2, code: 'C2', name: 'Hiểu' },
    { id: 3, code: 'C3', name: 'Vận dụng' },
    { id: 4, code: 'C4', name: 'Phân tích' },
    { id: 5, code: 'C5', name: 'Đánh giá' },
    { id: 6, code: 'C6', name: 'Sáng tạo' }
];

const cloMonHoc = [
    {
        id: 1,
        code: 'CLO1',
        name: 'Sinh viên có khả năng hiểu và giải thích'
    },
    {
        id: 2,
        code: 'CLO2',
        name: 'Sinh viên có khả năng thiết kế mô hình dữ liệu quan hệ'
    },
    {
        id: 3,
        code: 'CLO3',
        name: 'Sinh viên có khả năng viết các truy vấn SQL'
    },
    {
        id: 4,
        code: 'CLO4',
        name: 'Sinh viên có khả năng phân tích và đánh giá hiệu suất của CSDL'
    }
];

const doKho = [
    { id: 1, code: 'DE', name: 'Dễ' },
    { id: 2, code: 'TRUNG_BINH', name: 'Trung bình' },
    { id: 3, code: 'KHO', name: 'Khó' },
    { id: 4, code: 'RAT_KHO', name: 'Rất khó' }
];

const questionList: Question[] = [
    {
        "QuestionCode": "CH0001",
        "QuestionContent": "Trong mô hình CSDL quan hệ, một bảng (table) là một tập hợp các...",
        "QuestionType": "Trắc nghiệm (1 đáp án)",
        "NumberOfAnswers": "4",
        "ChapterCode": "C1",
        "ChapterSubject": "Chủ đề 1: Khái niệm CSDL",
        "Difficulty": "Dễ",
        "CognitiveObjective": "Ghi nhớ",
        "CLO": "CLO1",
        "UsageCount": "15",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0002",
        "QuestionContent": "SQL là viết tắt của thuật ngữ nào?",
        "QuestionType": "Trắc nghiệm (Nhiều đáp án)",
        "NumberOfAnswers": "4",
        "ChapterCode": "C1",
        "ChapterSubject": "Chủ đề 1: Khái niệm CSDL",
        "Difficulty": "Dễ",
        "CognitiveObjective": "Ghi nhớ",
        "CLO": "CLO1",
        "UsageCount": "25",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0003",
        "QuestionContent": "Trong cơ sở dữ liệu quan hệ để tạo một bảng mới ta sử dụng lệnh ____.",
        "QuestionType": "Điền khuyết",
        "NumberOfAnswers": "1",
        "ChapterCode": "C2",
        "ChapterSubject": "Chủ đề 2: DDL",
        "Difficulty": "Trung bình",
        "CognitiveObjective": "Hiểu",
        "CLO": "CLO3",
        "UsageCount": "15",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0004",
        "QuestionContent": "Khóa chính (Primary Key) phải là ____ và ____",
        "QuestionType": "Điền khuyết",
        "NumberOfAnswers": "2",
        "ChapterCode": "C1",
        "ChapterSubject": "Chủ đề 1: Khái niệm CSDL",
        "Difficulty": "Trung bình",
        "CognitiveObjective": "Hiểu",
        "CLO": "CLO2",
        "UsageCount": "5",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0005",
        "QuestionContent": "Nối mất thuật ngữ trật với định nghĩa phù hợp bên phải",
        "QuestionType": "Ghép nối",
        "NumberOfAnswers": "1",
        "ChapterCode": "C1",
        "ChapterSubject": "Chủ đề 1: Khái niệm CSDL",
        "Difficulty": "Trung bình",
        "CognitiveObjective": "Hiểu",
        "CLO": "CLO2",
        "UsageCount": "5",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0006",
        "QuestionContent": "Hãy giải thích sự khác biệt cơ bản giữa mô hình CSDL quan hệ (Relational Database) và mô hình CSDL NoSQL (Non-Relational Database). Nêu ví dụ về trường hợp sử dụng phù hợp cho mỗi loại. ",
        "QuestionType": "Tự luận",
        "NumberOfAnswers": "1",
        "ChapterCode": "C4",
        "ChapterSubject": "Chủ đề 1: Khái niệm CSDL",
        "Difficulty": "Khó",
        "CognitiveObjective": "Phân tích",
        "CLO": "CLO4",
        "UsageCount": "35",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0007",
        "QuestionContent": "Cho lược đồ quan hệ: SinhVien (MaSV, TenSV, NgaySinh, MaKhoa) và Khoa (MaKhoa, TenKhoa). Viết các câu lệnh SQL để:\r\na) Thêm một sinh viên mới\nb) Cập nhật tên khoa của một sinh viên\nc) Liệt kê tất cả sinh viên thuộc khoa \"Công nghệ thông tin\".",
        "QuestionType": "Tự luận",
        "NumberOfAnswers": "1",
        "ChapterCode": "C2",
        "ChapterSubject": "Chủ đề 2: DMLL",
        "Difficulty": "Khó",
        "CognitiveObjective": "Phân tích",
        "CLO": "CLO3",
        "UsageCount": "15",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0008",
        "QuestionContent": "Mô tả ngắn gọn về ý nghĩa và tầm quan trọng trong việc chuẩn hóa dữ liệu (Normalization) trong thiết kế cơ sở dữ liệu. Bạn có thể nêu ví dụ minh họa cho các dạng chuẩn (1NF, 2NF, 3NF) nếu muốn.",
        "QuestionType": "Nói",
        "NumberOfAnswers": "1",
        "ChapterCode": "C3",
        "ChapterSubject": "Chủ đề 3: Chuẩn hóa",
        "Difficulty": "Rất khó",
        "CognitiveObjective": "Phân tích",
        "CLO": "CLO5",
        "UsageCount": "5",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    },
    {
        "QuestionCode": "CH0009",
        "QuestionContent": "Trong mô hình CSDL quan hệ, một bảng (table) là một tập hợp các...",
        "QuestionType": "Viết",
        "NumberOfAnswers": "1",
        "ChapterCode": "C1",
        "ChapterSubject": "Chủ đề 1: Khái niệm CSDL",
        "Difficulty": "Dễ",
        "CognitiveObjective": "Ghi nhớ",
        "CLO": "CLO1",
        "UsageCount": "51",
        "ngayDuyet": '27/5/2025',
        "nguoiDuyet": "Phạm Minh Lâm"
    }
]

interface Question {
    QuestionCode: string;
    QuestionContent: string;
    QuestionType: string;
    NumberOfAnswers: string; // Or number, if it's always a numerical value
    ChapterCode: string;
    ChapterSubject: string;
    Difficulty: string;
    CognitiveObjective: string;
    CLO: string;
    UsageCount: string; // Or number, if it's always a numerical value
    ngayDuyet?: string;
    nguoiDuyet?: string;
}
