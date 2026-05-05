'use client'
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IQuestionReviewInfoViewModel } from "./interfaces/QuestionReviewViewModel";
import { mockDataRead } from "./mockDataRead";
import QuestionReviewModal from "./QuestionReviewModal";




export default function QuestionReviewTable() {
    const [suject, setSuject] = useState<string | undefined>("1");
    const query = useQuery<IQuestionReviewInfoViewModel[]>({
        queryKey: [`questionReviewTable`],
        queryFn: async () => mockDataRead
    })



    const columns = useMemo<MRT_ColumnDef<IQuestionReviewInfoViewModel>[]>(
        () => [
            {
                header: "Mã câu hỏi",
                accessorKey: "maCauHoi",
            },
            {
                header: "Nội dung câu hỏi",
                accessorKey: "noiDungCauHoi",
            },
            {
                header: "Loại câu hỏi",
                accessorKey: "loaiCauHoi",
            },
            {
                header: "Số đáp án",
                accessorKey: "soDapAn",
            },
            {
                header: "Mã chương",
                accessorKey: "maChuong",
            },
            {
                header: "Chương chủ đề",
                accessorKey: "chuongChuDe",
            },
            {
                header: "Độ khó",
                accessorKey: "doKho",
            },
            {
                header: "Mức độ nhận thức",
                accessorKey: "mucDoNhanThuc",
            },
            {
                header: "CLO",
                accessorKey: "clo",
            },
            {
                header: "Trạng thái",
                accessorKey: "trangThai",
            },
            {
                header: "Ngày duyệt",
                accessorKey: "ngayDuyet",
            },
            {
                header: "Người duyệt",
                accessorKey: "nguoiDuyet",
            },
        ],
        []
    );




    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <Paper p={"md"}>
            <MyFlexColumn>
                <CustomSelect
                    w={"300px"}
                    label="Chọn môn"
                    data={[
                        { value: "1", label: "CSDL-Cơ sở dữ liệu cơ bản" },
                        { value: "2", label: "CTDL-Giải thuật và cấu trúc dữ liệu" },
                        { value: "3", label: "LTW- Lập trình web" },
                    ]}
                    value={suject}
                    onChange={(value) => setSuject(value ?? undefined)}
                />
                <MyFieldset title="Danh sách bộ câu hỏi" >
                    <MyDataTable
                        enableRowSelection={false}
                        columns={columns}
                        enableRowNumbers={true}
                        data={query.data!}
                        exportAble={true}
                        renderRowActions={({ row }) => {
                            return (
                                <QuestionReviewModal data={row.original} />
                            )
                        }}
                    />
                </MyFieldset >
            </MyFlexColumn>
        </Paper >
    )
}



