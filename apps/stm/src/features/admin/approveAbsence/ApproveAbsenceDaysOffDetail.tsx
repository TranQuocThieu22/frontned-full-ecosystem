'use client'
import { courseSectionService } from "@/shared/APIs/courseSectionService";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";

export default function ApproveAbsenceDaysOffDetail({
    lecturerId,
    fromDate,
    toDate
}: {
    lecturerId?: number
    fromDate?: string,
    toDate?: string
}) {
    const disc = useDisclosure()
    const getSchedule_query = useCustomReactQuery({
        queryKey: ["courseSectionSchedule", lecturerId, fromDate, toDate],
        axiosFn: () =>
            courseSectionService.getSchedule({
                PageSize: 0,
                PageNumber: 0,
                lecturerId,
                courseSectionId: 0,
                addressId: 0,
                startDate: fromDate,
                endDate: toDate,
            }),
        options: {
            enabled: disc[0] != false,
        },
    })
    const columns = useMemo<CustomColumnDef<any>[]>(() => [
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
                return row.courseSection?.code
            }
        },
        {
            header: "Sĩ số",
            accessorFn: (row) => {
                return row.addressCapacity
            }
        }
    ], [])
    if (getSchedule_query.isLoading) return "Đang tải dữ liệu..."
    return (
        <CustomButtonModal
            buttonProps={{
                actionType: "view",
                children: "Xem chi tiết"
            }}
            modalProps={{
                title: "Danh sách buổi nghỉ dạy",
                size: "80%"
            }}
            disclosure={disc}
        >
            <CustomDataTable
                columns={columns}
                data={getSchedule_query.data ?? []}
            />
        </CustomButtonModal>
    )
}
