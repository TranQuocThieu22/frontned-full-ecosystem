import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import Shared_LecturerTableSelect from "@/shared/features/Lecturer/Shared_LecturerTableSelect";
import Shared_TitleSelect from "@/shared/features/Title/Shared_TitleSelect";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { v4 } from "uuid";

export default function SubmitRegistrationTopicMemberList({
    values,
    onChange
}: {
    values: SRMTopicMember[],
    onChange: (values: SRMTopicMember[]) => void
}) {
    const disc = useDisclosure()
    const columns = useMemo<MRT_ColumnDef<SRMTopicMember>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "user.code"
        },
        {
            header: "Họ tên",
            accessorKey: "user.fullName"
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.user?.dateOfBirth)
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender",
            accessorFn: (row) => genderLabel[row.user?.gender as genderEnum]
        },
        {
            header: "Đơn vị",
            accessorKey: "user.workingUnit.name",
        },
        {
            header: "Vai trò",
            accessorKey: "srmTitle.name",
            size: 250,
            accessorFn: (row) => {
                return (
                    <Shared_TitleSelect
                        titleType={EnumTitleType.ResearchProject}
                        value={row.srmTitleId?.toString()}
                        onChange={(e) => {
                            const newValues = values.map(item => {
                                if (item.id === 0 && item.tempId == row.tempId) {
                                    return {
                                        ...item,
                                        srmTitleId: Number(e)
                                    }
                                }
                                if (item.id! > 0 && item.id == row.id) {
                                    return {
                                        ...item,
                                        srmTitleId: Number(e)
                                    }
                                }
                                return item
                            })
                            onChange(newValues)
                        }}
                    />
                )
            }
        }
    ], [values])

    return (
        <CustomDataTable
            pinningRightColumns={['srmTitle.name']}
            columns={columns}
            data={values.filter(item => item.isEnabled == true)}
            renderTopToolbarCustomActions={() => (
                <CustomButtonModal modalProps={{ size: "80vw" }} disclosure={disc} buttonProps={{ actionType: "create", type: "button" }}>
                    <Shared_LecturerTableSelect
                        onChange={(lecturers) => {
                            const existingIds = new Set(values.map(topicMember => topicMember.user?.id))
                            const filterLecturers = lecturers.filter(lect => !existingIds.has(lect.id))
                            const newTopicMember = filterLecturers.map(item => ({
                                id: 0,
                                user: item,
                                // srmTitleId: 0x,
                                isEnabled: true,
                                userId: item.id,
                                tempId: v4()
                            }) as SRMTopicMember)
                            onChange([...values, ...newTopicMember])
                            disc[1].close()
                        }}
                        values={values.map(item => item.user!)}
                    />
                </CustomButtonModal>
            )}
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <CustomActionIcon
                            actionType="tempDelete"
                            onClick={() => {
                                const newValues = values.reduce<SRMTopicMember[]>((acc, item) => {
                                    // Nếu là item mới thêm (id=0) và cùng tempId => bỏ hẳn (hard delete)
                                    if (item.id === 0 && item.tempId === row.original.tempId) {
                                        return acc
                                    }

                                    // Nếu là item cũ (id>0) và cùng id => soft delete (isEnabled=false)
                                    if (item.id! > 0 && item.id === row.original.id) {
                                        return [...acc, { ...item, isEnabled: false }]
                                    }

                                    // Giữ nguyên các item khác
                                    return [...acc, item]
                                }, [])

                                onChange(newValues)
                            }}
                        />
                    </CustomCenterFull>
                )
            }}
        />
    )
}
