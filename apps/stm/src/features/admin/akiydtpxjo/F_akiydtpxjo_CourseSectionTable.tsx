'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { courseSectionService } from "@/shared/APIs/courseSectionService";
import { CourseSection } from "@/shared/interfaces/courseSection";
import { MRT_ColumnDef, MRT_TableInstance, MRT_TableOptions } from "mantine-react-table";
import { ReactNode, useMemo } from "react";

type TablePropsType = Omit<MRT_TableOptions<CourseSection>, 'columns' | 'data'> & {
    rowActionSize?: number;
    exportAble?: boolean;
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<CourseSection>;
    }) => ReactNode) | undefined;
    setSelectedRow?: (rows: CourseSection[]) => void;
    setSelectedRowId?: (data: any) => void;
};


export default function F_akiydtpxjo_CourseSectionTable({
    columnsProps, tableProps
}: {
    columnsProps: MRT_ColumnDef<CourseSection>[],
    tableProps?: TablePropsType
}) {
    const courseSection_query = useCustomReactQuery({
        queryKey: ["courseSections", "type2"],
        axiosFn: () =>
            courseSectionService.getAll({
                params: "?type=2",
                paging: {
                    pageNumber: 0,
                    pageSize: 0,
                },
            }),
    });
    const columns = useMemo<MRT_ColumnDef<CourseSection>[]>(() => columnsProps, []);
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

