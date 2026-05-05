import { QuestionCatalogEssayRubricCriterionInfoViewModel } from '@/modules-features/admin/ModuleQuestionCatalog/QuestionCatalogEssay/interfaces/QuestionCatalogEssayViewModel';
import { Checkbox, Group, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MyDataTable, MyFieldset } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import classes from '../Demo.module.css';

export default function EssayRubricGrading() {
    const { data: Q_Rubric } = useQuery({
        queryKey: ['EssayRubricGrading'],
        queryFn: () => {
            return mockData
        }
    })


    const columns = useMemo<MRT_ColumnDef<QuestionCatalogEssayRubricCriterionInfoViewModel>[]>(() => [
        {
            header: "Mã tiêu chí",
            accessorKey: "code",
            size: 100
        },
        {
            header: "Tên tiêu chí",
            accessorKey: "name",
            size: 100
        },
        {
            header: "Tỉ trọng",
            accessorKey: "density",
            Cell: ({ cell }) => (
                <Text>{cell.getValue() as number}%</Text>
            ),
            size: 100
        },
        {
            size: 300,
            header: "Xuất sắc 100%",
            accessorKey: "excellent",
            accessorFn: (row) => {
                return (
                    <Checkbox.Card className={classes.root} value={row.name} key={row.name} withBorder>
                        <Group wrap="nowrap" align="flex-start">
                            <Checkbox.Indicator />
                            <div>
                                <Text className={classes.description}>{row.excellent}</Text>
                            </div>
                        </Group>
                    </Checkbox.Card>
                )
            }
        },
        {
            size: 300,
            header: "Tốt 75%",
            accessorKey: "good",
            accessorFn: (row) => {
                return (
                    <Checkbox.Card className={classes.root} value={row.name} key={row.name} withBorder>
                        <Group wrap="nowrap" align="flex-start">
                            <Checkbox.Indicator />
                            <div>
                                <Text className={classes.description}>{row.good}</Text>
                            </div>
                        </Group>
                    </Checkbox.Card>
                )
            }
        },
        {
            size: 300,

            header: "Khá 50%",
            accessorKey: "average",
            accessorFn: (row) => {
                return (
                    <Checkbox.Card className={classes.root} value={row.name} key={row.name} withBorder>
                        <Group wrap="nowrap" align="flex-start">
                            <Checkbox.Indicator />
                            <div>
                                <Text className={classes.description}>{row.average}</Text>
                            </div>
                        </Group>
                    </Checkbox.Card>
                )
            }
        },
        {
            size: 300,

            header: "Yếu 25%",
            accessorKey: "bad",
            accessorFn: (row) => {
                return (
                    <Checkbox.Card className={classes.root} value={row.name} key={row.name} withBorder>
                        <Group wrap="nowrap" align="flex-start">
                            <Checkbox.Indicator />
                            <div>
                                <Text className={classes.description}>{row.bad}</Text>
                            </div>
                        </Group>
                    </Checkbox.Card>
                )
            }


        },
        {
            size: 300,

            header: "Kém 0%",
            accessorKey: "veryBad",
            accessorFn: (row) => {
                return (
                    <Checkbox.Card className={classes.root} value={row.name} key={row.name} withBorder>
                        <Group wrap="nowrap" align="flex-start">
                            <Checkbox.Indicator />
                            <div>
                                <Text className={classes.description}>{row.veryBad}</Text>
                            </div>
                        </Group>
                    </Checkbox.Card>
                )
            }
        }
    ], []);

    return (
        <MyFieldset title='Tiêu chí chấm điểm'>
            <MyDataTable
                columns={columns}
                data={Q_Rubric || []}
            />
        </MyFieldset>
    )
}
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