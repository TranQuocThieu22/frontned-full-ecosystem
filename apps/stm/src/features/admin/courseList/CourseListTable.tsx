"use client";

import { ENUM_COURSE_STATUS } from "@/constants/enum/global";
import { courseService } from "@/shared/APIs/courseService";
import { Course } from "@/shared/interfaces/course";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Badge } from "@mantine/core";
import { useMemo } from "react";
import CourseListCreateUpdate from "./CourseListCreateUpdate";

const CourseStatusColor: Record<number, string> = {
    1: "gray", 2: "green", 3: "orange", 4: "blue",
    5: "yellow", 6: "teal", 7: "indigo", 8: "red",
};

function CourseStatusBadge({ status }: { status?: number }) {
    const s = status ?? 0;
    const label = (ENUM_COURSE_STATUS as unknown as Record<number, string>)[s] ?? "Chưa có trạng thái";
    const color = CourseStatusColor[s] ?? "gray";
    return <Badge w="100%" variant="light" color={color} radius="xs">{label}</Badge>;
}

export default function CourseListTable() {
    const query = useCustomReactQuery({
        queryKey: ["courses"],
        axiosFn: () => courseService.getList({
            courseTimeClusterIds: [], courseSectionId: 0, programId: 0, status: 0,
            type: 1, courseIds: [], examIds: [], pageSize: 0, pageNumber: 0,
            lecturerId: 0, skillCenterId: 0,
        }),
    });

    const columns = useMemo<CustomColumnDef<Course>[]>(() => [
        { header: "Mã khóa học", accessorKey: "code" },
        { header: "Tên khóa học", accessorKey: "name" },
        { header: "Tên chương trình", accessorKey: "program.name" },
        { header: "Loại chương trình", accessorKey: "program.programType.name" },
        { header: "Ngày khai giảng", accessorFn: (row) => dateUtils.toDDMMYYYY(row.studyDate) },
        { header: "Ngày kết thúc (dự kiến)", accessorFn: (row) => dateUtils.toDDMMYYYY(row.endDate) },
        { header: "Ngày thi", accessorFn: (row) => dateUtils.toDDMMYYYY(row.testDate) },
        {
            header: "Trạng thái", accessorKey: "status",
            Cell: ({ row }) => <CourseStatusBadge status={row.original.status} />,
            size: 180,
        },
        { header: "Có tổ chức thi", accessorKey: "program.isTesting", type: "squareCheck" },
        { header: "Tổng số tiết", accessorKey: "program.totalClassPeriodNumber" },
        { header: "Tổng số giờ", accessorKey: "program.totalHours" },
        { header: "Học phí", accessorKey: "program.price", type: "currency" },
        {
            header: "Cụm thời gian",
            accessorFn: (row) => row.courseTimeClusters?.map(ctc => ctc.timeCluster?.name).join("\n") ?? "",
        },
    ], []);

    return (
        <CustomFieldset title="Danh sách khóa học">
            <CustomDataTableAPI
                enableRowSelection
                query={query}
                columns={columns}
                deleteFn={courseService.delete}
                deleteListFn={courseService.deleteListIds}
                exportProps={{ fileName: "Danh sách khóa học" }}
                renderTopToolbarCustomActions={() => <CourseListCreateUpdate />}
                renderRowActions={({ row }) => <CourseListCreateUpdate values={row.original} />}
            />
        </CustomFieldset>
    );
}
