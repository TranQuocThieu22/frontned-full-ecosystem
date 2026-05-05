import { Flex, Grid, Radio, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { QuestionCatalogEssayRubricCriterionInfoViewModel, QuestionCatalogEssayRubricInfoViewModel, QuestionCatalogEssaySuggestViewModel } from "./interfaces/QuestionCatalogEssayViewModel";
import QuestionCatalogEssayRubricModal from "./QuestionCatalogEssayRubricModal";
import QuestionCatalogEssaySuggest from "./QuestionCatalogEssaySuggest";

interface Props {
    rubric?: QuestionCatalogEssayRubricInfoViewModel,
    suggest?: QuestionCatalogEssaySuggestViewModel[]
}

export default function QuestionCatalogEssay({ rubric, suggest }: Props) {
    const [type, setType] = useState<string>(rubric ? "rubric" : "suggest");

    const { data: Q_Rubric } = useQuery({
        queryKey: ['QuestionCatalogEssay'],
        queryFn: () => {
            return mockData
        }
    })
    // const { data: Q_Rubric } = useQuery({
    //     queryKey: ['QuestionCatalogEssay'],
    //     queryFn: () => {
    //         return rubric ? mockData : []
    //     }
    // })

    const columns = useMemo<MRT_ColumnDef<QuestionCatalogEssayRubricCriterionInfoViewModel>[]>(() => [
        {
            header: "Mã tiêu chí",
            accessorKey: "code",
        },
        {
            header: "Tên tiêu chí",
            accessorKey: "name",
        },
        {
            header: "Tỉ trọng",
            accessorKey: "density",
            Cell: ({ cell }) => (
                <Text>{cell.getValue() as number}%</Text>
            )
        },
        {
            header: "Xuất sắc 100%",
            accessorKey: "excellent",
        },
        {
            header: "Tốt 75%",
            accessorKey: "good",
        },
        {
            header: "Khá 50%",
            accessorKey: "average",
        },
        {
            header: "Yếu 25%",
            accessorKey: "bad",
        },
        {
            header: "Kém 0%",
            accessorKey: "veryBad",
        }
    ], []);


    return (
        <MyFieldset title="Tiêu chí chấm điểm">
            <Grid mb={4}>
                <Grid.Col span={4}>
                    <Text>Phương pháp đánh giá</Text>
                    <Stack gap={4}>
                        <Radio checked={type === "suggest"} onChange={() => { setType("suggest") }} label="Gợi ý chấm" />
                        <Radio checked={type === "rubric"} onChange={() => { setType("rubric") }} label="Rubric" />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={8}>
                    {type === "rubric" && (
                        <Flex gap={4} align="end">
                            <MySelect label="Chọn Rubric" defaultValue={'1'} data={dataRubric} />
                            <QuestionCatalogEssayRubricModal rubric={rubric} />
                        </Flex>
                    )}
                </Grid.Col>
            </Grid>
            {type === "rubric" ? (
                <MyDataTable
                    columns={columns}
                    data={Q_Rubric || []}
                />
            ) : (
                <QuestionCatalogEssaySuggest data={suggest ?? undefined} />
            )}
        </MyFieldset>
    );
}

const dataRubric = [
    { value: '1', label: 'Chấm tự luận cơ sở dữ liệu' },
    { value: '2', label: 'Chấm tự luận lập trình' },
    { value: '3', label: 'Chấm tự luận mạng máy tính' },
]

const mockData: QuestionCatalogEssayRubricCriterionInfoViewModel[] = [
    {
        id: 1,
        code: "TC001",
        name: "Phân tích yêu cầu và xác định thực thể/thuộc tính",
        density: 25,
        excellent: `Phân tích đầy đủ, chính xác yêu cầu nghiệp vụ, xác định tất cả các thực thể, thuộc tính và mối quan hệ quan trọng một cách rõ ràng, logic, không thừa/thiếu`,
        good: `Phân tích khá đầy đủ, xác định được hầu hết các thực thể/ thuộc tính quan trọng. Có thể thiếu sót nhỏ hoặc có vài yếu tố chưa tối ưu.`,
        average: `Phân tích một phần yêu cầu. Xác định được một số thực thể/thuộc tính cơ bản nhưng còn thiếu sót đáng kể hoặc có nhiều yếu tố không cần thiết/chưa chính xác.`,
        bad: `Phân tích thiếu sót trầm trọng. Xác định thực thể/ thuộc tính sai lệch hoặc không đầy đủ; không đảm bảo logic, không đáp ứng yêu cầu cơ bản`,
        veryBad: `Không thể hiện được khả năng phân tích yêu cầu hoặc xác định thực thể/thuộc tính`,
    },
    {
        id: 2,
        code: "TC002",
        name: "Chất lượng mô hình dữ liệu (ERD/Schema)",
        density: 25,
        excellent: `Phân tích đầy đủ, chính xác yêu cầu nghiệp vụ, xác định tất cả các thực thể, thuộc tính và mối quan hệ quan trọng một cách rõ ràng, logic, không thừa/thiếu`,
        good: `Phân tích khá đầy đủ, xác định được hầu hết các thực thể/ thuộc tính quan trọng. Có thể thiếu sót nhỏ hoặc có vài yếu tố chưa tối ưu.`,
        average: `Phân tích một phần yêu cầu. Xác định được một số thực thể/thuộc tính cơ bản nhưng còn thiếu sót đáng kể hoặc có nhiều yếu tố không cần thiết/chưa chính xác.`,
        bad: `Phân tích thiếu sót trầm trọng. Xác định thực thể/ thuộc tính sai lệch hoặc không đầy đủ; không đảm bảo logic, không đáp ứng yêu cầu cơ bản`,
        veryBad: `Không thể hiện được khả năng phân tích yêu cầu hoặc xác định thực thể/thuộc tính`,
    },
    {
        id: 3,
        code: "TC003",
        name: "Tính đúng đắn và hiệu quả của truy vấn SQL",
        density: 25,
        excellent: `Phân tích đầy đủ, chính xác yêu cầu nghiệp vụ, xác định tất cả các thực thể, thuộc tính và mối quan hệ quan trọng một cách rõ ràng, logic, không thừa/thiếu`,
        good: `Phân tích khá đầy đủ, xác định được hầu hết các thực thể/ thuộc tính quan trọng. Có thể thiếu sót nhỏ hoặc có vài yếu tố chưa tối ưu.`,
        average: `Phân tích một phần yêu cầu. Xác định được một số thực thể/thuộc tính cơ bản nhưng còn thiếu sót đáng kể hoặc có nhiều yếu tố không cần thiết/chưa chính xác.`,
        bad: `Phân tích thiếu sót trầm trọng. Xác định thực thể/ thuộc tính sai lệch hoặc không đầy đủ; không đảm bảo logic, không đáp ứng yêu cầu cơ bản`,
        veryBad: `Không thể hiện được khả năng phân tích yêu cầu hoặc xác định thực thể/thuộc tính`,
    },
    {
        id: 4,
        code: "TC004",
        name: "Trình bày, cấu trúc và giải thích",
        density: 25,
        excellent: `Phân tích đầy đủ, chính xác yêu cầu nghiệp vụ, xác định tất cả các thực thể, thuộc tính và mối quan hệ quan trọng một cách rõ ràng, logic, không thừa/thiếu`,
        good: `Phân tích khá đầy đủ, xác định được hầu hết các thực thể/ thuộc tính quan trọng. Có thể thiếu sót nhỏ hoặc có vài yếu tố chưa tối ưu.`,
        average: `Phân tích một phần yêu cầu. Xác định được một số thực thể/thuộc tính cơ bản nhưng còn thiếu sót đáng kể hoặc có nhiều yếu tố không cần thiết/chưa chính xác.`,
        bad: `Phân tích thiếu sót trầm trọng. Xác định thực thể/ thuộc tính sai lệch hoặc không đầy đủ; không đảm bảo logic, không đáp ứng yêu cầu cơ bản`,
        veryBad: `Không thể hiện được khả năng phân tích yêu cầu hoặc xác định thực thể/thuộc tính`,
    },
]