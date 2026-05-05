import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import QuestionInfo from "./QuestionInfo";

export default function QuestionDetail({ questionData }: { questionData: any }) {
    const disc = useDisclosure()
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                header: "Mã Kỳ thi",
                accessorKey: "ExamCode",

            },
            {
                header: "Tên kỳ thi",
                accessorKey: "ExamName"
            },
            {
                header: "Mã đề thi",
                accessorKey: "ExamID",
                size: 30
            },
            {
                header: "Ngày thi",
                accessorKey: "ExamDate",

            },
            {
                header: "Số bài làm",
                accessorKey: "NumberOfSubmissions"
            },
            {
                header: "Tỷ lệ trả lời đúng",
                accessorKey: "CorrectAnswerRate",

            },

            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },

            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",

            },

        ],
        []
    );
    return (
        <MyButtonModal title="Lịch sử sử dụng câu hỏi"
            label="Xem chi tiết"
            modalSize={"80%"}
            disclosure={disc}>
            <QuestionInfo questionData={questionData} />
            <MyFieldset title="Danh sách bộ câu hỏi">
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    exportAble
                    data={questionDetailData}


                />
            </MyFieldset>
        </MyButtonModal>
    )
}
const questionDetailData = [
    {
        "ExamCode": "K20251-11",
        "ExamName": "Cơ sở dữ liệu cơ bản năm 2025 học kỳ 1 đợt 1",
        "ExamID": "458",
        "ExamDate": "12/05/2025",
        "NumberOfSubmissions": "36",
        "CorrectAnswerRate": "86%"
    },
    {
        "ExamCode": "K20251-11",
        "ExamName": "Cơ sở dữ liệu cơ bản năm 2025 học kỳ 1 đợt 1",
        "ExamID": "454",
        "ExamDate": "12/05/2025",
        "NumberOfSubmissions": "36",
        "CorrectAnswerRate": "56%"
    },
    {
        "ExamCode": "K20251-11",
        "ExamName": "Cơ sở dữ liệu cơ bản năm 2025 học kỳ 1 đợt 1",
        "ExamID": "478",
        "ExamDate": "12/05/2025",
        "NumberOfSubmissions": "36",
        "CorrectAnswerRate": "36%"
    },
    {
        "ExamCode": "K20251-11",
        "ExamName": "Cơ sở dữ liệu cơ bản năm 2025 học kỳ 1 đợt 1",
        "ExamID": "418",
        "ExamDate": "12/05/2025",
        "NumberOfSubmissions": "36",
        "CorrectAnswerRate": "76%"
    }
]