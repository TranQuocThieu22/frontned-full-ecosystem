import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Grid, Radio, Stack, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable, MyFieldset, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export interface IRubricInfoViewModel {
    id: number;
    code: string; // mã tiêu chí 
    name: string; // tên tiêu chí
    density: number;  // tỉ trọng
    excellent: string; // xuất sắc
    good: string; // tốt
    average: string; // khá
    bad: string; // yếu
    veryBad: string; // kém
}

export default function EssayQuestion() {
    const [type, setType] = useState<string>("rubric");
    const { data } = useQuery({
        queryKey: ['EssayQuestion'],
        queryFn: () => {
            return mockData
        }
    })

    const criteria = [
        { id: 1, label: "Trình bày rõ ràng, mạch lạc", weight: "0%" },
        { id: 2, label: "Hiểu cơ bản về SQL", weight: "0%" },
        { id: 3, label: "Biết cách viết code truy vấn", weight: "50%" },
        { id: 4, label: "Viết đúng câu lệnh truy vấn", weight: "50%" },
    ];


    const columns = useMemo<MRT_ColumnDef<IRubricInfoViewModel>[]>(() => [
        {
            header: "Mã tiêu chí",
            accessorKey: "code",
            size: 100,
        },
        {
            header: "Tên tiêu chí",
            accessorKey: "name",
        },
        {
            header: "Tỉ trọng",
            accessorKey: "density",
            size: 100,
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
        <MyFieldset title="Danh sách chấm điểm">
            <Grid mb={4}>
                <Grid.Col span={6}>
                    <Text>Phương pháp đánh giá</Text>
                    <Stack gap={4}>
                        <Radio checked={type === "suggest"} onChange={() => { setType("suggest") }} label="Gợi ý chấm" />
                        <Radio checked={type === "rubric"} onChange={() => { setType("rubric") }} label="Rubric" />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                    {type === "rubric" && <CustomSelect label="Chọn Rubric" defaultValue={'1'} data={dataRubric} />}
                </Grid.Col>
            </Grid>
            {
                type === "rubric" ? (
                    <MyDataTable columns={columns} data={data || []} />
                ) : (
                    <Table>
                        <Table.Thead>
                            {/* <Table.Tr>
                                <Table.Th>Các tiêu chí</Table.Th>
                                <Table.Th style={{ width: '160px' }}>Tỷ trọng</Table.Th>
                            </Table.Tr> */}
                        </Table.Thead>
                        <Table.Tbody>
                            {criteria.map((criterion, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td>
                                        <MyTextInput value={criterion.label} onChange={() => { }}></MyTextInput>
                                    </Table.Td>
                                    <Table.Td>
                                        <MyTextInput value={criterion.weight} onChange={() => { }}></MyTextInput>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                )
            }
        </MyFieldset>
    );
}


const dataRubric = [
    { value: '1', label: 'Chấm tự luận cơ sở dữ liệu' },
    { value: '2', label: 'Chấm tự luận lập trình' },
    { value: '3', label: 'Chấm tự luận mạng máy tính' },
]

const mockData: IRubricInfoViewModel[] = [
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
