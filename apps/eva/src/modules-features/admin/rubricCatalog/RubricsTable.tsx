'use client'
import { IRubrics, rubricService } from "@/shared/APIs/rubricService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Group } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import useS_Rubrics from "../ModuleRubric/RubricCatalog/useS_Rubrics";
import RubricsCreate from "./RubricsCreate";
import RubricsDelete from "./RubricsDelete";
import RubricsDeleteList from "./RubricsDeleteList";
import RubricsUpdate from "./RubricsUpdate";
export default function RubricsTable() {
    const store = useS_Rubrics()
    const { data } = useQuery({
        queryKey: ['RubricsTable'],
        queryFn: () => {
            return mockData
        }
    })
    const rubricsQuery = useMyReactQuery({
        queryKey: [`CodeFormulaRead`],
        axiosFn: async () => rubricService.getAll({ params: `?Cols=EVASubject,EVAEvaluation` })
    })
    const columns = useMemo<MRT_ColumnDef<IRubrics>[]>(() => [
        {
            header: "Mã rubrics",
            accessorKey: "code",
        },
        {
            header: "Tên rubrics",
            accessorKey: "name",
        },
        {
            header: "Mã môn học",
            accessorKey: "evaSubject.code",
        },
        {
            header: "Tên môn học",
            accessorKey: "evaSubject.name",
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        }
    ], []);

    return (
        <MyFieldset title="Danh mục rubrics">
            <MyDataTable
                isLoading={rubricsQuery.isLoading}
                isError={rubricsQuery.isError}
                columns={columns}
                enableRowSelection
                enableRowNumbers
                data={rubricsQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <RubricsCreate />
                        <CustomButton color="green" leftSection={<IconUpload />}>Import</CustomButton>
                        <CustomButton color="teal" leftSection={<IconTableExport />}>Export</CustomButton>
                        <RubricsDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <Group>
                        <RubricsUpdate rubric={row.original} />
                        <RubricsDelete code={row.original.code || ''} id={row.original.id || 0} />
                    </Group>
                )}
            />
        </MyFieldset>
    );
}

const mockData = [
    {
        id: 1,
        code: "TL.CSDL",
        name: "Chấm tự luận cơ sở dữ liệu",
        codeCourse: "CSDLCB",
        nameCourse: "Cơ sở dữ liệu cơ bản",
        note: "",
        codeScale: "1"
    },
    {
        id: 2,
        code: "TL.LY",
        name: "Chấm tự luận Vật lý",
        codeCourse: "LY",
        nameCourse: "Vật lý",
        note: "",
        codeScale: "1"
    },
    {
        id: 3,
        code: "TL.TOAN",
        name: "Chấm tự luận Toán",
        codeCourse: "TOAN",
        nameCourse: "Toán",
        note: "",
        codeScale: "1"
    },
    {
        id: 4,
        code: "TL.ENG",
        name: "Chấm tự luận Tiếng Anh",
        codeCourse: "TOEIC",
        nameCourse: "TOEIC",
        note: "",
        codeScale: "1"
    },
    {
        id: 5,
        code: "TL.VAN",
        name: "Chấm tự luận Văn học",
        codeCourse: "VAN",
        nameCourse: "Văn học",
        note: "",
        codeScale: "1"
    }
]