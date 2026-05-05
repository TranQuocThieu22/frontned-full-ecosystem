"use client";

import { service_department } from "@/api/services/service_department";
import { service_event } from "@/api/services/service_event";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_standard } from "@/api/services/service_standard";
import { EnumRegisterType } from "@/enum/EnumEventRegisterType";
import { Event } from "@/interfaces/event";
import { EventGroup } from "@/interfaces/eventGroup";
import { Standard } from "@/interfaces/standard";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import ExcelJS from "exceljs";

export default function MandatoryActivityCatalogButtonImport() {
    const queryClient = useQueryClient();
    const stack = useModalsStack<ModalImportId>([]);

    const standards = useCustomReactQuery({
        queryKey: ["standard"],
        axiosFn: () => service_standard.getAll(),
    });

    const eventGroups = useCustomReactQuery({
        queryKey: ["eventGroup"],
        axiosFn: () => service_eventGroup.getAll(),
    });

    const departments = useCustomReactQuery({
        queryKey: ["department"],
        axiosFn: () => service_department.getAll(),
    });

    const importMutation = useCustomReactMutation({
        axiosFn: (data: Event[]) => service_event.createList(data),
        mutationType: "import",
        successNotification: "Import thành công",
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["EventRequiredGetAll"] });
                stack.closeAll();
            }
        }
    });

    const handleExport = async () => {
        try {
            const workbook = new ExcelJS.Workbook();

            excelUtils.addSheet<Event>({
                workbook: workbook,
                sheetName: "Danh sách hoạt động",
                data: [],
                config: config,
            });

            excelUtils.addSheet<Standard>({
                workbook: workbook,
                sheetName: "Danh sách điều",
                data: standards.data || [],
                config: config_standard,
            });

            excelUtils.addSheet<EventGroup>({
                workbook: workbook,
                sheetName: "Danh sách nhóm hoạt động",
                data: eventGroups.data || [],
                config: config_eventGroup,
            });

            excelUtils.addSheet<Department>({
                workbook: workbook,
                sheetName: "Danh sách đơn vị",
                data: departments.data || [],
                config: config_Department,
            });

            excelUtils.download({ name: "Mẫu import hoạt động bắt buộc", workbook });
        } catch (error: any) {
            notifications.show({
                title: "Lỗi xuất mẫu import",
                message: error ? error.message : "Không thể tải mẫu import",
                color: "red",
            });
        }
    };

    const handleExecute = async (finalValues: any[]) => {
        const transformedData = finalValues.map((row: any) => {
            return {
                ...row,
                isTemplate: true,
                isCompleted: false,
                isRequired: true,
                approvalStatus: 3,
                registerType: EnumRegisterType.AllStudents,
            };
        });
        importMutation.mutateAsync(transformedData);
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={handleExecute}
            />
            <CustomButton
                actionType="import"
                onClick={() => stack.open("FileImportConfig")}
                loading={importMutation.isPending || departments.isFetching || eventGroups.isFetching || standards.isFetching}
            />
        </>
    );
}

const config: IExcelColumnConfig<Event>[] = [
    {
        fieldKey: "standardId",
        fieldName: "ID điều",
        isRequired: true,
    },
    {
        fieldKey: "code",
        fieldName: "Mã hoạt động",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Mô tả hoạt động ngoại khoá",
        isRequired: true,
    },
    {
        fieldKey: "minPoint",
        fieldName: "Điểm tối thiểu",
        isRequired: true,
    },
    {
        fieldKey: "maxPoint",
        fieldName: "Điểm tối đa",
        isRequired: true,
    },
    {
        fieldKey: "host",
        fieldName: "ID đơn vị tổ chức",
        isRequired: true,
    },
    {
        fieldKey: "completedBy",
        fieldName: "ID đơn vị công nhận",
        isRequired: true,
    },
    {
        fieldKey: "source",
        fieldName: "Nguồn ghi nhận (1=Điểm danh, 2=Kết quả học tập, 3=Xác duyệt minh chứng)",
        isRequired: true,
    },
    {
        fieldKey: "eventGroupId",
        fieldName: "ID nhóm hoạt động",
        isRequired: false,
    }
];

const config_standard: IExcelColumnConfig<Standard>[] = [
    {
        fieldKey: "id",
        fieldName: "Id của điều",
        isRequired: true,
    },
    {
        fieldKey: "code",
        fieldName: "Mã điều",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên điều",
        isRequired: true,
    },
];

const config_eventGroup: IExcelColumnConfig<EventGroup>[] = [
    {
        fieldKey: "id",
        fieldName: "Id của nhóm hoạt động",
        isRequired: true,
    },
    {
        fieldKey: "code",
        fieldName: "Mã nhóm hoạt động",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên nhóm hoạt động",
        isRequired: true,
    },
];

const config_Department: IExcelColumnConfig<Department>[] = [
    {
        fieldKey: "id",
        fieldName: "Id đơn vị ",
        isRequired: true,
    },
    {
        fieldKey: "code",
        fieldName: "Mã đơn vị",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên đơn vị",
        isRequired: true,
    },
];