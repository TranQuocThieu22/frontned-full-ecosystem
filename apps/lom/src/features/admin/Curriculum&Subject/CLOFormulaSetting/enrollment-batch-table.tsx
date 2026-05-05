'use client'
import PrototypeExportButton from "@/components/prototype/PrototypeExportButton"
import PrototypeImportButton from "@/components/prototype/PrototypeImportButton"
import { canSaveCLOFormulaSetting } from "@/features/auth/PageAuthorization/CLO-formula-setting.auth"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils"
import { Button, Checkbox, Group, Select } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo, useState } from "react"
import { EnrollmentBatchDTO } from "../../Institution&Organization/EnrollmentBatch/enrollment-batch-form"
import { EnrollmentBatchInfoViewModel } from "../../Institution&Organization/EnrollmentBatch/enrollment-batch-table"

enum ENUM_CONGTHUC {
    "Trung bình cộng" = 1,
    "Tỷ trọng theo số tín chỉ" = 2,
    "Tỷ trọng theo mức độ nhận thức MIT" = 3,
    "Tỷ trọng theo thang Likert (MRI)" = 4,
    "Trọng số CLO thành phần " = 5
}

export default function EnrollmentBatchTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const queryClient = useQueryClient();

    const [editedEnrollmentBatchs, setEditedEnrollmentBatchs] = useState<EnrollmentBatchDTO[]>([]);
    const enrollmentBatchQuery = useQuery<EnrollmentBatchInfoViewModel[]>({
        queryKey: ["EnrollmentBatchs"],
        queryFn: async () => {
            let cols = 'COEProgram'
            const res = await baseAxios.get(`/COEGrade/GetAll?cols=${cols}`);
            return res.data.data ?? []
        },
        refetchOnWindowFocus: false,
    });

    const handleFieldChange = (row: EnrollmentBatchInfoViewModel, fieldName: keyof EnrollmentBatchDTO, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null

        let mappedDTO = {
            id: row.id,
            code: row.code,
            name: row.name,
            concurrencyStamp: row.concurrencyStamp,
            isEnabled: row.isEnabled,
            activityPlanStartId: row.activityPlanStartId,
            activityPlanEndId: row.activityPlanEndId,
            coeProgramId: row.coeProgramId,
            note: row.note,
            isActive: row.isActive,
            coeDegreeLevelId: row.coeDegreeLevelId,
            formulaType: row.formulaType,
            isSplitPoint: row.isSplitPoint
        }

        setEditedEnrollmentBatchs((prev) => {
            // Check if the row already exists in editedEnrollmentBatchs
            const existingIndex = prev.findIndex((item) => item.id === row.id);
            if (existingIndex !== -1) {
                let updatedEnrollmentBatchs = [...prev];
                updatedEnrollmentBatchs[existingIndex] = {
                    ...updatedEnrollmentBatchs[existingIndex]!,
                    [fieldName]: fieldValue
                };
                return updatedEnrollmentBatchs;
            } else {
                return [...prev, {
                    ...mappedDTO,
                    [fieldName]: fieldValue
                }];
            }
        });
    };

    const columns = useMemo<MRT_ColumnDef<EnrollmentBatchInfoViewModel>[]>(() => [
        {
            header: "Mã khóa",
            accessorKey: "code",
            size: 50
        },
        {
            header: "Tên khóa",
            accessorKey: "name"
        },
        {
            header: "Mã chương trình",
            accessorKey: "coeProgram.code",
            size: 50
        },
        {
            header: "Tên chương trình",
            accessorKey: "coeProgram.name"
        },
        {
            header: "Khoa quản lý",
            accessorKey: "coeProgram.deparment.name"
        },
        {
            header: "Tách điểm",
            accessorKey: "isSplitPoint",
            size: 10,
            Cell: ({ row }) => {
                return (
                    <CustomCenterFull>
                        <Checkbox
                            defaultChecked={row.original.isSplitPoint ? true : false}
                            onChange={(event) => handleFieldChange(row.original, "isSplitPoint", event.currentTarget.checked)}
                        />
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Công thức",
            accessorKey: "formulaType",
            Cell: ({ row }) => {
                return (
                    <Select
                        clearable
                        placeholder="chọn công thức CLO"
                        data={converterUtils.enumToSelectOptions(ENUM_CONGTHUC)}
                        defaultValue={row.original.formulaType ? String(row.original.formulaType) : null}
                        onChange={(value) => handleFieldChange(row.original, "formulaType", value === null ? null : Number(value))}
                    />
                )
            },
            size: 320
        }
    ], []);

    const handleOnClickSaveButton = async () => {
        let enrollmentBatchsPayload = editedEnrollmentBatchs;

        if (enrollmentBatchsPayload.length === 0) {
            notifications.show({
                title: 'Không có thay đổi',
                message: 'Không có dữ liệu nào cần lưu.',
                color: 'yellow',
            });
            return;
        }
        let resUpdateEnrollmentBatchs = await baseAxios.post(`/COEGrade/UpdateList`, enrollmentBatchsPayload);

        if (resUpdateEnrollmentBatchs.data.isSuccess === 1) {
            setEditedEnrollmentBatchs([]);
            notifications.show({
                title: 'Lưu thành công',
                message: 'Dữ liệu đã được cập nhật.',
                color: 'green',
            });
            queryClient.invalidateQueries({ queryKey: ['EnrollmentBatchs'] });
        } else {
            notifications.show({
                title: 'Thao tác không thành công',
                message: 'Dữ liệu chưa được lưu. Vui lòng thử lại.',
                color: 'red',
            });
        }
    }


    return (
        <CustomDataTable
            columns={columns}
            data={enrollmentBatchQuery.data || []}
            enableRowSelection
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    {canSaveCLOFormulaSetting(userStore, userPermissionStore) &&
                        <Button onClick={handleOnClickSaveButton}>Lưu</Button>
                    }
                    <PrototypeImportButton />
                    <PrototypeExportButton />
                    {/*
                    <PrototypeDeleteAllButton/> 
                    */}
                </Group>
            )}
        />
    )
}