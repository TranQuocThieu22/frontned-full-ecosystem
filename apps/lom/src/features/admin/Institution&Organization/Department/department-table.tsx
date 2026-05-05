'use client'
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { UpdateActionIcon } from "@/components/crud/UpdateActionIcon";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import SyncDataEdusoftButton from "@/shared/components/SyncDataEdusoftButton";
import { makeEnum, ValueOfEnum } from "@/utils/enum";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import DepartmentForm, { DepartmentDTO } from "./department-form";

export interface DepartmentInfoViewModel {
    id: number;
    code?: string | null;
    name?: string | null;
    note?: string | null;
    concurrencyStamp?: string;
    isEnabled: boolean;
    modifiedWhen?: Date | null;
    modifiedBy?: number | null;
    modifiedFullName?: string;
    unitId?: number | null;
    unit?: DepartmentInfoViewModel | null;
    type?: number | null;
    isWorkingUnit?: boolean | null;
    order?: number | null;
    aqModuleId?: number | null;
    aqUnitId?: number | null;
}

export const DepartmentType = makeEnum({
    KHOA: 1,
    BOMON: 2,
    PHONG: 3,
    TRUNGTAM: 4,
});

export type DepartmentTypeEnumValue = ValueOfEnum<typeof DepartmentType>;

export const DepartmentTypeLabel: Record<DepartmentTypeEnumValue, string> = {
    [DepartmentType.KHOA]: "Khoa",
    [DepartmentType.BOMON]: "Bộ môn",
    [DepartmentType.PHONG]: "Phòng",
    [DepartmentType.TRUNGTAM]: "Trung tâm",
};

export default function DepartmentTable() {
    const defaultDepartmentData = {
        id: 0,
        code: null,
        name: null,
        note: null,
        concurrencyStamp: 'string',
        isEnabled: true,
        unitId: null,
        type: null,
        isWorkingUnit: true,
        order: null,
        aqModuleId: 5,
        aqUnitId: null,
    }
    const [currentDepartmentData, setCurrentDepartmentData] = useState<DepartmentDTO>(defaultDepartmentData);
    const [departmentFormOpened, departmentFormHandler] = useDisclosure(false);
    const [departmentDeletePromptOpened, departmentDeletePromptHandler] = useDisclosure(false);

    const departmentQuery = useQuery<DepartmentInfoViewModel[]>({
        queryKey: ["Departments"],
        queryFn: async () => {
            const response = await baseAxios.get("/Department/GetAll");
            return response.data.data ?? [];
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<DepartmentInfoViewModel>[]>(() => [
        { header: "Mã đơn vị", accessorKey: "code" },
        { header: "Tên đơn vị", accessorKey: "name" },
        {
            header: "Loại đơn vị",
            accessorKey: "type",
            accessorFn: (row) => row.type ? DepartmentTypeLabel[row.type as DepartmentTypeEnumValue] : '',
        },
        {
            header: "Trực thuộc", accessorKey: "unit.name",
            accessorFn: (row) => row.unit?.name || "Không có đơn vị trực thuộc",
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // },
    ], []);

    const openDeparmentForm = (departmentData: DepartmentInfoViewModel) => {
        setCurrentDepartmentData(departmentData);
        departmentFormHandler.open();
    }

    const deleteDepartmentMutation = useMutation({
        mutationFn: async (currentDepartmentData: DepartmentInfoViewModel) => {
            let body = {
                id: currentDepartmentData?.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/Department/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            departmentQuery.refetch();
            departmentDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const openDeleteDepartmentPrompt = (departmentData: DepartmentInfoViewModel) => {
        setCurrentDepartmentData(departmentData);
        departmentDeletePromptHandler.open();
    }


    return (
        <CustomFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <Button onClick={() => openDeparmentForm(defaultDepartmentData)} leftSection={<IconPlus />}>Thêm</Button>
                        <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataAQDataUnit()} />
                        {/* <PrototypeImportButton />
                        <PrototypeExportButton />
                        <PrototypeDeleteAllButton /> */}
                    </Group>
                )}
                columns={columns}
                data={departmentQuery.data ?? []}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <UpdateActionIcon
                            actionIconProps={{
                                onClick: () => openDeparmentForm(row.original)
                            }}
                        />
                        <DeleteActionIcon
                            actionIconProps={{
                                onClick: () => openDeleteDepartmentPrompt(row.original)
                            }}
                        />
                    </CustomCenterFull>
                )}
            />
            <Modal
                opened={departmentFormOpened}
                onClose={departmentFormHandler.close}
                title={<Text fw={600}>Thông tin đơn vị</Text>}
            >
                <DepartmentForm
                    departmentData={currentDepartmentData}
                    formHandler={departmentFormHandler}
                />
            </Modal>

            <DeletePrompt
                onConfirm={() => deleteDepartmentMutation.mutate(currentDepartmentData!)}
                target={{
                    label: "danh mục đơn vị",
                    code: currentDepartmentData.code,
                    name: currentDepartmentData.name
                }}
                modalProps={{
                    opened: departmentDeletePromptOpened,
                    onClose: departmentDeletePromptHandler.close
                }}
            />
        </CustomFlexColumn>
    );
}

