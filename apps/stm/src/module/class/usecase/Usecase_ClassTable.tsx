import { Button } from "@mantine/core"
import { MyCheckbox, MyDataTable } from "aq-fe-framework/components"
import { MyButton } from "aq-fe-framework/core"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import { Group } from "react-konva"
import { ClassStatusBadge } from "./ClassStatusBadge"

export interface ClassTableDomain {
    classCode?: string,
    className?: string,
    homeroomTeacher?: string,
    classSchedule?: string
    roomCode?: string,
    currentAndMaximumEnrollment?: string,
    classStatus?: number,
    isScoreEntered?: boolean
}
interface Usecase_ClassTableProps {
    data: ClassTableDomain[]
    isLoading?: boolean,
    isError?: boolean
    onDistributeTicker?: (row: ClassTableDomain) => void
}

export default function Usecase_ClassTable({
    data,
    isLoading,
    isError,
    onDistributeTicker
}: Usecase_ClassTableProps) {
    const columns = useMemo<MRT_ColumnDef<ClassTableDomain>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "classCode"
        },
        {
            header: "Tên lớp",
            accessorKey: "className"
        },
        {
            header: 'Giáo viên chủ nhiệm',
            accessorKey: "homeroomTeacher"
        },
        {
            header: "Lịch học",
            accessorKey: "classSchedule"
        },
        {
            header: "Phòng học",
            accessorKey: "roomCode"
        },
        {
            header: "Sĩ số hiện tại/ Sĩ số tối đa",
            accessorKey: "currentAndMaximumEnrollment"
        },
        {
            header: "Trạng thái lớp",
            accessorKey: "classStatus",
            accessorFn(originalRow) {
                    return (<ClassStatusBadge status={originalRow.classStatus ?? -1} />)
                },
        },
        {
            header: "Đã nhập điểm",
            accessorKey: "isScoreEntered",
            accessorFn(originalRow) {
                return (<MyCheckbox readOnly defaultChecked={originalRow.isScoreEntered ?? false} />)
            },
        }
    ], [])
    return (
        <MyDataTable
            isLoading={isLoading}
            isError={isError}
            data={data || []}
            columns={columns}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <MyButton actionType="export" />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <Button
                    hidden={!onDistributeTicker}
                    onClick={() => onDistributeTicker?.(row.original)}>
                    Phát ticker
                </Button>
            )}
        />
    )
}
