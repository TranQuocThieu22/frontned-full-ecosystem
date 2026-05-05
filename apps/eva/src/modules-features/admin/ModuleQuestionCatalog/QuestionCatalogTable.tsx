'use client'
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Group, Paper } from "@mantine/core";
import { IconTableExport, IconTrash, IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IQuestionCatalogInfoViewModel } from "./interfaces/QuestionCatalogViewModel";
import { mockDataRead } from "./mockDataRead";
import QuestionCatalogCreate from "./QuestionCatalogCreate";
import QuestionCatalogDelete from "./QuestionCatalogDelete";
import QuestionCatalogUpdate from "./QuestionCatalogUpdate";




export default function QuestionCatalogTable() {
    const [subject, setSubject] = useState<string | undefined>("1");
    const query = useQuery<IQuestionCatalogInfoViewModel[]>({
        queryKey: [`questionCatalogTable`],
        queryFn: async () => mockDataRead
    })

    const columns = useMemo<MRT_ColumnDef<IQuestionCatalogInfoViewModel>[]>(
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
        ],
        []
    );


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
                    value={subject}
                    onChange={(value) => setSubject(value ?? undefined)}
                />
                <MyFieldset title="Danh sách bộ câu hỏi" >
                    <MyDataTable
                        enableRowSelection={false}
                        columns={columns}
                        enableRowNumbers={true}
                        data={query.data || []}

                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <QuestionCatalogCreate />
                                <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                                <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                                <MyButton color="red" leftSection={<IconTrash />}>Xóa</MyButton>
                            </Group>
                        )}
                        renderRowActions={({ row }) => (
                            <Group>
                                <QuestionCatalogUpdate data={row.original} />
                                <QuestionCatalogDelete code={row.original.maCauHoi} id={row.original.maCauHoi} />
                            </Group>
                        )}
                    />
                </MyFieldset >
            </MyFlexColumn>
        </Paper >
    )
}



