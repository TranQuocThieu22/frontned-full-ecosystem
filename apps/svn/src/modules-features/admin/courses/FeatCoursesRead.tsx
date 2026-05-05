'use client'

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButton, MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import FeatCourseDeleteList from "./FeatCourseDeleteList";
import FeatCoursesCreate from "./FeatCoursesCreate";
import FeatCoursesDelete from "./FeatCoursesDelete";
import FeatCoursesUpdate from "./FeatCoursesUpdate";

export interface I_ukagvjhxgy_Read {
    id?: number; // STT
    code?: string; // Mã khóa
    name?: string; // Tên khóa
    coeSemesterStartId?: number; // Học kì bắt đầu
    coeSemesterEndId?: number; // Học kì kết thúc
    coeDegreeLevelId?: number; // 
    coeProgramId?: number;
    coeUnitId?: number;
    coeSemesterStart?: string | null;
    coeSemesterEnd?: string | null;
    coeDegreeLevel?: string | null;
    coeProgram?: string | null;
    coeProgramName?: string | null;
    coeUnit?: string | null;
    coeUnitName?: string | null;
    note?: string; // Ghi chú
    concurrencyStamp?: string; // ID thay đổi
    isEnabled?: boolean; // Đã xóa
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date | undefined; // Ngày cập nhật
}

export default function FeatCoursesRead() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const columns = useMemo<MRT_ColumnDef<I_ukagvjhxgy_Read>[]>(() => [
        { header: "Mã khóa", accessorKey: "code" },
        { header: "Tên khóa", accessorKey: "name" },
        { header: "Chương trình", accessorKey: "programName" },
        { header: "Khoa", accessorKey: "unitName" },

    ], []);
    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <FeatCoursesCreate />
                                <MyButton crudType="import" />
                                <MyButton crudType="export" />
                                <FeatCourseDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={mockData || []}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <FeatCoursesUpdate values={row.original} />
                            <FeatCoursesDelete values={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}

const mockData = [{
    code: "KTO21",
    name: "Kế toán 2021",
    programName: "Kế toán",
    unitName: "Kinh tế"
}]