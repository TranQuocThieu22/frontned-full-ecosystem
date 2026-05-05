import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyDataTable, MyTextArea } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { IProposalScoringSummaryInfoViewModel, IProposalScoringSummaryLectureViewModel } from "./interfaces/ProposalScoringSummaryViewModel";

export default function ProposalScoringSummaryEvaluate({ data }: { data: IProposalScoringSummaryInfoViewModel }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [lectures, setLectures] = useState<IProposalScoringSummaryLectureViewModel[]>([]);

    useEffect(() => {
        setLectures(data.lectures.map(lecture => ({
            ...lecture,
            score: lecture.score || undefined,
            comment: lecture.comment || undefined
        })));
    }, [data]);

    const columns = useMemo<MRT_ColumnDef<IProposalScoringSummaryLectureViewModel>[]>(() => [
        {
            header: "Mã bài giảng",
            accessorKey: "code",
        },
        {
            header: "Tên bài giảng",
            accessorKey: "name",
            size: 300
        },
        {
            header: "Người phụ trách",
            accessorKey: "chairperson",
            accessorFn: (row) => {
                return data.members.find((member) => member.role === "Chủ tịch")?.name;
            }
        },
        {
            header: "Điểm trung bình (Hệ thống tính)",
            accessorKey: "score",
            accessorFn: (row) => {
                return <MyNumberInput placeholder="Đang chờ" value={row.score} onChange={(value) => {
                    setLectures(lectures.map(lecture => lecture.id === row.id ? { ...lecture, score: value.toString() } : lecture));
                }} />
            }
        },
        {
            header: "Kết luận/Đề xuất của Hội đồng",
            accessorKey: "comment",
            accessorFn: (row) => {
                return <MyTextArea
                    placeholder="Chưa có"
                    label=" "
                    value={row.comment}
                    minRows={3}
                    maxRows={10}
                    onChange={(value) => {
                        setLectures(lectures.map(lecture => lecture.id === row.id ? { ...lecture, comment: value.target.value } : lecture));
                    }}
                />
            },
            size: 300
        },
    ], [lectures])

    return (
        <MyButtonModal
            crudType="default"
            label="Đánh giá"
            title="Chi tiết hội đồng xét duyệt"
            modalSize="70%"
            disclosure={[opened, { open, close, toggle: () => open() }]}
        >
            <MyDataTable
                columns={columns}
                data={lectures}
            />
            <MyButton
                variant="primary"
                onClick={() => {
                    console.log(lectures);
                }}
            >
                Lưu
            </MyButton>
        </MyButtonModal>
    );
}