import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Group, NumberFormatter } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton } from "aq-fe-framework/components";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_6zq8o5gd8o_Create from "./F_6zq8o5gd8o_Create";
import F_6zq8o5gd8o_Delete from "./F_6zq8o5gd8o_Delete";
import F_6zq8o5gd8o_Update from "./F_6zq8o5gd8o_Update";

export interface I_6zq8o5gd8o {
    id?: number
    code?: string
    name?: string,
    courseCode: string;
    courseName: string;
    startDate?: string;
    endDate?: string;
    typeOfDiscount: string;
    applicable: number;
}

export default function F_6zq8o5gd8o_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const query = useQuery<I_6zq8o5gd8o[]>({
        queryKey: [`F_6zq8o5gd8o_Read`],
        queryFn: async () => {
            return mokData;
        }
    })

    const columns = useMemo<MRT_ColumnDef<I_6zq8o5gd8o>[]>(
        () => [
            {
                header: "Mã học viên",
                accessorKey: "code",
            },
            {
                header: "Họ tên",
                accessorKey: "name"
            },
            {
                header: "Mã khóa học",
                accessorKey: "courseCode"
            },
            {
                header: "Tên khóa học",
                accessorKey: "courseName"
            },
            {
                header: "Ngày bắt đầu",
                accessorFn: (row) => dayjs(row.startDate).format('DD/MM/YYYY')
            },
            {
                header: "Ngày kết thúc",
                accessorFn: (row) => dayjs(row.endDate).format('DD/MM/YYYY')
            },
            {
                header: "Loại giảm giá",
                accessorKey: "typeOfDiscount"
            },
            {
                header: "Mức áp dụng",
                accessorFn: (row) => <NumberFormatter thousandSeparator="." decimalSeparator="," value={row.applicable} />
            },
        ],
        []
    );

    const exportConfig = {
        fields: [
            {
                header: "Mã học viên",
                fieldName: "code",
            },
            {
                header: "Họ tên",
                fieldName: "name"
            },
            {
                header: "Mã khóa học",
                fieldName: "courseCode"
            },
            {
                header: "Tên khóa học",
                fieldName: "courseName"
            },
            {
                header: "Ngày bắt đầu",
                fieldName: "startDate"
            },
            {
                header: "Ngày kết thúc",
                fieldName: "endDate"
            },
            {
                header: "Loại giảm giá",
                fieldName: "typeOfDiscount"
            },
            {
                header: "Mức áp dụng",
                fieldName: "applicable"
            },
        ]
    };

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."

    return (
        <MyFieldset title="Danh sách giảm giá cá nhân">
            <MyDataTable
                columns={columns}
                data={query.data!}
                enableRowSelection
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_6zq8o5gd8o_Create />
                        <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                            console.log(form_multiple.values);

                        }} >s</AQButtonCreateByImportFile>

                        <AQButtonExportData
                            objectName="danh_sach_giam_gia_ca_nhan"
                            data={query.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete">Xóa</MyButton>
                    </Group>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F_6zq8o5gd8o_Update values={row.original} />
                            <F_6zq8o5gd8o_Delete code={row.original.code!} id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}





const mokData: I_6zq8o5gd8o[] = [
    {
        id: 1,
        code: "HV000121",
        name: "Tô Ngọc Lan",
        courseCode: "TACB1",
        courseName: "Tiếng Anh căn bản 1",
        startDate: "2005-02-01",
        endDate: "2025-12-30",
        typeOfDiscount: "Giảm giá theo số tiền",
        applicable: 1000000
    }
]
