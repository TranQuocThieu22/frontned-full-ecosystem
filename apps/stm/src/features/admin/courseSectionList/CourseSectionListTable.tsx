'use client'
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useMemo } from "react";
import { courseSectionService } from "@/shared/APIs/courseSectionService";
import type { CourseSectionListItem } from "./interfaces";

export default function CourseSectionListTable() {
  const query = useCustomReactQuery<CourseSectionListItem[], unknown, CourseSectionListItem[]>({
    queryKey: ["CourseSectionList"],
    axiosFn: () =>
      courseSectionService.get<CourseSectionListItem>({
        courseTimeClusterIds: [],
        courseSectionId: 0,
        programId: 0,
        status: 0,
        type: 1,
        courseIds: [],
        examIds: [],
        pageSize: 0,
        pageNumber: 0,
      }),
  });

  const columns = useMemo<CustomColumnDef<CourseSectionListItem>[]>(() => [
    { header: "Mã lớp", accessorKey: "code" },
    {
      header: "Tên khóa học",
      accessorKey: "courseTimeCluster.course.name",
    },
    {
      header: "Ngày khai giảng",
      accessorFn: (row) => {
        const d = row.courseTimeCluster?.course?.studyDate;
        if (!d) return "";
        return dateUtils.toDDMMYYYY(typeof d === "string" ? d : d.toISOString());
      },
    },
    {
      header: "Tổng số tiết",
      accessorKey: "courseTimeCluster.course.courseTimeClusters.0.courseSectionNumberTotal",
    },
    {
      header: "Cụm thời gian",
      accessorKey: "courseTimeCluster.timeCluster.name",
    },
    {
      header: "Sĩ số",
      accessorKey: "quantityStudentActual",
      size: 120,
    },
  ], []);

  return (
    <CustomDataTableAPI
      enableRowSelection
      enableRowNumbers
      columns={columns}
      query={query}
      exportProps={{ fileName: "danh-sach-lop" }}
    />
  );
}

