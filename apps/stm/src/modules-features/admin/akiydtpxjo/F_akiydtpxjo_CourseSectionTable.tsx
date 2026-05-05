'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_CourseSection_Get from "@/hooks/query-hooks/CourseSection/useQ_CourseSection_Get";
import { ICourseSection } from "@/interfaces/courseSection";
import { MRT_ColumnDef, MRT_TableInstance, MRT_TableOptions } from "mantine-react-table";
import { ReactNode, useMemo } from "react";

type TablePropsType = Omit<MRT_TableOptions<ICourseSection>, 'columns' | 'data'> & {
    rowActionSize?: number;
    exportAble?: boolean;
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<ICourseSection>;
    }) => ReactNode) | undefined;
    setSelectedRow?: (rows: ICourseSection[]) => void;
    setSelectedRowId?: (data: any) => void;
};


export default function F_akiydtpxjo_CourseSectionTable({
    columnsProps, tableProps
}: {
    columnsProps: MRT_ColumnDef<ICourseSection>[],
    tableProps?: TablePropsType
}) {
    const courseSection_query = useQ_CourseSection_Get({
        body: {
            type: 2,
            pageNumber: 0,
            pageSize: 0
        }
    })
    const columns = useMemo<MRT_ColumnDef<ICourseSection>[]>(() => columnsProps, []);
    if (courseSection_query.isLoading) return "Đang tải dữ liệu..."
    if (courseSection_query.isError) return "Có lỗi xảy ra!"
    return (
        <MyDataTable
            exportAble
            columns={columns}
            data={courseSection_query.data!}
            {...tableProps}
        />
    )
}

