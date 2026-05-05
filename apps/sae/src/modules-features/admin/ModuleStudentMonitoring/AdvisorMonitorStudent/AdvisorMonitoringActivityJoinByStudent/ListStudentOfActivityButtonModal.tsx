'use client'

import { service_studentsActivityParticipation } from "@/api/services/service_studentsActivityParticipation";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function ListStudentOfActivityButtonModal({ classId, eventId }: { classId?: number, eventId: number }) {
    const disc = useDisclosure();
    const permissionStore = usePermissionStore()

    const Q_Student = useCustomReactQuery({
        queryKey: ["ListStudentOfActivityButtonModal_getStudent", classId, eventId],
        axiosFn: async () => {
            const res = await service_studentsActivityParticipation.getBySubLeturer({
                eventId: eventId,
                classId: classId ?? undefined
            })
            return res
        },
        options: {
            enabled: !!eventId && disc[0]
        }
    })

    const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(() => [
        { header: "Mã sinh viên", accessorKey: "studentCode" },
        { header: "Họ tên", accessorKey: "studentName" },
        {
            header: "Ngày sinh", accessorKey: "dateOfBirth", accessorFn: (row) => {
                return dateUtils.toDDMMYYYY(new Date(row.dateOfBirth!))
            }
        },
        {
            header: "Giới tính", accessorKey: "gender", accessorFn: (row) => {
                if (!row?.gender) return ''
                return row?.gender === 1 ? 'Nam' : 'Nữ'
            }
        },
        { header: "Khoa", accessorKey: "facultyName" },
        { header: "Lớp", accessorKey: "className" },
        {
            header: "Người cập nhật", accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật", accessorKey: "modifiedWhen",
            accessorFn: row => row.modifiedWhen ? dateUtils.toDDMMYYYY(new Date(row.modifiedWhen)) : "",
        }
    ], [])


    return (
        <CustomButtonModal
            buttonProps={{
                children: "Xem",
                // hidden: !permissionStore.state.currentPermissionPage?.isRead
            }}
            modalProps={{
                size: "90%"
            }}
            disclosure={disc}
        >
            <CustomFlexColumn>
                <CustomFieldset title="Danh sách sinh viên" >
                    <CustomDataTable
                        isLoading={Q_Student.isLoading}
                        isError={Q_Student.isError}
                        enableRowSelection={true}
                        enableRowNumbers={true}
                        columns={columns}
                        data={Q_Student?.data || []}
                    >
                    </CustomDataTable>
                </CustomFieldset>
            </CustomFlexColumn>
        </CustomButtonModal>
    )
}
