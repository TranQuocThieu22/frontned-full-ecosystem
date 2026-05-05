
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Grid, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTableExport, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MySelect, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { QuestionCatalogEssayRubricCriterionInfoViewModel, QuestionCatalogEssayRubricInfoViewModel } from "./interfaces/QuestionCatalogEssayViewModel";
import QuestionCatalogEssayRubricCreate from "./QuestionCatalogEssayRubricCreate";
import QuestionCatalogEssayRubricDelete from "./QuestionCatalogEssayRubricDelete";
import QuestionCatalogEssayRubricUpdate from "./QuestionCatalogEssayRubricUpdate";

interface Props {
    rubric?: QuestionCatalogEssayRubricInfoViewModel
}

export default function QuestionCatalogEssayRubricModal({ rubric }: Props) {
    const form = useForm<QuestionCatalogEssayRubricInfoViewModel>({
        initialValues: rubric
    })
    const { data: Q_Rubric } = useQuery({
        queryKey: ['QuestionCatalogEssayRubricModal'],
        queryFn: () => {
            return rubric ? mockData : []
        }
    })

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
        <CustomButtonCreateUpdate
            buttonProps={{
                children: "Thêm Rubric"
            }}
            modalProps={{
                size: "xxl"
            }}
            form={form} onSubmit={(values) => { }} >
            <Grid w="100%">
                <Grid.Col span={4}>
                    <MyTextInput label="Mã Rubric" {...form.getInputProps("code")} />
                    <MySelect label="Mã Môn học" data={mockData_course} {...form.getInputProps("codeCourse")} />
                    <MySelect label="Thang đo đánh giá" data={mockData_scale} {...form.getInputProps("codeScale")} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <MyTextInput label="Tên Rubric" {...form.getInputProps("name")} />
                    <MyTextInput label="Tên Môn học" {...form.getInputProps("nameCourse")} />
                </Grid.Col>
            </Grid>
            <MyDataTable
                columns={columns}
                data={Q_Rubric || []}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <QuestionCatalogEssayRubricCreate />
                        <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                        <MyButton color="red" leftSection={<IconTrash />}>Xóa</MyButton>
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <Group>
                        <QuestionCatalogEssayRubricUpdate values={row.original} />
                        <QuestionCatalogEssayRubricDelete code={row.original.code} id={row.original.id} />
                    </Group>
                )}
            />
        </CustomButtonCreateUpdate>
    );
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
]

const mockData_course = [
    { label: "CSDLCB", value: "CSDLCB" },
    { label: "LY", value: "LY" },
    { label: "TOAN", value: "TOAN" },
    { label: "TOEIC", value: "TOEIC" },
    { label: "VAN", value: "VAN" },
]

const mockData_scale = [
    { label: "5 Bậc mức độ chất lượng", value: "1" },
    { label: "10 Bậc mức độ chất lượng", value: "2" },
    { label: "15 Bậc mức độ chất lượng", value: "3" },
]
