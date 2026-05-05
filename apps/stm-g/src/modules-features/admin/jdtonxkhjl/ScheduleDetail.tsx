import useQ_CourseSection_GetSchedule from "@/hooks/query-hooks/CourseSection/useQ_CourseSection_GetSchedule";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function ScheduleDetail(
  {
    lecturerId,
    fromDate,
    toDate
  }: {
    lecturerId?: number
    fromDate?: string,
    toDate?: string
  }
) {
  const disc = useDisclosure()
  const getSchedule_query = useQ_CourseSection_GetSchedule({
    body: {
      PageSize: 0,
      PageNumber: 0,
      lecturerId: lecturerId,
      courseSectionId: 0,
      addressId: 0,

      startDate: fromDate,
      endDate: toDate
    },
    options: {
      enabled: disc[0] != false
    }
  })
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      header: "Ngày dạy",
      accessorKey: "startDate",
      accessorFn: (row) => {
        return utils_date_dateToDDMMYYYString(new Date(row.startDate))
      }
    },
    {
      header: "Tiết bắt đầu",
      accessorFn: (row) => {
        return row.classPeriodStart
      }
    },
    {
      header: "Số tiết",
      accessorFn: (row) => {
        return row.classPeriodEnd - row.classPeriodStart
      }
    },
    {
      header: "Phòng",
      accessorFn: (row) => {
        return row.addressName
      }
    },
    {
      header: "Mã lớp",
      accessorFn: (row) => {
        return row.courseSectionCode
      }
    },
    {
      header: "Sĩ số",
      accessorFn: (row) => {
        return row.addressCapacity
      }
    }
  ], [])
  return (
    <MyButtonModal
      label="Xem chi tiết"
      title="Danh sách buổi nghỉ dạy"
      disclosure={disc}
      modalSize={"80%"}
    >
      <MyDataTable
        columns={columns}
        data={getSchedule_query.data || []} />
    </MyButtonModal>
  )
}
