'use client'
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IExamPaperInfoViewModel } from "./interfaces/InfoInterface";

interface ExamPaperListModalProps {
    dis: ReturnType<typeof useDisclosure>;
}

export default function ExamPaperListModal({ dis }: ExamPaperListModalProps) {


    const examPaperList = useQuery<IExamPaperInfoViewModel[]>({
        queryKey: ["ExamPaperList"],
        queryFn: () => {
            return mockData || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<IExamPaperInfoViewModel>[]>(() => [
        { header: "Mã đề thi", accessorKey: "examPaperCode" },
        { header: "Tên đề thi", accessorKey: "examPaperName" },
    ], []);

    return (
        <MyButtonModal
            variant="transparent" crudType="default" disclosure={dis}
            title="Danh sách đề thi"
            modalSize={"90%"}
        >
            <MyFieldset title={`Danh sách đề thi`}>
                <MyFlexColumn>
                    <MyDataTable
                        enableRowSelection={true}
                        enableMultiRowSelection={false}
                        enableRowNumbers={true}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <MyButton crudType="create" color="green">Chọn</MyButton>
                            </Group>
                        )}
                        columns={columns}
                        data={examPaperList.data || []}
                    />
                </MyFlexColumn>
            </MyFieldset>
        </MyButtonModal >
    );
}

const mockData: IExamPaperInfoViewModel[] = [
    {
        id: 1,
        examPaperCode: "564",
        examPaperName: "Đề thi Cơ sở dữ liệu học kỳ 1 - 2024"
    },
    {
        id: 1,
        examPaperCode: "566",
        examPaperName: "Đề thi Cơ sở dữ liệu học kỳ 1 - 2025"
    },
    {
        id: 3,
        examPaperCode: "125",
        examPaperName: "Đề thi Toán cao cấp học kỳ 1 - 2024"
    }
];