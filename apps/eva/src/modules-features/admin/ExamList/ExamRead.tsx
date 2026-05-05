import { IExam, examService } from "@/shared/APIs/examService";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ExamCreate from "./ExamCreate";
import ExamDelete from "./ExamDelete";
import ExamDeleteList from "./ExamDeleteList";
import ExamUpdate from "./ExamUpdate";

export default function ExamRead() {
    const disc = useDisclosure()
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })


    const examListQuery = useMyReactQuery({
        queryKey: ['examListQuery'],
        axiosFn: async () => examService.getAll({ cols: ['EVAExamSections'] })
    }
    )

    const columns = useMemo<MRT_ColumnDef<IExam>[]>(
        () => [
            {
                header: "Mã kỳ thi",
                accessorKey: "code",
            },
            {
                header: "Tên kỳ thi",
                accessorKey: "name"
            },
            {
                header: "Ngày bắt đầu",
                accessorKey: "startDate",
                accessorFn(originalRow) {
                    return originalRow.startDate
                        ? dateUtils.toDDMMYYYY(new Date(originalRow.startDate))
                        : "";
                },

            },
            {
                header: "Ngày kết thúc",
                accessorKey: "endDate",
                accessorFn(originalRow) {
                    return originalRow.endDate
                        ? dateUtils.toDDMMYYYY(new Date(originalRow.endDate))
                        : "";
                },

            },
            {
                header: "Số lượng môn thi",
                accessorKey: "subjectQuantity",

            },
            {
                header: "Số lượng ca thi",
                accessorKey: "examSectionQuantity",

            },
            {
                header: "Ghi chú",
                accessorKey: "note",

            },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",
            // },
        ],
        []
    );

    return (
        <MyDataTable
            isLoading={examListQuery.isLoading}
            isError={examListQuery.isError}
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={examListQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Group>
                        <ExamCreate />
                        <MyButton crudType="import" />
                        <MyButton crudType="export" />
                        <ExamDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        <MyButton bg={'green'}> Đồng bộ từ EduSoft.Net</MyButton>

                    </Group>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <ExamUpdate examData={row.original} />
                        <ExamDelete id={row.original.id || 0} code={row.original.code || ''} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
const mockData = [
    {
        "code": "Z2024T1D1",
        "Exam_Name": "Thi cuối học kỳ Đợt 1 năm học 2024 - học kỳ 1",
        "Start_Date": "15/12/2024",
        "End_Date": "28/12/2024",
        "Number_of_Subjects": 12,
        "Number_of_Exams": 48,
        "Notes": null
    },
    {
        "code": "Z2024T1D2",
        "Exam_Name": "Thi cuối học kỳ Đợt 2 năm học 2024 - học kỳ 1",
        "Start_Date": "15/12/2024",
        "End_Date": "28/12/2024",
        "Number_of_Subjects": 17,
        "Number_of_Exams": 35,
        "Notes": null
    }
]